

//---------------------------------------------------------------------
Vue.component('depart-courses', {
    template:'\
    <div>\
        <div id=departName>\
            Department: {{deptName}}\
        </div>\
        <div id=departCourses>\
            <div v-for="(course, index) in courseInfo"\
            v-on:click="toChartPage(index)" v-bind:ref="index" class=course>\
                <div class=courseNo>{{course.department}}-{{course.courseCode}}: {{course.courseName}}</div>\
                <div v-for="session in course.sessions" class=professor>\
                    Session instructor(s): {{session.professor}}\
                </div>\
            </div>\
        </div>\
    </div>',

    data:function(){
        return {
            deptName: "",
            courseInfo: [],
        };
    },

    //=================A SEGMENT OF COURSE JSON DATA=====================================
      // "CSCI1100": {
      //   "courseName": "COMPUTER SCIENCE I",
      //   "department": "COGS",
      //   "courseCode": "2120",
      //   "sessions": [
      //     {
      //       "professor": "Kuzmin/Eberwein",
      //       "max": "337"
      //     },
      //     {
      //       "professor": "Kuzmin/Tozzi/Malazita",
      //       "max": "30"
      //     }
      //   ]
      // },
    //=================A SEGMENT OF COURSE JSON DATA=====================================


    created: function() {
        this.courseInfo = JSON.parse(courseInfo);
        //add up a list of professors in each session to show on the front end
        for (let courseID in this.courseInfo){
            let course = this.courseInfo[courseID];
            course["professors"] = "";
            // standardize name of each course
            course["courseName"] = standardCourseName(course["courseName"]);
            // Convert any "ENG and ENGR" () TO
            for(let i = 0; i < course["sessions"].length; i++){
                let session = course["sessions"][i];
                course["professors"] += session["professor"];
                // delimiter of multiple professors
                if (i !== course["sessions"].length - 1){
                     course["professors"] += ", ";
                }
            }
        }
    },

    methods:{

        toChartPage: function(index){

            //use index from vue.js to findout which course the user select
            // courseInfo is a array contains courseCode and courseName
            let selectedCourse = this.$refs[index][0].childNodes[0].innerHTML.split(":");
            //extract the first string to be courseCode
            let courseCode = selectedCourse[0].replace("-","");

            // use courseCode to find the course in courseInfo
            //TODO: show up multiple professors (sessions) for one course in chartPage.
            // Currently, it only show up the first Session
            let selectedCourseInfo = this.courseInfo[courseCode];
            let thisFirstSession = selectedCourseInfo["sessions"][0];
            // coursePID is the combination of courseID and professor name to
            // find out course in the backend database
            let coursePID = courseCode + thisFirstSession["professor"].replace("/", "_");

            // delete the first element courseCode
            selectedCourse.shift();
            //extract the rest of string to be courseName
            let courseName = selectedCourse.join();
            console.log(courseName.trim());

            location.href = "chartPage?coursePID="+ coursePID + "&courseName=" + courseName;
        }

    }


});


var courseApp = new Vue({
    el: "#contents",
});

// ----------------------------------------------------------------------------------
// decide what's the current semester
let today = new Date();
let subSemester = "";
if (today.getMonth() <= 5) {    ///todo: double-check when summer ARCH starts and fix this
    subSemester = "Spring ";
}else if (today.getMonth() >= 9) {
    subSemester = "Fall ";
}else{
    subSemester = "Summer ";
}
$("#currentSemester").text(subSemester + today.getFullYear());




// -----------------------------------------------------------------------------------------------

// // setup and load course data from json
// var dtaCourse = "";
// $.getJSON("assets/courseData.json",function(dtaCourse, status) {
//     contents.testData = dtaCourse;
//     // $("#departName").append("<strong>Course Department: "+dtaCourse.department+"</strong>");
//     // for (let pair in dtaCourse) {
//     //     if (dtaCourse[pair]["courseCode"] != undefined) {
//     //         $("#departCourses").append("<div class=course><div class=courseNo>"+dtaCourse[pair]["courseCode"]+"\t"+dtaCourse[pair]["courseName"]+"</div><div class=professor>"+"Instructor(s): "+dtaCourse[pair]["professor"]+"</div></div>");
//     //     }
//     // }    
//     // alert("开机速度优化成功！");

// } );
