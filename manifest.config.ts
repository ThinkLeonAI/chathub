import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest(async () => {
  return {
    manifest_version: 3,
    name: 'ChatHub Personal',
    description: 'Personal AI chatbot extension for ChatGPT, Grok, Gemini, and Claude',
    version: '1.0.0',
    icons: {
      '16': 'src/assets/icon-16.png',
      '32': 'src/assets/icon-32.png',
      '48': 'src/assets/icon-48.png',
      '128': 'src/assets/icon-128.png',
    },
    background: {
      service_worker: 'src/background/index.ts',
      type: 'module',
    },
    action: {
      default_popup: 'popup.html',
      default_title: 'ChatHub Personal'
    },
    permissions: [
      'storage',
      'activeTab',
      'scripting'
    ],
    host_permissions: [
      'https://api.openai.com/*',
      'https://api.x.ai/*',
      'https://generativelanguage.googleapis.com/*',
      'https://api.anthropic.com/*',
      'https://chat.openai.com/*',
      'https://grok.x.ai/*',
      'https://gemini.google.com/*',
      'https://claude.ai/*'
    ],
    commands: {
      'open-popup': {
        suggested_key: {
          default: 'Ctrl+Shift+C',
          mac: 'Command+Shift+C'
        },
        description: 'Open ChatHub Personal'
      }
    },
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'"
    }
  }
})