import { FancyButton } from '@pixi/ui';
import { Container } from 'pixi.js';

export class StickmanController extends Container {
   moveState: number = 0;
   lastState: number = 0;
   onMoveStateChange?: (state: number) => void;

   constructor() {
      super();

      this.loadButton();
   }

   private setMoveState(state: number) {
      this.moveState = state;
      this.onMoveStateChange?.(state);
      this.lastState = state;
   }

   private loadButton() {
      const container = new Container();
      const moveLeftBtn = new FancyButton({
         defaultView: `move_left_btn`,
         hoverView: `move_left_btn-hover`,
         pressedView: `move_left_btn-click`,
         animations: {
            hover: {
               props: {
                  scale: {
                     x: 1.1,
                     y: 1.1,
                  },
               },
               duration: 100,
            },
            pressed: {
               props: {
                  scale: {
                     x: 0.9,
                     y: 0.9,
                  },
               },
               duration: 100,
            },
         },
      });

      moveLeftBtn.anchor.set(0.5);
      moveLeftBtn.scale.set(0.5);
      moveLeftBtn.x = -100;
      moveLeftBtn.onDown.connect(() => {
         this.setMoveState(-1);
      });
      moveLeftBtn.onUp.connect(() => {
         this.setMoveState(0);
      });
      container.addChild(moveLeftBtn);

      const moveRightBtn = new FancyButton({
         defaultView: `move_right_btn`,
         hoverView: `move_right_btn-hover`,
         pressedView: `move_right_btn-click`,
         animations: {
            hover: {
               props: {
                  scale: {
                     x: 1.1,
                     y: 1.1,
                  },
               },
               duration: 100,
            },
            pressed: {
               props: {
                  scale: {
                     x: 0.9,
                     y: 0.9,
                  },
               },
               duration: 100,
            },
         },
      });

      moveRightBtn.onDown.connect(() => {
         this.setMoveState(1);
      });
      moveRightBtn.onUp.connect(() => {
         this.setMoveState(0);
      });
      moveRightBtn.anchor.set(0.5);
      moveRightBtn.scale.set(0.5);
      moveRightBtn.x = 100;

      container.addChild(moveRightBtn);

      this.addChild(container);
   }
}
