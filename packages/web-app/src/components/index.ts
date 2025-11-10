// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import { markRaw } from "vue";
import SceneNode from "./SceneNode.vue";

export const nodeTypes = {
  scene: markRaw(SceneNode)
}
