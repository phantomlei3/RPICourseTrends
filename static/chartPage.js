//Default data config for the chart

$('.search-input').removeClass('nav-show');

var config =  {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: []
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
        </div>\
        <div id="statistics">\
            <div class="statBlock" id="rententionRate">\
                <div class="statTitle">Student Rentention Rate</div>\
                <div class="statValue">\
                    {{rententionRate}}%\
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
                <button id="dropDeadline"\
                v-on:click="setUpChart(30)">Before Drop Deadline</button>\
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
            rententionRate: 100,
            studentChange: -100
        }
    },


    created: function(){
        // get assignment from back-end variable (Jinja2)
        this.courseData = JSON.parse(courseData);
        this.courseName = courseName;

        let courseArguments = location.href.split("?")[1].split('&');
        let coursePIDs = courseArguments[0];

        // example:
        // coursePID=ENGR1100 <- get rid of this string
        // Allard_Schierenbe*Henry_Schierenbe*Knowles_Schieren -> [Allard/Schierenbe, Henry/Schierenbe, Knowles/Schieren]
        this.professors = coursePIDs.substring(18, coursePIDs.length).replace(/_/g, "/").split("*");

        // set up the start date
        this.startDate = Object.keys(Object.values(this.courseData)[0])[0];
        let numberOfDates = Object.keys(Object.values(this.courseData)[0]).length;
        // set up data date span (startDate)
        this.dateSpan = getDateFromCurrentDate(this.startDate, numberOfDates);

        // use dateSpan to set up X axes
        config.data.labels = this.dateSpan;

        // set up student number for each session

        for (let i = 0; i < this.professors.length; i++){
            let professorID = Object.keys(this.courseData)[i];
            let session = this.courseData[professorID];

            this.studentNumber = Object.values(session);
            console.log(this.studentNumber);

            //set up professor name in the chart

            let newDataset = {
                label: "",
                borderColor: '#FF9900',
                data: [],
            };

            newDataset["label"] = professorID.replace(/_/g, "/");
            newDataset["data"] = this.studentNumber;
            newDataset["borderColor"] = "#FF"+ (9900 - 2000 * i);

            //add the new datasets to chart
            config.data.datasets.push(newDataset);

            //use maxvalue and minValue to set up the range of Y axes
            let maxValue = Math.max.apply(null,this.studentNumber);
            let minValue = Math.min.apply(null,this.studentNumber);
            //The min value of Y axes will be minValue-5 or 0
            config.options.scales.yAxes[0].ticks.suggestedMin = Math.max(minValue-5,0);
            //The max value of Y axes will be maxValue+5
            config.options.scales.yAxes[0].ticks.suggestedMax = maxValue+5;
        }









        //setup statistic values
        this.rententionRate = this.studentNumber[this.studentNumber.length-1] / this.studentNumber[0] * 100;
        this.rententionRate = this.rententionRate.toFixed(1);
        this.studentChange = this.studentNumber[this.studentNumber.length-1] - this.studentNumber[0];


    },

    methods: {

       /**
        * function to set up chart for different time period
        * */
        setUpChart: function(recentPeriod) {
            //TODO: refactor this function
           //set up initial recent 30 days for the chart
           // let getLastElement = Math.max(this.studentNumber.length - recentPeriod, 1);
           // let lastDaysList = this.studentNumber.slice(getLastElement);
           // config.data.datasets[0]["data"] = lastDaysList;
           //
           // // use dateSpan to set up X axes for recent 30 days
           // config.data.labels = this.dateSpan.slice(getLastElement);
           //
           // //use maxvalue and minValue to set up the range of Y axes
           // let maxValue = Math.max.apply(null,lastDaysList);
           // let minValue = Math.min.apply(null,lastDaysList);
           // //The min value of Y axes will be minValue-5 or 0
           // config.options.scales.yAxes[0].ticks.suggestedMin = Math.max(minValue-5,0);
           // //The max value of Y axes will be maxValue+5
           // config.options.scales.yAxes[0].ticks.suggestedMax = maxValue+5;
           window.myLine.update();
        }
    }
});

var chartApp = new Vue({
    el:'#app-chart',

});


var ctx = document.getElementById('courseChart').getContext('2d');
window.myLine = new Chart(ctx, config);