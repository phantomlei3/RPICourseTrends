function change() {
    $(".course").html("<p>test</p>");
    console.log("done");
}



//---------------------------------------------------------------------
Vue.component('depart-courses', {
    template:'\
    <div id=departCourses>\
        <div class=course\
        v-for="cInfo of testData">\
            <div class=courseNo>{{cInfo.courseCode}}: {{cInfo.courseName}}</div>\
            <div class=professor>Instructor(s): {{cInfo.professor}}</div>\
        </div>\
    </div>',

    data:function(){
        return {
            testData: null
        };
    },

    created: function(){
        var _this = this;
        $.getJSON("assets/courseData.json", function (json) {
            _this.testData = json;
        });
    }

});

var app = new Vue({
    el: "#contents"
})


// let vueCourses = new Vue({
//     el: '#departCourses',
//     data: {
//         courseList: "<div class=course><div class=courseNo>TEST-1234  TestEntry</div><div class=professor>Instructor(s):BenBitdiddle</div></div>"
//     }
// });

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
