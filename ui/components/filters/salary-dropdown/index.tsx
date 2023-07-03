import React from 'react';
import { Dropdown } from '@nextui-org/react';
import { Wallet } from 'react-iconly';
import { SalaryTypes } from '@/types';

interface Props {
	selected?: string;
	setSelected?: any;
}

const SalaryDropdown = () => {
	const [selectedSalary, setSelectedSalary] =
		React.useState<SalaryTypes>('all');
	return (
		<div>
			<Dropdown>
				<Dropdown.Button className='!bg-[#141414]'>
					<div className='flex flex-row items-center gap-4 !w-[160px]'>
						<div className='!rounded-full w-fit !border-[#373737] border-2 p-[4px]'>
							<Wallet set='light' primaryColor='#9C9C9C' size={26} />
						</div>
						<div className='text-[0.9rem] text-[#D0D0D0]'>
							{selectedSalary !== 'all' ? `$${selectedSalary}` : 'All'}
						</div>
					</div>
				</Dropdown.Button>
				<Dropdown.Menu
					aria-label='Single selection actions'
					disallowEmptySelection
					selectionMode='single'
					css={{ color: '#373737' }}
					selectedKeys={selectedSalary}
					onSelectionChange={(value: any) => {
						setSelectedSalary(value.currentKey);
					}}
				>
					<Dropdown.Item key='all'>All</Dropdown.Item>
					<Dropdown.Item key='0-50k'>$0 - $50,000</Dropdown.Item>
					<Dropdown.Item key='50-100k'>$50,000 - $100,000</Dropdown.Item>
					<Dropdown.Item key='100-150k'>$100,000 - $150,000</Dropdown.Item>
					<Dropdown.Item key='150-200k'>$150,000 - $200,000</Dropdown.Item>
					<Dropdown.Item key='200k+'>$200,000+</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default SalaryDropdown;
