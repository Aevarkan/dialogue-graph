// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import { ConfigMessage } from "@workspace/common";
import { ColorThemeKind, window, workspace } from "vscode";
import { NodeColorsObject } from "../types";


export function useConfigMessage() {

  function createCurrentConfigMessage() {
    const coloursConfig = workspace.getConfiguration("bedrockDialogueEditor").get<NodeColorsObject>("nodeColors")
    const isDarkMode = (window.activeColorTheme.kind === ColorThemeKind.Dark || window.activeColorTheme.kind === ColorThemeKind.HighContrast)
    
    const message: ConfigMessage = {
      messageType: "config",
      sceneNodeColour: coloursConfig?.scene ?? "#268bb3",
      buttonSlotNodeColour: coloursConfig?.button ?? "#9b68b4",
      commandNodeColour: coloursConfig?.command ?? "#429740",
      sceneNodeDarkColour: coloursConfig?.sceneDark ?? "#263b53",
      buttonSlotNodeDarkColour: coloursConfig?.buttonDark ?? "#4b2568",
      commandNodeDarkColour: coloursConfig?.commandDark ?? "#265525",
      currentColourThemeKind: isDarkMode ? "dark" : "light"
    }
    return message
  }


  return { createCurrentConfigMessage }
}
