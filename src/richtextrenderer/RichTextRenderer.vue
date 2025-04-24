<script setup lang="ts">
import RichTextRendererPart, {RichTextRendererPartOption} from "./RichTextRendererPart.vue";
import {RootNode} from "./types";

const props = defineProps<{
  contents: RootNode | RootNode[];
  customTransformers?: Record<string, (block: RootNode, options: RichTextRendererPartOption) => void>
}>()

</script>

<template>
    <RichTextRendererPart v-if="Array.isArray(contents)" v-for="(entry, index) in contents" :key="index" :contents="entry" :custom-transformers="customTransformers" />
    <RichTextRendererPart :contents="contents"  :custom-transformers="customTransformers"/>
</template>