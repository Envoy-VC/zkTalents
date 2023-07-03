/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./sections/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				orkneyLight: ['OrkneyLight', 'sans-serif'],
				orkneyRegular: ['OrkneyRegular', 'sans-serif'],
				orkneyMedium: ['OrkneyMedium', 'sans-serif'],
				orkneyBold: ['OrkneyBold', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
