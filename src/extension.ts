import * as vscode from 'vscode';
import * as path from 'path';

async function sameRename() {
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
  const newFileName = rewriteFilename(fileName);

  const fileDir = path.dirname(fileUri.fsPath);
  const newFileUri = vscode.Uri.file(path.join(fileDir, newFileName));

  // Rename the file
  await vscode.workspace.fs.rename(fileUri, newFileUri);

  // Open the renamed file in the editor
  const newDocument = await vscode.workspace.openTextDocument(newFileUri);
  await vscode.window.showTextDocument(newDocument);
}

function rewriteFilename(fileName: string)
{
  const config = vscode.workspace.getConfiguration("same-rename");
  const shouldLowercase = config.get<boolean>("shouldLowercase", true);
  const shouldEncodeADWiki = config.get<boolean>("shouldEncodeADWiki", false);
  const splitChar = config.get<string>("splitChar", " ");
  const substitutionChar = config.get<string>("substitutionChar", "-");
  var parts = fileName.split(splitChar);
  if (shouldLowercase) {
    parts = parts.map(part => part.toLowerCase());
  }
  if (shouldEncodeADWiki) {
    const mapping : { [key: string]: string } = {
      ":": "%3A",
      "<": "%3C",
      ">": "%3E",
      "*": "%2A",
      "?": "%3F",
      "|": "%7C",
      "-": "%2D",
      "\"": "%22"
    }
    parts = parts.map(part => [...part].map(char => mapping[char] == null ? char : mapping[char] ).join(""));
  }

  return parts.join(substitutionChar);
}

export function activate(context: vscode.ExtensionContext) {
  // Register the "Rename File" command
  context.subscriptions.push(
    vscode.commands.registerCommand('DouglasWaugh.SameRename', sameRename)
  );

  // The rest of your activate function code
}