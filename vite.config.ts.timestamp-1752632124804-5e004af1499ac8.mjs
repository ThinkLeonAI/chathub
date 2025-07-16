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
      "16": "src/assets/icon.png",
      "32": "src/assets/icon.png",
      "48": "src/assets/icon.png",
      "128": "src/assets/icon.png"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0LmNvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY3J4KHsgbWFuaWZlc3QgfSlcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBwb3B1cDogJ3BvcHVwLmh0bWwnXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgaG1yOiB7XG4gICAgICBwb3J0OiA1MTczXG4gICAgfVxuICB9XG59KSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC9tYW5pZmVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3QoYXN5bmMgKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gICAgbmFtZTogJ0NoYXRIdWIgUGVyc29uYWwnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGVyc29uYWwgQUkgY2hhdGJvdCBleHRlbnNpb24gZm9yIENoYXRHUFQsIEdyb2ssIEdlbWluaSwgYW5kIENsYXVkZScsXG4gICAgdmVyc2lvbjogJzEuMC4wJyxcbiAgICBpY29uczoge1xuICAgICAgJzE2JzogJ3NyYy9hc3NldHMvaWNvbi5wbmcnLFxuICAgICAgJzMyJzogJ3NyYy9hc3NldHMvaWNvbi5wbmcnLFxuICAgICAgJzQ4JzogJ3NyYy9hc3NldHMvaWNvbi5wbmcnLFxuICAgICAgJzEyOCc6ICdzcmMvYXNzZXRzL2ljb24ucG5nJyxcbiAgICB9LFxuICAgIGJhY2tncm91bmQ6IHtcbiAgICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxuICAgICAgdHlwZTogJ21vZHVsZScsXG4gICAgfSxcbiAgICBhY3Rpb246IHtcbiAgICAgIGRlZmF1bHRfcG9wdXA6ICdwb3B1cC5odG1sJyxcbiAgICAgIGRlZmF1bHRfdGl0bGU6ICdDaGF0SHViIFBlcnNvbmFsJ1xuICAgIH0sXG4gICAgcGVybWlzc2lvbnM6IFtcbiAgICAgICdzdG9yYWdlJyxcbiAgICAgICdhY3RpdmVUYWInLFxuICAgICAgJ3NjcmlwdGluZydcbiAgICBdLFxuICAgIGhvc3RfcGVybWlzc2lvbnM6IFtcbiAgICAgICdodHRwczovL2FwaS5vcGVuYWkuY29tLyonLFxuICAgICAgJ2h0dHBzOi8vYXBpLnguYWkvKicsXG4gICAgICAnaHR0cHM6Ly9nZW5lcmF0aXZlbGFuZ3VhZ2UuZ29vZ2xlYXBpcy5jb20vKicsXG4gICAgICAnaHR0cHM6Ly9hcGkuYW50aHJvcGljLmNvbS8qJyxcbiAgICAgICdodHRwczovL2NoYXQub3BlbmFpLmNvbS8qJyxcbiAgICAgICdodHRwczovL2dyb2sueC5haS8qJyxcbiAgICAgICdodHRwczovL2dlbWluaS5nb29nbGUuY29tLyonLFxuICAgICAgJ2h0dHBzOi8vY2xhdWRlLmFpLyonXG4gICAgXSxcbiAgICBjb21tYW5kczoge1xuICAgICAgJ29wZW4tcG9wdXAnOiB7XG4gICAgICAgIHN1Z2dlc3RlZF9rZXk6IHtcbiAgICAgICAgICBkZWZhdWx0OiAnQ3RybCtTaGlmdCtDJyxcbiAgICAgICAgICBtYWM6ICdDb21tYW5kK1NoaWZ0K0MnXG4gICAgICAgIH0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnT3BlbiBDaGF0SHViIFBlcnNvbmFsJ1xuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudF9zZWN1cml0eV9wb2xpY3k6IHtcbiAgICAgIGV4dGVuc2lvbl9wYWdlczogXCJzY3JpcHQtc3JjICdzZWxmJzsgb2JqZWN0LXNyYyAnc2VsZidcIlxuICAgIH1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLFdBQVc7OztBQ0Y2TSxTQUFTLHNCQUFzQjtBQUVoUSxJQUFPLDBCQUFRLGVBQWUsWUFBWTtBQUN4QyxTQUFPO0FBQUEsSUFDTCxrQkFBa0I7QUFBQSxJQUNsQixNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsWUFBWTtBQUFBLE1BQ1YsZ0JBQWdCO0FBQUEsTUFDaEIsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGVBQWU7QUFBQSxNQUNmLGVBQWU7QUFBQSxJQUNqQjtBQUFBLElBQ0EsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGtCQUFrQjtBQUFBLE1BQ2hCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLGNBQWM7QUFBQSxRQUNaLGVBQWU7QUFBQSxVQUNiLFNBQVM7QUFBQSxVQUNULEtBQUs7QUFBQSxRQUNQO0FBQUEsUUFDQSxhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHlCQUF5QjtBQUFBLE1BQ3ZCLGlCQUFpQjtBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUNGLENBQUM7OztBRDdDRCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJLEVBQUUsa0NBQVMsQ0FBQztBQUFBLEVBQ2xCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
