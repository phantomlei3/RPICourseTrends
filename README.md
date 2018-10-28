# RPICourseTrends
RPI Course Data Platform built by Python Web Crawler under RCOS(Rensselaer Center for Open Source)
##What is RPICourseTrends?
RPICourseTrends is a data platform that shows the trends of 
number of students in each RPI course. Its mission is to 
help students evaluate courses by knowing retention rate of
 each course. 
 
 Compared to existing course evaluation websites, 
 RPICourseTrends does not build on student ratings. 
 Instead, it collects the number of students in each course 
 directly from RPI Student Information System every day during 
 one semester. 
 
 This data will be stored and visualized on a web 
 platform open to RPI students who are interested. Our target 
 audiences include student who need some data to help 
 them evaluate RPI courses and who would to choose a professor 
 for one course.
## Milestone:
#####Design and Learning Process: 9/01-9/02

#####First iteration: 9/15-10/22
- Build back end
    - Complete python web crawler that obtain course data from sis for this semester
    - Complete mySQL table to save the course data
    - Generate JSON Files for front end to read
- Build basic front end framework
    - Complete landing page, and course selection page
    - Learn basic knowledge of vue javascript framework
    - Complete search function basic framework: only for one complete word
    - Learn the data visualization javascript library: chart.js 

#####Complete the first demo before RCOS presentation: 10/22-11/25   
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

