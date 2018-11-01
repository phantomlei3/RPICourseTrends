var resultJson;
//---------------------------------------------------------------------
Vue.component('depart-courses', {
    template:'\
    <div id=departCourses>\
        <div class=course\
        v-for="cInfo of testData">\
            <div class=courseNo>{{cInfo.department}}-{{cInfo.courseCode}}: {{cInfo.courseName}}</div>\
            <div class=professor>Instructor(s): {{cInfo.professor}}</div>\
        </div>\
    </div>',

    data:function(){
        return {
            testData: null
        };
    },

    created: function(){
        this.testData = resultJson
    }

});
Vue.component('depart-name', {
    template:'\
    <div id=departName>\
        Department: {{deptName}}\
    </div>\
    ',

    data: function() {
        return {
            deptName: ""
        };
    },

    created: function() {
        for (let item in resultJson) {
            this.deptName = resultJson[item]["department"];
            break;    
        }
    }
});
// var app = new Vue({
//     el: "#contents"
// })


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
