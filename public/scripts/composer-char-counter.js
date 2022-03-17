$(document).ready(function () {
  // --- our code goes here ---
  console.log("Ok, ready to go!");

  $("#tweet-text").on("input", function (event) {
    let tweet = event.target.value;
    let remainder = 140 - tweet.length;
    $(".counter").text(remainder);
    if (remainder < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});
