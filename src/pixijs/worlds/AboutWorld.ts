import { Application, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { Stickman } from '../entities/Stickman';
import { GerbangSDN } from '../entities/GerbangSDN';

export class AboutWorld extends Container {
   cameraX = 0;

   private app: Application;

   private sky: Sprite;
   private clouds: Container;
   private grass: Container;
   private bigTree: Container;
   private fences: Container;
   private wheats: Container;
   private bgTrees: Sprite;
   private ground2: Sprite;
   private ground3: Sprite;

   private house: Sprite;
   private sdn: Sprite;
   gerbangSdn: GerbangSDN;

   stickman: Stickman;

   static width = 10000;
   static height: number;

   constructor(app: Application) {
      super();

      this.app = app;
      this.sortableChildren = true;

      this.sky = new Sprite(Texture.from('sky'));
      this.sky.anchor.set(0);
      this.sky.width = app?.renderer.screen.width;
      this.sky.height = app?.renderer.screen.height;
      this.addChild(this.sky);

      this.clouds = new Container();
      this.clouds.scale.set(0.8);
      this.clouds.y = -100;
      this.addChild(this.clouds);

      this.grass = new Container();
      this.grass.x = 350;
      this.grass.y = AboutWorld.height - 350;
      this.addChild(this.grass);

      this.bigTree = new Container();
      this.bigTree.x = 700;
      this.bigTree.scale.set(3);
      this.bigTree.y = -305;
      this.addChild(this.bigTree);

      this.wheats = new Container();
      this.wheats.scale.set(0.35);
      this.wheats.y = AboutWorld.height - 190;
      this.wheats.x = 500;
      this.addChild(this.wheats);

      this.fences = new Container();
      this.fences.x = 500;
      this.fences.y = AboutWorld.height - 160;
      this.fences.scale.set(0.25);
      this.addChild(this.fences);

      const bgTreesTexture = Texture.from('bg_trees');
      bgTreesTexture.source.addressMode = 'repeat';

      const bgTreesRepeatedTexture = new Texture({
         source: bgTreesTexture.source,
         frame: new Rectangle(0, 0, AboutWorld.width, 300),
      });

      this.bgTrees = new Sprite(bgTreesRepeatedTexture);
      this.bgTrees.width = 10000;
      this.bgTrees.height = 300;
      this.bgTrees.y = AboutWorld.height - 400;
      this.addChild(this.bgTrees);

      const ground3Texture = Texture.from('ground_3');
      ground3Texture.source.addressMode = 'repeat';

      const ground3RepeatTexture = new Texture({
         source: ground3Texture.source,
         frame: new Rectangle(0, 0, 1000, 200),
      });

      this.ground3 = new Sprite(ground3RepeatTexture);
      this.ground3.width = 10000;
      this.ground3.height = 200;
      this.ground3.y = AboutWorld.height - 120;
      this.addChild(this.ground3);

      const ground2Texture = Texture.from('ground_2');
      ground2Texture.source.addressMode = 'repeat';

      const ground2RepeatedTexture = new Texture({
         source: ground2Texture.source,
         frame: new Rectangle(0, 0, 10000, 600),
      });

      this.ground2 = new Sprite(ground2RepeatedTexture);
      this.ground2.width = AboutWorld.width;
      this.ground2.height = AboutWorld.height;
      this.ground2.y = 320;
      this.addChild(this.ground2);

      this.stickman = new Stickman();
      this.stickman.scale.set(0.8);
      this.stickman.x = 200;
      this.stickman.y = AboutWorld.height - 40;
      this.addChild(this.stickman);

      this.createClouds();
      this.createGrass();
      this.createBigTrees();
      this.createWheats();
      this.createFences();

      this.house = new Sprite(Texture.from('house'));
      this.house.anchor.set(0.5);
      this.house.scale.set(0.8);
      this.house.x = 200;
      this.house.y = 250;
      this.addChild(this.house);

      this.sdn = new Sprite(Texture.from('sdn'));
      this.sdn.anchor.set(0.5, 1);
      this.sdn.scale.set(1.3);
      this.sdn.x = 1900;
      this.sdn.y = 980;
      this.addChild(this.sdn);

      this.gerbangSdn = new GerbangSDN();
      this.gerbangSdn.scale.set(1);
      this.gerbangSdn.x = 2000;
      this.gerbangSdn.y = 390;
      this.addChild(this.gerbangSdn);

      this.sky.zIndex = 0;
      this.clouds.zIndex = 1;
      this.bgTrees.zIndex = 2;
      this.house.zIndex = 6;
      this.sdn.zIndex = 3;
      this.gerbangSdn.zIndex = 4;
      this.fences.zIndex = 5;
      this.grass.zIndex = 6;
      this.bigTree.zIndex = 6;
      this.wheats.zIndex = 4;
      this.ground3.zIndex = 3;
      this.stickman.zIndex = 7;
      this.ground2.zIndex = 8;
   }

   private createClouds() {
      for (let i = 0; i < 5; i++) {
         const cloud = new Sprite(Texture.from('cloud_' + (i + 1)));
         cloud.x = i * 400;
         cloud.y = 100 + Math.random() * 100;
         this.clouds.addChild(cloud);
      }
   }

   private createGrass() {
      for (let i = 0; i < 5; i++) {
         const grass = new Sprite(Texture.from('grass'));
         grass.x = i * 500;
         this.grass.addChild(grass);
      }
   }

   private createBigTrees() {
      for (let i = 0; i < 5; i++) {
         const bigTree = new Sprite(Texture.from('big_tree'));
         bigTree.x = i * 385;
         this.bigTree.addChild(bigTree);
      }
   }

   private createWheats() {
      for (let i = 0; i < 8; i++) {
         const wheat = new Sprite(Texture.from('wheat'));
         wheat.x = i * 290;
         this.wheats.addChild(wheat);
      }
   }

   private createFences() {
      for (let i = 0; i < 10; i++) {
         const fence = new Sprite(Texture.from('fence'));
         fence.x = i * 360;
         this.fences.addChild(fence);
      }
   }

   onStickmanWalk() {
      this.stickman.playIdleToWalk();
   }

   onStickmanWalkToIdle() {
      this.stickman.playWalkToIdle();
   }

   onStickmanFly() {
      this.stickman.playIdleToFly();
   }

   onStickmanFlyToIdle() {
      this.stickman.playFlyToIdle();
   }

   setCameraX(x: number) {
      this.cameraX = x;

      this.sky.x = -x * 0; // diam
      this.clouds.x = -x * 0.08; // parallax
      this.ground2.x = -x * 0.4; // parallax
      this.bgTrees.x = -x * 0.1; // parallax
      this.ground3.x = -x * 0.2; // parallax
      this.house.x = 200 - x * 0.215;
      this.sdn.x = 1900 - x * 0.2;
      this.bigTree.x = 700 - x * 0.205;
      this.gerbangSdn.x = 2000 - x * 0.205;
      this.grass.x = 350 - x * 0.205;
      this.fences.x = 500 - x * 0.205;
      this.wheats.x = 500 - x * 0.19;
   }

   private getRightMostCloudX(): number {
      let maxX = -Infinity;

      for (const cloud of this.clouds.children as Sprite[]) {
         if (cloud.x > maxX) {
            maxX = cloud.x;
         }
      }

      return maxX;
   }

   update(delta: number) {
      const speed = 0.05;

      for (const cloud of this.clouds.children as Sprite[]) {
         cloud.x -= speed;

         if (cloud.x < -cloud.width) {
            const rightMostX = this.getRightMostCloudX();

            cloud.x = rightMostX + 300 + Math.random() * 200;
            cloud.y = 80 + Math.random() * 120;
         }
      }

      this.stickman.update(delta);
   }
}
