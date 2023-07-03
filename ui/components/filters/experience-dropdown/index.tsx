import React from 'react';
import { Dropdown } from '@nextui-org/react';
import { Work } from 'react-iconly';
import { ExperienceTypes } from '@/types';

interface Props {
	selected?: string;
	setSelected?: any;
}

const ExperienceDropdown = () => {
	const [selectedExperience, setSelectedExperience] =
		React.useState<ExperienceTypes>('intern');
	return (
		<div>
			<Dropdown>
				<Dropdown.Button className='!bg-[#141414] !w-fit'>
					<div className='flex flex-row items-center gap-4 !w-[160px]'>
						<div className='!rounded-full w-fit !border-[#373737] border-2 p-[4px]'>
							<Work set='light' primaryColor='#9C9C9C' size={24} />
						</div>
						<div className='text-[0.9rem] text-[#D0D0D0]'>
							{selectedExperience
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
					selectedKeys={selectedExperience}
					onSelectionChange={(value: any) => {
						setSelectedExperience(value.currentKey);
					}}
				>
					<Dropdown.Item key='intern'>Intern</Dropdown.Item>
					<Dropdown.Item key='experienced'>Experienced</Dropdown.Item>
					<Dropdown.Item key='expert'>Expert</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default ExperienceDropdown;
