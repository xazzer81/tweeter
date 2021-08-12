/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Render all tweets in the database.
  const renderTweets = function(tweets) {

    for(const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('.all-tweets').prepend(tweetElement);
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
          <div id='rightHead'>
            <h3 class='handle'>${tweetData['user'].handle}</h3>
          </div>
        </header>
        <p>${escape(tweetData['content'].text)}</p>
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
      url: 'http://localhost:8080/tweets', 
      success: function(data) {
        $('.all-tweets').empty();  //Remove all tweets before displaying again
        renderTweets(data);
      }
    });
  }

  //Listen to form submit request.
  $('form').on('submit', function(event) {
    event.preventDefault();
    $('#error').hide(100);

    const data = $(this).serialize();
    const counter = $(this).find('.counter').val();   //The value of the character counter on form submission
    
    if (counter < 0) {
      $('#error').html('Limited to 140 characters for a tweet');
      $('#error').show(100);
      return;
    }

    // Check if something is typed or not.
    if (data.length === 5) {  //Since serialize() returns a string, if nothing is typed the string returned is text=
      $('#error').html('Please write something');
      $('#error').show(100);
    }

    $.ajax({
      method: 'POST', 
      url: 'http://localhost:8080/tweets', 
      data: data, 
      success: () => {
        loadTweets();
        $(this).find('textarea').val('');
      }
    });  
  });

  loadTweets();
});
