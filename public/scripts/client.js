/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$( document ).ready(function() {
  // Create a new tweet html element
  const createTweetElement = function(tweetData) {
    const markup = `
      <article class='tweet'>
        <header>
          <div id='leftHead'>
            <img src=${tweetData['user'].avatars}>
            <h3 class='name'>${tweetData['user'].name}</h3> 
          </div>
          <div id='righHead'>
            <h3 class='handle'>${tweetData['user'].handle}</h3>
          </div>
        </header>
        <p>${tweetData['content'].text}</p>
        <footer>
          <div class = 'footer-text'>
            <span class='time'>${tweetData.created_at}</span>
            <span class='icons'>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
            </span>
          </div> 
        </footer>
      </article>
    `
    return markup;
  }

  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
});
