import gsap from 'gsap';

import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// header-navigation animation ============================

const changeNavMenuColor = (color: string) => {
	const headerNavMenuSelector = ['.navbar', '.toggle-menu__text'];
	const toggleMenuButton = document.getElementById('toggle-menu__button');
	const isOpen = toggleMenuButton?.getAttribute('aria-expanded') === 'true';

	if (isOpen) return;

	gsap.to(headerNavMenuSelector, {
		color: color,
		duration: 0.1,
	});
};

ScrollTrigger.create({
	trigger: '.about-me article',
	start: 'top top',
	end: 'bottom top',
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

// primary navigation mobile toggle =======================

window.addEventListener('DOMContentLoaded', () => {
	// Menu Button
	const toggleMenuButton = document.getElementById('toggle-menu__button');
	const primaryNavigation = document.getElementById('primary-navigation');
	const navItems = document.querySelectorAll('#primary-navigation ul li a');

	const changeMenuTo = (condition: 'open' | 'close', onComplete?: () => void) => {
		const toggleMenuText = document.querySelector('.toggle-menu__text');

		const menuTl = gsap.timeline({
			defaults: {
				duration: 0.5,
				ease: 'power1.inOut'
			}
		});

		const toggleMenuTextTl = gsap.timeline({
			defaults: {
				ease: 'power1.inOut',
			}
		});

		menuTl.to(primaryNavigation, {
			top: condition === 'open' ? "0%" : "100%",
			onComplete: () => {
				if (onComplete) onComplete();
			},
		});
		toggleMenuButton?.setAttribute('aria-expanded', condition === 'open' ? 'true' : 'false');
		toggleMenuTextTl.to(toggleMenuText, {
			fontSize: '0px',
			padding: 0,
			onComplete: () => {
				if (toggleMenuText) {
					toggleMenuText.textContent = condition === 'open' ? 'CLOSE' : 'MENU';
				}
			}
		}).to(toggleMenuText, {
			fontSize: '16px',
			padding: '0px 4px',
			delay: 0.3
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

	navItems.forEach((item) => {
		console.info('navItem');

		item.addEventListener('click', (e) => {
			e.preventDefault();

			const target = item.getAttribute('href');

			changeMenuTo('close', () => {
				gsap.to(window, {
					scrollTo: {
						y: `${target}`,
						offsetY: 50
					},
					duration: 1,
					ease: 'power1.inOut',
					delay: 0.2
				});
			});
		});
	});

});