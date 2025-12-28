import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
	// yes, we can add it to an entire timeline!
	scrollTrigger: {
		trigger: '.about-me header',
		pin: false, // pin the trigger element while active
		start: 'center bottom', // when the top of the trigger hits the top of the viewport
		end: '+=400', // end after scrolling 500px beyond the start
		scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
	},
});

let aboutMeTextSplit = SplitText.create(".about-me h2", {
	type: "chars"
})

tl.from(aboutMeTextSplit.chars, {
	y: -100,
	autoAlpha: 0,
	stagger: {
		from: "center",
		amount: 0.5
	},
})
