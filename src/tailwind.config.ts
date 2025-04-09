// tailwind.config.ts
import "./index.css"
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark_blue: 'var(--dark-blue)',
        very_dark_blue_bg: 'var(--very-dark-blue-bg)',
        very_dark_blue_txt: 'var(--very-dark-blue-txt)',
        dark_gray: 'var(--dark-gray)',
        very_light_gray: 'var(--very-light-gray)',
        white: 'var(--white)', // this one is redundant; Tailwind already has "white"
      },
    },
  },
  plugins: [],
}

export default config
