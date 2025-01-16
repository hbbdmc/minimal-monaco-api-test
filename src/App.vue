<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import MonacoEditor from '@/components/MonacoEditor/index.vue'
const MonacoEditRef = ref<InstanceType<typeof MonacoEditor>>()

</script>

<template>

<div class="edit-container">
    <MonacoEditor ref="MonacoEditRef"/>
  </div>
</template>

<style scoped>
.edit-container{
  height: 800px;
  width:1000px;
  text-align: left;
}
</style>
