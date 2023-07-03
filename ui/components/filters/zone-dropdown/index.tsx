import React from 'react';
import { Dropdown } from '@nextui-org/react';
import { Location } from 'react-iconly';
import { ZoneTypes } from '@/types';

interface Props {
	selected?: string;
	setSelected?: any;
}

const ZoneDropdown = () => {
	const [selectedZone, setSelectedZone] = React.useState<ZoneTypes>('all');
	return (
		<div>
			<Dropdown>
				<Dropdown.Button className='!bg-[#141414]'>
					<div className='flex flex-row items-center gap-4 !w-[160px]'>
						<div className='!rounded-full w-fit !border-[#373737] border-2 p-[4px]'>
							<Location set='light' primaryColor='#9C9C9C' size={26} />
						</div>
						<div className='text-[0.9rem] text-[#D0D0D0]'>
							{selectedZone
								.split('-')
								.map((word) => word.replace(/^./, word[0].toUpperCase()))
								.join(' ')}
						</div>
					</div>
				</Dropdown.Button>
				<Dropdown.Menu
					aria-label='Single selection actions'
					disallowEmptySelection
					selectionMode='single'
					css={{ color: '#373737' }}
					selectedKeys={selectedZone}
					onSelectionChange={(value: any) => {
						setSelectedZone(value.currentKey);
					}}
				>
					<Dropdown.Item key='all'>All</Dropdown.Item>
					<Dropdown.Item key='asia'>Asia</Dropdown.Item>
					<Dropdown.Item key='europe'>Europe</Dropdown.Item>
					<Dropdown.Item key='north-america'>North America</Dropdown.Item>
					<Dropdown.Item key='south-america'>South America</Dropdown.Item>
					<Dropdown.Item key='africa'>Africa</Dropdown.Item>
					<Dropdown.Item key='australia'>Australia</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default ZoneDropdown;
