// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import * as vscode from 'vscode';

let extensionContext: vscode.ExtensionContext | null = null

function setContext(context: vscode.ExtensionContext) {
  extensionContext = context
}

function getContext() {
  const context = extensionContext
  if (!context) {
    throw new Error("context not found.")
  }
  return context
}

export { setContext, getContext }
