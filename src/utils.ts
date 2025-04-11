import * as vscode from "vscode";
import * as axios from "axios";
const axiosInstance = axios.default;

/**
 * Configuration interface for the extension
 */
export interface CringeDetectorConfig {
    backendUrl: string;
    sassLevel: "mild" | "medium" | "savage";
    historySize: number;
}

/**
 * Issue detected by the cringe detector
 */
export interface CringeIssue {
    line: number;
    issue: string;
    snark: string;
    code?: string;
    suggestion?: string;
}

/**
 * Result from the backend analysis
 */
export interface CringeAnalysisResult {
    issues: CringeIssue[];
    timestamp: number;
    fileUri: string;
}

/**
 * Get the extension configuration
 */
export function getConfiguration(): CringeDetectorConfig {
    const config = vscode.workspace.getConfiguration("codeCringeDetector");
    return {
        backendUrl:
            config.get<string>("backendUrl") ||
            "https://code-cringe-detector.onrender.com",
        sassLevel: (config.get<string>("sassLevel") || "medium") as
            | "mild"
            | "medium"
            | "savage",
        historySize: config.get<number>("historySize") || 10,
    };
}

/**
 * Send code to the backend for analysis
 */
export async function analyzeCode(
    code: string,
    language: string
): Promise<CringeIssue[]> {
    try {
        const config = getConfiguration();
        const response = await axiosInstance.post(
            `${config.backendUrl}/analyze`,
            {
                code,
                language,
                sassLevel: config.sassLevel,
            }
        );

        return response.data.issues;
    } catch (error) {
        console.error("Error analyzing code:", error);
        throw new Error(
            "Failed to analyze code. Is the backend server running?"
        );
    }
}

/**
 * Get a fix suggestion for a specific issue
 */
export async function getSuggestion(
    code: string,
    issue: CringeIssue
): Promise<string> {
    try {
        const config = getConfiguration();
        const response = await axiosInstance.post(
            `${config.backendUrl}/suggest`,
            {
                code,
                issue,
            }
        );

        return response.data.suggestion;
    } catch (error) {
        console.error("Error getting suggestion:", error);
        throw new Error(
            "Failed to get suggestion. Is the backend server running?"
        );
    }
}

/**
 * Store analysis result in history
 */
export function storeInHistory(
    context: vscode.ExtensionContext,
    result: CringeAnalysisResult
): void {
    const config = getConfiguration();
    const historyKey = `history-${result.fileUri}`;

    // Get existing history
    const history =
        context.workspaceState.get<CringeAnalysisResult[]>(historyKey) || [];

    // Add new result
    history.unshift(result);

    // Limit history size
    history.length = Math.min(history.length, config.historySize);

    // Save updated history
    context.workspaceState.update(historyKey, history);
}

/**
 * Get analysis history for a file
 */
export function getHistory(
    context: vscode.ExtensionContext,
    fileUri: string
): CringeAnalysisResult[] {
    const historyKey = `history-${fileUri}`;
    return context.workspaceState.get<CringeAnalysisResult[]>(historyKey) || [];
}

/**
 * Format a timestamp as a readable date string
 */
export function formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
}

/**
 * Get the language ID from a document
 */
export function getLanguageId(document: vscode.TextDocument): string {
    return document.languageId;
}

/**
 * Get the selected code or entire document
 */
export function getSelectedCode(editor: vscode.TextEditor): {
    code: string;
    startLine: number;
} {
    const {selection} = editor;

    if (!selection.isEmpty) {
        // Return selected text
        const code = editor.document.getText(selection);
        return {
            code,
            startLine: selection.start.line,
        };
    } else {
        // Return entire document
        return {
            code: editor.document.getText(),
            startLine: 0,
        };
    }
}
