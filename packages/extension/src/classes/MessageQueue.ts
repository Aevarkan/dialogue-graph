// Copyright (c) 2025 Aevarkan
// Licensed under the GPLv3 license

import { GenericMessage } from "@workspace/common";

export class MessageQueue {
  private queue: GenericMessage[] = []
  /**
   * Whether it's safe to send messages.
   */
  private isReady = false
  private sendMessage: (message: GenericMessage) => void

  /**
   * Creates an unready message queue.
   * @param messageFunction 
   */
  public constructor(messageFunction: (message: GenericMessage) => void) {
    this.sendMessage = messageFunction
  }

  /**
   * Sets the ready state of the queue.
   * 
   * @remarks Setting ready to `true` will flush all messages.
   */
  public setReady(readyState: boolean) {
    this.isReady = readyState

    // send all messages if we're now ready
    if (this.isReady) {
      this.flushMessages()
    }
  }

  /**
   * Adds a message to the queue, or sends it if ready.
   */
  public enqueueMessage(message: GenericMessage) {
    if (this.isReady) {
      this.sendMessage(message)
    } else {
      this.queue.push(message)
    }
  }

  /**
   * Sends all queued messages in order.
   */
  private flushMessages() {
    while (this.queue.length > 0) {
      // not undefined as queue length is checked
      const oldestMessage = this.queue.shift()!
      this.sendMessage(oldestMessage)
    }
  }

  /**
   * Empties the message queue.
   */
  public clear() {
    this.queue = []
  }

}
