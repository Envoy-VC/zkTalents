import { useEffect } from 'react';
import { NavBar, Toolbar } from '@/components';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	useEffect(() => {
		(async () => {
			const { Mina, PublicKey } = await import('snarkyjs');
			const { Add } = await import('../../contracts/build/src/');

			// Update this to use the address (public key) for your zkApp account.
			// To try it out, you can try this address for an example "Add" smart contract that we've deployed to
			// Berkeley Testnet B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA.
			const zkAppAddress =
				'B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA';
			// This should be removed once the zkAppAddress is updated.
			if (!zkAppAddress) {
				console.error(
					'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qkwohsqTBPsvhYE8cPZSpzJMgoKn4i1LQRuBAtVXWpaT4dgH6WoA'
				);
			}
			//const zkApp = new Add(PublicKey.fromBase58(zkAppAddress))
		})();
	}, []);

	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<Toolbar />
		</main>
	);
}
