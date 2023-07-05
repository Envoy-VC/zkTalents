export {};

function loadCOIServiceWorker() {
	if (typeof window !== 'undefined') {
		const coi = window.document.createElement('script');
		coi.setAttribute('src', '/coi-serviceworker.min.js');
		window.document.head.appendChild(coi);
	}
}

loadCOIServiceWorker();
