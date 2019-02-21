# Design of the MDN browser-compat-data collector

This service is part of an effort to
[assist BCD updates with automation](https://github.com/mdn/browser-compat-data/issues/3308),
and exists to run lots of small tests in browsers to determine the support
status of a feature in a browser, and save those results. Updating BCD using
the results is not done as part of this service.

## Tests

BCD itself and reffy-reports are used to generate tests, and tests can also be
written manually. The output of a test is arbitrary JSON, which must be
interpreted with knowledge of what the test does.

All tests are listed in `/MANIFEST.json`.

## Running tests

### Manually

When pointing a browser at https://mdn-bcd-collector.appspot.com/ to run tests,
the server keeps track of which tests to run, accepts results from each test as
it run, and combines all of the results at the end.

To start a run, the browser posts to `/api/first` and gets a first page URL to
visit in the response. A random session id is used and carried along through
every step.

On each page, the harness waits for results and posts them to `/api/report`.
The next page to visit is retrieved from `/api/next`.

When all the tests have been run, `/api/next` will return a URL to a page where
the results can be submitted is a pull request to a GitHub repository.

### WebDriver

When running the tests using WebDriver, the WebDriver client keeps track of
which tests to run and stores the results. The server in this case can be
entirely static.

## Reports

A `bcd_report.json` is written somewhere. TODO: where?
