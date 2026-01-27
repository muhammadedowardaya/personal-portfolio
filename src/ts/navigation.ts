import gsap from 'gsap';

import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// header-navigation animation ============================

const changeNavMenuColor = (color: string) => {
	const headerNavMenuSelector = [
		'.navbar',
		'.toggle-menu__text',
		'#primary-navigation ul li',
	];
	const toggleMenuButton = document.getElementById('toggle-menu__button');
	const isOpen = toggleMenuButton?.getAttribute('aria-expanded') === 'true';

	if (isOpen) return;

	gsap.to(headerNavMenuSelector, {
		color: color,
		duration: 0.1,
	});
};

// create
// const mm = gsap.matchMedia();

// add a media query. When it matches, the associated function will run
// mm.add('(min-width: 768px)', () => {
ScrollTrigger.create({
	trigger: '#about > article:has(div)',
	start: 'top-=40px top',
	end: 'bottom-=40px top',
	scrub: true,
	onEnter: () => {
		changeNavMenuColor('#f7f7f7');
	},
	onLeave: () => {
		changeNavMenuColor('#101010');
	},
	onEnterBack: () => {
		changeNavMenuColor('#f7f7f7');
	},
	onLeaveBack: () => {
		changeNavMenuColor('#101010');
	},
});
// });

// primary navigation mobile toggle =======================

window.addEventListener('DOMContentLoaded', () => {
	// Menu Button
	const toggleMenuButton = document.getElementById('toggle-menu__button');
	const primaryNavigation = document.getElementById(
		'primary-mobile-navigation',
	);
	const navPrimaryMobileItems = document.querySelectorAll(
		'#primary-mobile-navigation ul li a',
	);
	const navPrimaryDesktopItems = document.querySelectorAll(
		'#primary-desktop-navigation ul li a',
	);

	const changeMenuTo = (
		condition: 'open' | 'close',
		onComplete?: () => void,
	) => {
		const toggleMenuText = document.querySelector('.toggle-menu__text');

		const menuTl = gsap.timeline({
			defaults: {
				duration: 0.5,
				ease: 'power1.inOut',
			},
		});

		const toggleMenuTextTl = gsap.timeline({
			defaults: {
				ease: 'power1.inOut',
			},
		});

		menuTl.to(primaryNavigation, {
			top: condition === 'open' ? '0%' : '100%',
			onComplete: () => {
				if (onComplete) onComplete();
			},
		});
		toggleMenuButton?.setAttribute(
			'aria-expanded',
			condition === 'open' ? 'true' : 'false',
		);
		toggleMenuTextTl
			.to(toggleMenuText, {
				fontSize: '0px',
				padding: 0,
				onComplete: () => {
					if (toggleMenuText) {
						toggleMenuText.textContent =
							condition === 'open' ? 'CLOSE' : 'MENU';
					}
				},
			})
			.to(toggleMenuText, {
				fontSize: '16px',
				padding: '0px 4px',
				delay: 0.3,
			});

		return menuTl;
	};

	toggleMenuButton?.addEventListener('click', () => {
		const isOpen = toggleMenuButton.getAttribute('aria-expanded') === 'true';

		if (isOpen) {
			changeMenuTo('close');
		} else {
			changeMenuTo('open');
		}
	});

	// Primary Navigation
	navPrimaryMobileItems.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();

			const scrollAnimateWithDelay = (target: string, delay: number) => {
				gsap.to(window, {
					scrollTo: {
						y: `${target}`,
						offsetY: 50,
					},
					duration: 1,
					ease: 'power1.inOut',
					delay: delay,
				});
			};

			const target = item.getAttribute('href');

			if (window.innerWidth >= 768) {
				scrollAnimateWithDelay(`${target}`, 0);
			} else {
				changeMenuTo('close', () => {
					scrollAnimateWithDelay(`${target}`, 0.2);
				});
			}
		});
	});

	navPrimaryDesktopItems.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();

			const target = item.getAttribute('href');
			gsap.to(window, {
				scrollTo: {
					y: `${target}`,
					offsetY: 50,
				},
				duration: 1,
				ease: 'power1.inOut',
			});
		});
	});

	// Footer Navigation
	const footerNavItems = document.querySelectorAll('footer nav ul li a');

	footerNavItems.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();

			const target = item.getAttribute('href');

			gsap.to(window, {
				scrollTo: {
					y: `${target}`,
					offsetY: 50,
				},
				duration: 1,
				ease: 'power1.inOut',
				delay: 0.2,
			});
		});
	});
});
