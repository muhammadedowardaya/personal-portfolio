import { AnimatedSprite, Container } from 'pixi.js';
import { AssetRegistry } from '../core/Assets';

type GerbangSDNState = 'buka_gerbang' | 'tutup_gerbang';

type AnimationConfig = {
   frames: number;
   loop: boolean;
   speed?: number;
};

const ANIM_CONFIG: Record<GerbangSDNState, AnimationConfig> = {
   buka_gerbang: { frames: 24, loop: false },
   tutup_gerbang: { frames: 24, loop: false },
};

function frameKey(prefix: GerbangSDNState, index: number, pad: number = 4) {
   return `${prefix}_${String(index).padStart(pad, '0')}`;
}

export class GerbangSDN extends Container {
   private animations: Record<GerbangSDNState, AnimatedSprite>;
   private currentState: GerbangSDNState;
   private currentSprite: AnimatedSprite;

   constructor() {
      super();

      this.animations = {
         buka_gerbang: this.createAnimation(
            'buka_gerbang',
            ANIM_CONFIG.buka_gerbang.frames,
            ANIM_CONFIG.buka_gerbang.loop,
         ),
         tutup_gerbang: this.createAnimation(
            'tutup_gerbang',
            ANIM_CONFIG.tutup_gerbang.frames,
            ANIM_CONFIG.tutup_gerbang.loop,
         ),
      };

      this.currentState = 'buka_gerbang';
      this.currentSprite = this.animations.buka_gerbang;
      this.addChild(this.currentSprite);
      this.currentSprite.play();
   }

   private createAnimation(
      prefix: GerbangSDNState,
      frameCount: number,
      loop: boolean,
   ) {
      const textures = this.loadAnimationTextures(prefix, frameCount);
      const animation = new AnimatedSprite(textures);
      animation.anchor.set(0.5);
      animation.loop = loop;
      return animation;
   }

   private loadAnimationTextures(prefix: GerbangSDNState, frameCount: number) {
      const textures = Array.from({ length: frameCount }, (_, i) => {
         return AssetRegistry.tex(frameKey(prefix, i));
      });

      return textures;
   }

   setState(next: GerbangSDNState) {
      if (next === this.currentState) return;

      this.currentSprite.stop();
      this.removeChild(this.currentSprite);

      this.currentState = next;
      this.currentSprite = this.animations[next];

      const cfg = ANIM_CONFIG[this.currentState];
      this.currentSprite.animationSpeed = cfg.speed ?? 1;

      this.addChild(this.currentSprite);
      this.currentSprite.gotoAndPlay(0);
   }
}
