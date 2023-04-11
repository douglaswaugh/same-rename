import * as vscode from 'vscode';
import * as path from 'path';

async function customSaveAs() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  const document = activeEditor.document;
  const defaultUri = document.isUntitled
    ? (vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file(''))
    : document.uri;

  let fileName = path.basename(defaultUri.fsPath);
  const newFileName = fileName.toLowerCase().split(' ').join('-');

  if (fileName !== newFileName) {
    fileName = newFileName;

    const newDocument = await vscode.workspace.openTextDocument({
      language: document.languageId,
      content: document.getText(),
    });

    await vscode.window.showTextDocument(newDocument);
  }

  const options: vscode.SaveDialogOptions = {
    defaultUri: defaultUri.with({ path: path.join(path.dirname(defaultUri.path), fileName) }),
    filters: {
      'All Files': ['*'],
    },
  };

  const newUri = await vscode.window.showSaveDialog(options);
  if (newUri) {
    // Save the new document using the provided URI
    const newDocument = await vscode.workspace.openTextDocument(newUri);
    await newDocument.save();
  }
}

async function copyFile(fileUri:vscode.Uri, newUri:vscode.Uri)
{
  if (fileUri.scheme !== 'file') {
    vscode.window.showErrorMessage('Cannot copy a non-file document');
    return;
  }

  const fileContent = new Uint8Array(await vscode.workspace.fs.readFile(fileUri));
  const fileDir = path.dirname(fileUri.fsPath);
  const newFileUri = vscode.Uri.file(path.join(fileDir, newUri.toString()));

  // Create a new file with the copied content
  await vscode.workspace.fs.writeFile(newFileUri, fileContent);
}

export function activate(context: vscode.ExtensionContext) {
  // Register the custom "Save As" command
  console.log('Congratulations, your extension "Renamer" is now active!');
  context.subscriptions.push(
    vscode.commands.registerCommand('renamer.customSaveAs', customSaveAs)
  );

  // The rest of your activate function code
}
