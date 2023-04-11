import * as vscode from 'vscode';
import * as path from 'path';

async function customSaveAs() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  const document = activeEditor.document;
  const fileUri = document.uri;

  if (fileUri.scheme !== 'file') {
    vscode.window.showErrorMessage('Cannot rename a non-file document');
    return;
  }

  const fileDir = path.dirname(fileUri.fsPath);
  const fileExt = path.extname(fileUri.fsPath);
  const fileName = path.basename(fileUri.fsPath, fileExt);
  const newFileName = `${fileName}-renamed${fileExt}`;
  const newFileUri = vscode.Uri.file(path.join(fileDir, newFileName));

  // Rename the file
  await vscode.workspace.fs.rename(fileUri, newFileUri);

  // Open the renamed file in the editor
  const newDocument = await vscode.workspace.openTextDocument(newFileUri);
  await vscode.window.showTextDocument(newDocument);
}

export function activate(context: vscode.ExtensionContext) {
  // Register the "Rename File" command
  context.subscriptions.push(
    vscode.commands.registerCommand('renamer.customSaveAs', customSaveAs)
  );

  // The rest of your activate function code
}