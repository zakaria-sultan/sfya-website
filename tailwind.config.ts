import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sfya: {
          navy: "#082653",
          navy2: "#041A3B",
          teal: "#087786",
          cyan: "#1196A8",
          gold: "#FFB51B",
          cream: "#F8F4EB",
          ink: "#13213A"
        }
      },
      boxShadow: { soft: "0 20px 70px rgba(8, 38, 83, 0.12)" },
      borderRadius: { xl2: "2rem" }
    }
  },
  plugins: []
};
export default config;
