document.addEventListener("DOMContentLoaded", function () {
  const counterElement = document.getElementById("counter");
  const plusButton = document.getElementById("plus");
  const minusButton = document.getElementById("minus");
  const heartButton = document.getElementById("heart");
  const pauseButton = document.getElementById("pause");
  const submitButton = document.getElementById("submit");
  const commentInput = document.getElementById("comment-input");
  const likesList = document.querySelector(".likes");
  const commentsList = document.getElementById("list");

  let counterValue = 0;
  let intervalId;
  let isPaused = false;

  // Function to update the counter display
  function updateCounter() {
    counterElement.textContent = counterValue;
  }

  // Function to start the counter
  function startCounter() {
    intervalId = setInterval(() => {
      if (!isPaused) {
        counterValue++;
        updateCounter();
      }
    }, 1000);
  }

  // Event listener for plus button
  plusButton.addEventListener("click", () => {
    counterValue++;
    updateCounter();
  });

  // Event listener for minus button
  minusButton.addEventListener("click", () => {
    counterValue--;
    updateCounter();
  });

  // Event listener for heart button
  heartButton.addEventListener("click", () => {
    const likedItem = document.getElementById(`like_${counterValue}`);
    if (likedItem) {
      likedItem.dataset.likes++;
      likedItem.textContent = `${counterValue} has ${likedItem.dataset.likes} likes`;
    } else {
      const listItem = document.createElement("li");
      listItem.id = `like_${counterValue}`;
      listItem.dataset.likes = 1;
      listItem.textContent = `${counterValue} has 1 like`;
      likesList.appendChild(listItem);
    }
  });

  // Event listener for pause button
  pauseButton.addEventListener("click", () => {
    isPaused = true;
    clearInterval(intervalId);
    plusButton.disabled = true;
    minusButton.disabled = true;
    heartButton.disabled = true;
    submitButton.disabled = true;
    pauseButton.textContent = "resume";
  });

  // Event listener for resume button
  pauseButton.addEventListener("dblclick", () => {
    isPaused = false;
    startCounter();
    plusButton.disabled = false;
    minusButton.disabled = false;
    heartButton.disabled = false;
    submitButton.disabled = false;
    pauseButton.textContent = "pause";
  });

  // Event listener for submit button
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText) {
      const commentItem = document.createElement("div");
      commentItem.textContent = commentText;
      commentsList.appendChild(commentItem);
      commentInput.value = "";
    }
  });

  // Start the counter
  startCounter();
});
