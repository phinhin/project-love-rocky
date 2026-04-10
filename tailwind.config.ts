import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0f1a',
        panel: '#0d1424',
        pixelCyan: '#7cf7ff',
        pixelPink: '#ff52d6',
        pixelGold: '#ffd166',
        pixelGreen: '#89ff84',
        parchment: '#f6f2d7',
        steel: '#24314f'
      },
      boxShadow: {
        pixel: '6px 6px 0 #05070d',
        pixelSm: '4px 4px 0 #05070d'
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['monospace']
      }
    }
  },
  plugins: []
};

export default config;
