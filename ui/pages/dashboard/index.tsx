import React from 'react';
import type { ReactElement } from 'react';
import NestedLayout from '@/components/layout/nested-layout';

import { MinaContext } from '@/components/layout';
import { usePolybase, useDocument } from '@polybase/react';
import { useStorage, ConnectWallet, useAddress } from '@thirdweb-dev/react';

import { Input, Button, Avatar, Loading } from '@nextui-org/react';
import { GitHubIcon } from '@/components/icons';
import { Upload, Edit } from 'react-iconly';
import { GITHUB_CLIENT_ID } from '@/config';

import type { NextPageWithLayout } from '../_app';
import { Layout } from '@/components';

const Dashboard: NextPageWithLayout = () => {
	const { address: minaAddress } = React.useContext(MinaContext);
	const address = useAddress();
	const storage = useStorage();

	const [rerender, setRerender] = React.useState<boolean>(false);
	const [username, setUsername] = React.useState<string>();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const polybase = usePolybase();
	const { data, error, loading } = useDocument(
		polybase.collection('User').record(minaAddress)
	);

	const [profile, setProfile] = React.useState<{
		name?: string;
		avatar?: string;
	}>({
		name: data?.data.name || '',
		avatar: data?.data.avatar,
	});

	const loginWithGithub = () => {
		window.location.assign(
			'https://github.com/login/oauth/authorize?client_id=' + GITHUB_CLIENT_ID
		);
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setIsLoading(true);
			const file = e.target.files![0];
			const uri = await storage!.upload(file, { uploadWithoutDirectory: true });
			setProfile({
				...profile,
				avatar: 'https://ipfs.io/ipfs/' + uri.split('ipfs://')[1],
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const createAccount = async () => {
		try {
			if (!minaAddress) {
				alert('Please connect your mina wallet');
				return;
			}
			const res = await polybase.collection('User').create([minaAddress!]);
		} catch (error) {
			console.log(error);
		}
	};

	const updateDetails = async () => {
		try {
			setIsLoading(true);
			const res = await polybase
				.collection('User')
				.record(minaAddress!)
				.call('updateUser', [
					profile.name ? profile.name : data?.data.name,
					profile.avatar ? profile.avatar : data?.data.avatar,
				]);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const codeParam = urlParams.get('code');
		console.log(codeParam);

		if (codeParam && localStorage.getItem('accessToken') === null) {
			async function getAccessToken() {
				await fetch('/api/getAccessToken?code=' + codeParam, {
					method: 'GET',
				})
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						console.log(data);
						if (data.access_token) {
							localStorage.setItem('accessToken', data.access_token);
							setRerender(!rerender);
						}
					});
			}
			getAccessToken();
		}
	}, []);

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
					setUsername(data.login);
				});
		};
		if (localStorage.getItem('accessToken') !== null) getUserData();
	}, []);

	if (!address)
		return (
			<div className='flex items-center justify-start !w-fit gap-12 mx-auto mt-24'>
				<ConnectWallet className='!bg-[#141414] !text-white' />
			</div>
		);

	if (error?.statusCode === 404) {
		return (
			<div className='flex items-center justify-start !w-fit gap-12 mx-auto mt-24'>
				<Button
					auto
					light
					size='lg'
					className='!bg-[#141414] !text-white !w-fit'
					onPress={() => createAccount()}
				>
					Create Account
				</Button>
			</div>
		);
	}

	return (
		<div className='mt-24'>
			<div className='flex flex-col items-center justify-start !w-fit gap-12 mx-auto'>
				<div className='!flex !flex-col !items-center !justify-center'>
					<Avatar
						src={
							profile.avatar
								? profile.avatar
								: data?.data.avatar ||
								  'https://nextui.org/images/card-example-3.jpeg'
						}
						className='!mb-4 !rounded-full !w-48 !h-48'
						alt='Profile Picture'
						color='primary'
						bordered
					/>
					<Button
						icon={<Upload set='bold' primaryColor='#fff' size={22} />}
						className='!bg-[#141414] !text-white !mt-4 !max-w-[200px]'
						auto
					>
						<input
							type='file'
							className='!max-w-[200px]'
							placeholder=''
							accept='image/*'
							onChange={(e) => handleFileChange(e)}
						/>
					</Button>
				</div>
				<Input
					label='Display Name'
					initialValue={data?.data.name || ''}
					placeholder='Richard Hendricks'
					required
					size='xl'
					clearable
					className='!mt-4 !min-w-[300px]'
					onChange={(e) => setProfile({ ...profile, name: e.target.value })}
				/>
				<div>
					{username ? (
						<Button
							auto
							light
							icon={<GitHubIcon size={32} />}
							size='lg'
							className='!bg-[#141414] !text-white !w-fit'
							onPress={() => {
								localStorage.removeItem('accessToken');
								setUsername('');
								setRerender(!rerender);
							}}
						>
							{username}
						</Button>
					) : (
						<Button
							auto
							light
							icon={<GitHubIcon size={32} />}
							size='lg'
							className='!bg-[#141414] !text-white !w-fit'
							onPress={loginWithGithub}
						>
							Connect GitHub
						</Button>
					)}
				</div>
				<Button
					auto
					light
					icon={!isLoading && <Edit set='bold' primaryColor='#fff' size={32} />}
					disabled={isLoading}
					size='lg'
					color='secondary'
					className='!bg-[#141414] !text-white !w-fit'
					onPress={() => updateDetails()}
				>
					{isLoading ? <Loading color='currentColor' size='md' /> : 'Update'}
				</Button>
			</div>
		</div>
	);
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Dashboard;
