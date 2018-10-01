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
    $("#departName").append("Department: "+dtaCourse.department);
    for (let pair in dtaCourse) {
        if (dtaCourse[pair]["courseCode"] != undefined) {
            $(".contents").append("<div class=course><div class=courseNo>"+dtaCourse[pair]["courseCode"]+"</div><div class=professor>"+dtaCourse[pair]["professor"]+"</div></div>");
        }
    }    
    alert("开机速度优化成功！");

} );
