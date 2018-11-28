

//---------------------------------------------------------------------
Vue.component('depart-courses', {
    template:'\
    <div>\
        <div id=departName>\
            Department: {{deptName}}\
        </div>\
        <div id=departCourses>\
            <div v-for="(item, index) in resultJson"\
            v-on:click="toChartPage(index)" v-bind:ref="index" class=course>\
                <div class=courseNo>{{item.department}}-{{item.courseCode}}: {{item.courseName}}</div>\
                <div class=professor>\
                Instructor(s): {{item.strProfList}}\
                </div>\
            </div>\
        </div>\
    </div>',

    data:function(){
        return {
            deptName: "",
            courseCode: "",
            courseName: "",
            resultJson: [],
        };
    },

    // methods: {
    //     /**
    //      * Helper function for copying course info
    //      */
    //     coursecpy: function(val, oneCourse) {
    //         oneCourse["department"] = val["department"];
    //         oneCourse["courseCode"] = val["courseCode"];
    //         oneCourse["courseName"] = val["courseName"];
    //         oneCourse["professor"] = val["professor"];
    //     },

    // },

    //=================A SEGMENT OF COURSE JSON DATA=====================================
    // "DATA STRUCTURES": {
    //     "professor": [
    //         "Cutler/Eberwein"
    //     ],
    //     "time": "F18",
    //     "courseName": "DATA STRUCTURES",
    //     "Capacity": [
    //         360
    //     ],
    //     "department": "CSCI",
    //     "courseCode": "1200"
    // },
    //=================A SEGMENT OF COURSE JSON DATA=====================================


    created: function() {

        var _this = this;
        if (Cookies.get("courseName") != "null"){
            _this.courseName = Cookies.get("courseName");
            $.getJSON("assets/identity_v2.json", function (dtaCourses) {
                $.each( dtaCourses, function( key, val ) {
                    let oneCourse = {};
                    // check for course code
                    if (val["courseName"] === _this.courseName) {
                        // coursecpy(val, oneCourse);
                        oneCourse["department"] = val["department"];
                        oneCourse["courseCode"] = val["courseCode"];
                        oneCourse["courseName"] = val["courseName"];
//                        oneCourse["professor"] = val["professor"];
                        // uniqufy contents in professor list
                        let professorSet = new Set(val["professor"]);
                        let strProf = "";
                        for (ppl of professorSet) {
                            strProf += ppl;
                            strProf += ", ";
                        }
                        oneCourse["strProfList"] = strProf;
                        // put things in a string
                        _this.resultJson.push(oneCourse);
                    }
                });
            });    
            
        }else
        if (Cookies.get("courseCode") != "null") {
            _this.courseCode = Cookies.get("courseCode");
            $.getJSON("assets/identity_v2.json", function (dtaCourses) {
                $.each( dtaCourses, function( key, val ) {
                    let oneCourse = {};
                    // check for course code
                    let strDepartment = _this.courseCode.substr(0,4);
                    let strCode = _this.courseCode.substr(5,4);
                    if (val["courseCode"] === strCode && val["department"] === strDepartment) {
                        // coursecpy(val, oneCourse);
                        oneCourse["department"] = val["department"];
                        oneCourse["courseCode"] = val["courseCode"];
                        oneCourse["courseName"] = val["courseName"];
//                        oneCourse["professor"] = val["professor"];
                        // uniqufy contents in professor list
                        let professorSet = new Set(val["professor"]);
                        let strProf = "";
                        for (ppl of professorSet) {
                            strProf += ppl;
                            strProf += ", ";
                        }
                        oneCourse["strProfList"] = strProf.substr(0,strProf.length-1);
                        // put things in a string
                        _this.resultJson.push(oneCourse);
                    }
                });
            });    
        }
        else if (Cookies.get("department") != "null") {
            _this.deptName = Cookies.get("department").substr(0,4);
            $.getJSON("./assets/identity_v2.json", function (dtaCourses) {
                $.each( dtaCourses, function( key, val ) {
                    let oneCourse = {};
                    if (val["department"] === _this.deptName) {
                        // coursecpy(val, oneCourse);
                        oneCourse["department"] = val["department"];
                        oneCourse["courseCode"] = val["courseCode"];
                        oneCourse["courseName"] = standardCourseName(val["courseName"]);
//                        oneCourse["professor"] = val["professor"];
                        // uniqufy contents in professor list
                        let professorSet = new Set(val["professor"]);
                        let strProf = "";
                        for (ppl of professorSet) {
                            strProf += ppl;
                            strProf += ", ";
                        }
                        oneCourse["strProfList"] = strProf;
                        // put things in a string
                        _this.resultJson.push(oneCourse);
                    }
                });
            });    

        }else{
            console.log("didnt get anything :(");
        }


    },

    methods:{

        toChartPage: function(index){

            let courseInfo = this.$refs[index][0].childNodes[0].innerHTML.split(":");
            //extract the first string to be courseCode
            let courseCode = courseInfo[0].replace("-","");
            courseInfo.shift();
            Cookies.set("clickedCourseCode", courseCode);
            //extract the rest of string to be courseName
            let courseName = courseInfo.join();


            //location.href = "chartPage.html";
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
