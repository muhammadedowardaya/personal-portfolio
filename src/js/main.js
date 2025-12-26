window.addEventListener('DOMContentLoaded', () => {
	// Menu Button
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

	// Contact Form
	const fields = document.querySelectorAll('form.contact .field');

	fields.forEach((field) => {
		const input = field.querySelector('input');
		const textarea = field.querySelector('textarea');
		const label = field.querySelector('label');

		if (input) {
			input.addEventListener('focus', () => {
				if (label) {
					if (label.classList.contains('active') === false) {
						label.classList.add('active');
					}
				}
			});

			input.addEventListener('blur', () => {
				if (label) {
					if (input.value === '') {
						label.classList.remove('active');
					}
				}
			});
		}

		if (textarea) {
			textarea.addEventListener('focus', () => {
				if (label) {
					if (label.classList.contains('active') === false) {
						label.classList.add('active');
					}
				}
			});

			textarea.addEventListener('blur', () => {
				if (label) {
					if (textarea.value === '') {
						label.classList.remove('active');
					}
				}
			});
		}
	});
});
