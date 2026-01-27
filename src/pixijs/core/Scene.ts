import { Container, DestroyOptions } from 'pixi.js';

export abstract class Scene extends Container {
   abstract init(): Promise<void>;
   abstract update(delta: number): void;

   onEnter(): void { }
   onExit(): void { }

   destroy(options?: DestroyOptions | boolean): void {
      super.destroy(options);
   }
}
