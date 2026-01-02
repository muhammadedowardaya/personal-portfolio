// import gsap from 'gsap';
// import { ScrollSmoother } from 'gsap/ScrollSmoother';

const localTime = document.querySelector('.address .time');

function updateTime() {
	const now = new Date();
	localTime.textContent = now.toLocaleTimeString('id-ID', {
		minute: '2-digit',
		hour: '2-digit',
	});
}

updateTime(); // panggil langsung biar tidak nunggu 1 detik
setInterval(updateTime, 1000);

// Scroll smoooth

// gsap.registerPlugin(ScrollSmoother);

// ScrollSmoother.create({
// 	smooth: 4, // how long (in seconds) it takes to "catch up" to the native scroll position
// 	effects: true, // looks for data-speed and data-lag attributes on elements
// 	// smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
// });
