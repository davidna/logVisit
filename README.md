# site to try different ways to log visits, using javascript

- no variables are passed-through

Given I am using a browser without a certain cookie,
When I go to the site,
Then the cookie is set on my browser, with 1-year expiration,
And I am shown a page with instructions to continue to the target site.

Given I am using a browser with a certain cookie,
When I go to the site,
Then I am shown a page letting me know I took the survey already.

- variables are passed-through

Given I am using a browser without a certain cookie,
And I am attaching some querystring to the URL,
When I go to the updated URL,
Then I am shown a page with instructions to continue to the target site,
And there is a button which will take me to the target site,
And the button target will include all the querystring received.
