// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import type { LogicalScene } from "@/classes/LogicalScene";
import type { XYPosition } from "@vue-flow/core";

// interface ArrangeOptions {

// }

const horizontalNormalisation = 500
const verticalNormalisation = 300

export function useNodeLayout() {

  function arrangeAroundScene(scene: LogicalScene, sceneNodePosition: XYPosition, scale?: Partial<XYPosition>) {
    // const { sceneId } = scene
    const horizontalScaleFactor = scale?.x ?? 1
    const verticalScaleFactor = scale?.x ?? 1
    const horizontalScale = horizontalScaleFactor * horizontalNormalisation
    const verticalScale = verticalScaleFactor * verticalNormalisation

    const commandNodes = scene.getCommands()
    const buttonSlotNodes = scene.getSlots()

    // commands nodes are in section 1
    const commandNodeSection = 1
    // button nodes are in section 2 except if there are no command nodes
    let buttonNodeSection = 1

    const commandNodesExist = (commandNodes.length !== 0)
    if (commandNodesExist) {
      buttonNodeSection = 2
    }

    // max of scene or command array length
    // that's how wide the arrangement will be
    // const arragementWidth = Math.max(Math.max(commandNodes.length, buttonSlotNodes.length) - 1, 0)
    // const arrangementCenter = arragementWidth / 2 // which is where the parent scene will go at the top

    const commandArrangementCentre = Math.max(commandNodes.length - 1, 0) / 2
    const buttonArrangementCentre = Math.max(buttonSlotNodes.length - 1, 0) / 2

    // const parentSceneNodePositionOffset: XYPosition = {
    //   x: sceneNodePosition.x,
    //   y: sceneNodePosition.y
    // }

    const nodePositons: Record<string, XYPosition> = {}
    // const commandNodeRelativePositions: Record<string, XYPosition> = {}
    commandNodes.forEach((commandNode, index) => {
      const relativePosition: XYPosition = {
        x: index - commandArrangementCentre,
        y: commandNodeSection
      }
      const scaledPosition: XYPosition = {
        x: relativePosition.x * horizontalScale,
        y: relativePosition.y * verticalScale
      }
      nodePositons[commandNode.id] = {
        x: scaledPosition.x + sceneNodePosition.x,
        y: scaledPosition.y + sceneNodePosition.y
      }
    })

    // const buttonSlotNodeRelativePositions: Record<string, XYPosition> = {}
    buttonSlotNodes.forEach((buttonSlotNode, index) => {
      const relativePosition: XYPosition = {
        x: index - buttonArrangementCentre,
        y: buttonNodeSection
      }
       const scaledPosition: XYPosition = {
        x: relativePosition.x * horizontalScale,
        y: relativePosition.y * verticalScale
      }
      nodePositons[buttonSlotNode.id] = {
        x: scaledPosition.x + sceneNodePosition.x,
        y: scaledPosition.y + sceneNodePosition.y
      }
    })

    return nodePositons
  }


  return { arrangeAroundScene }
}
