<template>
  <div ref="gameContainer" class="w-screen h-screen mx-auto" />
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import Phaser from "phaser";

const gameContainer = ref<HTMLDivElement | null>(null);
let game: Phaser.Game | null = null;

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
        gravity: { x: 0, y: 500 }, // ✅ 補上 x
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

  function preload(this: Phaser.Scene) {
    this.load.image("bg", "/images/bg_blue_sky.jpg");
    this.load.image("boss", "/images/zeus.png");
    this.load.image("player", "/images/player.png");
    this.load.image("item", "/images/bomb.png");
  }

  function create(this: Phaser.Scene) {
    const bg = this.add.image(0, 0, "bg").setOrigin(0);
    fitBackground(bg, this);

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
      console.log("Hit!", item);
      item.destroy();
    });

    // 定時丟東西
    timerEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const drop = items.create(
          boss.x,
          boss.y + 50,
          "item"
        ) as Phaser.Physics.Arcade.Sprite;
        drop.setVelocityY(300);
        drop.setScale(0.2);
        drop.setCollideWorldBounds(false);
      },
    });

    // 監聽畫面縮放
    this.scale.on("resize", () => {
      fitBackground(bg, this);
    });
  }

  function update(this: Phaser.Scene) {
    // 魔王左右移動
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

  function fitBackground(bg: Phaser.GameObjects.Image, scene: Phaser.Scene) {
    const { width, height } = scene.scale;
    const scale = Math.max(width / bg.width, height / bg.height);
    bg.setScale(scale);
  }
});

onBeforeUnmount(() => {
  game?.destroy(true);
});
</script>

<style scoped></style>
