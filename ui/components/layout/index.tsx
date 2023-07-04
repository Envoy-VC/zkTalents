import React from 'react';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import NavBar from '../navbar';

const lightTheme = createTheme({
	type: 'light',
});

interface Props {
	children: React.ReactNode;
}

export const ZKTalentContext = React.createContext({});
export const MinaContext = React.createContext<{
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
}>({
	address: '',
	setAddress: () => {},
});

const Layout = ({ children }: Props) => {
	const [address, setAddress] = React.useState<string>('');
	React.useEffect(() => {
		(async () => {
			const { Mina, PublicKey } = await import('snarkyjs');
			const { Talents } = await import('../../build/src/index.js');
		})();
	}, []);

	return (
		<MinaContext.Provider value={{ address, setAddress }}>
			<ZKTalentContext.Provider value={{}}>
				<NextUIProvider theme={lightTheme}>
					<>
						<NavBar />
						{children}
					</>
				</NextUIProvider>
			</ZKTalentContext.Provider>
		</MinaContext.Provider>
	);
};

export default Layout;
