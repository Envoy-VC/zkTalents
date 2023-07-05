import React from 'react';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import NavBar from '../navbar';
import { zkTalentsPublicKey } from '@/config';
import { Talents } from '@envoy1084/zktalents';
import { POLYBASE_NAMESPACE } from '@/config';
import { PolybaseProvider } from '@polybase/react';
import { Polybase } from '@polybase/client';

import { ThirdwebProvider } from '@thirdweb-dev/react';

export const polybase = new Polybase({
	defaultNamespace: POLYBASE_NAMESPACE,
});

const lightTheme = createTheme({
	type: 'light',
});

interface Props {
	children: React.ReactNode;
}

export const ZKTalentContext = React.createContext<{
	zkTalents?: Talents;
}>({});

export const MinaContext = React.createContext<{
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
}>({
	address: '',
	setAddress: () => {},
});

const Layout = ({ children }: Props) => {
	const [address, setAddress] = React.useState<string>('');
	const [zkAppInstance, setZkAppInstance] = React.useState<Talents>();

	React.useEffect(() => {
		(async () => {
			const { Mina, PublicKey } = await import('snarkyjs');
			const { Talents } = await import('@envoy1084/zktalents');

			const zkTalents = new Talents(PublicKey.fromBase58(zkTalentsPublicKey));
			setZkAppInstance(zkTalents);
		})();
	}, []);

	return (
		<ThirdwebProvider theme='light'>
			<MinaContext.Provider value={{ address, setAddress }}>
				<ZKTalentContext.Provider value={{ zkTalents: zkAppInstance }}>
					<PolybaseProvider polybase={polybase}>
						<NextUIProvider theme={lightTheme}>
							<>
								<NavBar />
								{children}
							</>
						</NextUIProvider>
					</PolybaseProvider>
				</ZKTalentContext.Provider>
			</MinaContext.Provider>
		</ThirdwebProvider>
	);
};

export default Layout;
