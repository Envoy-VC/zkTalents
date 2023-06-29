import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { createTheme, NextUIProvider } from '@nextui-org/react';

const lightTheme = createTheme({
	type: 'light',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider>
			<Component {...pageProps} />
		</NextUIProvider>
	);
}
