//Default data config for the chart
var config =  {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: '#FF9900',
            borderColor: '#FF9900',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {
        legend: {
            // setting for the label of each data set
            labels: {
                fontColor: '#ffffff',
                fontSize: 14
            }
        },
        scales: {
            // setting for y axes
            yAxes: [{
                ticks: {
                    fontColor: '#ffffff',
                    suggestedMax: 300,
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                },
            }],
            // setting for x axes
            xAxes: [{
                ticks: {
                    fontColor: '#ffffff'
                },
            }]
        }
    }
};

/***
 * Structure Logic here:
 * Use Cookie to get CourseID and Course Name from coursePage
 * Use CourseID to find the corresponding course in the currentNUmber.json
 * Save startDate, current, and professor Name
 *
 * User Click
 * Save cookie
 * Use Cookie
 * Process data from json
 *
 * */

Vue.component('course-chart',{
    template:'\
    <div>\
        <div id="courseInfo">\
            <div id="courseTitle">\
                {{courseName}}\
            </div>\
            <div id="professor">\
                {{professors}}\
            </div>\
        </div>\
        <div id="courseData">\
            <div id="options">\
                <button id="pastWeek"\
                v-on:click="weekDisplay()">Past 7 days</button>\
                <button id="pastMonth"\
                v-on:click="">Past 30 days</button>\
            </div>\
            <canvas id="courseChart" width="400" height="100">\
            </canvas>\
        </div>\
    </div>',


    created: function(){
        let _this = this;
        /**
         * Load variable from Cookies
         * */
        $.getJSON("assets/currentNumber.json", function(allData){
            let targetDepart = _this.courseID.substr(0,4);
            let courseData = allData[targetDepart][_this.courseID];
            _this.studentNumber = courseData["currect"];
            _this.startDate = courseData["startDate"];
            // set up data date span (startDate)
            _this.dateSpan = getDateFromCurrentDate(_this.startDate, _this.studentNumber.length);

            //set up professor name in the chart
            config.data.datasets[0]["label"] = _this.professors;

            //set up initial recent 30 days for the chart
            let getLastElement = Math.max(_this.studentNumber.length - 30, 1);
            let lastDaysList = _this.studentNumber.slice(getLastElement);
            config.data.datasets[0]["data"] = lastDaysList;

            // use dateSpan to set up X axes for recent 30 days
            config.data.labels = _this.dateSpan.slice(getLastElement);

            //use maxvalue and minValue to set up the range of Y axes
            let maxValue = Math.max.apply(null,lastDaysList);
            let minValue = Math.min.apply(null,lastDaysList);
            //The min value of Y axes will be minValue-5 or 0
            config.options.scales.yAxes[0].ticks.suggestedMin = Math.max(minValue-5,0);
            //The max value of Y axes will be maxValue+5
            config.options.scales.yAxes[0].ticks.suggestedMax = maxValue+5;
            window.myLine.update();

        });


    },

    data: function() {
        return {
            courseID: "CSCI4965",
            courseName: "RCOS",
            professors: "Turner/Goldschmid",
            studentNumber: "",
            startDate: "",
            dateSpan: ""


        }
    },

    methods: {
        weekDisplay: function() {

            window.myLine.update();
            console.log(config);
        }
    }
});

var chartApp = new Vue({
    el:'#app-chart',

});


var ctx = document.getElementById('courseChart').getContext('2d');
window.myLine = new Chart(ctx, config);