import React from 'react';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import NavBar from '../navbar';

const lightTheme = createTheme({
	type: 'light',
});

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<NextUIProvider theme={lightTheme}>
			<>
				<NavBar />
				{children}
			</>
		</NextUIProvider>
	);
};

export default Layout;
