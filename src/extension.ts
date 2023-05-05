import * as vscode from 'vscode';
import * as path from 'path';

async function renamer() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  const document = activeEditor.document;
  const fileUri = document.uri;

  if (fileUri.scheme !== 'file') {
    vscode.window.showErrorMessage('Please save the file first');
    return;
  }

  const defaultUri = document.isUntitled
    ? (vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file(''))
    : document.uri;

  let fileName = path.basename(defaultUri.fsPath);
  const newFileName = fileName.toLowerCase().split(' ').join('-');

  const fileDir = path.dirname(fileUri.fsPath);
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
    vscode.commands.registerCommand('DouglasWaugh.Renamer', renamer)
  );

  // The rest of your activate function code
}