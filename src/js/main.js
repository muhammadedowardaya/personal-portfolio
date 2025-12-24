window.addEventListener('DOMContentLoaded', () => {
	const menuButton = document.getElementById('menu-button');
	const primaryNavigation = document.getElementById('primary-navigation');

	menuButton.addEventListener('click', () => {
		console.info('click');
		if (primaryNavigation.classList.contains('hidden')) {
			primaryNavigation.classList.remove('hidden');
			menuButton.setAttribute('aria-expanded', 'true');
		} else {
			primaryNavigation.classList.add('hidden');
			menuButton.setAttribute('aria-expanded', 'false');
		}
	});
});
