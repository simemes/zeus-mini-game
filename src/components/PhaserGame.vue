<template>
  <div ref="gameContainer" class="w-screen h-screen mx-auto" />
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Phaser from 'phaser'

const gameContainer = ref<HTMLDivElement | null>(null)
let game: Phaser.Game | null = null

onMounted(() => {
  if (!gameContainer.value) return

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 720,
    height: 1280,
    parent: gameContainer.value,
    backgroundColor: '#000000',
    scale: {
        // 等比例縮放整個 canvas
        mode: Phaser.Scale.FIT,
        // 置中 canvas
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: {
      preload,
      create,
    },
  }

  game = new Phaser.Game(config)

  function preload(this: Phaser.Scene) {
    this.load.image('bg_blue_sky', '/images/bg_blue_sky.jpg')
  }

  function create(this: Phaser.Scene) {
    // 強制背景填滿畫布大小
    this.add.image(0, 0, 'bg_blue_sky').setOrigin(0).setDisplaySize(720, 1280)
  }

})

onBeforeUnmount(() => {
  game?.destroy(true)
})
</script>

<style scoped>
</style>