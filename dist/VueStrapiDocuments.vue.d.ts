import { AnyStrapiDocument, StrapiQueryParams } from './index';
declare const _default: <T extends AnyStrapiDocument>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{} & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, never>, never> & {
        plural: string;
        filter?: StrapiQueryParams<T>;
    } & Partial<{}>> & import('vue').PublicProps;
    expose(exposed: import('vue').ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: {
        loading?(_: {}): any;
        error?(_: {}): any;
        entries?(_: {
            entries: import('@vue/reactivity').UnwrapRefSimple<T>[] | undefined;
            meta: {
                pagination?: {
                    page: number;
                    pageSize: number;
                    total: number;
                } | undefined;
            } | undefined;
        }): any;
    };
    emit: {};
}>) => import('vue').VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
