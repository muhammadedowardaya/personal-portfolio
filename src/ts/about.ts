import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// create
// const mm = gsap.matchMedia();

// add a media query. When it matches, the associated function will run
// mm.add("(max-width: 768px)", () => {

// this setup code only runs when viewport is at least 800px wide
const aboutMeTl = gsap.timeline({
   // yes, we can add it to an entire timeline!
   scrollTrigger: {
      trigger: '#about header',
      pin: false, // pin the trigger element while active
      start: 'center bottom', // when the top of the trigger hits the top of the viewport
      end: '+=400', // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
   },
});

const aboutMeTextSplit = SplitText.create('#about h2', {
   type: 'chars',
});

aboutMeTl.from(aboutMeTextSplit.chars, {
   y: -100,
   autoAlpha: 0,
   stagger: {
      from: 'center',
      amount: 0.5,
   },
});

// about-me__description ============================

const aboutMeDescriptionTl = gsap.timeline({
   // yes, we can add it to an entire timeline!
   scrollTrigger: {
      trigger: '#about article',
      pin: false, // pin the trigger element while active
      start: 'top bottom', // when the top of the trigger hits the top of the viewport
      end: 'bottom center', // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
   },
});

const aboutMeDescriptionTextSplit = SplitText.create(
   '.about-me__description p',
   {
      type: 'words',
   },
);

aboutMeDescriptionTl.from(aboutMeDescriptionTextSplit.words, {
   // y: -100,
   autoAlpha: 0,
   stagger: 1,
});

gsap.from('#about .about-me__description > img', {
   autoAlpha: 0,
   translateY: -100,
   scrollTrigger: {
      trigger: '#about .about-me__description > img',
      pin: false, // pin the trigger element while active
      start: 'top center', // when the top of the trigger hits the top of the viewport
      end: 'bottom center', // end after scrolling 500px beyond the start
      scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
   },
   stagger: 2.5,
   duration: 2,
});

//    return () => { // optional
//       // custom cleanup code here (runs when it STOPS matching)
//    };
// });
