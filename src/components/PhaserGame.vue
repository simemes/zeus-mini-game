<template>
  <div ref="gameContainer" class="w-full h-full" />
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
    width: 800,
    height: 600,
    parent: gameContainer.value,
    backgroundColor: '#242424',
    scene: {
      preload,
      create,
    },
  }

  game = new Phaser.Game(config)

  function preload(this: Phaser.Scene) {
    this.load.setBaseURL('https://labs.phaser.io')
    this.load.image('sky', 'assets/skies/space3.png')
  }

  function create(this: Phaser.Scene) {
    this.add.image(400, 300, 'sky')
  }
})

onBeforeUnmount(() => {
  game?.destroy(true)
})
</script>

<style scoped>
/* 可自定義容器大小 */
</style>