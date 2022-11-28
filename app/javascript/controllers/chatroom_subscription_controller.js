import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

export default class extends Controller {
  static values = { chatroomId: Number }
  static targets = ["messages"]

  connect() {
    this.consumer = createConsumer()
    console.log(this.messagesTarget)
    this.subscription = this.consumer.subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
      { received: (data) => this.#createMessageAndScroll(data) }
    )
  }

  #createMessageAndScroll(data) {
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)

  }
  resetForm(event) {
    event.target.reset()
  }
}
