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
