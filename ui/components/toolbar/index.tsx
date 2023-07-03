import React from 'react';
import {
	SearchFilter,
	ZoneDropdown,
	ExperienceDropdown,
	SalaryDropdown,
} from '../filters';

const Toolbar = () => {
	return (
		<div className='flex flex-col lg:flex-row items-center justify-center gap-8 w-full border-t-2 border-[#333335] p-8 !bg-[#141414] text-white'>
			<SearchFilter />
			<div className='border-[#373737] border-[1px] w-full lg:w-[2px] lg:h-8' />
			<ZoneDropdown />
			<div className='border-[#373737] border-[1px] w-full lg:w-[2px] lg:h-8' />
			<ExperienceDropdown />
			<div className='border-[#373737] border-[1px] w-full lg:w-[2px] lg:h-8' />
			<SalaryDropdown />
		</div>
	);
};

export default Toolbar;
