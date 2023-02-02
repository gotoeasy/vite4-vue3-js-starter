import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default ({ mode }) => {
  const { VITE_PORT, VITE_BASE_URL } = loadEnv(mode, process.cwd());

  return defineConfig({
    base: VITE_BASE_URL,
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue'],
        eslintrc: {
          enabled: false, // 若没'./.eslintrc-auto-import.json'文件，先开启，生成后在关闭
        },
      }),
      Components({
        resolvers: [],
      }),
    ],
    resolve: {
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
    server: {
      https: false, // 是否开启 https
      port: VITE_PORT, // 端口号
      host: '0.0.0.0', // 监听所有地址
      open: true, // 服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      proxy: {}, // 自定义代理规则
    },
    build: {
      target: 'es2015', // 设置最终构建的浏览器兼容目标
      sourcemap: false, // 构建后是否生成 source map 文件
      chunkSizeWarningLimit: 2000, //  chunk 大小警告的限制（以 kbs 为单位）
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
    },
  });
};
