Vue.component('course-info',{
    template:'\
    <div id="courseInfo">\
        <div id="courseTitle">\
        {{courseTitle}}\
        </div>\
        <div id="professor">\
            {{professors}}\
        </div>\
    </div>',

    data: function() {
        return {
            courseTitle: "ARTS 1020 Media Studio: Imaging",
            professors: "Meltz, Ruzanka"
        }
    }
});


Vue.component('course-chart',{
    template:'\
    <div id="courseData">\
        <div id="options">\
            <button id="pastWeek"\
            v-on:click="weekDisplay()">Past 7 days</button>\
            <button id="pastMonth"\
            v-on:click="">Past 30 days</button>\
        </div>\
        <canvas id="courseChart" width="400" height="100">\
        </canvas>\
    </div>',

    data: function() {
        return {
            courseTitle: "ARTS 1020 Media Studio: Imaging",
            professors: "Meltz, Ruzanka"
        }
    },

    methods: {
        weekDisplay: function() {
            config.data.labels = ["1", "2", "3", "4", "5", "6"];
            window.myLine.update();
            console.log(config);
        }
    }
});

var chartApp = new Vue({
    el:'#app-chart',

});

var config =  {
    // The type of chart we want to create
    type: 'line',

        // The data for our dataset
        data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
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
                    fontColor: '#ffffff'
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


var ctx = document.getElementById('courseChart').getContext('2d');
window.myLine = new Chart(ctx, config);