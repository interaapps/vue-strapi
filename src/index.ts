import {App, computed, inject, ref} from "vue";

export {default as BlockRenderer} from './BlockRenderer.vue'
export {default as VueStrapiDocuments} from './VueStrapiDocuments.vue'
export {default as VueStrapiDocument} from './VueStrapiDocument.vue'
export {default as RichTextRenderer} from './richtextrenderer/RichTextRenderer.vue'


const INJECTION_KEY = Symbol()


export type VueStrapiOptions = {
    baseUrl: string
    token?: string
    fetcher?: (url, ) => Response
    headers?: Record<string, string>
}

export const install = (app: App, options: VueStrapiOptions) => {
    options.fetcher ??= (url: string, options) => {
        return fetch(url, options).then(r => r.json())
    };
    app.provide(INJECTION_KEY, options)
}

export const useStrapi = () => {
    return inject(INJECTION_KEY)
}

function deepMerge<T extends Record<any, any>>(target: T, ...sources: T[]) {
    for (const source of sources) {
        for (const [key, value] of Object.entries(source)) {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                if (!target[key] || typeof target[key] !== 'object') {
                    (target as any)[key] = {};
                }
                deepMerge(target[key], value);
            } else {
                (target as any)[key] = value;
            }
        }
    }
    return target;
}

export const useStrapiFetch = <T>(url: string, options: RequestInit & {
    query?: Record<string, any>
} = {}, {immediate = true} = {}) => {
    const vueStrapi = inject<VueStrapiOptions>(INJECTION_KEY)
    const error = ref<unknown>(undefined)
    const data = ref<T | undefined>(undefined)
    const isLoading = ref(immediate ?? false)

    let res: (() => void) | undefined = undefined
    let rej: (() => void) | undefined = undefined
    const promise = ref(new Promise<void>((pres, prej) => {
        res = pres
        rej = prej
    }))

    const execute = async () => {
        isLoading.value = true
        try {
            const outurl = `${vueStrapi?.baseUrl}${url}${options.query ? `?${new URLSearchParams(strapiQueryParams(options.query)).toString()}` : ''}`
            if ('query' in options) delete options.query

            data.value = await vueStrapi.fetcher(outurl, deepMerge({
                headers: {
                    ...(vueStrapi?.token ? {Authorization: `Bearer ${vueStrapi?.token}`} : {}),
                    'Content-Type': 'application/json'
                }
            }, options)) as T
            res?.()
        } catch (e) {
            error.value = e
            rej?.(e)
        } finally {
            isLoading.value = false
        }
    }
    if (immediate) {
        execute()
    }

    return {
        data,
        error,
        isLoading,
        execute,
        promise
    }
}

type Primitive = string | number | boolean | null;

type Operators =
    | '$eq' | '$eqi' | '$ne' | '$nei' | '$lt' | '$lte' | '$gt' | '$gte'
    | '$in' | '$notIn' | '$contains' | '$notContains' | '$containsi' | '$notContainsi'
    | '$null' | '$notNull' | '$between' | '$startsWith' | '$startsWithi'
    | '$endsWith' | '$endsWithi' | '$not';

type LogicalOperators<T> = {
    $and?: Filter<T>[];
    $or?: Filter<T>[];
    $not?: Filter<T>;
};

type FilterOperatorObject<T> = {
    [K in Operators]?: T extends Primitive ? T | T[] : never;
};

type Filter<T> = {
    [P in keyof T]?: T[P] extends Primitive
        ? FilterOperatorObject<T[P]> | T[P]
        : Filter<T[P]>; // Recursive nesting
} & LogicalOperators<T>;

export type StrapiDocument = {
    id: string;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export type AnyStrapiDocument = StrapiDocument & {
    [key: string]: any;
}

export const strapiQueryParams = (params: Record<string, any>) => {
    const query: Record<string, string> = {};

    const buildQuery = (prefix: string, obj: any) => {
        if (typeof obj !== 'object' || obj === null) {
            query[prefix] = String(obj);
        } else {
            for (const [key, value] of Object.entries(obj)) {
                buildQuery(`${prefix}[${key}]`, value);
            }
        }
    };

    for (const [key, value] of Object.entries(params)) {
        buildQuery(key, value);
    }

    return query;
};

export type StrapiDocumentsResponse<T> = {
    data: T[]
    meta: {
        pagination?: {
            page: number
            pageSize: number
            total: number
        }
    }
}

export type StrapiLocaleQueryParams = {
    locale?: string
}
export type StrapiFieldsQueryParams<T> = {
    fields?: (keyof T | string)[];
}

export type StrapiDocumentQueryParams<T> = StrapiLocaleQueryParams & StrapiFieldsQueryParams<T>

export const useDocument = <T>(pluralId: string, id: string, query?: StrapiDocumentQueryParams<T>) => {
    const {data, isLoading, error, execute: load, promise} = useStrapiFetch<{
        data: T,
        meta: any
    }>(`/${pluralId}/${id}`, {query})
    const entry = computed(() => data.value?.data)
    const meta = computed(() => data.value?.meta)
    return {entry, isLoading, error, load, meta, promise}
}


export type StrapiQueryParams<T> = {
    filters?: Filter<T>;
    populate?: (keyof T | string)[] | Record<string, any>;
    sort?: (keyof T | string)[];
    pagination?: {
        page?: number;
        pageSize?: number;
        withCount?: boolean;
    };
} & StrapiLocaleQueryParams & StrapiFieldsQueryParams<T>;


export const useDocuments = <T>(pluralId: string, query?: StrapiQueryParams<T>) => {
    const {data, isLoading, error, execute: load, promise} = useStrapiFetch<StrapiDocumentsResponse<T>>(`/${pluralId}`, {query})
    const entries = computed(() => data.value?.data)
    const meta = computed(() => data.value?.meta)
    return {entries, isLoading, error, meta, load, promise}
}

export const useFirstDocument = <T>(pluralId: string, query?: StrapiQueryParams<T>) => {
    const {entries, isLoading, error, meta, load, promise} = useDocuments<T>(pluralId, deepMerge({
        pagination: {
            page: 1,
            pageSize: 1
        }
    }, query || {}))
    const first = computed(() => entries.value?.[0])
    return {entry: first, isLoading, error, meta, load, promise}
}
