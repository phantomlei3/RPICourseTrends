function change() {
    $(".course").html("<p>test</p>");
    console.log("done");
}

function loadCoursesFromData() {

}

function addCourseToPage(dtaCourse) {
    $(".contents").append("<strong>VA♂N</strong>");
    $(".contents").append("<p>DDF is not just DirectDepositForm</p>");
    ///TODO: load course data from json
    alert("开机速度优化成功！");
}


function setup() {
    let dtaCourse = null;
    $.getJSON("assets/courseData.json", dtaCourse);
    addCourseToPage(dtaCourse);
}

console.log(123);