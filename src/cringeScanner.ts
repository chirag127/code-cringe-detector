import * as vscode from 'vscode';
import { analyzeCode, getSelectedCode, getLanguageId, CringeIssue, storeInHistory } from './utils';

/**
 * Scanner class to handle code analysis
 */
export class CringeScanner {
    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    /**
     * Scan the current editor for code smells
     */
    public async scanCurrentEditor(): Promise<{ issues: CringeIssue[], fileUri: string } | undefined> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        // Show progress indicator
        return await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Detecting code cringe...",
            cancellable: true
        }, async (progress, token) => {
            try {
                // Get selected code or entire document
                const { code, startLine } = getSelectedCode(editor);
                const language = getLanguageId(editor.document);
                
                // Update progress
                progress.report({ increment: 30, message: "Analyzing code..." });
                
                // Check for cancellation
                if (token.isCancellationRequested) {
                    return;
                }
                
                // Send to backend for analysis
                const issues = await analyzeCode(code, language);
                
                // Adjust line numbers based on selection
                const adjustedIssues = issues.map(issue => ({
                    ...issue,
                    line: issue.line + startLine
                }));
                
                // Update progress
                progress.report({ increment: 70, message: "Processing results..." });
                
                // Store in history
                const result = {
                    issues: adjustedIssues,
                    timestamp: Date.now(),
                    fileUri: editor.document.uri.toString()
                };
                storeInHistory(this.context, result);
                
                return {
                    issues: adjustedIssues,
                    fileUri: editor.document.uri.toString()
                };
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to analyze code: ${error instanceof Error ? error.message : String(error)}`);
                return;
            }
        });
    }

    /**
     * Get a fix suggestion for a specific issue
     */
    public async getFixSuggestion(issue: CringeIssue): Promise<string | undefined> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        // Show progress indicator
        return await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Getting fix suggestion...",
            cancellable: true
        }, async (progress, token) => {
            try {
                const { code } = getSelectedCode(editor);
                
                // Update progress
                progress.report({ increment: 50, message: "Generating suggestion..." });
                
                // Check for cancellation
                if (token.isCancellationRequested) {
                    return;
                }
                
                // TODO: Implement the getSuggestion function in the backend
                // For now, return a placeholder
                return `// TODO: Implement fix suggestion for: ${issue.issue}`;
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to get suggestion: ${error instanceof Error ? error.message : String(error)}`);
                return;
            }
        });
    }
}
