// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import * as vscode from 'vscode';
import { setContext } from './stores/contextStore';

export function activate(context: vscode.ExtensionContext) {
  setContext(context)
}

export function deactivate() {}
