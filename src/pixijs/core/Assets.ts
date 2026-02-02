import { Assets, Texture } from 'pixi.js';

function assetUrl(path: string) {
   return `${import.meta.env.BASE_URL}${path}`;
}

function generateFrames(
   basePath: string,
   prefix: string,
   frameCount: number,
   pad = 4,
   startAt = 0,
) {
   return Array.from({ length: frameCount }, (_, i) => {
      const fileName = `${prefix}_${String(i + startAt).padStart(pad, '0')}`;
      return [fileName, assetUrl(`${basePath}/${fileName}.png`)] as const;
   });
}

export class AssetRegistry {
   static async load() {
      Assets.addBundle(
         'stickman',
         Object.fromEntries([
            ...generateFrames('../assets/stickman', 'idle', 18),
            ...generateFrames('../assets/stickman', 'fly', 39),
            ...generateFrames('../assets/stickman', 'walk', 14),
            ...generateFrames('../assets/stickman', 'idle_to_walk', 6),
            ...generateFrames('../assets/stickman', 'walk_to_idle', 6),
            ...generateFrames('../assets/stickman', 'fly_to_idle', 11),
            ...generateFrames('../assets/stickman', 'idle_to_fly', 11),
         ]),
      );

      Assets.addBundle(
         'background',
         Object.fromEntries([
            ...generateFrames('../assets/clouds', 'cloud', 9, 1, 1),
            ['gerbang_sdn', assetUrl('../assets/gerbang_sdn.png')],
            ['sky', assetUrl('../assets/sky.png')],
            ['hill_background', assetUrl('../assets/hill_background.png')],
            ['bg_trees', assetUrl('../assets/bg_trees.png')],
            ['ground_2', assetUrl('../assets/ground_2.png')],
            ['tanah', assetUrl('../assets/tanah.png')],
            ['grass', assetUrl('../assets/grass.png')],
            ['big_tree', assetUrl('../assets/big_tree.png')],
            ['wheat', assetUrl('../assets/wheat.png')],
            ['fence', assetUrl('../assets/fence.png')],
            ['house', assetUrl('../assets/house.png')],
            ['sdn', assetUrl('../assets/SDN.png')],
         ]),
      );

      Assets.addBundle(
         'buttons',
         Object.fromEntries([
            ['move_left_btn', assetUrl('../assets/buttons/move_left_btn.png')],
            [
               'move_left_btn-hover',
               assetUrl('../assets/buttons/move_left_btn-hover.png'),
            ],
            [
               'move_left_btn-click',
               assetUrl('../assets/buttons/move_left_btn-click.png'),
            ],
            [
               'move_left_btn-disabled',
               assetUrl('../assets/buttons/move_left_btn-disabled.png'),
            ],
            ['move_right_btn', assetUrl('../assets/buttons/move_right_btn.png')],
            [
               'move_right_btn-hover',
               assetUrl('../assets/buttons/move_right_btn-hover.png'),
            ],
            [
               'move_right_btn-click',
               assetUrl('../assets/buttons/move_right_btn-click.png'),
            ],
            [
               'move_right_btn-disabled',
               assetUrl('../assets/buttons/move_right_btn-disabled.png'),
            ],
         ]),
      );

      await Assets.loadBundle('stickman');
      await Assets.loadBundle('background');
      await Assets.loadBundle('buttons');
   }

   static tex(name: string): Texture {
      const tex = Assets.get<Texture>(name);
      if (!tex) {
         throw new Error(`Texture not found: ${name}`);
      }
      return tex;
   }
}
