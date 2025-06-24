<template>
  <div ref="gameContainer" class="w-screen h-screen mx-auto" />
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import Phaser from "phaser";

const gameContainer = ref<HTMLDivElement | null>(null);
let game: Phaser.Game | null = null;

const itemList = [
  { key: 'bomb', scale: 0.15, speed: 220, weight: 5 },
  { key: 'clock', scale: 0.15, speed: 200, weight: 4 },
  { key: 'clock_gold', scale: 0.15, speed: 250, weight: 2 },
  { key: 'coin', scale: 0.15, speed: 220, weight: 3 },
  { key: 'star', scale: 0.15, speed: 220, weight: 1 },
]

// ================================== onMounted ==================================

onMounted(() => {
  if (!gameContainer.value) return;

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 720,
    height: 1280,
    parent: gameContainer.value,
    backgroundColor: "#000000",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 500 },
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: {
      preload,
      create,
      update,
    },
  };

  game = new Phaser.Game(config);

  let boss: Phaser.GameObjects.Sprite;
  let player: Phaser.Physics.Arcade.Sprite;
  let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  let items: Phaser.Physics.Arcade.Group;
  let direction = 1;
  let timerEvent: Phaser.Time.TimerEvent;
  let isTouching = false;
  let moveDirection = 0;
  let lastX = 0;

  // ------------- *** preload *** -------------
  function preload(this: Phaser.Scene) {
    this.load.image("bg", "/images/bg_blue_sky.jpg");
    this.load.image("boss", "/images/zeus.png");
    this.load.image("player", "/images/player.png");
    this.load.image("bomb", "/images/bomb.png");
    this.load.image("clock", "/images/clock.png");
    this.load.image("clock_gold", "/images/clock_gold.png");
    this.load.image("coin", "/images/coin.png");
    this.load.image("star", "/images/star.png");
  }

  // ------------- *** create *** -------------
  function create(this: Phaser.Scene) {
    
    // background
    const bg = this.add.image(0, 0, "bg").setOrigin(0);
    fitBackground(bg, this);
    // 監聽畫面縮放
    this.scale.on("resize", () => {
      fitBackground(bg, this);
    });

    // Boss
    boss = this.add.sprite(360, 200, "boss");
    boss.setScale(0.3);

    // Player
    player = this.physics.add
      .sprite(360, 1150, "player")
      .setCollideWorldBounds(true);
    player.setScale(0.4);
    // Player 觸控控制
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      isTouching = true;
      lastX = pointer.x;
    });
    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!isTouching) return;
      const deltaX = pointer.x - lastX;
      const swipeThreshold = 5; // 最小移動才能判斷方向
      if (deltaX > swipeThreshold) {
        // console.log('右滑')
        moveDirection = 1;
      } else if (deltaX < -swipeThreshold) {
        // console.log('左滑')
        moveDirection = -1;
      } else {
        // console.log('停住')
      }
      lastX = pointer.x; // 更新位置
    });
    this.input.on("pointerup", () => {
      // console.log('pointerup')
      isTouching = false;
      moveDirection = 0;
    });
    // Controls
    cursors = this.input.keyboard!.createCursorKeys();

    // Items group
    items = this.physics.add.group();
    // 碰撞判定
    this.physics.add.overlap(player, items, (player, item) => {
      const gameItem = item as Phaser.GameObjects.GameObject & Phaser.Physics.Arcade.Body
      const type = (gameItem as any).getData?.('type')
      if (type === 'bomb') {
        console.log('bomb')
      } else if (type === 'clock') {
        console.log('clock')
      } else if (type === 'clock_gold') {
        console.log('clock_gold')
      } else if (type === 'coin') {
        console.log('coin')
      } else if (type === 'star') {
        console.log('star')
      }
      item.destroy()
    })
    // 定時丟東西
    timerEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        dropRandomItem(this, boss.x, boss.y + 50)
      },
    });

  }

  // ------------- *** update *** -------------
  function update(this: Phaser.Scene) {
    // 魔王移動
    boss.x += direction * 5;
    const halfWidth = boss.displayWidth / 2;
    if (boss.x > 720 - halfWidth || boss.x < 0 + halfWidth) {
      direction *= -1;
    }

    // 玩家移動
    if (moveDirection === -1 || cursors.left?.isDown) {
      // console.log('左移')
      player.setVelocityX(-300);
    } else if (moveDirection === 1 || cursors.right?.isDown) {
      // console.log('右移')
      player.setVelocityX(300);
    } else {
      // console.log('停')
      player.setVelocityX(0);
    }
  }

  // ------------- 背景響應式調整 -------------
  function fitBackground(bg: Phaser.GameObjects.Image, scene: Phaser.Scene) {
    const { width, height } = scene.scale;
    const scale = Math.max(width / bg.width, height / bg.height);
    bg.setScale(scale);
  }

  // ------------- 隨機掉落物品 -------------
  function dropRandomItem(scene: Phaser.Scene, x: number, y: number) {
    // 依照 weight 建立擴展陣列
    const weightedList: string[] = []
    itemList.forEach(item => {
      for (let i = 0; i < item.weight; i++) {
        weightedList.push(item.key)
      }
    })
    const selectedKey = Phaser.Utils.Array.GetRandom(weightedList)
    const itemData = itemList.find(i => i.key === selectedKey)
    if (!itemData) return

    const item = items.create(x, y, selectedKey) as Phaser.Physics.Arcade.Sprite
    item.setVelocityY(itemData.speed)
    item.setScale(itemData.scale)
    item.setData('type', selectedKey) // 方便之後判斷
  }

});

onBeforeUnmount(() => {
  game?.destroy(true);
});
</script>

<style scoped></style>
