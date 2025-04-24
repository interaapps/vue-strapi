<script lang="ts" setup>
import {computed, ref} from "vue";
import {TextInlineNode} from "./types";

const props = defineProps<{
  contents: TextInlineNode;
  class?: string[]|string
}>()

const tag = ref('span')
const classes = computed(() => {
  const classes = []
  if (props.contents.italic)
    classes.push('vue-strapi-italic')
  if (props.contents.bold)
    classes.push('vue-strapi-bold')
  if (props.contents.underline)
    classes.push('vue-strapi-underline')
  if (props.contents.strikethrough)
    classes.push('vue-strapi-line-through')
  if (props.contents.code) {
    classes.push('vue-strapi-code')
    tag.value = 'code'
  }

  return classes
})
</script>
<template>
  <template v-if="!classes.length">{{contents.text}}</template>
  <component :is="tag" v-else :class="[...(props.class||[]), ...classes]">{{contents.text}}</component>
</template>