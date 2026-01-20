import { AnimatedSprite, Container, Texture, Ticker } from "pixi.js";
import { AssetRegistry } from "../core/Assets";

type StickmanState = "idle" | "walk" | "fly" | "idle_to_fly" | "fly_to_idle" | "idle_to_walk" | "walk_to_idle";

function frameKey(
   state: StickmanState,
   index: number,
   pad = 4
) {
   return `${state}_${String(index).padStart(pad, "0")}`;
}

type AnimationConfig = {
   frames: number;
   loop: boolean;
   loopDelay?: number; // ms
   speed?: number
};

const ANIM_CONFIG: Record<StickmanState, AnimationConfig> = {
   idle: { frames: 18, loop: false, loopDelay: 2000 },
   walk: { frames: 14, loop: true, speed: 0.5 },
   fly: { frames: 39, loop: true, speed: 0.2 },
   idle_to_fly: { frames: 11, loop: false, speed: 0.5 },
   idle_to_walk: { frames: 6, loop: false, speed: 0.5 },
   walk_to_idle: { frames: 6, loop: false },
   fly_to_idle: { frames: 11, loop: false },
};

export class Stickman extends Container {

   private animations!: Record<StickmanState, AnimatedSprite>;
   private currentState!: StickmanState;
   private currentSprite!: AnimatedSprite;

   private loopCooldown = 0;

   constructor() {
      super();

      this.animations = {
         idle: this.createAnimation("idle", ANIM_CONFIG.idle.frames, ANIM_CONFIG.idle.loop),
         walk: this.createAnimation("walk", ANIM_CONFIG.walk.frames, ANIM_CONFIG.walk.loop),
         fly: this.createAnimation("fly", ANIM_CONFIG.fly.frames, ANIM_CONFIG.fly.loop),
         idle_to_walk: this.createAnimation("idle_to_walk", ANIM_CONFIG.idle_to_walk.frames, ANIM_CONFIG.idle_to_walk.loop),
         idle_to_fly: this.createAnimation("idle_to_fly", ANIM_CONFIG.idle_to_fly.frames, ANIM_CONFIG.idle_to_fly.loop),
         fly_to_idle: this.createAnimation("fly_to_idle", ANIM_CONFIG.fly_to_idle.frames, ANIM_CONFIG.fly_to_idle.loop),
         walk_to_idle: this.createAnimation("walk_to_idle", ANIM_CONFIG.walk_to_idle.frames, ANIM_CONFIG.walk_to_idle.loop),
      };

      this.currentState = "idle";
      this.currentSprite = this.animations.idle;
      this.addChild(this.currentSprite);
      this.currentSprite.play();
   }

   private loadAnimationTextures(prefix: StickmanState, frameCount: number): Texture[] {
      const textures = Array.from({ length: frameCount }, (_, i) => {
         return AssetRegistry.tex(frameKey(prefix, i));
      });

      return textures;
   }

   private createAnimation(
      prefix: StickmanState,
      frameCount: number,
      loop: boolean
   ): AnimatedSprite {

      const textures = this.loadAnimationTextures(prefix, frameCount);

      const animation = new AnimatedSprite(textures);
      animation.anchor.set(0.5);
      animation.loop = loop;

      return animation;
   }

   setState(next: StickmanState) {
      if (next === this.currentState) return;

      this.currentSprite.stop();
      this.removeChild(this.currentSprite);

      this.currentState = next;
      this.currentSprite = this.animations[next];

      const cfg = ANIM_CONFIG[this.currentState];
      this.loopCooldown = cfg.loopDelay ?? 0;
      this.currentSprite.animationSpeed = cfg.speed ?? 1;

      this.addChild(this.currentSprite);
      this.currentSprite.gotoAndPlay(0);
   }

   playIdle() {
      this.setState("idle");
   }

   playFly() {
      this.setState("fly");
   }

   playWalk() {
      this.setState("walk");
   }

   playIdleToFly() {
      this.setState('idle_to_fly');

      this.currentSprite.onComplete = () => {
         this.currentSprite.onComplete = undefined;
         this.playFly();
      };
   }

   playFlyToIdle() {
      this.setState('fly_to_idle');

      this.currentSprite.onComplete = () => {
         this.currentSprite.onComplete = undefined;
         this.playIdle();
      };
   }

   playIdleToWalk() {
      this.setState("idle_to_walk");

      this.currentSprite.onComplete = () => {
         this.currentSprite.onComplete = undefined;
         this.playWalk();
      };
   }

   playWalkToIdle() {
      this.setState("walk_to_idle");

      this.currentSprite.onComplete = () => {
         this.currentSprite.onComplete = undefined;
         this.playIdle();
      };

   }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   update(delta: number) {
      const cfg = ANIM_CONFIG[this.currentState];

      if (cfg.loopDelay && !this.currentSprite.playing) {
         this.loopCooldown -= Ticker.shared.deltaMS;

         if (this.loopCooldown <= 0) {
            this.currentSprite.gotoAndPlay(0);
            this.loopCooldown = cfg.loopDelay;
         }
      }
   }


}
