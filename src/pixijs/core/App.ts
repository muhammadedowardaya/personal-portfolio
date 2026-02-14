import { Application } from 'pixi.js';

export class App {
	private static _instance: App | null = null;
	public pixi!: Application;

	private constructor() {}

	static async init() {
		if (this._instance) return this._instance;

		const app = new App();
		app.pixi = new Application();

		await app.pixi.init({
			background: '#1099bb',
			resizeTo: window,
			resolution: window.devicePixelRatio,
		});

		document.querySelector('#about .about-track')?.appendChild(app.pixi.canvas);

		this._instance = app;
		return app;
	}

	static get instance(): App {
		if (!this._instance) {
			throw new Error('App belum diinisialisasi. Panggil App.init() dulu.');
		}
		return this._instance;
	}
}
