import React from 'react';
import { Navbar, Link, Button } from '@nextui-org/react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const NavBar = () => {
	return (
		<Navbar
			variant='sticky'
			css={{ background: '#141414', backgroundColor: '#141414', color: '#fff' }}
			containerCss={{
				backgroundColor: '#141414',
			}}
			className='!text-white'
			disableBlur
			maxWidth='fluid'
		>
			<Navbar.Brand className={`${inter.className} text-xl font-semibold`}>
				zkTalents
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
