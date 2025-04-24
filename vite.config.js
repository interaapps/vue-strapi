import path from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

/**
 * @type {import('vite').UserConfig}
 */
const config = {
    build: {
        minify: false,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'vue-strapi',
            formats: ['es', 'umd']
        },
    },
    plugins: [
        vue(),
        dts()
    ],
}
export default config