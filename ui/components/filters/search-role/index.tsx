import React from 'react';
import { Input } from '@nextui-org/react';
import { Search } from 'react-iconly';
import { ExperienceTypes } from '@/types';

interface Props {
	selected?: string;
	setSelected?: any;
}

const SearchFilter = () => {
	return (
		<div className='font-orkneyRegular'>
			<Input
				clearable
				contentLeft={
					<div className='!rounded-full w-fit !border-[#373737] border-2 p-[4px]'>
						<Search primaryColor='#9C9C9C' size={22} />
					</div>
				}
				contentLeftStyling={false}
				css={{
					w: '100%',
					'@xsMax': {
						mw: '300px',
					},

					'& .nextui-input-content--left': {
						h: '100%',
						ml: '$4',
						dflex: 'center',
					},
					'& .nextui-input-wrapper': {
						backgroundColor: '#141414',
					},
					'& .nextui-input': {
						color: '#fff',
					},
				}}
				placeholder='Search...'
			/>
		</div>
	);
};

export default SearchFilter;
