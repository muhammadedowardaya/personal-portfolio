import { Application } from 'pixi.js';
import { SceneManager } from './core/SceneManager';
import { AboutScene } from './scenes/AboutScene';
import { AssetRegistry } from './core/Assets';

export let app: Application;

(async () => {
   // Create a new application
   app = new Application();

   // Initialize the application
   await app.init({ background: '#1099bb', resizeTo: window });

   // Append the application canvas to the document body
   document.querySelector('#about .about-track')?.appendChild(app.canvas);

   SceneManager.init(app);
   await AssetRegistry.load();
   SceneManager.changeScene(new AboutScene());

   app.ticker.add((delta) => {
      SceneManager.update(delta as unknown as number);
   });

})();