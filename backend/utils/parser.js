/**
 * Utility functions for parsing and processing code
 */

/**
 * Split code into chunks for analysis
 * @param {string} code - The code to chunk
 * @param {number} maxChunkSize - Maximum size of each chunk in characters
 * @returns {Array} Array of code chunks with line information
 */
function chunkCode(code, maxChunkSize = 5000) {
  // Split code into lines
  const lines = code.split('\n');
  
  const chunks = [];
  let currentChunk = '';
  let startLine = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // If adding this line would exceed max chunk size, start a new chunk
    if (currentChunk.length + line.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push({
        code: currentChunk,
        startLine,
        endLine: i - 1
      });
      
      currentChunk = line;
      startLine = i;
    } else {
      currentChunk += (currentChunk.length > 0 ? '\n' : '') + line;
    }
  }
  
  // Add the last chunk
  if (currentChunk.length > 0) {
    chunks.push({
      code: currentChunk,
      startLine,
      endLine: lines.length - 1
    });
  }
  
  return chunks;
}

/**
 * Detect the language of the code based on content and file extension
 * @param {string} code - The code to analyze
 * @param {string} filename - Optional filename with extension
 * @returns {string} Detected language
 */
function detectLanguage(code, filename) {
  if (!filename) {
    // Try to detect from code content
    if (code.includes('function') && (code.includes('{') || code.includes('=>'))) {
      return 'javascript';
    } else if (code.includes('def ') && code.includes(':')) {
      return 'python';
    } else if (code.includes('class') && code.includes('{') && code.includes('public')) {
      return 'java';
    } else if (code.includes('#include') && (code.includes('<iostream>') || code.includes('<stdio.h>'))) {
      return 'cpp';
    } else {
      return 'text';
    }
  }
  
  // Detect from file extension
  const extension = filename.split('.').pop().toLowerCase();
  
  const languageMap = {
    'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'javascript',
    'tsx': 'typescript',
    'py': 'python',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cs': 'csharp',
    'go': 'go',
    'rb': 'ruby',
    'php': 'php',
    'swift': 'swift',
    'kt': 'kotlin',
    'rs': 'rust',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'md': 'markdown'
  };
  
  return languageMap[extension] || 'text';
}

/**
 * Extract line of code at a specific line number
 * @param {string} code - The full code
 * @param {number} lineNumber - The line number to extract (0-based)
 * @returns {string} The line of code
 */
function getLineOfCode(code, lineNumber) {
  const lines = code.split('\n');
  return lineNumber >= 0 && lineNumber < lines.length ? lines[lineNumber] : '';
}

/**
 * Extract a code snippet around a specific line
 * @param {string} code - The full code
 * @param {number} lineNumber - The target line number (0-based)
 * @param {number} context - Number of lines of context before and after
 * @returns {string} The code snippet
 */
function getCodeSnippet(code, lineNumber, context = 3) {
  const lines = code.split('\n');
  
  const startLine = Math.max(0, lineNumber - context);
  const endLine = Math.min(lines.length - 1, lineNumber + context);
  
  return lines.slice(startLine, endLine + 1).join('\n');
}

module.exports = {
  chunkCode,
  detectLanguage,
  getLineOfCode,
  getCodeSnippet
};
