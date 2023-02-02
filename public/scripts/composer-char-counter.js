$(document).ready(() => {
  console.log("wahoo, doc ready");
  $('#tweet-text').keydown(function() {
    let characterCount = 140 - ($(this).val().length);
    let elementToChange = document.getElementById('counter');
    if (characterCount < 0) {
      $(elementToChange).addClass('red-text');
    }
    if (characterCount >= 0) {
      $(elementToChange).removeClass('red-text');
    }
    $(elementToChange).text(characterCount);
  });
});