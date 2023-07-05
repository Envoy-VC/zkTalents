import React from 'react';

import { useStorage } from '@thirdweb-dev/react';
import { Button, Input } from '@nextui-org/react';
import { Work, CaretLeft } from 'react-iconly';
import { ZKTalentContext, MinaContext } from '@/components/layout';
import { PublicKey } from 'snarkyjs';
import { CreateFormStepProps, FormProps } from '..';

import { usePolybase, useDocument } from '@polybase/react';

interface Props {
	step: CreateFormStepProps;
	setStep: React.Dispatch<React.SetStateAction<CreateFormStepProps>>;
	form: FormProps;
}

const AdminDetails = ({ step, setStep, form }: Props) => {
	const { address: minaAddress } = React.useContext(MinaContext);
	const { state, setState } = React.useContext(ZKTalentContext);
	const storage = useStorage();
	const polybase = usePolybase();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			// TODO: Upload to IPFS
			/*
			const uri = await storage!.upload(JSON.stringify(form), {
				uploadWithoutDirectory: true,
			});
			const cid = 'https://ipfs.io/ipfs/' + uri.split('ipfs://')[1];
			*/
			// TODO: Call zkApp
			await state?.zkappWorkerClient?.createTalentTransaction(
				PublicKey.fromBase58(minaAddress)
			);
			await state?.zkappWorkerClient?.proveUpdateTransaction();
			const tx = await state?.zkappWorkerClient?.getTransactionJSON();
			console.log(tx);
			// TODO: Add to Polybase
			/*
			await polybase
				.collection('Talents')
				.record('root')
				.call('addTalent', [cid]);
				*/
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
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
					onChange={(e) => (form.github.createdBefore = e.target.value)}
				/>
				<Input
					labelLeft='Minimum Pull Requests'
					placeholder='15'
					type='string'
					initialValue={form.github.minimumPullRequests || ''}
					onChange={(e) => (form.github.minimumPullRequests = e.target.value)}
				/>
			</div>
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
