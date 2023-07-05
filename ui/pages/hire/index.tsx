import React from 'react';
import type { ReactElement } from 'react';

import NestedLayout from '@/components/layout/nested-layout';
import type { NextPageWithLayout } from '../_app';
import { Layout, TalentForm } from '@/components';

const Hire: NextPageWithLayout = () => {
	return (
		<div>
			<TalentForm />
		</div>
	);
};

Hire.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Hire;
