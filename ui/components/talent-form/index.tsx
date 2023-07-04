import React from 'react';

import BasicDetails from './basic-details';
import AdminDetails from './admin-details';

export type CreateFormStepProps = 'basic' | 'settings';

export interface FormProps {
	dateCreated?: string;
	companyName: string;
	companyLogo: string;
	talentTitle: string;
	location: string;
	salary: number;
	requirements?: any[];
}

const TalentForm = () => {
	const [step, setStep] = React.useState<CreateFormStepProps>('basic');

	const form = React.useRef<FormProps>({
		companyName: '',
		companyLogo: '',
		talentTitle: '',
		location: '',
		salary: 0,
	});

	return (
		<div className='flex flex-col items-center justify-center w-full p-8 px-12'>
			{step === 'basic' ? (
				<BasicDetails step={step} setStep={setStep} form={form.current} />
			) : (
				<AdminDetails step={step} setStep={setStep} form={form.current} />
			)}
		</div>
	);
};

export default TalentForm;
