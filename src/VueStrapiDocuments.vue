<script setup lang="ts" generic="T extends AnyStrapiDocument">
import {AnyStrapiDocument, StrapiQueryParams, useDocuments} from "./index";
import {watch} from "vue";

const props = defineProps<{
  plural: string;
  filter?: StrapiQueryParams<T>;
}>()

const {entries, isLoading, error, meta, load, promise} = useDocuments(props.plural, props.filter || {})
if (import.meta.server) await promise.value;

watch(props, () => {
  load()
}, {deep: true})
</script>

<template>
  <slot v-if="isLoading" name="loading"></slot>
  <slot v-else-if="error" name="error">{{ error }}</slot>
  <slot v-else name="entries" :entries="entries" :meta="meta"></slot>
</template>