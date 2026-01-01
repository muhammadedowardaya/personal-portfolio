import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// header-navigation animation ============================

const headerNavMenuSelector = ['.navbar', '.toggle-menu__text'];

ScrollTrigger.create({
	trigger: '.about-me article',
	start: 'top top',
	end: 'bottom top',
	scrub: true,
	onEnter: () => {
		gsap.to(headerNavMenuSelector, {
			color: '#f7f7f7',
		})
	},
	onLeave: () => {
		gsap.to(headerNavMenuSelector, {
			color: '#101010',
		})
	},
	onEnterBack: () => {
		gsap.to(headerNavMenuSelector, {
			color: '#f7f7f7',
		})
	},
	onLeaveBack: () => {
		gsap.to(headerNavMenuSelector, {
			color: '#101010',
		})
	},
})

// primary navigation mobile toggle =======================

window.addEventListener('DOMContentLoaded', () => {
	// Menu Button
	const toggleMenuButton = document.getElementById('toggle-menu__button');
	const primaryNavigation = document.getElementById('primary-navigation');
	const toggleMenuText = document.querySelector('.toggle-menu__text');

	const menuTl = gsap.timeline({
		defaults: {
			duration: 0.5,
			ease: 'power1.inOut'
		}
	});

	const toggleMenuTextTl = gsap.timeline({
		defaults: {
			ease: 'power1.inOut'
		}
	});

	toggleMenuButton?.addEventListener('click', () => {

		const isOpen = toggleMenuButton.getAttribute('aria-expanded') === 'true';
		console.info(`isOpen = ${isOpen}`);

		if (isOpen) {
			menuTl.to(primaryNavigation, {
				top: "100%",
			});
			toggleMenuButton.setAttribute('aria-expanded', 'false');
		} else {
			console.info('buka menu')
			menuTl.to(primaryNavigation, {
				top: "0%",
			});
			toggleMenuButton.setAttribute('aria-expanded', 'true');
		}

		console.info(`aria-expanded = ${toggleMenuButton.getAttribute('aria-expanded')}`);
	});

});