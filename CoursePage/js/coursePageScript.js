function change() {
    $(".course").html("<p>test</p>");
    console.log("done");
}

function loadCoursesFromData() {

}

// setup and load course data from json
let dtaCourse = "";
$.getJSON("assets/courseData.json",function(dtaCourse, status) {
    if (status != "success") {
        console.log(status);
        return;
    }
    $("#departName").append("Course Department: "+dtaCourse.department);
    for (let pair in dtaCourse) {
        if (dtaCourse[pair]["courseCode"] != undefined) {
            $(".contents").append("<div class=course><div class=courseNo>"+dtaCourse[pair]["courseCode"]+"\t"+dtaCourse[pair]["courseName"]+"</div><div class=professor>"+"Instructor(s): "+dtaCourse[pair]["professor"]+"</div></div>");
        }
    }    
    alert("开机速度优化成功！");

} );
