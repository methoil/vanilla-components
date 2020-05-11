import "./comment-input.js";

class CommentText extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }
  // payload: {text: string, level: number}
  set content(payload) {
    this.root.innerHTML = `
    <style>
      @import url("./comments-section.css")
    </style>
    <div class="comment-container">
      <div class="comment-text reply-level-${payload.level}">
        ${payload.text}
      </div>

      <div class="comment-button-container">
        <input id="removeButton" type="button" value="Remove">
        <input id="editButton" type="button" value="Edit">
        <input id="replyButton" type="button" value="Reply">
      </div>

    </div>
    `;

    const removeButton = this.root.getElementById("removeButton");
    removeButton.onclick = removeCb;
    const replyButton = this.root.getElementById("replyButton");
    replyButton.onclick = replyCb(payload.level + 1);
    const editButton = this.root.getElementById("editButton");
    editButton.onclick = editCb(payload.level);
  }
}

function replyCb(level) {
  return (event) => {
    const commentContainer = event.target.parentElement.parentElement;

    const commentInput = document.createElement("comment-input");
    commentInput.content = { level, text: "" };
    commentContainer.appendChild(commentInput);
  };
}

function removeCb(event) {
  const commentContainer = event.target.parentElement.parentElement;
  commentContainer.remove();
}

function editCb(level) {
  return (event) => {
    const commentContainer = event.target.parentElement.parentElement;

    const commentControls = commentContainer.getElementsByClassName(
      "comment-button-container"
    )[0];
    commentControls.remove();

    const textBoxElement = commentContainer.getElementsByClassName(
      "comment-text"
    )[0];
    const text = textBoxElement.innerHTML;

    const commentInput = document.createElement("comment-input");
    commentInput.content = { level, text };
    commentContainer.replaceChild(commentInput, textBoxElement);
  };
}

customElements.define("comment-text", CommentText);
