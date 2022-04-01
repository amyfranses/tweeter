$(document).ready(() => {
  function createTweetElement(tweetData) {
    // create tweetElement markup as jquery object
    const tweetElement = $(`
        <article class="tweet">
          <header class="image-name-handle">
            <div class="image-name">
              <img class="user-image" src=${tweetData.user.avatars}>
              <div>${tweetData.user.name}</div>
            </div>   
            <div>${tweetData.user.handle}</div> 
          </header>  
            <p class="tweet-text"></p>
            <hr>
          <footer class="tweet-footer">   
            <div>${timeago.format(tweetData.created_at)}</div>
            <div class="icons">
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-flag"></i>
            </div>   
          </footer>   
          </article>       
     `);

    // creating text note out of tweet data to avoid cross scripting
    tweetElement.children(".tweet-text").text(tweetData.content.text);
    return tweetElement;
  }

  function renderTweets(tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    }
  }

  function loadTweets() {
    $.ajax({
      method: "GET",
      dataType: "json",
      url: "/tweets",
      success: function (response) {
        renderTweets(response);
      },
      error: (error) => console.log(error),
    });
  }

  function validTextInput() {
    const textinput = $("#tweet-text").val().trim().length;

    if (!textinput) {
      $("#error-message").text("Error: Input is empty... Write a tweet!");
      $("#error-message").slideDown("slow");
      setTimeout(() => {
        $("#error-message").slideUp();
      }, 2000);
      return false;
    } else if (textinput > 140) {
      $("#error-message").text("Error: Tweet is too long!");
      $("#error-message").slideDown("slow");
      setTimeout(() => {
        $("#error-message").slideUp();
      }, 2000);
      return false;
    } else {
      return true;
    }
  }

  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();

    if (validTextInput()) {
      $.ajax({
        method: "POST",
        url: "/tweets",
        type: "application/json",
        data: $(this).serialize(),
        success: function () {
          $.get("/tweets", (response) => {
            renderTweets(response);
            $("#new-tweet-form")[0].reset();
            $(".counter").val(140);
          });
        },
      });
    }
  });

  loadTweets();
});
