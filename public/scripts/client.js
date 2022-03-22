function createTweetElement(tweetObject) {
  let $tweet = tweetObject.content.text;

  const postedTweet = $(`
        <article class="tweet">
          <header class="image-name-handle">
            <div class="image-name">
              <img class="user-image" src=${tweetObject.user.avatars}>
              <div>${tweetObject.user.name}</div>
            </div>   
            <div>${tweetObject.user.handle}</div> 
          </header>  
            <p class="tweet-text">${$tweet}</p>
            <hr>
          <footer class="tweet-footer">   
            <div>${tweetObject.created_at}</div>
            <div class="icons">
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-flag"></i>
            </div>   
          </footer>   
          </article>       
     `);
  return postedTweet;
}

const renderTweets = function (tweets) {
  // $("#tweet-container").empty();
  for (let tweet of tweets) {
    $("#tweet-container").prepend(createTweetElement(tweet));
  }
};

const tweetObject = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

const $tweet = createTweetElement(tweetObject);

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

$(document).ready(() => {
  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/tweets",
      type: "application/json",
      data: $(this).serialize(),
      success: function () {
        $("textarea").val("");
        $.get("/tweets", (response) => {
          const lastTweet = [response.slice(-1).pop()];
          renderTweets(lastTweet);
        });
      },
    });
  });

  loadTweets();
});
