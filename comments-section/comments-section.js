import "./comment-input";
import "./comment-text";

let allCommentsContainer;
let addRootCommentButton;

function setup() {
  allCommentsContainer = document.getElementById("comments-container");
  addRootCommentButton = document.getElementById("add-root-comment-button");
}

function addRootCommentInputCb(event) {
  allCommentsContainer.appendChild(
    createCommentCbFactory(createTypes.input, 0)(event)
  );
}

const createTypes = {
  input: "input",
  submit: "submit",
  reply: "reply",
};
function createCommentCbFactory(action, level) {
  if (action === createTypes.input) {
    return (event) => createCommentInput(event, level);
  } else if (action === createTypes.submit) {
    return (event) => submitCommentCb(event, level);
  } else if (action === createTypes.reply) {
    return (event) => replyCb(event, level);
  }
}

function createCommentInput(event, level, text) {
  // TODO: most of this gets replaced with comment-text
  const newCommentInput = document.createElement("textarea");
  newCommentInput.classList.add("comment-input-textbox");
  newCommentInput.classList.add(`reply-level-${level}`);
  newCommentInput.value = text || "";

  const newCommentButton = createButton(
    "Add Comment",
    createCommentCbFactory("submit", level)
  );
  newCommentButton.classList.add("add-comment-button");

  const newCommentInputContainer = document.createElement("div");
  newCommentInputContainer.classList.add("comment-container");
  newCommentInputContainer.dataset.level = level;

  newCommentInputContainer.appendChild(newCommentInput);
  newCommentInputContainer.appendChild(newCommentButton);
  return newCommentInputContainer;
}

function submitCommentCb(event, level) {
  // TODO: most of this gets replaced with comment-text
  const text = event.target.parentElement.getElementsByClassName(
    "comment-input-textbox"
  )[0].value;

  const newComment = document.createElement("div");
  newComment.innerHTML = text;
  newComment.classList.add("comment-text");
  newComment.classList.add(`reply-level-${level}`);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("comment-button-container");

  const replyButton = createButton(
    "Reply",
    createCommentCbFactory("reply", level + 1)
  );
  const removeButton = createButton("Remove Comment", removeCb);
  const editButton = createButton("Edit Comment", editCb);

  buttonContainer.appendChild(removeButton);
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(replyButton);

  const newCommentContainer = document.createElement("div");
  newCommentContainer.classList.add("comment-container");
  newCommentContainer.dataset.level = level;

  newCommentContainer.appendChild(newComment);
  newCommentContainer.appendChild(buttonContainer);
  newCommentContainer.dataset.level = level;

  const inputContainer = event.target.parentElement;
  const container = inputContainer.parentElement;
  container.replaceChild(newCommentContainer, inputContainer);
}

function createButton(label, callback) {
  const newButton = document.createElement("input");
  newButton.type = "button";
  newButton.value = label;
  newButton.addEventListener("click", callback);
  return newButton;
}
