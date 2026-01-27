import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene } from '../core/Scene';
import { AboutWorld } from '../worlds/AboutWorld';
import { StickmanController } from '../entities/StickmanController';
import { Application } from 'pixi.js';

gsap.registerPlugin(ScrollTrigger);

export class AboutScene extends Scene {
   private world!: AboutWorld;
   private stickmanController!: StickmanController;
   private cameraX = 0;

   private app: Application;

   private textTriggers = [
      { class: '.text-1', triggerPoint: 500, distance: 500, visible: false },
      { class: '.text-2', triggerPoint: 1500, distance: 500, visible: false },
      { class: '.text-3', triggerPoint: 2500, distance: 700, visible: false },
      { class: '.text-4', triggerPoint: 3500, distance: 700, visible: false },
      { class: '.text-5', triggerPoint: 4500, distance: 700, visible: false },
      { class: '.text-6', triggerPoint: 5500, distance: 700, visible: false },
      { class: '.text-7', triggerPoint: 6500, distance: 700, visible: false },
      { class: '.text-8', triggerPoint: 7500, distance: 700, visible: false },
      { class: '.text-9', triggerPoint: 8500, distance: 700, visible: false },
   ];

   constructor(app: Application) {
      super();

      this.app = app;
   }

   async init() {
      this.world = new AboutWorld(this.app);
      this.addChild(this.world);

      const app = this.app;

      this.stickmanController = new StickmanController();
      this.stickmanController.x = app.renderer.screen.width / 2;
      this.stickmanController.y = app.renderer.screen.height / 2 + 200;
      this.stickmanController.scale.set(0.5);
      this.stickmanController.onMoveStateChange = (state) => {
         if (state === 0) {
            if (this.stickmanController.lastState === -1) {
               this.world.onStickmanFlyToIdle();
            } else if (this.stickmanController.lastState === 1) {
               this.world.onStickmanWalkToIdle();
            }
         } else if (state === -1) {
            this.world.onStickmanFly();
         } else {
            this.world.onStickmanWalk();
         }
      };

      this.addChild(this.stickmanController);
   }

   private updateTriggerText() {
      const x = this.cameraX; // PENTING

      for (const trigger of this.textTriggers) {
         const el = document.querySelector(trigger.class);
         if (!el) continue;

         const start = trigger.triggerPoint;
         const end = start + trigger.distance;
         const inRange = x >= start && x < end;

         // MASUK RANGE
         if (inRange && !trigger.visible) {
            trigger.visible = true;
            gsap.to(trigger.class, {
               autoAlpha: 1,
               duration: 0.8,
               overwrite: true,
               onStart: () => {
                  gsap.to(trigger.class, {
                     display: 'block',
                  });
               },
            });
         }

         // KELUAR RANGE
         if (!inRange && trigger.visible) {
            trigger.visible = false;
            gsap.to(trigger.class, {
               autoAlpha: 0,
               duration: 0.4,
               overwrite: true,
               onComplete: () => {
                  gsap.to(trigger.class, {
                     display: 'none',
                  });
               },
            });
         }

         // Khusus gerbang sekolah
         if (this.textTriggers[6].visible) {
            this.world.gerbangSdn.setState('buka_gerbang');
         } else {
            this.world.gerbangSdn.setState('tutup_gerbang');
         }
      }
   }

   update(delta: number) {
      this.world.update(delta);

      const speed = 10; // px / second

      if (this.stickmanController.moveState === -1 && this.cameraX > 0) {
         this.cameraX -= 1 * (speed * 2);
         this.world.setCameraX(this.cameraX);
         this.updateTriggerText();
      }

      if (
         this.stickmanController.moveState === 1 &&
         this.cameraX < this.world.width
      ) {
         this.cameraX += 1 * speed;
         this.world.setCameraX(this.cameraX);
         this.updateTriggerText();
      }
   }
}
