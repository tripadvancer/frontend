import { defineConfig, globalIgnores } from 'eslint/config'

import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
    ...nextVitals,
    {
        rules: {
            'react-hooks/immutability': 'off',
            'react-hooks/set-state-in-effect': 'off',
        },
    },
    globalIgnores(['public/sw.js', 'public/workbox-*.js', 'src/components/vendor/**']),
])

export default eslintConfig
