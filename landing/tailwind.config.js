/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: "#0A2342",
                    light: "#12315C",
                    dark: "#061A33",
                    deep: "#041224",
                },
                gold: {
                    DEFAULT: "#C9A227",
                    light: "#DDBB4E",
                    dark: "#A8861D",
                },
                ink: {
                    DEFAULT: "#1A1F24",
                    soft: "#4A5568",
                },
                mist: "#F8F9FA",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
                popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
                primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
                secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
                muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
                accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
                destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
            },
            fontFamily: {
                heading: ["Manrope", "sans-serif"],
                body: ['"DM Sans"', "sans-serif"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
                "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
                "scroll-cue": {
                    "0%": { transform: "scaleY(0)", transformOrigin: "top" },
                    "45%": { transform: "scaleY(1)", transformOrigin: "top" },
                    "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
                    "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
                },
            },
            animation: {
                marquee: "marquee 48s linear infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "scroll-cue": "scroll-cue 2.2s ease-in-out infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
