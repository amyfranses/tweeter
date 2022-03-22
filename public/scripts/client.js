function createTweetElement(tweetObject) {
  let $tweet = tweetObject.content.text;
  let article = $("<article>").addClass("tweet");
  const postedTweet = `
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
     `;
  return article.append(postedTweet);
}

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $("#tweet-container").empty();
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

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const $tweet = createTweetElement(tweetObject);
$(document).ready(() => {
  renderTweets(data);
});
console.log($tweet);
