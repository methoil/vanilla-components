class CommentInput extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    // reply level ??
  }
  // content: {text: string, level: number}
  set content(content) {
    this.root.innerHTML = `
    <div class="comment-container">

      <textarea class="comment-input-textbox">
      </textarea>

      <input type="button" onclick="${submitCb}">
        Add Comment
      </input>

    </div>
    `;
  }
}

// TODO: wrap to pass level
function submitCb(event, level) {
  const commentContainer = event.target.parentElement.parentElement;
  commentContainer.appendChild(createCommentInput(event, level));
}
