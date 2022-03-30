$(document).ready(function () {
  // --- our code goes here ---

  $("#tweet-text").on("input", function (event) {
    let tweet = $(this).val();
    let remainder = 140 - tweet.length;
    const counter = $(".counter");
    counter.text(remainder).css("color", "black");
    if (remainder < 0) {
      counter.css("color", "red");
    }
  });
});
