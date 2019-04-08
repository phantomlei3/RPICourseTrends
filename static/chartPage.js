//Default data config for the chart

$('.search-input').removeClass('nav-show');

var config =  {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            label: "My First dataset",
            //backgroundColor: '#FF9900',
            borderColor: '#FF9900',
            //pointBackgroundColor: "#ffffff",
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        animation: {
            duration: 0
        },

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
                    fontColor: '#ffffff',
                    maxRotation: 0
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
        <div id="statistics">\
            <div class="statBlock" id="rententionRate">\
                <div class="statTitle">Rentention Rate</div>\
                <div class="statvalue">\
                    {{rententionRate}}\
                </div>\
            </div>\
            <div class="statBlock" id="studentChange">\
                <div class="statTitle">Student Number\'s Change</div>\
                <div class="statValue">\
                    {{studentChange}}\
                </div>\
            </div>\
        </div>\
        <div id="courseData">\
            <div id="options">\
                <button id="pastWeek"\
                v-on:click="setUpChart(7)">Past 7 days</button>\
                <button id="pastMonth"\
                v-on:click="setUpChart(30)">Past 30 days</button>\
            </div>\
            <canvas id="courseChart" height="100">\
            </canvas>\
        </div>\
    </div>',


    data: function() {
        return {
            courseID: "",
            courseName: "",
            professors: "",
            studentNumber: [],
            startDate: "",
            dateSpan: [],
            courseData: [],
            rententionRate: 0,
            studentChange: 0
        }
    },


    created: function(){
        // get assignment from back-end variable (Jinja2)
        this.courseData = JSON.parse(courseData);
        this.courseName = courseName;

        let courseArguments = location.href.split("?")[1].split('&');
        let coursePID = courseArguments[0];

        this.professors = coursePID.substring(18, coursePID.length).replace("_", "/");

        this.startDate = Object.keys(this.courseData)[0];
        console.log(this.courseData);

        this.studentNumber = Object.values(this.courseData);




        // set up data date span (startDate)
        this.dateSpan = getDateFromCurrentDate(this.startDate, this.studentNumber.length);

        //set up professor name in the chart
        config.data.datasets[0]["label"] = this.professors;

        config.data.datasets[0]["data"] = this.studentNumber;


        // use dateSpan to set up X axes for recent 30 days
        config.data.labels = this.dateSpan;

        //use maxvalue and minValue to set up the range of Y axes
        let maxValue = Math.max.apply(null,this.studentNumber);
        let minValue = Math.min.apply(null,this.studentNumber);
        //The min value of Y axes will be minValue-5 or 0
        config.options.scales.yAxes[0].ticks.suggestedMin = Math.max(minValue-5,0);
        //The max value of Y axes will be maxValue+5
        config.options.scales.yAxes[0].ticks.suggestedMax = maxValue+5;



    },

    methods: {

       /**
        * function to set up chart for different time period
        * */
        setUpChart: function(recentPeriod) {
           //set up initial recent 30 days for the chart
           let getLastElement = Math.max(this.studentNumber.length - recentPeriod, 1);
           let lastDaysList = this.studentNumber.slice(getLastElement);
           config.data.datasets[0]["data"] = lastDaysList;

           // use dateSpan to set up X axes for recent 30 days
           config.data.labels = this.dateSpan.slice(getLastElement);

           //use maxvalue and minValue to set up the range of Y axes
           let maxValue = Math.max.apply(null,lastDaysList);
           let minValue = Math.min.apply(null,lastDaysList);
           //The min value of Y axes will be minValue-5 or 0
           config.options.scales.yAxes[0].ticks.suggestedMin = Math.max(minValue-5,0);
           //The max value of Y axes will be maxValue+5
           config.options.scales.yAxes[0].ticks.suggestedMax = maxValue+5;
           window.myLine.update();
        }
    }
});

var chartApp = new Vue({
    el:'#app-chart',

});


var ctx = document.getElementById('courseChart').getContext('2d');
window.myLine = new Chart(ctx, config);