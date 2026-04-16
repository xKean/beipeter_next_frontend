import nextConfig from 'eslint-config-next'

const config = [
  ...nextConfig,
  {
    rules: {
      'prefer-const': 'off',
      // Next 16 ships react-hooks v7 with stricter defaults than the
      // tailwindui template was written for. Keep them off to avoid
      // rewriting template patterns that ship with the starter.
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
