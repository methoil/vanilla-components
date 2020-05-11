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

      <input id="addCommentButton" type="button" value="Add Comment">
      </input>

    </div>
    `;

    this.root.getElementById("addCommentButton").onclick = submitCb(
      payload.level
    );
  }
}

function submitCb(level) {
  const cb = function (event) {
    console.log("should wbe workinfg");
    console.log(event);

    const inputContainer = event.target.parentElement;
    const textArea = inputContainer.getElementsByTagName("textarea")[0];

    const newCommentContainer = document.createElement("comment-text");
    newCommentContainer.content = { level, text: textArea.value };
    // const fuck = document.createElement("div");
    // fuck.innerHTML = "fuck";

    const commentInput = inputContainer.getRootNode().host;
    const commentContainer = commentInput.parentElement;
    commentContainer.replaceChild(newCommentContainer, commentInput);
  };
  return cb;
}

customElements.define("comment-input", CommentInput);
