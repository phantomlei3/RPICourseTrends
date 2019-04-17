## Overview

RPI Course Data Platform built by Python Web Crawler under RCOS(Rensselaer Center for Open Source)

## What is RPICourseTrends?

RPICourseTrends is data platform that collects and provides the trends of student number in every course at RPI. The mission of this platform is to facilitate RPI students to decide on their prospective courses and instructors. 

Unlike student rating websites, RPICourseTrends automatically and consistently collects the student number of each course from RPI Student Information System every semester. Through a clear data visualization and direct search function on the platform, RPI students are able to evaluate each course, compare different professors, and make a decision on future courses.


## Plans for this semester (currently Spring19)
- Reconstruct the Python web crawler: The previous version was not able to obtain data correctly for the courses with multiple instructors. The ultimate goal is to collect all the student numbers under each course correctly and consistently.
- Improve search function: Users should be able to search any keyword in the name of courses or professors to check the data. i.e. The server should be able to give search results even the user enters a partial course name / code.
- Provide data analysis more than just the trends of student numbers: Display retention rate after the add/drop deadline of the semester.

## Contributing

Our team is currently working on the essential coding of RPICourseTrends. We use Python for the backend as well as web crawler, and vue.js for the front end. There might be several structural alternation. Once we settle the structure down in early 2019, we will provide detailed documentation for people who are interested to contribute on RPICourseTrends.
### Tech stack
- Frontend: html, css, javascript (w/ vue.js & chart.js)
- Backend: python3 (w/ flask), MySQL

### Reporting a bug

When reporting a bug, please do include these following messages to help us understand the situation:

- Behavior that is considered a bug
- Steps on how to reproduce the bug
- Environments: operating system and browser version
- (optional) Error message: for example, error messages in the browser's debug console could be really helpful

### Pull Requests

Please see [pull_request_template.md](https://github.com/phantomlei3/RPICourseTrends/blob/master/pull_request_template.md) for details.

## License

This project is under the MIT license.
For details, please refer to [LICENSE](https://github.com/phantomlei3/RPICourseTrends/blob/master/LICENSE) file.
