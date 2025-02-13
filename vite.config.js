import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import UnpluginIcons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { viteMockServe } from 'vite-plugin-mock';
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';
import VueDevTools from 'vite-plugin-vue-devtools';
const getPathURL = (url) => fileURLToPath(new URL(url, import.meta.url));
const getBoolean = (value) => value === 'true';
const getNumber = (value, fallback) => Number(value) || fallback;
async function readPackageJSON(root) {
    const packagePath = resolve(root, 'package.json');
    const content = await readFileSync(packagePath, { encoding: 'utf-8' });
    return JSON.parse(content);
}
export async function viteMetadataPlugin(root = process.cwd()) {
    const { author, homepage, license, version } = await readPackageJSON(root);
    return {
        name: 'vite:inject-metadata',
        enforce: 'post',
        async config() {
            const isAuthorObject = typeof author === 'object';
            const authorName = isAuthorObject ? author?.name : author;
            const authorEmail = isAuthorObject ? author?.email : null;
            const authorUrl = isAuthorObject ? author?.url : null;
            const metadata = {
                authorEmail,
                authorName,
                authorUrl,
                homepage,
                license,
                version
            };
            return {
                define: {
                    __KING_ADMIN_METADATA__: JSON.stringify(metadata),
                    'import.meta.env.VITE_APP_VERSION': JSON.stringify(version)
                }
            };
        }
    };
}
const paths = {
    src: getPathURL('./src'),
    mock: getPathURL('./mock'),
    autoImports: getPathURL('./src/types/auto/auto-imports.d.ts'),
    components: getPathURL('./src/types/auto/components.d.ts')
};
function loadConditionPlugins(conditionPlugins) {
    const plugins = [];
    for (const conditionPlugin of conditionPlugins) {
        if (conditionPlugin.condition) {
            const realPlugins = conditionPlugin.plugins();
            plugins.push(...realPlugins);
        }
    }
    return plugins.flat();
}
function loadCommonPlugins() {
    const commonPlugins = [
        Vue(),
        UnoCSS(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            dts: paths.autoImports
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass'
                })
            ],
            dts: paths.components
        }),
        createStyleImportPlugin({
            resolves: [ElementPlusResolve()],
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    resolveStyle: (name) => {
                        return `element-plus/theme-chalk/${name}.css`;
                    }
                }
            ]
        })
    ].map((plugin) => ({ condition: true, plugins: () => [plugin] }));
    return commonPlugins;
}
function loadApplicationPlugins(options) {
    const isBuild = options.isBuild;
    const env = options.env;
    const { mock, compress, devTools, icons, injectMetadata, imageOptimizer } = options;
    const commonPlugins = loadCommonPlugins();
    const plugins = loadConditionPlugins([
        ...commonPlugins,
        {
            condition: injectMetadata,
            plugins: () => [viteMetadataPlugin()]
        },
        {
            condition: mock,
            plugins: () => [
                viteMockServe({
                    ignore: /^_/,
                    mockPath: paths.mock,
                    enable: mock,
                    watchFiles: !isBuild,
                    logger: !isBuild
                })
            ]
        },
        {
            condition: compress,
            plugins: () => {
                const compressPlugins = [];
                switch (env.VITE_COMPRESS) {
                    case 'gzip': {
                        compressPlugins.push(viteCompression({
                            ext: '.gz'
                        }));
                        break;
                    }
                    case 'brotli': {
                        compressPlugins.push(viteCompression({
                            ext: '.br',
                            algorithm: 'brotliCompress'
                        }));
                        break;
                    }
                }
                return compressPlugins;
            }
        },
        {
            condition: !isBuild && devTools,
            plugins: () => [VueDevTools()]
        },
        {
            condition: !isBuild && icons,
            plugins: () => [UnpluginIcons()]
        },
        {
            condition: imageOptimizer,
            plugins: () => [ViteImageOptimizer()]
        }
    ]);
    return plugins;
}
export default defineConfig(({ mode, command }) => {
    const root = process.cwd();
    const isBuild = command === 'build';
    const env = loadEnv(mode, root);
    const { VITE_BASE_API_URL, VITE_COMPRESS, VITE_DEVTOOLS, VITE_PORT, VITE_MOCK_SERVER } = env;
    const plugins = loadApplicationPlugins({
        isBuild,
        env,
        injectMetadata: true,
        mock: getBoolean(VITE_MOCK_SERVER),
        compress: VITE_COMPRESS !== 'none',
        devTools: getBoolean(VITE_DEVTOOLS),
        imageOptimizer: true,
        icons: true
    });
    const applicationConfig = {
        base: '/',
        build: {
            rollupOptions: {
                output: {
                    assetFileNames: '[ext]/[name]-[hash].[ext]',
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'jse/index-[name]-[hash].js'
                }
            },
            target: 'es2015'
        },
        esbuild: {
            ...(isBuild
                ? {
                    pure: [],
                    drop: []
                }
                : {})
        },
        resolve: {
            alias: {
                '@': paths.src
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    additionalData: '@use "@/desgin/ui/vars/index.scss" as *;'
                }
            }
        },
        plugins,
        server: {
            host: '0.0.0.0',
            port: getNumber(VITE_PORT, 3060),
            hmr: true,
            proxy: {
                [VITE_BASE_API_URL]: {
                    target: VITE_BASE_API_URL,
                    rewrite: (path) => path.replace(new RegExp(`^${VITE_BASE_API_URL}`), ''),
                    changeOrigin: true
                }
            }
        },
        optimizeDeps: {
            include: [
                'vue',
                'vue-router',
                'pinia',
                'axios',
                '@vueuse/core',
                'echarts',
                'vue-i18n',
                'element-plus/es/locale/lang/en',
                'element-plus/es/locale/lang/zh-cn'
            ]
        }
    };
    return applicationConfig;
});
