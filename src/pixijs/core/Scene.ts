import { Container, DestroyOptions } from "pixi.js";

export abstract class Scene extends Container {
   onEnter(): void { }
   onExit(): void { }

   abstract update(delta: number): void;

   destroy(options?: DestroyOptions | boolean): void {
      this.onExit();
      super.destroy(options);
   }
}
