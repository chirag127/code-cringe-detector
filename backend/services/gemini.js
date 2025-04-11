const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

/**
 * Analyze code for code smells using Gemini
 */
async function analyzeCode(code, language, sassLevel = 'medium') {
  try {
    // Skip if no API key is configured
    if (!API_KEY) {
      console.warn('GEMINI_API_KEY not configured. Using mock data.');
      return getMockIssues(sassLevel);
    }

    // Create prompt for Gemini
    const prompt = createAnalysisPrompt(code, language, sassLevel);

    // Generate response from Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the response to extract issues
    return parseGeminiResponse(text);
  } catch (error) {
    console.error('Error analyzing code with Gemini:', error);
    // Fallback to mock data in case of error
    return getMockIssues(sassLevel);
  }
}

/**
 * Get fix suggestions for a specific issue
 */
async function getSuggestion(code, issue) {
  try {
    // Skip if no API key is configured
    if (!API_KEY) {
      console.warn('GEMINI_API_KEY not configured. Using mock suggestion.');
      return getMockSuggestion(issue);
    }

    // Create prompt for Gemini
    const prompt = createSuggestionPrompt(code, issue);

    // Generate response from Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error getting suggestion from Gemini:', error);
    // Fallback to mock suggestion in case of error
    return getMockSuggestion(issue);
  }
}

/**
 * Create a prompt for code analysis
 */
function createAnalysisPrompt(code, language, sassLevel) {
  return `
You are a code review assistant with a sassy personality. Your task is to analyze the following ${language} code and identify code smells and bad practices.

For each issue you find, provide:
1. The line number where the issue occurs
2. A brief description of the issue
3. A sassy comment about the issue (${sassLevel} sass level)

Common issues to look for:
- Long functions (more than 30 lines)
- Vague variable names
- Excessive nesting (more than 3 levels)
- Lack of comments
- Duplicate code
- Magic numbers
- Complex conditionals
- Inconsistent formatting
- Unused variables or imports
- Poor error handling

Format your response as a JSON array of issues, like this:
\`\`\`json
[
  {
    "line": 42,
    "issue": "Function is 150 lines long",
    "snark": "Oof. This function's got more chapters than War & Peace."
  },
  {
    "line": 17,
    "issue": "Variable name 'x' is too vague",
    "snark": "'x'? Seriously? This isn't algebra class."
  }
]
\`\`\`

Here's the code to analyze:

\`\`\`${language}
${code}
\`\`\`

Only respond with the JSON array, nothing else.
`;
}

/**
 * Create a prompt for fix suggestions
 */
function createSuggestionPrompt(code, issue) {
  return `
You are a helpful code assistant. You need to suggest a fix for the following code issue:

Issue: ${issue.issue}
Line: ${issue.line}

Here's the code:

\`\`\`
${code}
\`\`\`

Please provide a specific, improved version of the code that fixes this issue. 
Focus only on fixing the specific issue mentioned, don't make other changes.
Explain your changes briefly with comments.

Your response should be code that can directly replace the problematic code.
`;
}

/**
 * Parse Gemini response to extract issues
 */
function parseGeminiResponse(text) {
  try {
    // Extract JSON from the response
    const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // If no JSON found, return empty array
    console.warn('No valid JSON found in Gemini response');
    return [];
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    return [];
  }
}

/**
 * Get mock issues for testing without API key
 */
function getMockIssues(sassLevel) {
  const mockIssues = [
    {
      line: 5,
      issue: 'Function is too long (45 lines)',
      snark: 'This function is longer than a CVS receipt. Break it up!'
    },
    {
      line: 12,
      issue: 'Variable name "x" is too vague',
      snark: '"x"? Seriously? This isn\'t algebra class.'
    },
    {
      line: 23,
      issue: 'Nested conditionals (4 levels deep)',
      snark: 'Inception called, they want their dream levels back.'
    },
    {
      line: 37,
      issue: 'Magic number (42)',
      snark: '42 might be the answer to life, but it\'s not self-documenting code.'
    }
  ];

  // Adjust snark based on sass level
  if (sassLevel === 'mild') {
    return mockIssues.map(issue => ({
      ...issue,
      snark: issue.snark.replace(/!|Seriously\?|called,/, '.')
    }));
  } else if (sassLevel === 'savage') {
    return mockIssues.map(issue => ({
      ...issue,
      snark: issue.snark + ' Did you write this before coffee?'
    }));
  }

  return mockIssues;
}

/**
 * Get mock suggestion for testing without API key
 */
function getMockSuggestion(issue) {
  if (issue.issue.includes('too long')) {
    return `// Here's how you could refactor this long function
// Break it into smaller, more focused functions

// Extract this part into a separate function
function validateUserInput(input) {
  // Validation logic here
  return isValid;
}

// Main function now calls the helper function
function processUserData(userData) {
  if (!validateUserInput(userData)) {
    return false;
  }
  
  // Rest of the processing logic
}`;
  } else if (issue.issue.includes('vague')) {
    return `// Instead of using vague variable names like 'x'
// Use descriptive names that explain the purpose

// Bad:
const x = 5;

// Good:
const userCount = 5;`;
  } else if (issue.issue.includes('nested')) {
    return `// Reduce nesting by:
// 1. Using early returns
// 2. Extracting conditionals to variables
// 3. Using guard clauses

// Instead of:
if (isLoggedIn) {
  if (hasPermission) {
    if (dataIsValid) {
      // Do something
    }
  }
}

// Do this:
if (!isLoggedIn) return;
if (!hasPermission) return;
if (!dataIsValid) return;

// Do something`;
  } else {
    return `// Suggested improvement for "${issue.issue}":

// Replace magic numbers with named constants
const MAX_RETRY_ATTEMPTS = 42;

// Use the constant instead
if (retryCount > MAX_RETRY_ATTEMPTS) {
  throw new Error('Maximum retry attempts exceeded');
}`;
  }
}

module.exports = {
  analyzeCode,
  getSuggestion
};
