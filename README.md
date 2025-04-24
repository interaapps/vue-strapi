# Vue Strapi
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