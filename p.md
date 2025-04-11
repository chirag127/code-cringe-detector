Here's a full **Product Requirements Document (PRD)** for **"Code Cringe Detector"**, your VS Code extension that sassily detects code smells using Gemini 2.0 Flash Lite:

---

## 📝 Product Requirements Document (PRD)
**Project Name:** Code Cringe Detector
**Type:** VS Code Extension + Express.js Backend
**AI Model:** Gemini 2.0 Flash Lite
**Purpose:**
Help developers write cleaner code by detecting bad practices and code smells using a humorous, sarcastic tone — making refactoring more engaging and fun.

---

### 🎯 Goals
- Detect bad patterns (e.g., long functions, deeply nested blocks, vague variable names).
- Display results with **sass/humor** (e.g., “300 lines in one function? Bold move, champ.”).
- Highlight inline results in the editor.
- Optionally fix issues or suggest refactors.
- Store history of past cringes detected for later viewing.

---

### 🧠 Core Features

| Feature | Description |
|--------|-------------|
| **1. AI Code Review** | Sends selected code snippets or open file to backend for analysis using Gemini 2.0 Flash Lite. |
| **2. Cringe Detection Engine** | Identifies: long functions, bad naming, excessive nesting, lack of comments, duplicate code. |
| **3. Sassy Feedback** | Displays AI output as witty/snarky comments inline and in a sidebar panel. |
| **4. Inline Decorations** | Highlights smelly code with humorous hover text or warnings. |
| **5. Sidebar Panel** | Lists all “cringes” in the current file with jump-to-line functionality. |
| **6. Fix Suggestions (optional)** | Suggests better code via Gemini 2.0 with user confirmation. |
| **7. History Log** | Tracks last 10 scans per file. “The Hall of Shame.” |

---

### 🏗️ Technical Architecture

#### 🧩 Extension Structure (VS Code)
```
/src
  |-- extension.ts         # Main activation point
  |-- cringeScanner.ts     # Sends code to backend
  |-- decorations.ts       # Inline highlights/snarky messages
  |-- panel.ts             # Webview for sidebar
  |-- utils.ts             # Helper functions
```

#### 🖥️ Backend (Express.js)
```
/backend
  |-- server.js            # Express.js server
  |-- routes/
        |-- analyze.js     # Route to handle cringe detection
  |-- services/
        |-- gemini.js      # Gemini 2.0 Flash Lite API interaction
  |-- utils/
        |-- parser.js      # Code chunking/analysis helpers
```

#### 🔌 Communication
- Extension makes a `POST /analyze` request to backend with file contents.
- Backend uses Gemini 2.0 Flash Lite API to detect code smells.
- Returns annotated feedback with location, type of issue, and snarky comment.

---

### 💡 Example Output
```json
{
  "issues": [
    {
      "line": 42,
      "issue": "Function is 150 lines long",
      "snark": "Oof. This function's got more chapters than War & Peace."
    },
    {
      "line": 17,
      "issue": "Variable name 'x' is too vague",
      "snark": "'x'? Seriously? This isn’t algebra class."
    }
  ]
}
```

---

### 🎨 UX Flow

1. **User Action:** Right-click > “Run Cringe Detector”
2. **Result:** Inline snarky decorations + sidebar results
3. **Optional:** Click “Fix It” to receive Gemini-generated suggestions
4. **Log:** User can open past detection logs from command palette

---

### 📦 VS Code Marketplace Metadata

| Field | Value |
|-------|-------|
| Extension ID | `code-cringe-detector` |
| Display Name | Code Cringe Detector |
| Description | Sassy, AI-powered code smell detector with a flair for drama. |
| Category | Linting / AI Dev Tools |
| Author | You |
| Activation | On command: `Run Cringe Detector` |

---

### 📅 Milestones

| Phase | Deliverables |
|-------|--------------|
| Week 1 | Basic Extension UI + Backend setup |
| Week 2 | Gemini 2.0 integration + Detection logic |
| Week 3 | Inline decorations + Sidebar panel |
| Week 4 | Fix suggestions + History log |
| Week 5 | Testing, Marketplace packaging, polish |

---
