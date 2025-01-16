<template>
  <div ref="monacoEditorRef" style="height: 500px;height: 800px;"></div>
</template>
<script setup lang="ts">
import {useMonacoEditor} from "@/utils/monaco/main"
import { onMounted, ref } from "vue"
const monacoEditorRef = ref<HTMLElement | null>(null)
onMounted(()=>{
  useMonacoEditor(monacoEditorRef.value)
})
</script>