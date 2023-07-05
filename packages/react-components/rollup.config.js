import replace from '@rollup/plugin-replace'
import esbuild from 'rollup-plugin-esbuild'
import litCss from 'rollup-plugin-lit-css'
import minifyHtml from 'rollup-plugin-minify-html-literals'
import packageJson from './package.json' assert { type: 'json' }

function createConfig(packageJson) {
    const output = {
        exports: 'named',
        name: packageJson.name
    }

    const esbuildPlugin = esbuild({
        minify: true,
        tsconfig: './tsconfig.json',
        platform: 'browser',
        treeShaking: true,
        sourceMap: true,
        loaders: {
            '.json': 'json'
        }
    })

    const litCssPlugin = litCss({
        include: ['**/*.css'],
        uglify: true
    })

    const replacePlugin = replace({
        'process.env.ROLLUP_W3M_VERSION': JSON.stringify(packageJson.version)
    })

    const plugins = [replacePlugin, litCssPlugin, minifyHtml.default(), esbuildPlugin]

    return [
        {
            input: './src/index.ts',
            plugins,
            output: [{ file: './dist/index.es.js', format: 'es', ...output }]
        }
    ]
}

export default createConfig(packageJson)