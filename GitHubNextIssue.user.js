// ==UserScript==
// @name        GitHub Next Issue
// @namespace   none
// @match       https://github.com/*
// @grant       GM_xmlhttpRequest
// @require     https://code.jquery.com/jquery-3.3.1.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @author      EPFL-dojo
// @version     v0.0.3
// @downloadURL https://raw.githubusercontent.com/epfl-dojo/Next-Issue-Github/master/GitHubNextIssue.user.js
// ==/UserScript==

// Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);

// Handle page/URL changes without a proper reload
// see https://stackoverflow.com/a/17385193/960623
window.addEventListener ("hashchange", fireOnNewPage,  false);
waitForKeyElements ("#js-flash-container", appMain);

function fireOnNewPage () {
    switch (location.hash.toLowerCase() ) {
        case "#js-flash-container":
        default:
        appMain();
        break;
    }
}
fireOnNewPage ();   //-- Initial run on initial, full page load.

function appMain() {
  $('.js-flash-container').ready(function() {
    
    console.log("GitHub Next Issue user script started...");
    
    // Get Current and Issues URLs
    var currentURL = window.location.href;
    var to = currentURL.lastIndexOf('/') +1;
    var issuesURL =  currentURL.substring(0, to);
    var pathSegments = window.location.pathname.split('/');
    var orga = pathSegments[1];
    var repo = pathSegments[2];
    var currentIssue = pathSegments[4];

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
              // remove pull request console.log(e);
            } else {
              issues.push(e.number);
            }
          });

          var prev = (issues[issues.indexOf(parseInt(currentIssue))-1]);
          var prevURL = issuesURL + prev
          var next = (issues[issues.indexOf(parseInt(currentIssue))+1]);
          var nextURL = issuesURL + next

          // Add the Next Issue Button
          $('.gh-header-actions > a').parent().prepend('<a id="nextissue" href="' + prevURL + '" class="btn btn-sm btn-secondary float-right" onclick="window.location.href=\'' + prevURL + '\'">Previous issue</a>');
          $('.gh-header-actions > a').parent().prepend('<a id="previssue" href="' + nextURL + '" class="btn btn-sm btn-secondary float-right" onclick="window.location.href=\'' + nextURL + '\'">Next issue</a>');

        },
        onerror: function() {
          console.log("error");
        }
      });
    }
  });
}