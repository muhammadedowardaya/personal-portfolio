import { Application } from "pixi.js";
import { Scene } from "./Scene";

export class SceneManager {
   private static app: Application;
   private static currentScene: Scene;

   static init(app: Application) {
      this.app = app;
   }

   static changeScene(scene: Scene) {
      if (this.currentScene) {
         this.currentScene.onExit();
         this.currentScene.destroy({ children: true });
         this.app.stage.removeChild(this.currentScene);
      }

      this.currentScene = scene;
      this.app.stage.addChild(scene);
      scene.onEnter();
   }

   static update(delta: number) {
      this.currentScene?.update(delta);
   }
}