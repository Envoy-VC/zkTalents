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
	return (
		<div className='flex flex-col justify-center w-full max-w-screen-md gap-6 my-8 font-orkneyRegular'>
			<div className='mb-16 text-4xl font-bold text-center'>
				Eligibility Details
			</div>
			<div className='mb-4 text-2xl font-semibold'>GitHub Requirements</div>
			<div className='flex flex-col gap-4'>
				<Input labelLeft='Created Before' placeholder='15' type='date' />
				<Input
					labelLeft='Minimum Pull Requests'
					placeholder='15'
					type='number'
				/>
			</div>
			<div className='mb-4 text-2xl font-semibold'>
				Gitcoin Passport Requirements
			</div>
			<Input labelLeft='Threshold Score' placeholder='10' type='string' />
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
				>
					Create Talent
				</Button>
			</div>
		</div>
	);
};

export default AdminDetails;
