function main() {
  // insert the titles into the title divs
  const titleDivs = document.querySelectorAll(".category-title");
  titleDivs.forEach((div,i) => {
    div.textContent = categoryTitles[i];
  });
  // gather up all the question divs and add click event listeners
  const questionDivs = document.querySelectorAll(".question");
  questionDivs.forEach(div => {
    div.addEventListener("click", questionClicked);
  });
}

// ensure that the DOM loads before we call our game script
document.addEventListener("DOMContentLoaded", main);

// helper functions (event listener callbacks) ---------- //

// callback for when a question item is clicked
function questionClicked(evt) {

  // set the current question target to "cleared"
  evt.target.classList.add("cleared");
  // get rid of the event listener on that item
  evt.target.removeEventListener("click", questionClicked);

  // create a div to be the question prompt displayed
  const div = document.createElement("div");
  // with the appropriate question as text content
  const index = parseInt(evt.target.id)-1;
  div.textContent = questionArray[index];
  // add the prompt class to the div
  div.classList.add("question-prompt")
  // add the event listener for clicking on a prompt
  div.addEventListener("click", promptClicked);

  // fade the board out
  document.querySelector(".board").style.opacity = 0;
  // add the document to the DOM
  document.documentElement.append(div);
  // fade the board in
  setTimeout(function(){
    document.querySelector(".question-prompt").style.opacity = 1;
  },500);

}

// callback for when a question prompt has been completed
function promptClicked(evt) {

  // fade out the question prompt and in the board
  evt.target.style.opacity = 0;
  setTimeout(function(){
    document.querySelector(".board").style.opacity = 1;
  },500);
  // remove the old question prompt (invisible) from the DOM
  setTimeout(function(){
    evt.target.remove();
  },500);

}

const categoryTitles = [
  "Category One",
  "Category Two",
  "Category Three",
  "Category Four",
  "Category Five",
  "Category Six",
]

// hard-coded so it's easy to modify
const questionArray = [
  "How much wood would a wood-chuck chuck if a wood-chuck could chuck wood?",
  "category 1 question 2",
  "category 1 question 3",
  "category 1 question 4",
  "category 1 question 5",
  "What is Sean's favourite food?",
  "category 2 question 2",
  "category 2 question 3",
  "category 2 question 4",
  "category 2 question 5",
  "category 3 question 1",
  "category 3 question 2",
  "category 3 question 3",
  "category 3 question 4",
  "category 3 question 5",
  "category 4 question 1",
  "category 4 question 2",
  "category 4 question 3",
  "category 4 question 4",
  "category 4 question 5",
  "category 5 question 1",
  "category 5 question 2",
  "category 5 question 4",
  "category 5 question 5",
  "category 5 question 3",
  "category 6 question 1",
  "category 6 question 2",
  "category 6 question 3",
  "category 6 question 4",
  "category 6 question 5"
]
