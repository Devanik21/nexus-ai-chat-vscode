import * as vscode from 'vscode';
import fetch from 'node-fetch';

export function activate(context: vscode.ExtensionContext) {
    const provider = new ChatViewProvider(context.extensionUri);
    
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('nexusAiChat', provider)
    );

    let disposable = vscode.commands.registerCommand('nexus-ai-chat.openChat', () => {
        vscode.commands.executeCommand('workbench.view.extension.nexus-ai');
    });

    context.subscriptions.push(disposable);
}

class ChatViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(
            async message => {
                switch (message.command) {
                    case 'sendMessage':
                        await this.sendToGemini(message.text);
                        break;
                }
            },
            undefined,
            []
        );
    }

    private async sendToGemini(userMessage: string) {
        const config = vscode.workspace.getConfiguration('nexusAiChat');
        const apiKey = config.get<string>('apiKey');

        if (!apiKey) {
            vscode.window.showErrorMessage('Please set your Gemini API key in settings');
            return;
        }

        try {
            // Use Node.js built-in fetch (available in Node.js 18+)
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemma-3n-e4b-it:generateContent?key=' + apiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: userMessage
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json() as any;
            
            // Check if the response has the expected structure
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                
                this._view?.webview.postMessage({
                    command: 'displayResponse',
                    text: aiResponse
                });
            } else {
                throw new Error('Unexpected response structure from Gemini API');
            }
        } catch (error) {
            console.error('Gemini API Error:', error);
            vscode.window.showErrorMessage(`Error connecting to Gemini API: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nexus AI Chat</title>
            <style>
                body {
                    font-family: var(--vscode-font-family);
                    padding: 10px;
                    background: var(--vscode-editor-background);
                    color: var(--vscode-editor-foreground);
                }
                #chatContainer {
                    height: 400px;
                    overflow-y: auto;
                    border: 1px solid var(--vscode-input-border);
                    padding: 10px;
                    margin-bottom: 10px;
                    background: var(--vscode-input-background);
                }
                #inputContainer {
                    display: flex;
                    gap: 5px;
                }
                #messageInput {
                    flex: 1;
                    padding: 5px;
                    background: var(--vscode-input-background);
                    border: 1px solid var(--vscode-input-border);
                    color: var(--vscode-input-foreground);
                }
                #sendButton {
                    padding: 5px 15px;
                    background: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    cursor: pointer;
                }
                .message {
                    margin: 5px 0;
                    padding: 5px;
                    border-radius: 5px;
                }
                .user {
                    background: var(--vscode-textBlockQuote-background);
                    text-align: right;
                }
                .ai {
                    background: #000000;
                    color: #ffffff;
                }
            </style>
        </head>
        <body>
            <div id="chatContainer"></div>
            <div id="inputContainer">
                <input type="text" id="messageInput" placeholder="Type your message..." />
                <button id="sendButton">Send</button>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                const chatContainer = document.getElementById('chatContainer');
                const messageInput = document.getElementById('messageInput');
                const sendButton = document.getElementById('sendButton');

                function addMessage(text, isUser) {
                    const message = document.createElement('div');
                    message.className = 'message ' + (isUser ? 'user' : 'ai');
                    message.textContent = text;
                    chatContainer.appendChild(message);
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }

                function sendMessage() {
                    const text = messageInput.value.trim();
                    if (text) {
                        addMessage(text, true);
                        vscode.postMessage({
                            command: 'sendMessage',
                            text: text
                        });
                        messageInput.value = '';
                    }
                }

                sendButton.addEventListener('click', sendMessage);
                messageInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });

                window.addEventListener('message', event => {
                    const message = event.data;
                    if (message.command === 'displayResponse') {
                        addMessage(message.text, false);
                    }
                });
            </script>
        </body>
        </html>`;
    }
}

export function deactivate() {}