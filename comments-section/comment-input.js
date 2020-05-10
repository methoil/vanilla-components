import "./comment-text.js";

class CommentInput extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }
  // payload: {text: string, level: number}
  set content(payload) {
    this.root.innerHTML = `
    <div class="comment-container">

      <textarea class="comment-input-textbox">
      </textarea>

      <input type="button" value="'AddComment'" onclick="${submitCb(
        payload.level
      )}">
      </input>

    </div>
    `;
  }
}

function submitCb(level) {
  return (event) => {
    commentContainer.appendChild(createCommentInput(event, level));
  };
}

customElements.define("comment-input", CommentInput);
