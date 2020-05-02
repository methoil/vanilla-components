let allCommentsContainer;
let addRootCommentButton;

function setup() {
  allCommentsContainer = document.getElementById("comments-container");
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

  allCommentsContainer.appendChild(newCommentInputContainer);
}

function submitComment(event) {
  const text = event.target.parentElement.getElementsByClassName(
    "comment-input-textbox"
  )[0].value;

  const newComment = document.createElement("div");
  newComment.innerHTML = text;
  newComment.classList.add("comment-text");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("comment-button-container");

  const replyButton = document.createElement("input");
  replyButton.type = "button";
  replyButton.value = "Reply";
  replyButton.addEventListener("click", () => {}); // TODO: reply CB

  const removeButton = document.createElement("input");
  removeButton.type = "button";
  removeButton.value = "Remove Comment";
  removeButton.addEventListener("click", () => {}); // TODO: remove CB

  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.value = "Edit Comment";
  editButton.addEventListener("click", () => {}); // TODO: edit CB

  buttonContainer.appendChild(removeButton);
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(replyButton);

  const newCommentContainer = document.createElement("div");
  newCommentContainer.classList.add("comment-container");
  newCommentContainer.appendChild(newComment);
  newCommentContainer.appendChild(buttonContainer);

  allCommentsContainer.appendChild(newCommentContainer);
  event.target.parentElement.remove();
}
