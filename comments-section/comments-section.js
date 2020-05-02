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

function createCommentInput(event, level) {
  const newCommentInput = document.createElement("textarea");
  newCommentInput.classList.add("comment-input-textbox");
  newCommentInput.classList.add(`reply-level-${level}`);

  const newCommentButton = createButton(
    "Add Comment",
    createCommentCbFactory("submit", level)
  );
  newCommentButton.classList.add("add-comment-button");

  const newCommentInputContainer = document.createElement("div");
  newCommentInputContainer.classList.add("comment-container");
  newCommentInputContainer.dataset.level = level; // TODO: maybe not needed

  newCommentInputContainer.appendChild(newCommentInput);
  newCommentInputContainer.appendChild(newCommentButton);
  return newCommentInputContainer;
}

function submitCommentCb(event, level) {
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
  const removeButton = createButton("Remove Comment", () => {}); // TODO: remove CB
  const editButton = createButton("Edit Comment", () => {}); // TODO: edit CB

  buttonContainer.appendChild(removeButton);
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(replyButton);

  const newCommentContainer = document.createElement("div");
  newCommentContainer.classList.add("comment-container");
  newCommentContainer.dataset.level = level; // TODO: maybe not needed

  newCommentContainer.appendChild(newComment);
  newCommentContainer.appendChild(buttonContainer);
  newCommentContainer.dataset.level = 1;

  allCommentsContainer.appendChild(newCommentContainer);
  event.target.parentElement.remove();
}

// TODO: make this generic, to work with replys
// need to pass which level we're in -- use https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes

function replyCb(event, level) {
  const commentContainer = event.target.parentElement;
  commentContainer.appendChild(createCommentInput(event, level));
}

function createButton(label, callback) {
  const newButton = document.createElement("input");
  newButton.type = "button";
  newButton.value = label;
  newButton.addEventListener("click", callback);
  return newButton;
}
