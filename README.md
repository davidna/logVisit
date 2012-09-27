# Different ways to log visits, using javascript

***
##Components:
<p>&nbsp;</p>
### browserCookie

no variables are passed-through (within scope of component)
<ul>
  <li>Given I am using a browser without a certain cookie,</li>
  <li>When I go to the site,</li>
  <li>Then the cookie is set on my browser, with 1-year expiration,</li>
  <li>And I am shown a page with instructions to continue to the target site.</li>
</ul>
<ul>
  <li>Given I am using a browser with a certain cookie,</li>
  <li>When I go to the site,</li>
  <li>Then I am shown a page letting me know I took the survey already.</li>
</ul>

variables are passed-through (out of component scope)
<ul>
  <li>Given I am using a browser without a certain cookie,
  <li>And I am attaching some querystring to the URL,
  <li>When I go to the updated URL,
  <li>Then I am shown a page with instructions to continue to the target site,
  <li>And there is a button which will take me to the target site,
  <li>And the button target will include all the querystring received.
</ul>
<p>&nbsp;</p>
***

#### for out-of-scope scenarios, consider using/creating surrounding components