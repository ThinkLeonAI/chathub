// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { crx } from "file:///home/project/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///home/project/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var manifest_config_default = defineManifest(async () => {
  return {
    manifest_version: 3,
    name: "ChatHub Personal",
    description: "Personal AI chatbot extension for ChatGPT, Grok, Gemini, and Claude",
    version: "1.0.0",
    icons: {
      "16": "src/assets/icon-16.png",
      "32": "src/assets/icon-32.png",
      "48": "src/assets/icon-48.png",
      "128": "src/assets/icon-128.png"
    },
    background: {
      service_worker: "src/background/index.ts",
      type: "module"
    },
    action: {
      default_popup: "popup.html",
      default_title: "ChatHub Personal"
    },
    permissions: [
      "storage",
      "activeTab",
      "scripting"
    ],
    host_permissions: [
      "https://api.openai.com/*",
      "https://api.x.ai/*",
      "https://generativelanguage.googleapis.com/*",
      "https://api.anthropic.com/*",
      "https://chat.openai.com/*",
      "https://grok.x.ai/*",
      "https://gemini.google.com/*",
      "https://claude.ai/*"
    ],
    commands: {
      "open-popup": {
        suggested_key: {
          default: "Ctrl+Shift+C",
          mac: "Command+Shift+C"
        },
        description: "Open ChatHub Personal"
      }
    },
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'"
    }
  };
});

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    react(),
    crx({ manifest: manifest_config_default })
  ],
  build: {
    rollupOptions: {
      input: {
        popup: "popup.html"
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0LmNvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY3J4KHsgbWFuaWZlc3QgfSlcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBwb3B1cDogJ3BvcHVwLmh0bWwnXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgaG1yOiB7XG4gICAgICBwb3J0OiA1MTczXG4gICAgfVxuICB9XG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC9tYW5pZmVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3QoYXN5bmMgKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gICAgbmFtZTogJ0NoYXRIdWIgUGVyc29uYWwnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGVyc29uYWwgQUkgY2hhdGJvdCBleHRlbnNpb24gZm9yIENoYXRHUFQsIEdyb2ssIEdlbWluaSwgYW5kIENsYXVkZScsXG4gICAgdmVyc2lvbjogJzEuMC4wJyxcbiAgICBpY29uczoge1xuICAgICAgJzE2JzogJ3NyYy9hc3NldHMvaWNvbi0xNi5wbmcnLFxuICAgICAgJzMyJzogJ3NyYy9hc3NldHMvaWNvbi0zMi5wbmcnLFxuICAgICAgJzQ4JzogJ3NyYy9hc3NldHMvaWNvbi00OC5wbmcnLFxuICAgICAgJzEyOCc6ICdzcmMvYXNzZXRzL2ljb24tMTI4LnBuZycsXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kOiB7XG4gICAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9iYWNrZ3JvdW5kL2luZGV4LnRzJyxcbiAgICAgIHR5cGU6ICdtb2R1bGUnLFxuICAgIH0sXG4gICAgYWN0aW9uOiB7XG4gICAgICBkZWZhdWx0X3BvcHVwOiAncG9wdXAuaHRtbCcsXG4gICAgICBkZWZhdWx0X3RpdGxlOiAnQ2hhdEh1YiBQZXJzb25hbCdcbiAgICB9LFxuICAgIHBlcm1pc3Npb25zOiBbXG4gICAgICAnc3RvcmFnZScsXG4gICAgICAnYWN0aXZlVGFiJyxcbiAgICAgICdzY3JpcHRpbmcnXG4gICAgXSxcbiAgICBob3N0X3Blcm1pc3Npb25zOiBbXG4gICAgICAnaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS8qJyxcbiAgICAgICdodHRwczovL2FwaS54LmFpLyonLFxuICAgICAgJ2h0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tLyonLFxuICAgICAgJ2h0dHBzOi8vYXBpLmFudGhyb3BpYy5jb20vKicsXG4gICAgICAnaHR0cHM6Ly9jaGF0Lm9wZW5haS5jb20vKicsXG4gICAgICAnaHR0cHM6Ly9ncm9rLnguYWkvKicsXG4gICAgICAnaHR0cHM6Ly9nZW1pbmkuZ29vZ2xlLmNvbS8qJyxcbiAgICAgICdodHRwczovL2NsYXVkZS5haS8qJ1xuICAgIF0sXG4gICAgY29tbWFuZHM6IHtcbiAgICAgICdvcGVuLXBvcHVwJzoge1xuICAgICAgICBzdWdnZXN0ZWRfa2V5OiB7XG4gICAgICAgICAgZGVmYXVsdDogJ0N0cmwrU2hpZnQrQycsXG4gICAgICAgICAgbWFjOiAnQ29tbWFuZCtTaGlmdCtDJ1xuICAgICAgICB9LFxuICAgICAgICBkZXNjcmlwdGlvbjogJ09wZW4gQ2hhdEh1YiBQZXJzb25hbCdcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbnRlbnRfc2VjdXJpdHlfcG9saWN5OiB7XG4gICAgICBleHRlbnNpb25fcGFnZXM6IFwic2NyaXB0LXNyYyAnc2VsZic7IG9iamVjdC1zcmMgJ3NlbGYnXCJcbiAgICB9XG4gIH1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxXQUFXOzs7QUNGNk0sU0FBUyxzQkFBc0I7QUFFaFEsSUFBTywwQkFBUSxlQUFlLFlBQVk7QUFDeEMsU0FBTztBQUFBLElBQ0wsa0JBQWtCO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFlBQVk7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLE1BQ2hCLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsSUFDakI7QUFBQSxJQUNBLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxrQkFBa0I7QUFBQSxNQUNoQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixjQUFjO0FBQUEsUUFDWixlQUFlO0FBQUEsVUFDYixTQUFTO0FBQUEsVUFDVCxLQUFLO0FBQUEsUUFDUDtBQUFBLFFBQ0EsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx5QkFBeUI7QUFBQSxNQUN2QixpQkFBaUI7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOzs7QUQ3Q0QsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSSxFQUFFLGtDQUFTLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
