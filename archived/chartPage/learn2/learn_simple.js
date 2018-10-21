var week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = ["January", "February", "March", "April", "May", "June", "July"];

var config = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
};

var app = new Vue({
    el: '#app',
    methods: {
        recentWeek: function () {
            config.data.labels = week;
            config.data.datasets[0].data.push();
            window.myLine.update();
        },

        recentMonth: function () {
            config.data.labels = month;
            window.myLine.update();
        }

    }
});

window.onload = function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myLine = new Chart(ctx, config);
}
