<script setup lang="ts" generic="T extends AnyStrapiDocument">
import {AnyStrapiDocument, useDocument} from "./index";
import {watch} from "vue";

const props = defineProps<{
  plural: string;
  id: string;
}>()

const {entry, isLoading, error, load} = useDocument(props.plural, props.id)
if (import.meta.server) await promise.value;

watch(props, () => {
  load()
}, {deep: true})
</script>

<template>
  <slot v-if="isLoading" name="loading"></slot>
  <slot v-else-if="error" name="error">{{ error }}</slot>
  <slot v-else name="entry" :entries="entry"></slot>
</template>