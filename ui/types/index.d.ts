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
	name: 'github';
	minimumPullRequests: string;
	createdBefore: string;
};

export type GitcoinPassportConfig = {
	name: 'gitcoin-passport';
	threshold: string;
};

export type RequirementsConfig = GitcoinPassportConfig | GithubConfig;
