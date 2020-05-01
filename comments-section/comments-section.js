let commentsContainer;
let addRootCommentButton;

function setup() {
  commentsContainer = document.getElementById("comments-container");
  addRootCommentButton = document.getElementById("add-root-comment-button");
}

function addRootComment(event) {
  const newCommentInput = document.createElement("textarea");
  // newCommentInput.type = "text";
  newCommentInput.classList.add("comment-input-textbox");

  const newCommentButton = document.createElement("input");
  newCommentButton.classList.add("add-comment-button");
  newCommentButton.type = "button";
  newCommentButton.value = "Add Comment";
  newCommentButton.addEventListener("click", submitComment);

  const newCommentInputContainer = document.createElement("div");
  newCommentInputContainer.classList.add("comment-input-container");
  newCommentInputContainer.appendChild(newCommentInput);
  newCommentInputContainer.appendChild(newCommentButton);

  commentsContainer.appendChild(newCommentInputContainer);
}

function submitComment(event) {
  const text = event.target.parentElement.getElementsByClassName(
    "comment-input-textbox"
  )[0].value;
  const newComment = document.createElement("div");
  newComment.innerHTML = text;
  newComment.classList.add("comment-text");

  commentsContainer.appendChild(newComment);
  event.target.parentElement.remove();
}
