import React from 'react';
import type { ReactElement } from 'react';

import type { NextPageWithLayout } from './_app';
import { Layout, Toolbar } from '@/components';

import { JobCard } from '@/components';

const Home: NextPageWithLayout = () => {
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
