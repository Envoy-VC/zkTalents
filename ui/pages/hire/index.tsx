import React from 'react';
import type { ReactElement } from 'react';

import type { NextPageWithLayout } from '../_app';
import { Layout, TalentForm } from '@/components';

const Home: NextPageWithLayout = () => {
	return (
		<div>
			<TalentForm />
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
