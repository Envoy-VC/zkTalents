import React from 'react';
import { Card, Avatar, Button } from '@nextui-org/react';

import { Bookmark, Send } from 'react-iconly';

const data = {
	createdAt: '20 May, 2023',
	title: 'Senior UI/UX Designer',
	company: 'Twitter',
	companyLogo:
		'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_2012_logo.svg/640px-Twitter_2012_logo.svg.png',
	location: 'Menlo Park, CA',
	salary: '150,000',
	tags: ['Senior Level', 'React', 'TypeScript', 'Project Work'],
};

const JobCard = () => {
	return (
		<div>
			<Card
				variant='flat'
				css={{
					mw: '375px',
					minWidth: '',
					padding: '0px',
					borderRadius: '16px',
					p: '0px',
					backgroundColor: '#fff',
				}}
			>
				<Card.Body className='!p-[8px]'>
					<div className='bg-[#ffe1cc] rounded-2xl p-2 px-4'>
						<div className='flex flex-row justify-between'>
							<div className='p-2 px-[12px] font-medium bg-white rounded-3xl'>
								{data.createdAt}
							</div>
							<div className='p-2 font-medium bg-white rounded-full'>
								<Bookmark set='light' size={24} />
							</div>
						</div>
						<div className='mt-8 text-xl font-medium'>{data.company}</div>
						<div className='flex flex-row items-end justify-between'>
							<div className='max-w-[300px] text-3xl font-semibold'>
								{data.title}
							</div>
							<Avatar src={data.companyLogo} alt='company logo' size='lg' />
						</div>
						<div className='flex flex-row flex-wrap gap-2 my-6'>
							{data.tags.map((tag, index) => (
								<div
									key={index}
									className='px-2 py-1 border-[1px] border-[#999999] rounded-3xl text-[#5a5a5a]'
								>
									{tag}
								</div>
							))}
						</div>
					</div>
					<div className='flex flex-row items-center justify-between mx-[18px] my-4'>
						<div className='flex flex-col'>
							<div className='text-[1.25rem] font-bold text-black'>{`$${data.salary}`}</div>
							<div className='font-bold text-[#A0A2A4] text-md'>
								{data.location}
							</div>
						</div>
						<Button
							auto
							light
							size='md'
							className='!bg-[#141414] !text-white !w-fit !rounded-3xl'
						>
							Apply
						</Button>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default JobCard;
