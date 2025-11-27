<script setup lang="ts">
import { type NodeProps } from '@vue-flow/core'
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid'
import type { VisualScene } from '@/types';

const props = defineProps<NodeProps<VisualScene>>()

// sceneId change means deleting the scene
// no need to track it

const sceneTextRef = computed({
  get: () => props.data.sceneText,
  set: (newSceneText: string) => emit('editSceneText', props.data.sceneId, newSceneText)
})

const npcNameRef = computed({
  get: () => props.data.npcName,
  set: (newNpcName: string) => emit('editNpcName', props.data.sceneId, newNpcName)
})

const emit = defineEmits<{
  (event: 'editNpcName', sceneId: string, newNpcName: string): void
  (event: 'editSceneText', sceneId: string, newSceneText: string): void
}>()

const localUuid = uuidv4()
const sceneUuid = `scene-id-${localUuid}`
const npcUuid = `npc-name-${localUuid}`
const openUuid = `open-command-${localUuid}`
const closeUuid = `close-command-${localUuid}`
const buttonsUuid = `buttons-${localUuid}`
const sceneTextUuid = `scene-text-${localUuid}`
</script>

<template>
  <div class="scene-node-container">
    <div class="scene-node-header">
      <label :for=sceneUuid>
        Scene ID:
      </label>
      <span :id=sceneUuid>
        {{ props.data.sceneId }}
      </span>

      <label :for=npcUuid>
        NPC Name:
      </label>
      <input :id=npcUuid v-model="npcNameRef" />

      <label :for=openUuid>
        Open Command:
      </label>
      <span :id=openUuid>
        open!
      </span>

      <label :for=closeUuid>
        Close Command:
      </label>
      <span :id=closeUuid>
        close!
      </span>

    </div>

    <div class="scene-buttons">

    </div>

    <div class="scene-text">
      <label :for=sceneTextUuid>
        Scene Text
      </label>
      <textarea :id=sceneTextUuid v-model="sceneTextRef" />
    </div>
  </div>
</template>

<style scoped>
.scene-node-container {
  background-color: cadetblue;
  display: flex;
  align-content: center;
  flex-direction: column;
}
.scene-node-header {
  display: grid;
  grid-template-columns: fit-content(100px) 1fr;
  row-gap: 10px;  /* vertical spacing between rows */
  column-gap: 10px;
  align-items: center;
}
</style>