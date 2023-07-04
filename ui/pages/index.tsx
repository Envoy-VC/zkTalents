import React from 'react';
import type { ReactElement } from 'react';

import type { NextPageWithLayout } from './_app';
import { Layout, Toolbar } from '@/components';

import { JobCard } from '@/components';

const Home: NextPageWithLayout = () => {
	/*
	useEffect(() => {
		(async () => {
			const { Mina, PublicKey } = await import('snarkyjs');
			const { Add } = await import('../../contracts/build/src/');

			// Update this to use the address (public key) for your zkApp account.
			// To try it out, you can try this address for an example "Add" smart contract that we've deployed to
			// Berkeley Testnet B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA.
			const zkAppAddress =
				'B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA';
			// This should be removed once the zkAppAddress is updated.
			if (!zkAppAddress) {
				console.error(
					'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA'
				);
			}
			//const zkApp = new Add(PublicKey.fromBase58(zkAppAddress))
		})();
	}, []);
	*/

	return (
		<main className='font-orkneyRegular'>
			<Toolbar />
			<div className='p-12 mx-auto max-w-screen-2xl'>
				<div className='my-16 text-3xl font-bold'>Recommended Jobs</div>
				<div className='flex flex-row flex-wrap justify-start gap-8'>
					{Array(4)
						.fill(1)
						.map((job, index) => (
							<JobCard key={index} />
						))}
				</div>
			</div>
		</main>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
