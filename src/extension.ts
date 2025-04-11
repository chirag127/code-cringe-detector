import * as vscode from "vscode";
import { CringeScanner } from "./cringeScanner";
import { DecorationManager } from "./decorations";
import { CringePanel } from "./panel";
import { CringeIssue } from "./utils";

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    console.log("Code Cringe Detector is now active!");

    // Create instances of our components
    const scanner = new CringeScanner(context);
    const decorationManager = new DecorationManager(context);

    // Register the detect cringe command
    const detectCringeCommand = vscode.commands.registerCommand(
        "code-cringe-detector.detectCringe",
        async () => {
            try {
                // Scan the current editor
                const result = await scanner.scanCurrentEditor();
                if (!result) {
                    return;
                }

                const { issues, fileUri } = result;

                // Apply decorations
                decorationManager.applyDecorations(issues, fileUri);

                // Show the panel with results
                const panel = CringePanel.createOrShow(context);
                panel.update(issues, fileUri);

                // Show summary message
                if (issues.length > 0) {
                    vscode.window.showInformationMessage(
                        `Found ${issues.length} code cringe issue${
                            issues.length !== 1 ? "s" : ""
                        }. Check the panel for details.`
                    );
                } else {
                    vscode.window.showInformationMessage(
                        "No code cringe detected. Your code is looking good!"
                    );
                }
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Error: ${
                        error instanceof Error ? error.message : String(error)
                    }`
                );
            }
        }
    );

    // Register the fix cringe command
    const fixCringeCommand = vscode.commands.registerCommand(
        "code-cringe-detector.fixCringe",
        async (issue: CringeIssue) => {
            try {
                // Get fix suggestion
                const suggestion = await scanner.getFixSuggestion(issue);
                if (!suggestion) {
                    return;
                }

                // Show the suggestion in a new document
                const document = await vscode.workspace.openTextDocument({
                    content: suggestion,
                    language:
                        vscode.window.activeTextEditor?.document.languageId ||
                        "text",
                });
                vscode.window.showTextDocument(
                    document,
                    vscode.ViewColumn.Beside
                );
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Error: ${
                        error instanceof Error ? error.message : String(error)
                    }`
                );
            }
        }
    );

    // Register the show history command
    const showHistoryCommand = vscode.commands.registerCommand(
        "code-cringe-detector.showHistory",
        () => {
            try {
                // Show the panel with history
                const panel = CringePanel.createOrShow(context);
                panel.showHistory();
            } catch (error) {
                vscode.window.showErrorMessage(
                    `Error: ${
                        error instanceof Error ? error.message : String(error)
                    }`
                );
            }
        }
    );

    // Add disposables to context
    context.subscriptions.push(
        detectCringeCommand,
        fixCringeCommand,
        showHistoryCommand
    );

    // Register a disposable for the decoration manager
    context.subscriptions.push({
        dispose: () => {
            decorationManager.dispose();
        },
    });
}

// This method is called when your extension is deactivated
export function deactivate() {
    // Clean up resources
}
