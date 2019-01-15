# RPICourseTrends
RPI Course Data Platform built by Python Web Crawler under RCOS(Rensselaer Center for Open Source)
## What is RPICourseTrends?
RPICourseTrends is data platform that collects and provides the trends of student number in every course at RPI. The mission of this platform is to facilitate RPI students to decide on their prospective courses and instructors. Unlike student rating websites, RPICourseTrends automatically and consistently collects the student number of each course from RPI Student Information System every semester. Through a clear data visualization and direct search function on the platform, RPI students are able to evaluate each course, compare different professors, and make a decision on future courses.

Our team have three things to be implemented this semester. The first one is to reconstruct the Python web crawler. The previous version was not able to obtain data correctly for the courses with multiple instructors. The ultimate goal is to collect all the student numbers under each course correctly and consistently. The second one is to improve search function. Our users would be able to search any keyword in the name of courses or professors to check the data. The last but not the least, we will provide data analysis more than just the trends of student numbers. We first plan to implement the calculation of retention rates after add or drop deadline. 

## Milestone:
##### Design and Learning Process: 9/01-9/02

##### First iteration: 9/15-10/22
- Build back end
    - Complete python web crawler that obtain course data from sis for this semester
    - Complete mySQL table to save the course data
    - Generate JSON Files for front end to read
- Build basic front end framework
    - Complete landing page, and course selection page
    - Learn basic knowledge of vue javascript framework
    - Complete search function basic framework: only for one complete word
    - Learn the data visualization javascript library: chart.js 

##### Complete the first demo before RCOS presentation: 10/22-11/25   
- Improve back end
    - Generate two JSON file
        - identities JSON file to store information of all courses in one semester
        - data JSON file to store varying number of students during one semester for each course
- Implement Front end
    - Design and Create a LOGO for the landing page
    - Finish the chart page for a single course
    - Implement chart function: provide weekly/monthly/one semester data
    - Improve functionality of search bar: allow users to search professor names
    - Provide users more suggestive key words (course code/department code/professor name)
    - CSS aesthetics improvement 

## Team members
+ Ruijie Geng 
+ Ruizhen Zhu
+ Pengqin Wu 
+ Haolun Zhang 
+ Zixiang Zhang
+ Jianing Lin 
+ Lei Luo 

