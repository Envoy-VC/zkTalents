import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { createTheme, NextUIProvider } from '@nextui-org/react';

const lightTheme = createTheme({
	type: 'light',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider theme={lightTheme}>
			<Component {...pageProps} />
		</NextUIProvider>
	);
}
