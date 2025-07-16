// vite.config.ts
import { crx } from "file:///home/project/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import jotaiDebugLabel from "file:///home/project/node_modules/jotai/esm/babel/plugin-debug-label.mjs";
import jotaiReactRefresh from "file:///home/project/node_modules/jotai/esm/babel/plugin-react-refresh.mjs";
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///home/project/node_modules/vite-tsconfig-paths/dist/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///home/project/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var manifest_config_default = defineManifest(async () => {
  return {
    manifest_version: 3,
    name: "__MSG_appName__",
    description: "__MSG_appDesc__",
    default_locale: "en",
    version: "1.45.7",
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
    action: {},
    host_permissions: [
      "https://*.bing.com/",
      "https://*.openai.com/",
      "https://bard.google.com/",
      "https://*.chathub.gg/",
      "https://*.duckduckgo.com/",
      "https://*.poe.com/",
      "https://*.anthropic.com/",
      "https://*.claude.ai/"
    ],
    optional_host_permissions: ["https://*/*", "wss://*/*"],
    permissions: ["storage", "unlimitedStorage", "sidePanel", "declarativeNetRequestWithHostAccess", "scripting"],
    content_scripts: [
      {
        matches: ["https://chat.openai.com/*"],
        js: ["src/content-script/chatgpt-inpage-proxy.ts"]
      }
    ],
    commands: {
      "open-app": {
        suggested_key: {
          default: "Alt+J",
          windows: "Alt+J",
          linux: "Alt+J",
          mac: "Command+J"
        },
        description: "Open ChatHub app"
      }
    },
    side_panel: {
      default_path: "sidepanel.html"
    },
    declarative_net_request: {
      rule_resources: [
        {
          id: "ruleset_bing",
          enabled: true,
          path: "src/rules/bing.json"
        },
        {
          id: "ruleset_ddg",
          enabled: true,
          path: "src/rules/ddg.json"
        },
        {
          id: "ruleset_qianwen",
          enabled: true,
          path: "src/rules/qianwen.json"
        },
        {
          id: "ruleset_baichuan",
          enabled: true,
          path: "src/rules/baichuan.json"
        },
        {
          id: "ruleset_pplx",
          enabled: true,
          path: "src/rules/pplx.json"
        }
      ]
    }
  };
});

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [
      tsconfigPaths(),
      react({
        babel: {
          plugins: [jotaiDebugLabel, jotaiReactRefresh]
        }
      }),
      crx({ manifest: manifest_config_default })
    ],
    build: {
      rollupOptions: {
        input: ["app.html"]
      }
    },
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : []
    },
    server: {
      strictPort: true,
      port: 5173,
      hmr: {
        clientPort: 5173
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGpvdGFpRGVidWdMYWJlbCBmcm9tICdqb3RhaS9iYWJlbC9wbHVnaW4tZGVidWctbGFiZWwnXG5pbXBvcnQgam90YWlSZWFjdFJlZnJlc2ggZnJvbSAnam90YWkvYmFiZWwvcGx1Z2luLXJlYWN0LXJlZnJlc2gnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0LmNvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgICAgIHJlYWN0KHtcbiAgICAgICAgYmFiZWw6IHtcbiAgICAgICAgICBwbHVnaW5zOiBbam90YWlEZWJ1Z0xhYmVsLCBqb3RhaVJlYWN0UmVmcmVzaF0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGNyeCh7IG1hbmlmZXN0IH0pLFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IFsnYXBwLmh0bWwnXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBlc2J1aWxkOiB7XG4gICAgICBkcm9wOiBtb2RlID09PSAncHJvZHVjdGlvbicgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgICAgcG9ydDogNTE3MyxcbiAgICAgIGhtcjoge1xuICAgICAgICBjbGllbnRQb3J0OiA1MTczLFxuICAgICAgfSxcbiAgICB9LFxuICB9XG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L21hbmlmZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9wcm9qZWN0L21hbmlmZXN0LmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZU1hbmlmZXN0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdChhc3luYyAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgICBuYW1lOiAnX19NU0dfYXBwTmFtZV9fJyxcbiAgICBkZXNjcmlwdGlvbjogJ19fTVNHX2FwcERlc2NfXycsXG4gICAgZGVmYXVsdF9sb2NhbGU6ICdlbicsXG4gICAgdmVyc2lvbjogJzEuNDUuNycsXG4gICAgaWNvbnM6IHtcbiAgICAgICcxNic6ICdzcmMvYXNzZXRzL2ljb24ucG5nJyxcbiAgICAgICczMic6ICdzcmMvYXNzZXRzL2ljb24ucG5nJyxcbiAgICAgICc0OCc6ICdzcmMvYXNzZXRzL2ljb24ucG5nJyxcbiAgICAgICcxMjgnOiAnc3JjL2Fzc2V0cy9pY29uLnBuZycsXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kOiB7XG4gICAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9iYWNrZ3JvdW5kL2luZGV4LnRzJyxcbiAgICAgIHR5cGU6ICdtb2R1bGUnLFxuICAgIH0sXG4gICAgYWN0aW9uOiB7fSxcbiAgICBob3N0X3Blcm1pc3Npb25zOiBbXG4gICAgICAnaHR0cHM6Ly8qLmJpbmcuY29tLycsXG4gICAgICAnaHR0cHM6Ly8qLm9wZW5haS5jb20vJyxcbiAgICAgICdodHRwczovL2JhcmQuZ29vZ2xlLmNvbS8nLFxuICAgICAgJ2h0dHBzOi8vKi5jaGF0aHViLmdnLycsXG4gICAgICAnaHR0cHM6Ly8qLmR1Y2tkdWNrZ28uY29tLycsXG4gICAgICAnaHR0cHM6Ly8qLnBvZS5jb20vJyxcbiAgICAgICdodHRwczovLyouYW50aHJvcGljLmNvbS8nLFxuICAgICAgJ2h0dHBzOi8vKi5jbGF1ZGUuYWkvJyxcbiAgICBdLFxuICAgIG9wdGlvbmFsX2hvc3RfcGVybWlzc2lvbnM6IFsnaHR0cHM6Ly8qLyonLCAnd3NzOi8vKi8qJ10sXG4gICAgcGVybWlzc2lvbnM6IFsnc3RvcmFnZScsICd1bmxpbWl0ZWRTdG9yYWdlJywgJ3NpZGVQYW5lbCcsICdkZWNsYXJhdGl2ZU5ldFJlcXVlc3RXaXRoSG9zdEFjY2VzcycsICdzY3JpcHRpbmcnXSxcbiAgICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICAgIHtcbiAgICAgICAgbWF0Y2hlczogWydodHRwczovL2NoYXQub3BlbmFpLmNvbS8qJ10sXG4gICAgICAgIGpzOiBbJ3NyYy9jb250ZW50LXNjcmlwdC9jaGF0Z3B0LWlucGFnZS1wcm94eS50cyddLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGNvbW1hbmRzOiB7XG4gICAgICAnb3Blbi1hcHAnOiB7XG4gICAgICAgIHN1Z2dlc3RlZF9rZXk6IHtcbiAgICAgICAgICBkZWZhdWx0OiAnQWx0K0onLFxuICAgICAgICAgIHdpbmRvd3M6ICdBbHQrSicsXG4gICAgICAgICAgbGludXg6ICdBbHQrSicsXG4gICAgICAgICAgbWFjOiAnQ29tbWFuZCtKJyxcbiAgICAgICAgfSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdPcGVuIENoYXRIdWIgYXBwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzaWRlX3BhbmVsOiB7XG4gICAgICBkZWZhdWx0X3BhdGg6ICdzaWRlcGFuZWwuaHRtbCcsXG4gICAgfSxcbiAgICBkZWNsYXJhdGl2ZV9uZXRfcmVxdWVzdDoge1xuICAgICAgcnVsZV9yZXNvdXJjZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAncnVsZXNldF9iaW5nJyxcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHBhdGg6ICdzcmMvcnVsZXMvYmluZy5qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAncnVsZXNldF9kZGcnLFxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgcGF0aDogJ3NyYy9ydWxlcy9kZGcuanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ3J1bGVzZXRfcWlhbndlbicsXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBwYXRoOiAnc3JjL3J1bGVzL3FpYW53ZW4uanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ3J1bGVzZXRfYmFpY2h1YW4nLFxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgcGF0aDogJ3NyYy9ydWxlcy9iYWljaHVhbi5qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAncnVsZXNldF9wcGx4JyxcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHBhdGg6ICdzcmMvcnVsZXMvcHBseC5qc29uJyxcbiAgICAgICAgfSxc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
