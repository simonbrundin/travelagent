import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    srcDir: "src/nuxt/app/",
    runtimeConfig: {
        // Server-side only keys (not exposed to client)
        aerodataboxApiKey: "",
        // Public keys (exposed to client)
        public: {
            // Ignav API - flight search (from .env)
            ignavApiKey: "",
            // AeroDataBox API - available on client if needed
            aerodataboxApiKey: "",
        },
    },
});
