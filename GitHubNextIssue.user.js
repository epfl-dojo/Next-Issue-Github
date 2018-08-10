// ==UserScript==
// @name        GitHub Next Issue
// @namespace   none
// @match       https://github.com/*/*/issues/*
// @grant       GM_xmlhttpRequest
// @require     https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$('.js-flash-container').ready(function() {
  
  console.log("Starting....");
  
  
  // Get Current and Issues URLs
  var currentURL = window.location.href;
  var to = currentURL.lastIndexOf('/') +1;
  var issuesURL =  currentURL.substring(0, to);
  var pathSegments = window.location.pathname.split('/');
  var orga = pathSegments[1];
  var repo = pathSegments[2];
  var currentIssue = pathSegments[4];
  
  console.log(typeof currentIssue);
  console.log(currentURL);

  changeIssues();
  
  
  // Get the issues list
  function changeIssues() {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://api.github.com/repos/" + orga + "/" + repo + "/issues",
      onload: function(res) {
        var issues = [];
        JSON.parse(res.responseText).forEach(function(e){
          if (typeof(e.pull_request) !== 'undefined'){
            console.log(e);
          } else {
            issues.push(e.number);
          }
        });

        var prev = (issues[issues.indexOf(parseInt(currentIssue))-1]);
        var prevURL = issuesURL + prev
        var next = (issues[issues.indexOf(parseInt(currentIssue))+1]);
        var nextURL = issuesURL + next


        // Add the Next Issue Button
        $('.gh-header-actions > a').parent().prepend('<a href="' + prevURL + '" class="btn btn-sm btn-secondary float-right" onclick="window.location.href=\'' + prevURL + '\'">Previous issue</a>');
        $('.gh-header-actions > a').parent().prepend('<a href="' + nextURL + '" class="btn btn-sm btn-secondary float-right" onclick="window.location.href=\'' + nextURL + '\'">Next issue</a>');

      },
      onerror: function() {
          alert('Error.');
          console.log("error");
      }
    });
  }
  
});
