import { Component } from 'vue';
import { RootNode } from './types';
export type RichTextRendererPartOption = {
    tag: string | Component;
    classes: string[];
    props: Record<string, any>;
    text: string | undefined;
};
type __VLS_Props = {
    contents: RootNode | RootNode[];
    customTransformers?: Record<string, (block: RootNode, options: RichTextRendererPartOption) => void>;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
