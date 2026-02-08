import { Application, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { Stickman } from '../entities/Stickman';

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
   private hillBackground: Sprite;
   // private grassForeground: Sprite;
   private ground: Sprite;

   private house: Sprite;
   private sdn: Sprite;
   private gerbangSdn: Sprite;

   stickman: Stickman;

   static WORLD_WIDTH = 12000;
   static WORLD_HEIGHT = 800;

   constructor(app: Application) {
      super();

      this.app = app;
      this.sortableChildren = true;
      this.setSize(AboutWorld.WORLD_WIDTH, AboutWorld.WORLD_HEIGHT);

      const screenWidth = app.renderer.screen.width;
      const screenHeight = app.renderer.screen.height;

      this.sky = new Sprite(Texture.from('sky'));
      this.sky.anchor.set(0);
      this.sky.width = screenWidth;
      this.sky.height = AboutWorld.WORLD_HEIGHT;
      this.addChild(this.sky);

      this.clouds = new Container();
      this.clouds.scale.set(0.8);
      this.clouds.y = AboutWorld.WORLD_HEIGHT / 2 - 400;
      this.createClouds();
      this.addChild(this.clouds);

      this.grass = new Container();
      this.grass.x = 380;
      this.grass.y = AboutWorld.WORLD_HEIGHT - 350;
      this.createGrass();
      this.addChild(this.grass);

      this.bigTree = new Container();
      this.bigTree.x = 700;
      this.bigTree.scale.set(3);
      this.bigTree.y = screenHeight - AboutWorld.WORLD_HEIGHT - 100;
      this.addChild(this.bigTree);

      this.wheats = new Container();
      this.wheats.scale.set(0.8);
      this.wheats.y = screenHeight - AboutWorld.WORLD_HEIGHT / 3 - 25;
      this.wheats.x = 500;
      this.createWheats();
      this.addChild(this.wheats);

      this.fences = new Container();
      this.fences.x = 500;
      this.fences.y = screenHeight - AboutWorld.WORLD_HEIGHT / 5 + 5;
      this.fences.scale.set(0.25);
      this.createFences();
      this.addChild(this.fences);

      const bgTreesTexture = Texture.from('bg_trees');
      bgTreesTexture.source.addressMode = 'repeat';

      const bgTreesRepeatedTexture = new Texture({
         source: bgTreesTexture.source,
         frame: new Rectangle(0, 0, AboutWorld.WORLD_WIDTH, 500),
      });

      this.bgTrees = new Sprite(bgTreesRepeatedTexture);
      this.bgTrees.width = AboutWorld.WORLD_WIDTH;
      this.bgTrees.height = 500;
      this.bgTrees.y = screenHeight - AboutWorld.WORLD_HEIGHT / 2;
      this.createBigTrees();
      this.addChild(this.bgTrees);

      const hillBackgroundTexture = Texture.from('hill_background');
      hillBackgroundTexture.source.addressMode = 'repeat';

      const hillBackgroundRepeatedTexture = new Texture({
         source: hillBackgroundTexture.source,
         frame: new Rectangle(0, 0, AboutWorld.WORLD_WIDTH, 500),
      });

      this.hillBackground = new Sprite(hillBackgroundRepeatedTexture);
      this.hillBackground.width = AboutWorld.WORLD_WIDTH;
      this.hillBackground.height = 500;
      this.hillBackground.y = screenHeight - AboutWorld.WORLD_HEIGHT / 2;
      this.addChild(this.hillBackground);

      const tanahTexture = Texture.from('tanah');
      tanahTexture.source.addressMode = 'repeat';

      const tanahTextureRepeated = new Texture({
         source: tanahTexture.source,
         frame: new Rectangle(0, 0, AboutWorld.WORLD_WIDTH, 130),
      });

      this.ground = new Sprite(tanahTextureRepeated);
      this.ground.width = AboutWorld.WORLD_WIDTH;
      this.ground.height = 130;
      this.ground.y = screenHeight - AboutWorld.WORLD_HEIGHT / 7;
      this.addChild(this.ground);

      this.stickman = new Stickman();
      this.stickman.scale.set(0.4);
      this.stickman.x = 200;
      this.stickman.y = screenHeight - AboutWorld.WORLD_HEIGHT / 7 - 10;
      this.addChild(this.stickman);

      this.house = new Sprite(Texture.from('house'));
      this.house.anchor.set(0.5);
      this.house.scale.set(0.8);
      this.house.x = 200;
      this.house.y = screenHeight - AboutWorld.WORLD_HEIGHT / 2 + 30;
      this.addChild(this.house);

      this.sdn = new Sprite(Texture.from('sdn'));
      this.sdn.anchor.set(0.5, 1);
      this.sdn.scale.set(1.3);
      this.sdn.x = 1900;
      this.sdn.y = screenHeight - AboutWorld.WORLD_HEIGHT / 10 + 500;
      this.addChild(this.sdn);

      this.gerbangSdn = new Sprite(Texture.from('gerbang_sdn'));
      this.gerbangSdn.scale.set(1);
      this.gerbangSdn.x = 1400;
      this.gerbangSdn.y = screenHeight - AboutWorld.WORLD_HEIGHT / 2 - 50;
      this.addChild(this.gerbangSdn);

      // this.sky.zIndex = 0;
      // this.clouds.zIndex = 1;
      this.bgTrees.zIndex = 2;
      this.hillBackground.zIndex = 1;
      this.house.zIndex = 6;
      this.sdn.zIndex = 3;
      this.gerbangSdn.zIndex = 4;
      this.fences.zIndex = 5;
      this.grass.zIndex = 6;
      this.bigTree.zIndex = 6;
      this.wheats.zIndex = 4;
      this.ground.zIndex = 8;
      this.stickman.zIndex = 7;
      // this.grassForeground.zIndex = 8;
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
      for (let i = 0; i < 4; i++) {
         const wheat = new Sprite(Texture.from('wheat'));
         wheat.x = i * 260;
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
      // this.grassForeground.x = -x * 0.4; // parallax
      this.hillBackground.x = -x * 0.09; // parallax
      this.bgTrees.x = -x * 0.1; // parallax
      this.ground.x = -x * 0.205; // parallax
      this.house.x = 200 - x * 0.205;
      this.sdn.x = 1900 - x * 0.2;
      this.bigTree.x = 700 - x * 0.205;
      this.gerbangSdn.x = 1400 - x * 0.205;
      this.grass.x = 380 - x * 0.205;
      this.fences.x = 500 - x * 0.205;
      this.wheats.x = 500 - x * 0.2;
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
