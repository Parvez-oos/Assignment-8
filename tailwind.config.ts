import type { Config } from "tailwindcss";
import daisyui from "daisyui";

// Define a type that combines Tailwind's Config with DaisyUI's properties
type TailwindConfigWithDaisyUI = Config & {
  daisyui?: {
    themes?: boolean | string[];
    darkTheme?: string;
    base?: boolean;
    utils?: boolean;
    logs?: boolean;
    rtl?: boolean;
    prefix?: string;
    styled?: boolean;
  };
};

const config: TailwindConfigWithDaisyUI = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"], 
  },
};

export default config;