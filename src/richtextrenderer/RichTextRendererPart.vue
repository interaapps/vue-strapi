<script setup lang="ts">
import {type Component, computed} from "vue";
import RichTextRenderer from "./RichTextRenderer.vue";
import RTRText from "./RTRText.vue";
import {
  CodeBlockNode,
  HeadingBlockNode, ImageBlockNode, LinkInlineNode,
  ListBlockNode, ListItemInlineNode,
  ParagraphBlockNode, QuoteBlockNode,
  RootNode,
  TextInlineNode
} from "./types";

export type RichTextRendererPartOption = {
  tag: string | Component,
  classes: string[],
  props: Record<string, any>,
  text: string | undefined
}

const props = defineProps<{
  contents: RootNode | RootNode[];
  customTransformers?: Record<string, (block: RootNode, options: RichTextRendererPartOption) => void>
}>()

const NODE_TRANSFORMERS = {
  heading: (block: HeadingBlockNode, options: RichTextRendererPartOption) => {
    options.tag = `h${block.level}`
  },
  paragraph: (block: ParagraphBlockNode, options: RichTextRendererPartOption) => {
    options.tag = 'p'
  },
  text: (block: TextInlineNode, options: RichTextRendererPartOption) => {
    options.tag = RTRText
  },
  code: (block: CodeBlockNode, options: RichTextRendererPartOption) => {
    options.tag = 'pre'
  },
  list: (block: ListBlockNode, options: RichTextRendererPartOption) => {
    options.tag = block.format === 'ordered' ? 'ol' : 'ul'
  },
  'list-item': (block: ListItemInlineNode, options: RichTextRendererPartOption) => {
    options.tag = 'li'
  },
  image: (block: ImageBlockNode, options: RichTextRendererPartOption) => {
    options.tag = 'img'
    options.props = {
      src: block.image.url,
      alt: block.image.alternativeText || '',
      width: block.image.width,
      height: block.image.height
    }
  },
  link: (block: LinkInlineNode, options: RichTextRendererPartOption) => {
    options.tag = 'a'
    options.props = {
      href: block.url,
    }
  },
  quote: (block: QuoteBlockNode, options: RichTextRendererPartOption) => {
    options.tag = 'blockquote'
  },
} as Record<string, (block: any, options: RichTextRendererPartOption) => void>

const contentsSettings = computed(() => {
  const options = {
    tag: 'div',
    innerHTML: undefined,
    classes: [],
    props: {},
    text: undefined
  }
  if (!('type' in props.contents)) return options;

  NODE_TRANSFORMERS[props.contents.type]?.(props.contents, options)
  props.customTransformers?.[props.contents.type]?.(props.contents, options)

  return options;
})
</script>

<template>
  <component :is="contentsSettings.tag" :class="contentsSettings.classes || []" :contents="contents" v-bind="{...contentsSettings.props}">
      <RichTextRenderer v-if="'children' in contents" :contents="contents.children as RootNode[]" :custom-transformers="customTransformers" />
      <template v-else-if="contentsSettings?.text">{{contentsSettings?.text}}</template>
  </component>
</template>