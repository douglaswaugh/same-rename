import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "Renamer" is now active!');

  let disposable = vscode.workspace.onWillSaveTextDocument((e: vscode.TextDocumentWillSaveEvent) => {
		console.log('onWillSaveTextDocument fires');

    const document = e.document;
    const originalUri = document.uri;

    if (originalUri.scheme === 'file') {
      const fileName = originalUri.fsPath.split(/[\\/]/).pop();
      
      if (fileName) {
        const newFileName = fileName.toLowerCase().split(' ').join('-');
        
        if (fileName !== newFileName) {
          const newUri = vscode.Uri.file(originalUri.fsPath.replace(fileName, newFileName));
          e.waitUntil(vscode.workspace.fs.rename(originalUri, newUri));
        }
      }
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
