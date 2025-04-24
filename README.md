# Vue Strapi `experimental`
```bash
npm install vue-strapi
```


### Init
```ts
import {install as VueStrapi} from 'vue-strapi'

app.use(VueStrapi, {
    baseUrl: 'https://strapi.example.com',
})
```

## Usage
### composables
```ts
import {useDocument, StrapiDocument, useDocuments, useFirstDocument} from 'vue-strapi'

type Article = {
    slug: string;
    title: string;
} & StrapiDocument

const {entry, error, isLoading} = useDocument<Article>('articles')
const {entries, error, isLoading} = useDocuments<Article>('articles')
const {entry, error, isLoading} = useFirstDocument<Article>('articles')
```

### RichTextRenderer
```vue
<template>
    <RichTextRenderer :contents="entry.richtext" />
</template>
```

### Helper Components
```vue
<template>
    <StrapiDocuments plural="articles">
      <template #loading>Loading...</template>
      <template #error="{ error }">An Error occured</template>
      <template #entries="{ entries }">Entry!</template>
    </StrapiDocuments>
    <StrapiDocument plural="articles" id="...">
      <template #loading>Loading...</template>
      <template #error="{ error }">An Error occured</template>
      <template #entry="{ entry }">Entry!</template>
    </StrapiDocument>
</template>
```


## NuxtJS
### Plugin
```ts
import {install} from "vue-strapi";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    
    install(nuxtApp.vueApp, {
        baseUrl: config.public.strapiBaseUrl,
    })
})
```
### SSR
```vue
<script lang="ts" setup>
type Article = {
    id: number;
    slug: string;
    title: string;
    inhalt: any;
    richtext: any;
} & StrapiDocument

const { entry, promise } = useDocument<Article>('articles', 'irsa8q9sdfxwii4gpmfuqrct')

// Wait until the promise is resolved on the server
if (import.meta.server) await promise.value;
</script>
<template></template>
```