<template>
  <!-- <h1 @click="GoToResult">{{ $store.startPage.title }}</h1>
  <img src="/images/bg_blue_sky.jpg"/> -->

  <div class="relative w-screen h-screen bg-black">
    <canvas ref="gameCanvas" :width="canvasWidth" :height="canvasHeight" class="absolute top-0 left-0" style="background-image: url('/images/bg_blue_sky.jpg');"></canvas>
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

const canvasWidth = window.innerWidth
const canvasHeight = canvasWidth * (16 / 9)

const gameCanvas = ref<HTMLCanvasElement | null>(null)

const isPaused = ref(false)

let ctx: CanvasRenderingContext2D | null = null
let player = { x: 150, y: 550, width: 100, height: 20 }
let fallingObj = { x: 200, y: 0, radius: 15, speed: 2 }

let keys: Record<string, boolean> = {}

// ============================ function ============================

// ============= 切換頁面 =============
function GoToResult() {
  router.push('/result')

  $store.isStart = false
  $store.isResult = true
}

function drawPlayer() {
  if (!ctx) return
  ctx.fillStyle = 'white'
  ctx.fillRect(player.x, player.y, player.width, player.height)
}

function drawFallingObj() {
  if (!ctx) return
  ctx.fillStyle = 'red'
  ctx.beginPath()
  ctx.arc(fallingObj.x, fallingObj.y, fallingObj.radius, 0, Math.PI * 2)
  ctx.fill()
}

function update() {
  // 控制板子移動
  if (keys['ArrowLeft']) player.x -= 5
  if (keys['ArrowRight']) player.x += 5

  // 防止出界
  player.x = Math.max(0, Math.min(player.x, canvasWidth - player.width))

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
  if (fallingObj.y > canvasHeight) {
    resetFallingObj()
  }
}

function resetFallingObj() {
  fallingObj.x = Math.random() * (canvasWidth - 30) + 15
  fallingObj.y = 0
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  drawPlayer()
  drawFallingObj()
}

function gameLoop() {
  if (!isPaused.value) {
    update()
    draw()
  }
  requestAnimationFrame(gameLoop)
}

function togglePause() {
  isPaused.value = !isPaused.value
}

onMounted(() => {
  const canvas = gameCanvas.value
  const context = canvas?.getContext('2d')
  if (context) {
    ctx = context
    gameLoop()
  } else {
    console.error('無法取得 2D 繪圖上下文')
  }

  window.addEventListener('keydown', (e) => {
    keys[e.key] = true
  })
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false
  })

  gameLoop()
})

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
