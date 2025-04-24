import { App } from 'vue';
export { default as BlockRenderer } from './BlockRenderer.vue';
export { default as VueStrapiDocuments } from './VueStrapiDocuments.vue';
export { default as VueStrapiDocument } from './VueStrapiDocument.vue';
export { default as RichTextRenderer } from './richtextrenderer/RichTextRenderer.vue';
export type VueStrapiOptions = {
    baseUrl: string;
    token?: string;
    fetch?: typeof globalThis.fetch;
    headers?: Record<string, string>;
};
export declare const install: (app: App, options: VueStrapiOptions) => void;
export declare const useStrapi: () => unknown;
export declare const useStrapiFetch: <T>(url: string, options?: RequestInit & {
    query?: Record<string, any>;
}, { immediate }?: {
    immediate?: boolean | undefined;
}) => {
    data: [T | undefined] extends [import('vue').Ref<any, any>] ? import('@vue/shared').IfAny<import('vue').Ref<any, any> & T, import('vue').Ref<import('vue').Ref<any, any> & T, import('vue').Ref<any, any> & T>, import('vue').Ref<any, any> & T> : import('vue').Ref<import('vue').UnwrapRef<T> | undefined, T | import('vue').UnwrapRef<T> | undefined>;
    error: import('vue').Ref<unknown, unknown>;
    isLoading: import('vue').Ref<boolean, boolean>;
    execute: () => Promise<void>;
};
export declare const useDocument: <T>(pluralId: string, id: string) => {
    entry: import('vue').ComputedRef<import('vue').UnwrapRef<T> | undefined>;
    isLoading: import('vue').Ref<boolean, boolean>;
    error: import('vue').Ref<unknown, unknown>;
    load: () => Promise<void>;
};
type Primitive = string | number | boolean | null;
type Operators = '$eq' | '$eqi' | '$ne' | '$nei' | '$lt' | '$lte' | '$gt' | '$gte' | '$in' | '$notIn' | '$contains' | '$notContains' | '$containsi' | '$notContainsi' | '$null' | '$notNull' | '$between' | '$startsWith' | '$startsWithi' | '$endsWith' | '$endsWithi' | '$not';
type LogicalOperators<T> = {
    $and?: Filter<T>[];
    $or?: Filter<T>[];
    $not?: Filter<T>;
};
type FilterOperatorObject<T> = {
    [K in Operators]?: T extends Primitive ? T | T[] : never;
};
type Filter<T> = {
    [P in keyof T]?: T[P] extends Primitive ? FilterOperatorObject<T[P]> | T[P] : Filter<T[P]>;
} & LogicalOperators<T>;
export type StrapiQueryParams<T> = {
    filters?: Filter<T>;
    fields?: (keyof T | string)[];
    populate?: (keyof T | string)[] | Record<string, any>;
    sort?: (keyof T | string)[];
    pagination?: {
        page?: number;
        pageSize?: number;
        withCount?: boolean;
    };
};
export type StrapiDocument = {
    id: string;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};
export type AnyStrapiDocument = StrapiDocument & {
    [key: string]: any;
};
export declare const strapiQueryParams: (params: Record<string, any>) => Record<string, string>;
export type StrapiDocumentsResponse<T> = {
    data: T[];
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    };
};
export declare const useDocuments: <T>(pluralId: string, query?: StrapiQueryParams<T>) => {
    entries: import('vue').ComputedRef<import('@vue/reactivity').UnwrapRefSimple<T>[] | undefined>;
    isLoading: import('vue').Ref<boolean, boolean>;
    error: import('vue').Ref<unknown, unknown>;
    meta: import('vue').ComputedRef<{
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        } | undefined;
    } | undefined>;
    load: () => Promise<void>;
};
export declare const useFirstDocument: <T>(pluralId: string, query?: StrapiQueryParams<T>) => {
    entry: import('vue').ComputedRef<import('@vue/reactivity').UnwrapRefSimple<T> | undefined>;
    isLoading: import('vue').Ref<boolean, boolean>;
    error: import('vue').Ref<unknown, unknown>;
    meta: import('vue').ComputedRef<{
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        } | undefined;
    } | undefined>;
    load: () => Promise<void>;
};
