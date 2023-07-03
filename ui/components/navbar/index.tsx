import React from 'react';
import { Navbar, Link, Button } from '@nextui-org/react';

const NavBar = () => {
	return (
		<Navbar
			variant='sticky'
			css={{ color: '#fff' }}
			containerCss={{
				backgroundColor: '#141414',
			}}
			disableBlur
			maxWidth='fluid'
		>
			<Navbar.Brand>
				<p className='text-2xl font-bold tracking-wide orkneyMedium'>
					zkTalents
				</p>
			</Navbar.Brand>
			<Navbar.Content
				activeColor='neutral'
				hideIn='xs'
				variant='underline'
				underlineHeight='bold'
			>
				<Navbar.Link isActive href='#'>
					Find Job
				</Navbar.Link>
				<Navbar.Link href='#'>Messages</Navbar.Link>
				<Navbar.Link href='#'>Hiring</Navbar.Link>
				<Navbar.Link href='#'>Community</Navbar.Link>
			</Navbar.Content>
			<Navbar.Content>
				<Button
					auto
					size='md'
					color='primary'
					href='#'
					className='bg-[#0072F5] text-[1rem]'
				>
					Sign Up
				</Button>
			</Navbar.Content>
		</Navbar>
	);
};

export default NavBar;
