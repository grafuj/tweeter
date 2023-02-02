
$(document).ready(() => {
  $("#null").slideUp(0)
  $("#tooLong").slideUp(0)
  $("#tooShort").slideUp(0)
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
  //example data

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
// {/* <script>alert("o")</script>   */}

  const createTweetElement = (tweetObj) => {
    let $tweet = tweetObj;

    /* Your code for creating the tweet element */
    let returnTempLit = `
    <article class="tweet">
    <div class="tweet-user">
    <span class="photo-name">
      <img src="${$tweet.user.avatars}">
      <a>${$tweet.user.name}</a>
    </span>
    <a>${$tweet.user.handle}</a>
    </div>
    <div class="tweet-message">
      <a class="line">${escape($tweet.content.text)}</a>
    </div>

    <footer>
    <div class="date-icons">
      <span class="date">
        <a>${timeago.format($tweet.created_at)}</a>
      </span>
      <span>
        <i class="fa-solid fa-flag flag"></i>
        <i class="fa-solid fa-retweet retweet"></i>
        <i class="fa-solid fa-heart heart-like"></i>
      </span>
    </div>
  </footer>
  </article>`;

    return returnTempLit;
  };

  const renderTweets = (arrayOfTweetObjects) => {
    $('#tweets-container').empty();
    for (let obj of arrayOfTweetObjects) {
      // calls createTweetElement for each tweet
      let newTweet = createTweetElement(obj);
      $('#tweets-container').prepend(newTweet);
    }
  };

  const $form = $('#post-tweet');
  $form.submit((event) => {
    event.preventDefault();
    const data = $form.serializeArray(); //returns a string that starts with name=
    let tweetText = data[0].value;

    if (!tweetText) {
      $("#null").slideDown()
      return;
    }
    if (tweetText.length > 140) {
      $("#tooLong").slideDown()
      return;
    }
    if (tweetText.length < 1) {
      $("#tooShort").slideDown()
      return;
    }
    
    //send AJAX post request
    $.post($form.attr('action'), data, (res) => {
      console.log(res);
      $("#null").slideUp()
      $("#tooLong").slideUp()
      $("#tooShort").slideUp()

      loadTweets();
      $("#tweet-text").val(""); //reset to blanks
      $(".counter").val("140");
    });
  });

  const loadTweets = () => {
    // $.get($form.attr('action'), data, (res) => {


    $.get("http://localhost:8080/tweets", (data) => {
      console.log('data:', data);
      renderTweets(data);
    });
  };

  loadTweets();

});