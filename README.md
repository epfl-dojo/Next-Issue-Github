# Next-Issue-Github

This user script add "Next Issue" and "Previous Issue" button when you are on
GitHub issue page. One can then easily browse issue one by one.

![GitHub Next Issue Screenshot](GitHubNextIssue.png)

## Notes

### CSP
`Content Security Policy: The page’s settings blocked the loading of a resource at self (“script-src”). Source: !function e(a){var b=document.querySelec....`

  * https://github.com/greasemonkey/greasemonkey/issues/2046
  * https://github.com/Tampermonkey/tampermonkey/issues/418
  * https://bugzilla.mozilla.org/show_bug.cgi?id=866522
  * https://bugzilla.mozilla.org/show_bug.cgi?id=1267027
  
Dirty fix: `about:config` → set `security.csp.enable` to false.
  
### GitHub Reload
As GitHub change the URL without reloading the page, it's necessary to check 
changes in the page in order to load or reload the script then needed.
See https://github.com/greasemonkey/greasemonkey/issues/2136 and more precisely
the [first option](https://stackoverflow.com/questions/17385145/scriptish-script-needs-the-page-refreshed-to-run/17385193#17385193) of https://stackoverflow.com/a/18997637/960623 to get details of how it's done.
