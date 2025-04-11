import * as assert from "assert";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

suite("Extension Test Suite", () => {
    vscode.window.showInformationMessage("Starting Code Cringe Detector tests");

    test("Extension should be present", () => {
        assert.ok(
            vscode.extensions.getExtension("chirag127.code-cringe-detector")
        );
    });

    test("Should register commands", async () => {
        // Get the list of all commands
        const commands = await vscode.commands.getCommands();

        // Check if our commands are registered
        assert.ok(commands.includes("code-cringe-detector.detectCringe"));
        assert.ok(commands.includes("code-cringe-detector.fixCringe"));
        assert.ok(commands.includes("code-cringe-detector.showHistory"));
    });

    test("Should load bad code sample", async () => {
        // Get the path to the sample file
        const extensionPath =
            vscode.extensions.getExtension("chirag127.code-cringe-detector")
                ?.extensionPath || "";
        const samplePath = path.join(
            extensionPath,
            "src",
            "test",
            "samples",
            "badCode.js"
        );

        // Check if the file exists
        assert.ok(fs.existsSync(samplePath), "Sample file does not exist");

        // Open the file
        const document = await vscode.workspace.openTextDocument(samplePath);
        await vscode.window.showTextDocument(document);

        // Check if the file is open
        assert.strictEqual(
            vscode.window.activeTextEditor?.document.fileName,
            samplePath
        );
    });

    // Note: The following test is commented out because it requires the backend to be running
    // Uncomment and run manually when testing with the backend
    /*
	test('Should detect code cringe', async () => {
		// Execute the command
		await vscode.commands.executeCommand('code-cringe-detector.detectCringe');

		// Wait for the analysis to complete (this is a simple delay, not ideal)
		await new Promise(resolve => setTimeout(resolve, 5000));

		// Check if the panel is visible
		// This is difficult to test automatically, so we'll just check if the command executed without errors
	});
	*/
});
