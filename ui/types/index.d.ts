export type ZoneTypes =
	| 'all'
	| 'asia'
	| 'europe'
	| 'north america'
	| 'south america'
	| 'africa'
	| 'australia';

export type ExperienceTypes = 'intern' | 'fresher' | 'experienced' | 'expert';

export type SalaryTypes =
	| 'all'
	| '0-50k'
	| '50-100k'
	| '100-150k'
	| '150-200k'
	| '200k+';

export type GithubConfig = {
	minimumPullRequests?: string;
	createdBefore?: string;
};

export interface IAuth {
	githubLogin?: string;
}

import ZkappWorkerClient from '@/pages/zkappWorkerClient';
import { Field } from 'snarkyjs';

export interface zkTalentsContextState {
	zkappWorkerClient: ZkappWorkerClient | null;
	hasBeenSetup: boolean;
	currentTalentCounter: Field | null;
	creatingTransaction: boolean;
}
