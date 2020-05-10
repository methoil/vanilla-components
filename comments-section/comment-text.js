import "./comment-input.js";

class CommentText extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }
  // content: {text: string, level: number}
  set content(payload) {
    this.root.innerHTML = `
    <div class="comment-container">

      <div class="comment-text">
        ${payload.text}
      </div>

      <div class="comment-button-container">
        <input type="button" onclick="${removeCb(payload.level)}">
          Remove
        </input>

        <input type="button" onclick="${editCb}">
          Edit
        </input>

        <input type="button" onClick="${replyCb}">
          Reply
        </input>
      </div>

    </div>
    `;
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

function editCb(event) {
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
}

customElements.define("comment-text", CommentText);
