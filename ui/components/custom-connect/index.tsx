import React from 'react';
import { Button, Dropdown, Avatar } from '@nextui-org/react';

import { Notification, Setting } from 'react-iconly';

import { MinaContext } from '../layout';

const CustomConnect = () => {
	const { address, setAddress } = React.useContext(MinaContext);

	const handleConnect = async () => {
		try {
			let addresses = await (window as any).mina.requestAccounts();
			setAddress(addresses[0]);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='flex flex-row items-center gap-2 font-orkneyRegular'>
			{!address ? (
				<Button
					auto
					size='md'
					color='primary'
					href='#'
					className='bg-[#0072F5] text-[1rem]'
					onPress={handleConnect}
				>
					Sign Up
				</Button>
			) : (
				<Dropdown placement='bottom-right'>
					<Dropdown.Trigger>
						<Avatar
							as='button'
							color='secondary'
							size='lg'
							text={address!.slice(0, 3)}
							crossOrigin='anonymous'
						/>
					</Dropdown.Trigger>
					<Dropdown.Menu
						aria-label='User menu actions'
						css={{ color: '#373737' }}
						onAction={(actionKey) => console.log(actionKey)}
					>
						<Dropdown.Item key='none' className='h-12 py-8'>
							<div className='flex font-bold'>Signed in as</div>
							<div className='flex font-bold'>
								{address!.slice(0, 10) + '...' + address!.slice(45)}
							</div>
						</Dropdown.Item>
						<Dropdown.Item key='find'>Find Job</Dropdown.Item>
						<Dropdown.Item key='messages'>Messages</Dropdown.Item>
						<Dropdown.Item key='hire'>Hiring</Dropdown.Item>
						<Dropdown.Item key='community'>Community</Dropdown.Item>
						<Dropdown.Item key='dashboard'>Dashboard</Dropdown.Item>
						<Dropdown.Item key='logout' withDivider color='error'>
							Logout
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			)}
			{address && (
				<div className='flex flex-row gap-2'>
					<Button
						light
						auto
						className='!rounded-full w-fit !border-[#373737]'
						bordered
						icon={<Notification set='light' primaryColor='#8D8D8D' size={26} />}
					></Button>
					<Button
						light
						auto
						className='!rounded-full w-fit !border-[#373737]'
						bordered
						icon={<Setting set='light' primaryColor='#8D8D8D' size={26} />}
					></Button>
				</div>
			)}
		</div>
	);
};

export default CustomConnect;
