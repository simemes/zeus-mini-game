<template>
  <!-- <h1 @click="GoToResult">{{ $store.startPage.title }}</h1> -->

  <div class="relative flex items-center justify-center w-screen h-screen bg-black">
    <!-- canvas -->
    <canvas 
      ref="gameCanvas" 
      :width="canvasWidth" 
      :height="canvasHeight" 
      class="block" 
      style="background-image: url('/images/bg_blue_sky.jpg');background-size: cover;"
    ></canvas>
    <!-- Pause btn -->
    <button @click="togglePause" class="absolute top-2 right-2 text-white z-10 bg-blue-500 p-2 rounded">
      {{ isPaused ? 'Resume' : 'Pause' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/store'
const $store = useStore()
const router = useRouter()

// canvas size
const canvasWidth = ref(0)
const canvasHeight = ref(0)
// ref gameCanvas
const gameCanvas = ref<HTMLCanvasElement | null>(null)
const isPaused = ref(false)
let ctx: CanvasRenderingContext2D | null = null

function createPlayer() {
  return {
    x: canvasWidth.value / 2 - 50,
    y: canvasHeight.value - 40,
    width: 100,
    height: 20
  }
}
let player = createPlayer()

function createFallingObj() {
  return {
    x: Math.random() * (canvasWidth.value - 30) + 15,
    y: 0,
    radius: 15,
    speed: 2
  }
}
let fallingObj = createFallingObj()

let keys: Record<string, boolean> = {}

// ============================ function ============================

//  切換頁面
function GoToResult() {
  router.push('/result')

  $store.isStart = false
  $store.isResult = true
}

// 維持 9:16
function resizeCanvasToFit9by16() {
  const screenW = window.innerWidth
  const screenH = window.innerHeight

  const screenRatio = screenW / screenH
  const targetRatio = 9 / 16

  if (screenRatio > targetRatio) {
    // 🟥 螢幕太寬 → 以高度為基準
    canvasHeight.value = screenH
    canvasWidth.value = screenH * targetRatio
  } else {
    // 🟩 螢幕較窄或接近 → 以寬度為基準
    canvasWidth.value = screenW
    canvasHeight.value = screenW * (16 / 9)
  }
}

// drawPlayer
function drawPlayer() {
  if (!ctx) return
  ctx.fillStyle = 'white'
  ctx.fillRect(player.x, player.y, player.width, player.height)
}

// drawFallingObj
function drawFallingObj() {
  if (!ctx) return
  ctx.fillStyle = 'red'
  ctx.beginPath()
  ctx.arc(fallingObj.x, fallingObj.y, fallingObj.radius, 0, Math.PI * 2)
  ctx.fill()
}

// 遊戲邏輯更新
function update() {
  // 控制板子移動
  if (keys['ArrowLeft']) player.x -= 5
  if (keys['ArrowRight']) player.x += 5

  // 防止出界
  player.x = Math.max(0, Math.min(player.x, canvasWidth.value - player.width))

  // 物體下落
  fallingObj.y += fallingObj.speed

  // 碰撞偵測
  if (
    fallingObj.y + fallingObj.radius >= player.y &&
    fallingObj.x > player.x &&
    fallingObj.x < player.x + player.width
  ) {
    resetFallingObj()
    console.log('接住！')
  }

  // 掉到底重設
  if (fallingObj.y > canvasHeight.value) {
    resetFallingObj()
  }
}

// 掉落物回到頂端
function resetFallingObj() {
  fallingObj.x = Math.random() * (canvasWidth.value - 30) + 15
  fallingObj.y = 0
}

// 畫面更新（清除後重新繪製）
function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
  drawPlayer()
  drawFallingObj()
}

// 遊戲主迴圈
function gameLoop() {
  if (!isPaused.value) {
    update()
    draw()
  }
  requestAnimationFrame(gameLoop)
}

// 暫停 / 繼續切換
function togglePause() {
  isPaused.value = !isPaused.value
}

// ============================ onMounted ============================

onMounted(() => {
  resizeCanvasToFit9by16()

  const canvas = gameCanvas.value
  if (canvas) {
    // 設定畫布尺寸
    canvas.width = canvasWidth.value
    canvas.height = canvasHeight.value
    ctx = canvas.getContext('2d')
    if (ctx) gameLoop()
  }
  // 重新初始化 player 和掉落物
  player = createPlayer()
  fallingObj = createFallingObj()
  // // ✅ 螢幕大小變更時，重設 canvas 尺寸
  window.addEventListener('resize', () => {
    resizeCanvasToFit9by16()
    if (gameCanvas.value) {
      gameCanvas.value.width = canvasWidth.value
      gameCanvas.value.height = canvasHeight.value
    }
  })
  // 控制 player
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true
  })
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false
  })
  // 第一次呼叫主迴圈
  gameLoop()
})

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
