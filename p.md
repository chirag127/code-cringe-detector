Sure! Here's a full **Product Requirements Document (PRD)** for idea **#44 – Code Cringe Detector** 🚨😬

---

## 🧾 Product Requirements Document (PRD)

### **Product Name:**
**Code Cringe Detector**

---

### **Overview:**
Code Cringe Detector is a VS Code extension that identifies "cringeworthy" code patterns — not just from a technical correctness point of view, but from a **developer empathy + clean code perspective**. It humorously flags overly complex, outdated, or just plain awkward code with witty messages that both entertain and educate developers.

---

### **Problem Statement:**
Developers often write or inherit messy, over-engineered, or outdated code patterns. Static analyzers are too formal or dry, and don’t encourage developers to clean up unless they're forced to. There’s a lack of lightweight, fun, real-time feedback tools that promote cleaner code in a **non-judgmental, humorous** way.

---

### **Goals & Objectives:**

| Goal | Metric |
|------|--------|
| Encourage better code hygiene | 80% of flagged issues are resolved by user |
| Increase developer engagement | Extension is used for >10 sessions per user on average |
| Make code reviews easier | Reduce occurrences of low-hanging cleanup comments |

---

### **Target Audience:**
- Solo developers
- Dev teams (especially juniors & mid-level)
- Code reviewers
- Educators

---

### **Core Features:**

#### 🧠 Static Code Pattern Detection
Detect and flag:
- Long functions (>50 lines)
- Deeply nested logic (>3 levels)
- Overuse of comments in lieu of clean code
- Non-descriptive names (`x`, `foo`, `data2`)
- Excessive parameters (>4 in a function)
- Mixing of camelCase, snake_case, kebab-case
- Magic numbers
- Copy-pasta detection (duplicated code)

#### 💬 Humorous Inline Feedback
- Hover tooltips and squiggly underlines give feedback like:
  - “Did you really just name this function `doStuff()`?”
  - “Wow. Nested deeper than Inception.”
  - “I see you've summoned the dark magic of global state.”
  - “This function is longer than your last relationship.”

#### 🧩 Cringe Severity Score
- Each file gets a “Cringe Score” (0–100)
- Color-coded bar in status bar
  - 0–30: Zen ✨
  - 30–70: Uh-oh 😬
  - 70–100: Make it stop 🚨

#### 📘 Code Cleanup Suggestions
- Suggestions shown in hover or quick-fix (`Cmd+.`):
  - Rename variables
  - Extract method
  - Convert magic numbers to constants
  - Split large functions
  - Refactor repeated logic into utilities

#### 📊 Dashboard (Optional)
- Shows top cringe offenders across the project
- Trends: Is code getting better or worse?
- Leaderboard (opt-in): Who wrote the cringiest code this week?

---

### **User Stories:**

#### Developer
> As a developer, I want real-time, friendly feedback on bad code habits so I can improve my code without feeling overwhelmed or judged.

#### Team Lead
> As a team lead, I want my team to get code quality nudges without needing to micromanage or leave nitpicky PR comments.

#### Educator
> As a teacher, I want my students to learn good code practices in a way that's engaging and fun.

---

### **Tech Stack:**

| Component | Tech |
|----------|------|
| Extension Framework | VS Code Extension API (TypeScript) |
| Analysis Engine | ESLint rules + Custom static checks |
| Humor Engine | Rule-to-joke mapping JSON / AI for future |
| UI | Inline decorations, status bar, hover popups |

---

### **Non-Goals:**
- It won’t auto-fix all problems (focus is awareness + education).
- It’s not meant to replace formal linters (but can complement them).
- No judgment on functional correctness — only style, smell, and readability.

---

### **Milestones:**

| Phase | Tasks |
|-------|-------|
| ✅ v1.0 MVP | Detect top 5 cringe patterns, hover messages, Cringe Score |
| 🚧 v1.1 | More rules, customizable severity, optional humor toggle |
| 🔜 v2.0 | Dashboard, team stats, AI-generated jokes |

---

### **Success Criteria:**
- 1000+ downloads in first month
- 4.5+ rating on VS Code Marketplace
- 70% positive feedback on usefulness/humor combo

---

Want me to now:
- ✅ Build this extension from scratch
- ✅ Set up GitHub repo and CI
- ✅ Publish it to the Marketplace
- ✅ Add a config panel and theme integration

Just say the word and I’ll get started!