function change() {
    $(".course").html("<p>test</p>");
    console.log("done");
}

//---------------------------------------------------------------------

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

// setup and load course data from json
let dtaCourse = "";
$.getJSON("assets/courseData.json",function(dtaCourse, status) {
    if (status != "success") {
        console.log(status);
        return;
    }
    $("#departName").append("<strong>Course Department: "+dtaCourse.department+"</strong>");
    for (let pair in dtaCourse) {
        if (dtaCourse[pair]["courseCode"] != undefined) {
            $(".contents").append("<div class=course><div class=courseNo>"+dtaCourse[pair]["courseCode"]+"\t"+dtaCourse[pair]["courseName"]+"</div><div class=professor>"+"Instructor(s): "+dtaCourse[pair]["professor"]+"</div></div>");
        }
    }    
    // alert("开机速度优化成功！");

} );
