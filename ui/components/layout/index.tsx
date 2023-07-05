import React from 'react';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import NavBar from '../navbar';
import { zkTalentsPublicKey } from '@/config';
import { Talents } from '@envoy1084/zktalents';
import { POLYBASE_NAMESPACE } from '@/config';
import { PolybaseProvider } from '@polybase/react';
import { Polybase } from '@polybase/client';
import { IAuth } from '@/types';
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

export const AuthContext = React.createContext<{
	auth: IAuth;
	setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}>({
	auth: {},
	setAuth: () => {},
});

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
	const [auth, setAuth] = React.useState<IAuth>({});

	React.useEffect(() => {
		const getUserData = async () => {
			await fetch('/api/getUserData', {
				method: 'GET',
				headers: {
					authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					setAuth({ githubLogin: data.login });
				});
		};
		if (localStorage.getItem('accessToken') !== null) getUserData();
	}, []);

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
				<AuthContext.Provider value={{ auth, setAuth }}>
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
				</AuthContext.Provider>
			</MinaContext.Provider>
		</ThirdwebProvider>
	);
};

export default Layout;
