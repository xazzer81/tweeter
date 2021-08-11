/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  // Render all tweets in the database.
  const renderTweets = function(tweets) {
    for(const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('.all-tweets').append(tweetElement);
    }
  }

  // Create a new tweet element. ---- Using time ago library to format the time.
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
            <span class='time'>${timeago.format(tweetData.created_at)}</span>
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

  //Listen to form submit request.
  $('.new-tweet').submit((event) => {
    event.preventDefault();
    console.log(event)
  });
  renderTweets(data);
});
