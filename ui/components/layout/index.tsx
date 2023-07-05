import React from 'react';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import NavBar from '../navbar';
import { zkTalentsPublicKey } from '@/config';
import { Field, PublicKey } from 'snarkyjs';
import { POLYBASE_NAMESPACE } from '@/config';
import { PolybaseProvider } from '@polybase/react';
import { Polybase } from '@polybase/client';
import { IAuth } from '@/types';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { zkTalentsContextState } from '@/types';

import '../../pages/reactCOIServiceWorker';

import ZkappWorkerClient from '@/pages/zkappWorkerClient';

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
	state?: zkTalentsContextState;
	setState?: React.Dispatch<React.SetStateAction<zkTalentsContextState>>;
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
	let [state, setState] = React.useState<zkTalentsContextState>({
		zkappWorkerClient: null as null | ZkappWorkerClient,
		hasBeenSetup: false,
		currentTalentCounter: null as null | Field,
		creatingTransaction: false,
	});
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
		async function timeout(seconds: number): Promise<void> {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, seconds * 1000);
			});
		}

		(async () => {
			if (!state.hasBeenSetup) {
				try {
					console.log('Initializing worker client.');
					const zkappWorkerClient = new ZkappWorkerClient();

					await timeout(5);

					console.log('Switching to Berkeley...');
					await zkappWorkerClient.setActiveInstanceToBerkeley();
					console.log('Loading contract...');
					await zkappWorkerClient.loadContract();
					console.log('Compiling contract...');
					await zkappWorkerClient.compileContract();
					console.log('zkApp compiled');
					const zkappPublicKey = PublicKey.fromBase58(zkTalentsPublicKey);
					console.log('Initializing zkapp instance...');
					await zkappWorkerClient.initZkappInstance(zkappPublicKey);
					console.log('getting zkApp state...');
					await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey });
					const currentTalentCounter =
						await zkappWorkerClient.getTalentCounter();
					console.log('currentTalentCounter', currentTalentCounter.toString());

					setState({
						...state,
						zkappWorkerClient,
						hasBeenSetup: true,
						currentTalentCounter,
					});
				} catch (error) {
					console.log(error);
				} finally {
					console.log('exit');
				}
			}
		})();
	}, []);

	return (
		<ThirdwebProvider theme='light'>
			<MinaContext.Provider value={{ address, setAddress }}>
				<AuthContext.Provider value={{ auth, setAuth }}>
					<ZKTalentContext.Provider value={{ state, setState }}>
						<PolybaseProvider polybase={polybase}>
							<NextUIProvider theme={lightTheme}>
								{state.hasBeenSetup ? (
									<>
										<NavBar />
										{children}
									</>
								) : (
									<div>loading...</div>
								)}
							</NextUIProvider>
						</PolybaseProvider>
					</ZKTalentContext.Provider>
				</AuthContext.Provider>
			</MinaContext.Provider>
		</ThirdwebProvider>
	);
};

export default Layout;
