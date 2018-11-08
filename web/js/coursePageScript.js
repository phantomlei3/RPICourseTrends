

//---------------------------------------------------------------------
Vue.component('depart-courses', {
    template:'\
    <div>\
        <div id=departName>\
            Department: {{deptName}}\
        </div>\
        <div id=departCourses>\
            <div class=course\
            v-for="(item, index) in resultJson">\
                <div class=courseNo>{{item.department}}-{{item.courseCode}}: {{item.courseName}}</div>\
                <div class=professor>Instructor(s): {{item.professor}}</div>\
            </div>\
        </div>\
    </div>',

    data:function(){
        return {
            deptName: "",
            courseCode: "",
            courseName: "",
            resultJson: []
        };
    },

    /**
     * Helper function for copying course info
     */
    coursecpy: function(src, dest) {
        dest["department"] = src["department"];
        dest["courseCode"] = src["courseCode"];
        dest["courseName"] = src["courseName"];
        dest["professor"] = src["professor"];
    },

    created: function() {

        var _this = this;
        if (Cookies.get("department")){
            this.deptName = Cookies.get("department");
            $.getJSON("assets/identity_v2.json", function (dtaCourses) {
                $.each( dtaCourses, function( key, val ) {
                    let oneCourse = {};
                    if (val["department"] === _this.deptName) {
                        coursecpy(val, oneCourse);
                        _this.resultJson.push(oneCourse);
                    }
                });
            });    
        }
        else if (Cookies.get("courseCode")) {
            this.courseCode = Cookies.get("courseCode");
            $.getJSON("assets/identity_v2.json", function (dtaCourses) {
                $.each( dtaCourses, function( key, val ) {
                    let oneCourse = {};
                    if (val["courseCode"] === _this.courseCode) {
                        coursecpy(val, oneCourse);
                        _this.resultJson.push(oneCourse);
                    }
                });
            });    
        }
        else if (Cookies.get("courseName")) {
            this.courseName = Cookies.get("courseName");
            /// TODO: WIP
            throw new DOMException("WIP");
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
