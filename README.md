# Code Cringe Detector

> _"Because your code deserves a reality check with a side of sass."_

Code Cringe Detector is a VS Code extension that helps you write cleaner code by detecting bad practices and code smells using a humorous, sarcastic tone — making refactoring more engaging and fun.

Powered by Google's Gemini 2.0 Flash Lite AI model, it provides intelligent code analysis with a personality.

## Features

### 🔍 AI-Powered Code Analysis

Detects common code smells and bad practices including:

-   Long functions ("300 lines? Is this a function or a novel?")
-   Vague variable names ("'x'? Seriously? This isn't algebra class.")
-   Excessive nesting ("Inception called, they want their dream levels back.")
-   Lack of comments ("Silent code is mysterious, but not in a good way.")
-   Duplicate code ("Copy-paste is not a design pattern.")

### 💬 Sassy Feedback

Receive feedback with personality - making code reviews less boring and more memorable.

### 🎯 Inline Decorations

Highlights problematic code directly in your editor with hover text explaining the issue.

### 📊 Sidebar Panel

View all detected issues in one place with the ability to jump directly to the problematic code.

### 🔧 Fix Suggestions

Get AI-powered suggestions to fix the detected issues with a single click.

### 📜 History Log

Track your progress with a history of past scans - see how your code quality improves over time.

## Requirements

-   VS Code 1.99.0 or higher
-   Node.js 18.x or higher (for the backend server)
-   Internet connection (for Gemini API access)

## Installation

### Extension Setup

1. Clone this repository

    ```
    git clone https://github.com/chirag127/code-cringe-detector.git
    cd code-cringe-detector
    ```

2. Install dependencies

    ```
    npm install
    ```

3. Build the extension

    ```
    npm run compile
    ```

4. Open the project in VS Code

    ```
    code .
    ```

5. Press F5 to start debugging and launch the extension in a new VS Code window

### Backend Setup

1. Navigate to the backend directory

    ```
    cd backend
    ```

2. Install dependencies

    ```
    npm install
    ```

3. Create a `.env` file with your Gemini API key

    ```
    cp .env.example .env
    ```

    Then edit the `.env` file to add your Gemini API key

4. Start the backend server
    ```
    npm start
    ```

## Extension Settings

This extension contributes the following settings:

-   `codeCringeDetector.backendUrl`: URL of the Code Cringe Detector backend server (default: http://localhost:3000)
-   `codeCringeDetector.sassLevel`: How sassy should the feedback be? (mild/medium/savage)
-   `codeCringeDetector.historySize`: Number of historical scans to keep per file

## Usage

1. Select code in your editor or place your cursor in a file
2. Right-click and select "Detect Code Cringe" from the context menu
3. View the results in the sidebar panel and inline in your code
4. Optionally, click "Fix Cringe" to get suggestions for improving your code
5. Access your scan history from the command palette with "Show Cringe History"

## Development

### Extension Development

-   The extension is written in TypeScript
-   Main files:
    -   `src/extension.ts`: Main activation point
    -   `src/cringeScanner.ts`: Sends code to backend
    -   `src/decorations.ts`: Inline highlights/snarky messages
    -   `src/panel.ts`: Webview for sidebar
    -   `src/utils.ts`: Helper functions

### Backend Development

-   The backend is built with Express.js
-   Main files:
    -   `backend/server.js`: Express.js server
    -   `backend/routes/analyze.js`: Route to handle cringe detection
    -   `backend/services/gemini.js`: Gemini API interaction
    -   `backend/utils/parser.js`: Code chunking/analysis helpers

## Known Issues

-   The extension currently works best with JavaScript, TypeScript, Python, and Java. Support for other languages is limited.
-   Very large files may take longer to analyze.

## Release Notes

### 0.0.1

Initial release with basic functionality:

-   Code smell detection
-   Sassy feedback
-   Inline decorations
-   Sidebar panel

## Privacy

This extension sends code snippets to a local backend server which then communicates with Google's Gemini API. No code is stored permanently unless you explicitly save it in your history.

## License

MIT

---

**Made with ❤️ and a healthy dose of sarcasm by Chirag Singhal**
