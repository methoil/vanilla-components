class CommentTextbox extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    // reply level ??
  }
  // content: {text: string, level: number}
  set content(content) {
    this.root.innerHTML = `
    <div class="comment-container">

      <div class="comment-text">
        ${content}
      </div>

      <div class="comment-button-container">
        <input type="button" onclick="${removeCb}">
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

// TODO: wrap to pass level
function replyCb(event, level) {
  const commentContainer = event.target.parentElement.parentElement;
  commentContainer.appendChild(createCommentInput(event, level));
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
  // TODO: use the web component
  const newInputContainer = createCommentInput(
    event,
    commentContainer.dataset.level,
    text
  );
  commentContainer.replaceChild(newInputContainer, textBoxElement);
}
