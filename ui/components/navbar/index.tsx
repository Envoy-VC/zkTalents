import React from 'react';
import { Navbar, Image } from '@nextui-org/react';
import CustomConnect from '../custom-connect';
import { useRouter } from 'next/navigation';
import logo from '../../public/logo.png';

export type NavBarItems = 'find' | 'messages' | 'hire' | 'community';

const NavBar = () => {
	const router = useRouter();
	const [activeTab, setActiveTab] = React.useState<NavBarItems>('find');

	const handleChangeTab = (tab: NavBarItems) => {
		setActiveTab(tab);
		if (tab === 'find') router.push('/');
		else if (tab === 'hire') router.push('/hire');
	};

	return (
		<Navbar
			variant='sticky'
			css={{ color: '#fff' }}
			containerCss={{
				backgroundColor: '#141414',
			}}
			disableBlur
			maxWidth='fluid'
			className='font-orkneyRegular'
		>
			<Navbar.Brand>
				<div className='flex flex-row items-center justify-start w-full p-8 px-8 sm:px-12'>
					<div>
						<Image
							src={logo.src}
							alt='zkTalents Logo'
							width={36}
							height={36}
							className='!w-[28px] !h-[28px] sm:!w-[32px] sm:!h-[32px]'
						/>
					</div>
					<div className='mx-2 text-[1rem] sm:text-[1.35rem] tracking-wide font-bold font-orkneyMedium'>
						zkTalents
					</div>
				</div>
			</Navbar.Brand>
			<Navbar.Content
				activeColor='neutral'
				hideIn='md'
				variant='underline'
				underlineHeight='bold'
				className='font-orkneyRegular'
			>
				<Navbar.Link
					isActive={activeTab === 'find'}
					onPress={() => handleChangeTab('find')}
				>
					Find Job
				</Navbar.Link>
				<Navbar.Link
					isActive={activeTab === 'messages'}
					onPress={() => handleChangeTab('messages')}
				>
					Messages
				</Navbar.Link>
				<Navbar.Link
					isActive={activeTab === 'hire'}
					onPress={() => handleChangeTab('hire')}
				>
					Hiring
				</Navbar.Link>
				<Navbar.Link
					isActive={activeTab === 'community'}
					onPress={() => handleChangeTab('community')}
				>
					Community
				</Navbar.Link>
			</Navbar.Content>
			<Navbar.Content>
				<CustomConnect />
			</Navbar.Content>
		</Navbar>
	);
};

export default NavBar;
