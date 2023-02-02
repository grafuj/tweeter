$(document).ready(() => {
  $("#null").slideUp(0);
  $("#tooLong").slideUp(0);
  $("#tooShort").slideUp(0);

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweetObj) => {
    let $tweet = tweetObj;

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

  /*empties feed, calls createTweetElement for each tweet, adds to top of feed */
  const renderTweets = (arrayOfTweetObjects) => {
    $('#tweets-container').empty();
    for (let obj of arrayOfTweetObjects) {
      let newTweet = createTweetElement(obj);
      $('#tweets-container').prepend(newTweet);
    }
  };

  const $form = $('#post-tweet');
  $form.submit((event) => {
    event.preventDefault();
    const data = $form.serializeArray();
    let tweetText = data[0].value;

    if (tweetText.length < 1) {
      $("#tooShort").slideDown();
      return;
    }
    if (!tweetText) {
      $("#null").slideDown();
      return;
    }
    if (tweetText.length > 140) {
      $("#tooLong").slideDown();
      return;
    }

    /* this actually sends the AJAX request to the database, the callback wants all error messages hidden by default, loads the tweets then clears the entry fields */
    $.post($form.attr('action'), data, (res) => {
      console.log(res);
      $("#null").slideUp();
      $("#tooLong").slideUp();
      $("#tooShort").slideUp();

      loadTweets();
      $("#tweet-text").val("");
      $(".counter").val("140");
    });
  });

  const loadTweets = () => {
    $.get("http://localhost:8080/tweets", (data) => {
      console.log('data:', data);
      renderTweets(data);
    });
  };

  loadTweets();
});