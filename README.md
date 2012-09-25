# browser-cookie-based pass-through site

- no variables are passed-through

Given I am using a browser without a certain cookie,
When I go to the site,
Then the cookie is set on my browser, with 1-year expiration,
And I am shown a page with instructions to continue to the survey.

Given I am using a browser with a certain cookie,
When I go to the site,
Then I am shown a page letting me know I took the survey already.