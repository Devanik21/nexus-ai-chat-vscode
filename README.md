# 🤖 Nexus AI Chat

<div align="center">

![VS Code](https://img.shields.io/badge/VS%20Code-1.74.0+-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen?style=for-the-badge)

**AI-powered chatbot extension for VS Code using Google Gemini**

</div>

## ✨ Features

- 🤖 **Gemini Integration**: Powered by Google's advanced AI model
- 💬 **Dedicated Chat Panel**: Integrated sidebar for seamless conversations
- ⚡ **Real-time Responses**: Fast and intelligent AI assistance
- 🔧 **Easy Configuration**: Simple API key setup
- 🎯 **Developer-Focused**: Built for coding workflows

## 🛠️ Installation

### Prerequisites
- VS Code 1.74.0 or higher
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Setup
1. Install the extension from the VS Code marketplace or VSIX
2. Open VS Code settings (`Ctrl+,`)
3. Search for "Nexus AI Chat"
4. Enter your Gemini API key in the `nexusAiChat.apiKey` field

## 🎮 Usage

### Opening the Chat
- Click the 🤖 **Nexus AI** icon in the Activity Bar
- Or use Command Palette: `Ctrl+Shift+P` → "Open AI Chat"

### Chatting
1. Type your question or request in the chat input
2. Press Enter or click Send
3. Get AI-powered responses instantly

## 🏗️ Development

### Setup
```bash
# Clone and install
git clone <your-repo-url>
cd nexus-ai-chat
npm install

# Development
npm run watch    # Watch mode
npm run compile  # One-time compile
```

### Project Structure
```
nexus-ai-chat/
├── src/
│   └── extension.ts      # Main extension logic
├── out/                  # Compiled output
├── package.json          # Extension manifest
└── tsconfig.json         # TypeScript config
```

## ⚙️ Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| `nexusAiChat.apiKey` | Your Gemini API key | `""` |

## 🎯 Commands

| Command | Description |
|---------|-------------|
| `nexus-ai-chat.openChat` | Opens the AI chat panel |

## 🔧 UI Components

- **Activity Bar Icon**: Quick access to chat panel
- **Sidebar Panel**: Dedicated chat interface
- **Webview**: Rich chat experience with message history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## 📋 Requirements

- **VS Code**: 1.74.0+
- **Node.js**: 16.x (for development)
- **Gemini API Key**: Required for AI functionality

## 🐛 Troubleshooting

- **No responses**: Check your API key configuration
- **Extension not loading**: Ensure VS Code version compatibility
- **API errors**: Verify API key permissions and quotas

## 📝 Release Notes

### 1.0.0
- 🎉 Initial release
- 🤖 Gemini AI integration
- 💬 Sidebar chat interface
- ⚙️ API key configuration

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini team for the powerful AI API
- VS Code team for the extension platform
- TypeScript community for excellent tooling

---

<div align="center">

**Enhance your coding with AI assistance** 🚀

⭐ **Star this repo if you found it helpful!** ⭐

</div>
