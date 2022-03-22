$(document).ready(function () {
  // --- our code goes here ---

  $("#tweet-text").on("input", function (event) {
    // console.log(this);
    let tweet = $(this).val();
    // event.target.value;
    let remainder = 140 - tweet.length;
    const counter = $(".counter");
    counter.text(remainder).css("color", "black");
    if (remainder < 0) {
      counter.css("color", "red");
    }
  });
});
