import { UserConfigExport } from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

/** 配置项文档：https://vitejs.dev/config */
export default (): UserConfigExport => {
  return {
    /** 打包时根据实际情况修改 base */
    base: './',
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      /** 是否开启 HTTPS */
      https: false,
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 3333,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false
      /** 接口代理 */
      // proxy: {
      //   "/mock-api": {
      //     target: "https://vue-typescript-admin-mock-server-armour.vercel.app/mock-api",
      //     ws: true,
      //     /** 是否允许跨域 */
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace("/mock-api", "")
      //   }
      // }
    },
    build: {
      brotliSize: false,
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
      minify: 'terser',
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        output: {
          /** 删除注释 */
          comments: false
        }
      },
      /** 打包后静态资源目录 */
      assetsDir: 'static'
    },
    /** Vite 插件 */
    plugins: [
      vue(),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      /** Unocss */
      Unocss(),

      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: './types/auto-imports.d.ts',
        /** 自动按需导入 Element-Plus 相关函数，比如 ElMessage */
        resolvers: [],
        /** 根据自动按需导入的相关 API，生成 .eslintrc-auto-import.json 文件供 Eslint 识别 */
        //当enabled为true时，会根据filepath生成一个eslint的配置文件,这个文件需要引入到eslint的配置文件中,重新启动项目，这样才会生成这个配置文件
        //一旦生成配置文件之后，最好把enable关掉，即改成false
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      })
    ]
  }
}
