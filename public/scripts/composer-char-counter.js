$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    const str = $(this).val()
    const len = str.length; // Get string length inside tweet area.
    const counter = $(this).next()  //Get the counter node
      .children()
      .next();
    
    // Make counter red if its less than 0.
    if (counter.html() <= 0) {
      $(counter).addClass('illegal');
    } else {
      $(counter).removeClass('illegal');
    }
    counter.html(140 - len);
  });
});

