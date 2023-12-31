import React from 'react';

import { Input, Avatar, Button, Card, Loading } from '@nextui-org/react';
import { useStorage } from '@thirdweb-dev/react';
import { Upload, Plus, Delete, ArrowRight } from 'react-iconly';
import { CreateFormStepProps, FormProps } from '..';

interface Props {
	step: CreateFormStepProps;
	setStep: React.Dispatch<React.SetStateAction<CreateFormStepProps>>;
	form: FormProps;
}

const BasicDetails = ({ step, setStep, form }: Props) => {
	const [tags, setTags] = React.useState<string>('');
	const [tagList, setTagList] = React.useState<string[]>([]);

	const storage = useStorage();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleAddTag = (tag: string) => {
		if (tagList.includes(tag)) {
			alert('Tag already added');
		} else if (tag === '') return;
		else {
			setTagList([...tagList, tag]);
		}
	};

	const handleRemoveTag = (tag: string) => {
		const index = tagList.indexOf(tag);
		const list = tagList;
		list.splice(index, 1);
		setTagList([...list]);
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setIsLoading(true);
			const file = e.target.files![0];
			const uri = await storage!.upload(file, { uploadWithoutDirectory: true });
			form.companyLogo = 'https://ipfs.io/ipfs/' + uri.split('ipfs://')[1];
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		form.tagList = tagList;
	}, [tagList]);

	return (
		<div className='flex flex-col justify-center max-w-screen-md gap-6 mx-auto my-8 font-orkneyRegular'>
			<div className='mb-16 text-4xl font-bold text-center'>Talent Details</div>

			<div className='flex flex-col justify-between gap-4 md:flex-row'>
				<div className='flex flex-col w-full gap-2'>
					<Input
						label='Company*'
						placeholder='Amazon'
						size='xl'
						clearable
						className='mt-4 max-w-[250px]'
						initialValue={form.companyName ? form.companyName : ''}
						onChange={(e) => (form.companyName = e.target.value)}
					/>
					<Input
						label='Talent Title*'
						placeholder='Senior UI/UX Designer'
						size='xl'
						clearable
						className='mt-4 max-w-[450px]'
						initialValue={form.talentTitle ? form.talentTitle : ''}
						onChange={(e) => (form.talentTitle = e.target.value)}
					/>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<Avatar
						src={
							form.companyLogo ||
							'https://avatars.githubusercontent.com/u/65389981?v=4'
						}
						className='mb-4 rounded-full !w-28 !h-28'
						alt='Profile Picture'
						color='primary'
						bordered
					/>
					<Button
						css={{ background: '#141414' }}
						icon={<Upload set='bold' primaryColor='#fff' size={22} />}
						className='bg-[#141414] text-white mt-4 !max-w-[200px]'
						auto
					>
						<input
							type='file'
							className='max-w-[200px]'
							placeholder=''
							accept='image/*'
							onChange={(e) => handleFileChange(e)}
						/>
					</Button>
				</div>
			</div>
			<div className='flex flex-col justify-between w-full gap-6 lg:flex-row'>
				<Input
					label='Location*'
					placeholder='New York, NY'
					size='xl'
					className='mt-4 min-w-[300px]'
					initialValue={form.location ? form.location : ''}
					onChange={(e) => (form.location = e.target.value)}
				/>
				<Input
					label='Salary($ per annum)*'
					type='string'
					placeholder='100000'
					required
					size='xl'
					className='mt-4 min-w-[300px]'
					initialValue={form.salary ? form.salary : ''}
					onChange={(e) => (form.salary = e.target.value)}
				/>
			</div>

			<Input
				label='Tags'
				placeholder='Full Time, Senior Level'
				required
				onChange={(e) => setTags(e.target.value)}
				contentRight={
					<Button
						auto
						className='!bg-[#141414] !w-fit rounded-l-[0px]'
						size='lg'
						icon={<Plus set='bold' primaryColor='#fff' size={24} />}
						onPress={() => handleAddTag(tags)}
					>
						Add
					</Button>
				}
				contentRightStyling={false}
				size='xl'
				className='mt-4 max-w-[500px]'
			/>
			<div className='flex flex-row flex-wrap w-full gap-2'>
				{tagList.map((tag, index) => (
					<Card
						key={index}
						css={{
							margin: '2px',
							border: 'none',
							borderRadius: '8px',
						}}
						className='!w-fit'
						variant='flat'
					>
						<Card.Body className='!flex !flex-row !items-center !justify-between pl-4 pr-0 !py-0'>
							<p>{tag}</p>
							<Button
								auto
								color='error'
								icon={<Delete set='bold' primaryColor='#F31260' size={22} />}
								light
								className='!w-fit py-2 px-2 rounded-l-[0px] ml-4'
								onPress={() => handleRemoveTag(tag)}
							/>
						</Card.Body>
					</Card>
				))}
			</div>
			<div className='flex justify-center'>
				<Button
					auto
					light
					iconRight={
						!isLoading && (
							<ArrowRight set='bold' primaryColor='#fff' size={28} />
						)
					}
					size='lg'
					className='!bg-[#141414] !text-white !mt-4 !w-fit'
					onPress={() => setStep('settings')}
				>
					{isLoading ? (
						<Loading size='sm' color='white' />
					) : (
						'Eligibility Details'
					)}
				</Button>
			</div>
		</div>
	);
};

export default BasicDetails;
