import "./comment-input.js";
import "./comment-text.js";

let allCommentsContainer;
let addRootCommentButton;

window.onload = function setup() {
  allCommentsContainer = document.getElementById("comments-container");
  addRootCommentButton = document.getElementById("add-root-comment-button");

  addRootCommentButton.onclick = addRootCommentInputCb;
};

function addRootCommentInputCb(event) {
  const commentInput = document.createElement("comment-input");
  commentInput.content = { level: 0, text: "" };
  allCommentsContainer.appendChild(commentInput);
}
