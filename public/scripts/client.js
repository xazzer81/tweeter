/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {

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

  // Load all tweets from the server
  const loadTweets = function() {
    $.ajax({
      method: 'GET', 
      url: '/tweets', 
      success: function(data) {
        renderTweets(data);
      }
    });
  }

  //Listen to form submit request.
  $('form').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const counter = $(this).find('.counter').val();   //The value of the character counter on form submission
    
    if (counter < 0) {
      alert('Limited to 140 characters for a tweet');
      return;
    }
    
    // Check if something is typed or not.
    if (data.length === 5) {  //Since serialize() returns a string, if nothing is typed the string returned is text=
      alert ('Please write something');
    }

    $.ajax({method: 'POST', url: '/tweets', data: data})
  });

  loadTweets();
});
