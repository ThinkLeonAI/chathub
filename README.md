# ChatHub Personal

A customized, independent browser extension for personal use with ChatGPT, Grok, Gemini, and Claude.

## Features

- **Multi-Chatbot Interface**: Chat with multiple AI models simultaneously
- **API & Web Modes**: Use official APIs or web interfaces for each chatbot
- **Consensus Analysis**: Compare and analyze responses from multiple chatbots
- **Privacy-First**: All data stored locally, no external tracking
- **Modern UI**: Dark/light themes, responsive layouts, voice input/output
- **Prompt Management**: Built-in prompt library with import/export
- **Keyboard Shortcuts**: Quick access via Ctrl+Shift+C

## Supported Chatbots

1. **ChatGPT** (OpenAI)
   - API: Requires OpenAI API key
   - Web: Uses chat.openai.com

2. **Grok** (xAI)
   - API: Requires xAI API key from https://x.ai/api
   - Web: Uses grok.x.ai

3. **Gemini** (Google)
   - API: Requires Google AI API key
   - Web: Uses gemini.google.com

4. **Claude** (Anthropic)
   - API: Requires Anthropic API key
   - Web: Uses claude.ai

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Build the extension:
   ```bash
   yarn build
   ```

4. Load in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## Configuration

1. Click the extension icon or use Ctrl+Shift+C
2. Go to Settings tab
3. Configure each chatbot:
   - Enable/disable chatbots
   - Choose API or Web mode
   - Enter API keys for API mode
   - Test API key validity

## API Keys Setup

### ChatGPT (OpenAI)
1. Visit https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and paste into ChatHub settings

### Grok (xAI)
1. Visit https://x.ai/api
2. Sign up and create an API key
3. Copy and paste into ChatHub settings

### Gemini (Google)
1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy and paste into ChatHub settings

### Claude (Anthropic)
1. Visit https://console.anthropic.com/
2. Create an API key
3. Copy and paste into ChatHub settings

## Usage

### Basic Chat
1. Open the extension popup
2. Select which chatbots to use
3. Type your message and press Enter
4. View responses in grid, stacked, or carousel layout

### Consensus Mode
1. Enable "Consensus Mode" in settings
2. Send a message to multiple chatbots
3. View analysis of common points and differences

### Voice Features
1. Enable voice input/output in settings
2. Click microphone icon to speak your message
3. Responses can be read aloud (if voice output enabled)

### Context Menu
1. Select text on any webpage
2. Right-click and choose "Ask ChatHub about..."
3. Extension opens with selected text as prompt

## Data Management

### Export Data
- Click "Export Data" in settings
- Downloads JSON file with all chats and settings

### Import Data
- Click "Import Data" in settings
- Select previously exported JSON file

### Clear Data
- Click "Clear All Data" to reset everything
- This action cannot be undone

## Privacy & Security

- All data stored locally in browser
- No external tracking or analytics
- API keys encrypted in local storage
- No data sent to third parties except chosen AI services

## Development

### Project Structure
```
src/
├── components/          # React components
├── services/           # API integrations and business logic
├── stores/             # Zustand state management
├── types/              # TypeScript type definitions
├── popup/              # Extension popup interface
└── background/         # Background script
```

### Available Scripts
- `yarn dev` - Development mode with hot reload
- `yarn build` - Production build
- `yarn test` - Run tests
- `yarn lint` - Code linting

### Testing
```bash
yarn test
```

## Troubleshooting

### API Key Issues
- Verify API key is correct and has sufficient credits
- Check API key permissions and rate limits
- Use "Test" button in settings to validate

### Extension Not Loading
- Ensure all dependencies are installed
- Check browser console for errors
- Try rebuilding with `yarn build`

### Web Mode Issues
- Ensure you're logged into the respective AI service websites
- Check browser permissions for the extension
- Clear browser cache if needed

## Version History

### v1.0.0-personal
- Initial release
- Support for ChatGPT, Grok, Gemini, Claude
- API and web modes
- Consensus analysis
- Voice input/output
- Local data storage

## License

This is a personal-use modification of the original ChatHub project. For personal use only.

## Support

This is a personal project. For issues:
1. Check the troubleshooting section
2. Verify API keys and configurations
3. Check browser console for errors
4. Try rebuilding the extension

## Contributing

This is a personal fork. Feel free to create your own fork and customize further for your needs.