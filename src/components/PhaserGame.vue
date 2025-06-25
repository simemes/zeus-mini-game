<template>
    <!-- UI -->
    <div
      class="absolute translate-x-[calc(50vw-50%)] translate-y-[calc(50vh-50%)] inset-0 aspect-[720/1280] max-w-full max-h-full z-[1] pointer-events-none"
    >
      <!-- Score -->
      <div
        class="absolute top-1 w-full h-[100px]"
        :style="{ maxWidth:  + 'px' }"
      >
        <img src="/images/score_bar.png" class="">
      </div>
      <button
        @click="togglePause"
        class="absolute top-2 right-2 z-[2] bg-blue-600 text-white px-4 py-2 rounded pointer-events-auto"
      >
        {{ isPaused ? 'Resume' : 'Pause' }}
      </button>

      <!-- Start -->
      <div
        v-if="(4 > sec && sec >= 0) || clockSec == 0"
        class="absolute top-[40%] w-full text-[100px] leading-[100px] tracking-[0%] text-center font-[Impact]"
        :style="{ maxWidth:  + 'px' }"
      >
        {{countdownSec}}
        <div
          v-if="(3 > sec)"
          class="w-[80%] flex mt-20 mx-auto">
          <img src="/images/arrow_l.png" class="w-[50%]">
          <img src="/images/arrow_r.png" class="w-[50%]">
        </div>
      </div>
      <!-- Time -->
      <div
        class="absolute bottom-0 w-full"
        :style="{ maxWidth:  + 'px' }"
      >
        <div class="relative flex aspect-[10]">
          <!-- bar bg -->
          <img src="/images/time_bar.png" class="absolute bottom-0">
          <!-- clock & progress 的容器 -->
          <div class="relative w-full flex px-2">
            <!-- clock bg -->
            <div class=" w-[45px] h-[22px] py-[2px] mr-3 bg-[#643B1B] rounded-[20px] relative flex justify-start">
              <!-- icon -->
              <img src="/images/clock_icon.png" class="relative w-[16px] h-[16px] mx-1">
              <!-- sec -->
              <p class="sec-font relative text-[18px] leading-[100%]">{{clockSec}}</p>
            </div>
            <!-- progress bar -->
            <div class="flex-1 h-[15px] bg-[#643B1B] mt-1 rounded-[20px] relative left-0 z-1 overflow-hidden">
              <!-- 實質時間 -->
              <div class="h-[15px] bg-[#FFDB34] rounded-[20px] relative"
                :style="{ width: (clockSec / 60 * 100) + '%' }"></div>
              <!-- 三小格 -->
              <div class="h-[15px] bottom-0 border border-[#643B1B] absolute w-[33.3%] rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[1px] rounded-br-[1px]"></div>
              <div class="h-[15px] bottom-0 border-y border-[#643B1B] absolute w-[33.3%] rounded-tl-[1px] rounded-bl-[1px] rounded-tr-[1px] rounded-br-[1px] left-[33.3%]"></div>
              <div class="h-[15px] bottom-0 border border-[#643B1B] absolute w-[33.3%] rounded-tl-[1px] rounded-bl-[1px] rounded-tr-[20px] rounded-br-[20px] left-[66.6%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Canvas -->
    <div
      ref="gameContainer"
      class="relative w-screen h-screen mx-auto"
    >
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import Phaser from "phaser";

const gameContainer = ref<HTMLDivElement | null>(null);
let game: Phaser.Game | null = null;

const itemList = [
  { key: 'bomb', scale: 0.15, speed: 500, weight: 5 },
  { key: 'clock', scale: 0.15, speed: 500, weight: 4 },
  { key: 'clock_gold', scale: 0.15, speed: 500, weight: 2 },
  { key: 'coin', scale: 0.15, speed: 500, weight: 3 },
  { key: 'star', scale: 0.15, speed: 500, weight: 1 },
];

let gameStart = ref(false)
let sec = ref(0)
let clockSec = ref(60)
let isPaused = ref(false)

// 預備三秒後啟動
function StartCountdown() {
  const interval = setInterval(() => {
    sec.value++;
    if (sec.value === 3) {
      gameStart.value = true;
      StartClock();
    }
    if (sec.value === 4) clearInterval(interval);
  }, 1000);
}
// 時鐘開始倒數
function StartClock() {
  console.log("StartClock!")
  const interval = setInterval(() => {
    if (!isPaused.value) {
      clockSec.value--;
      // 時間結束
      if (clockSec.value === 0) {
        console.log('Time\'s Up!')
        clearInterval(interval);
      }
    }
  }, 1000);
}
function togglePause() {
  console.log('togglePause')
  isPaused.value = !isPaused.value;
  // 確保遊戲存在且目前場景是活躍狀態
  if (game && game.scene.isActive('default')) {
    const scene = game.scene.getScene('default');
    // 暫停狀態
    if (isPaused.value) {
      scene.physics.world.pause();
      scene.time.timeScale = 0;
    // 非暫停狀態
    } else {
      scene.physics.world.resume();
      scene.time.timeScale = 1;
    }
  }
}

// ================================== computed ==================================

const countdownSec = computed(() => {
  let result;
  if(sec.value == 3) result = 'START';
  if(clockSec.value == 0) result = 'TIME\'S UP'
  return result?result:3-sec.value
})

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
        // gravity: { x: 0, y: 0 },
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
  // console.log('🟢 ', game.canvas)

  let boss: Phaser.GameObjects.Sprite;
  let player: Phaser.Physics.Arcade.Sprite;
  let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  let items: Phaser.Physics.Arcade.Group;
  let b_direction = Math.random() < 0.5 ? -1 : 1; // 初始方向
  let b_speed = Phaser.Math.Between(2, 6); // 初始速度 2~6
  let b_changeDirCooldown = 0;
  let hasStarted = false;
  let timerEvent: Phaser.Time.TimerEvent;
  let isTouching = false;
  let moveDirection = 0;
  let lastX = 0;

  StartCountdown();

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
    const bg = this.add.image(0, -90, "bg").setOrigin(0);
    fitBackground(bg, this);
    // 監聽畫面縮放
    this.scale.on("resize", () => {
      fitBackground(bg, this);
    });

    // Boss
    boss = this.add.sprite(360, 250, "boss");
    boss.setScale(0.3);

    // Player
    player = this.physics.add
      .sprite(360, 1060, "player")
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

  }

  // ------------- *** update *** -------------
  function update(this: Phaser.Scene) {
    
    // 監控遊戲是否開始，只做一次
    if(gameStart.value && !hasStarted) {
      hasStarted = true;
      // 定時丟東西
      timerEvent = this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
          dropRandomItem(this, boss.x, boss.y + 50)
        },
      });
    }
    // 處理遊戲尚未開始 or 已經結束 or 暫停
    if (!hasStarted || clockSec.value <= 0 || isPaused.value) {
      // 設為零，不然會滑動到邊界
      player.setVelocityX(0);
      // 把碰撞關掉
      if (clockSec.value <= 0) player.body!.checkCollision.none = true;
      return;
    }

    // 以下為正常遊戲時間內的邏輯
    // 魔王移動
    boss.x += b_direction * b_speed;
    b_changeDirCooldown--;
    if (b_changeDirCooldown <= 0) {
    // 每 60 幀（大約 1 秒）有機率改變方向
    if (Math.random() < 0.5) {
        b_direction *= -1;
        b_speed = Phaser.Math.Between(2, 6); // ✅ 隨機新速度
      }
      b_changeDirCooldown = 60; // 重設冷卻
    }
    // 邊界檢查（避免魔王走出畫面）
    const halfWidth = boss.displayWidth / 2;
    if (boss.x > 720 - halfWidth || boss.x < 0 + halfWidth) {
      b_direction *= -1;
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

});

onBeforeUnmount(() => {
  game?.destroy(true);
});
</script>
<style scoped>

.sec-font {
  font-family: Passion One;
}
</style>
