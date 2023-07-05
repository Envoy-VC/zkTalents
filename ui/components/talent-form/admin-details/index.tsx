import React from 'react';

import { Button, Input } from '@nextui-org/react';
import { Work, CaretLeft } from 'react-iconly';

import { CreateFormStepProps, FormProps } from '..';

interface Props {
	step: CreateFormStepProps;
	setStep: React.Dispatch<React.SetStateAction<CreateFormStepProps>>;
	form: FormProps;
}

const AdminDetails = ({ step, setStep, form }: Props) => {
	const handleSubmit = async () => {
		console.log(form);
	};
	return (
		<div className='flex flex-col justify-center w-full max-w-screen-md gap-6 my-8 font-orkneyRegular'>
			<div className='mb-16 text-4xl font-bold text-center'>
				Eligibility Details
			</div>
			<div className='mb-4 text-2xl font-semibold'>GitHub Requirements</div>
			<div className='flex flex-col gap-4'>
				<Input
					labelLeft='Created Before'
					placeholder='15'
					type='date'
					onChange={(e) => (form.githubConfig.createdBefore = e.target.value)}
				/>
				<Input
					labelLeft='Minimum Pull Requests'
					placeholder='15'
					type='number'
					initialValue={
						form.githubConfig.minimumPullRequests
							? form.githubConfig.minimumPullRequests
							: ''
					}
					onChange={(e) =>
						(form.githubConfig.minimumPullRequests = e.target.value)
					}
				/>
			</div>
			<div className='mb-4 text-2xl font-semibold'>
				Gitcoin Passport Requirements
			</div>
			<Input
				labelLeft='Threshold Score'
				placeholder='10'
				type='string'
				initialValue={
					form.gitcoinPassportConfig.threshold
						? form.gitcoinPassportConfig.threshold
						: ''
				}
				onChange={(e) =>
					(form.gitcoinPassportConfig.threshold = e.target.value)
				}
			/>
			<div className='flex justify-between'>
				<Button
					auto
					light
					icon={<CaretLeft set='bold' primaryColor='#fff' size={32} />}
					size='lg'
					className='!bg-[#141414] !text-white !mt-4 !w-fit'
					onPress={() => setStep('basic')}
				>
					Back
				</Button>
				<Button
					auto
					light
					icon={<Work set='bold' primaryColor='#fff' size={32} />}
					size='lg'
					className='!bg-[#141414] !text-white !mt-4 !w-fit'
					onPress={handleSubmit}
				>
					Create Talent
				</Button>
			</div>
		</div>
	);
};

export default AdminDetails;
