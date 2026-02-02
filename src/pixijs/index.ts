import { SceneManager } from './core/SceneManager';
import { AboutScene } from './scenes/AboutScene';
import { AssetRegistry } from './core/Assets';
import { App } from './core/App';

(async () => {
   // Initialize the application
   await App.init();
   const app = App.instance.pixi;

   // Append the application canvas to the document body

   SceneManager.init(app);
   await AssetRegistry.load();

   const scene = new AboutScene(app);
   await scene.init();

   SceneManager.changeScene(scene);

   app.ticker.add((delta) => {
      SceneManager.update(delta as unknown as number);
   });
})();
