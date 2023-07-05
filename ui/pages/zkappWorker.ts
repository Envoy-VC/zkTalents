import { Mina, PublicKey, Field, Signature, fetchAccount } from 'snarkyjs';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { Talents } from '@envoy1084/zktalents';

const state = {
	Talents: null as null | typeof Talents,
	zkapp: null as null | Talents,
	transaction: null as null | Transaction,
};

// ---------------------------------------------------------------------------------------

const functions = {
	setActiveInstanceToBerkeley: async (args: {}) => {
		const Berkeley = Mina.Network(
			'https://proxy.berkeley.minaexplorer.com/graphql'
		);
		Mina.setActiveInstance(Berkeley);
		console.log('set.');
	},
	loadContract: async (args: {}) => {
		const { Talents } = await import('@envoy1084/zktalents');
		console.log('loaded.');
		state.Talents = Talents;
	},
	compileContract: async (args: {}) => {
		await state.Talents!.compile();
	},
	fetchAccount: async (args: { publicKey58: string }) => {
		const publicKey = PublicKey.fromBase58(args.publicKey58);
		return await fetchAccount({ publicKey });
	},
	initZkappInstance: async (args: { publicKey58: string }) => {
		const publicKey = PublicKey.fromBase58(args.publicKey58);
		state.zkapp = new state.Talents!(publicKey);
	},
	getTalentCounter: async (args: {}) => {
		const currentCounter = await state.zkapp!.talentCounter.get();
		return JSON.stringify(currentCounter.toJSON());
	},
	createTalentTransaction: async (args: { sender: PublicKey }) => {
		const transaction = await Mina.transaction(args.sender, () => {
			state.zkapp!.addTalent();
		});
		state.transaction = transaction;
	},
	createApplyToTalentTransaction: async (args: {
		sender: PublicKey;
		pb: PublicKey;
		eligible: Field;
		signature: Signature;
	}) => {
		const transaction = await Mina.transaction(args.sender, () => {
			state.zkapp!.applyToTalent(args.pb, args.eligible, args.signature);
		});
		state.transaction = transaction;
	},
	proveUpdateTransaction: async (args: {}) => {
		await state.transaction!.prove();
	},
	getTransactionJSON: async (args: {}) => {
		return state.transaction!.toJSON();
	},
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
	id: number;
	fn: WorkerFunctions;
	args: any;
};

export type ZkappWorkerReponse = {
	id: number;
	data: any;
};
if (typeof window !== 'undefined') {
	addEventListener(
		'message',
		async (event: MessageEvent<ZkappWorkerRequest>) => {
			const returnData = await functions[event.data.fn](event.data.args);

			const message: ZkappWorkerReponse = {
				id: event.data.id,
				data: returnData,
			};
			postMessage(message);
		}
	);
}

export default ZkappWorkerReponse;
