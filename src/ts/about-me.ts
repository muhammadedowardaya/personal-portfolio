import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutMeTl = gsap.timeline({
   // yes, we can add it to an entire timeline!
   scrollTrigger: {
      trigger: '.about-me header',
      pin: false, // pin the trigger element while active
      start: 'center bottom', // when the top of the trigger hits the top of the viewport
      end: '+=400', // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
   },
});

const aboutMeTextSplit = SplitText.create(".about-me h2", {
   type: "chars"
})

aboutMeTl.from(aboutMeTextSplit.chars, {
   y: -100,
   autoAlpha: 0,
   stagger: {
      from: "center",
      amount: 0.5
   },
})

// about-me__description ============================

const aboutMeDescriptionTl = gsap.timeline({
   // yes, we can add it to an entire timeline!
   scrollTrigger: {
      trigger: '.about-me article',
      pin: false, // pin the trigger element while active
      start: 'top bottom', // when the top of the trigger hits the top of the viewport
      end: 'bottom center', // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      markers: true
   },
})

const aboutMeDescriptionTextSplit = SplitText.create(".about-me__description", {
   type: "words"
})

aboutMeDescriptionTl.from(aboutMeDescriptionTextSplit.words, {
   y: -100,
   autoAlpha: 0,
   stagger: 1
});

gsap.from('.about-me img', {
   x: -100,
   autoAlpha: 0,
   scrollTrigger: {
      trigger: '.about-me img',
      pin: false, // pin the trigger element while active
      start: 'top bottom', // when the top of the trigger hits the top of the viewport
      end: 'bottom center', // end after scrolling 500px beyond the start
      scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
   },
});