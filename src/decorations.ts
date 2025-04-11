import * as vscode from 'vscode';
import { CringeIssue } from './utils';

/**
 * Manages decorations for highlighting code smells in the editor
 */
export class DecorationManager {
    private context: vscode.ExtensionContext;
    private decorationType: vscode.TextEditorDecorationType;
    private activeDecorations: Map<string, vscode.DecorationOptions[]> = new Map();

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        
        // Create decoration type
        this.decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: 'rgba(255, 100, 100, 0.2)',
            border: '1px dashed rgba(255, 100, 100, 0.7)',
            borderRadius: '3px',
            overviewRulerColor: 'rgba(255, 100, 100, 0.7)',
            overviewRulerLane: vscode.OverviewRulerLane.Right,
            light: {
                backgroundColor: 'rgba(255, 100, 100, 0.1)',
                border: '1px dashed rgba(255, 100, 100, 0.5)',
            },
            dark: {
                backgroundColor: 'rgba(255, 100, 100, 0.2)',
                border: '1px dashed rgba(255, 100, 100, 0.7)',
            }
        });
        
        // Register for editor changes
        vscode.window.onDidChangeActiveTextEditor(this.updateDecorations, this, context.subscriptions);
    }

    /**
     * Apply decorations for the given issues
     */
    public applyDecorations(issues: CringeIssue[], fileUri: string): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.uri.toString() !== fileUri) {
            return;
        }
        
        const decorations: vscode.DecorationOptions[] = [];
        
        // Create decoration for each issue
        for (const issue of issues) {
            const line = editor.document.lineAt(issue.line);
            const range = new vscode.Range(
                new vscode.Position(issue.line, 0),
                new vscode.Position(issue.line, line.text.length)
            );
            
            decorations.push({
                range,
                hoverMessage: new vscode.MarkdownString(`**Code Cringe Detected!**\n\n${issue.issue}\n\n_${issue.snark}_`)
            });
        }
        
        // Store decorations for this file
        this.activeDecorations.set(fileUri, decorations);
        
        // Apply decorations
        editor.setDecorations(this.decorationType, decorations);
    }

    /**
     * Clear all decorations
     */
    public clearDecorations(): void {
        this.activeDecorations.clear();
        
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.setDecorations(this.decorationType, []);
        }
    }

    /**
     * Update decorations when the active editor changes
     */
    private updateDecorations(editor: vscode.TextEditor | undefined): void {
        if (!editor) {
            return;
        }
        
        const fileUri = editor.document.uri.toString();
        const decorations = this.activeDecorations.get(fileUri) || [];
        
        editor.setDecorations(this.decorationType, decorations);
    }

    /**
     * Dispose of the decoration type
     */
    public dispose(): void {
        this.decorationType.dispose();
    }
}
