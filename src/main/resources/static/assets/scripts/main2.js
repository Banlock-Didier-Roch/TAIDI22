(function () {

        //Manage chaertjs : SELATSA
        var ctx = document.getElementById('chart-arearestaurant')?.getContext('2d');
        var ctx1 = document.getElementById('chart-arealocation')?.getContext('2d');
        var ctx2 = document.getElementById('chart-areatraiteur')?.getContext('2d');
        var ctx3 = document.getElementById('chart-areasérigraphie')?.getContext('2d');
        var ctx4 = document.getElementById('canvasglobale')?.getContext('2d');
        var current2 = 0

        //Manage PaginationIndices : DIDIER **************************************************************************************************************************
        var paginationContainer = document.getElementById('paginationContainer');
        var commandContainer = document.getElementById('commandContainer');
        var currentPage = document.getElementById('currentPage');
        if(!!paginationContainer){
            var pageIndices = paginationContainer.getElementsByTagName("li");
        }

        //Fonction addPaginationListener : Ajout du listener sur les elements de la pagination : DIDIER
        function addPaginationListener() {
            for (i = 1; i < pageIndices.length; i++) {
                var pageIndex = paginationContainer.getElementsByTagName("li")[i];
                if (!!pageIndex) {
                    var createClickHandler = function (pageIndex, index) {

                        return function () {
                            if (pageSelectionnee != index) {

                                //Changer la selection document.getElementById("MyElement").classList.remove('MyClass');
                                paginationContainer.getElementsByTagName("li")[pageSelectionnee].classList.remove('active');
                                paginationContainer.getElementsByTagName("li")[index].classList.add('active');
                                currentPage.innerText = ""+index+"";
                                pageSelectionnee  = index;

                                commandContainer.innerHTML = '';

                                var premierElement = (index-1) * 10;

                                if((premierElement+9) < listeCommandes.length){
                                    for (var i = premierElement; i < premierElement+10; i++) {

                                        var row = ` <tr>
                                                    <td class="text-center text-muted" th:text="">${listeCommandes[i].id}</td>
                                                    <td class="text-center">${listeCommandes[i].date}</td>
                                                    <td class="text-center">${listeCommandes[i].heure}</td>
                                                    <td class="text-center">${listeCommandes[i].prix_total}</td>
                                                </tr>`;
                                        commandContainer.innerHTML += row;

                                    }
                                }

                                else{
                                    for (var i = premierElement; i < listeCommandes.length; i++) {

                                        var row = ` <tr>
                                                    <td class="text-center text-muted" th:text="">${listeCommandes[i].id}</td>
                                                    <td class="text-center">${listeCommandes[i].date}</td>
                                                    <td class="text-center">${listeCommandes[i].heure}</td>
                                                    <td class="text-center">${listeCommandes[i].prix_total}</td>
                                                </tr>`;
                                        commandContainer.innerHTML += row;

                                    }
                                }
                            }
                        };

                    };
                    pageIndex.onclick = createClickHandler(pageIndex, i);
                }
            }
        }
        // Fin fonction addPaginationListener ***************************************************************************************************************************

        //Fonction actualiserCommandes: Actualiser la liste de commande en fonction des dates entrees : DIDIER
        function actualiserCommandes() {
            if (window.fetch) {

                var myInit = {
                    method: 'GET',
                    //headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                };

                var datedebut = document.getElementById('start').value;
                var datefin = document.getElementById('end').value;

                var url = '/gestionTAIDI/api/chp_api4/' +formatted_date1+ '/'  + formatted_date2;

                fetch(url, myInit)
                    /*.then(function(){
                        console.log("Chargement...")
                    })*/
                    .then(function (response) {
                        return response.json();
                        // console.log(response.json())
                    })
                    .then(function (json) {

                        json.forEach(([{designation}, occurence]) => {
                            designations.push(designation+" Quantité :"+ occurence);
                            occurences.push(occurence)
                        })
                        console.log(designations+"\n\n"+occurences);

                        //if (current !== designations.length) {
                        //   current = designations.length
                        var config = {
                            type: 'pie',
                            data: {
                                datasets: [{
                                    data: [...occurences],
                                    backgroundColor: [
                                        window.chartColors.red,
                                        window.chartColors.orange,
                                        window.chartColors.yellow,
                                        window.chartColors.green,
                                        window.chartColors.blue,
                                    ],
                                    label: 'Dataset 2'
                                }],
                                labels: [...designations]
                            },
                            options: {
                                responsive: true,
                                legend: {
                                    position: 'right',
                                    labels:{
                                        fontSize: 16,

                                    }
                                },
                                title:{
                                    display:true,
                                    text:'ytergplkjhgr',
                                }
                            }
                        };
                        window.myPie = new Chart(ctx, config);
                        // }

                    });
            } else {
                // Faire quelque chose avec XMLHttpRequest?
                console.log("error!!!");
            }
        }


        if (!!ctx) {
            var current2 = 0

            window.onload = function () {

                var current = 0
                //window.setInterval(function () {

                    var designations = []
                    var occurences = []
                    if (window.fetch) {
                        var myHeaders = new Headers();

                        var myInit = {
                            method: 'GET',
                            //headers: myHeaders,
                            mode: 'cors',
                            cache: 'default'
                        };

                        var curr = new Date; // get current date
                        var first = curr.getDate() - curr.getDay()+1; // First day is the day of the month - the day of the week
                        var last = first + 6; // last day is the first day + 6

                        var firstday = new Date(curr.setDate(first));
                        var lastday = new Date(curr.setDate(last));

                        let formatted_date1 = firstday.getFullYear() + "-" + (firstday.getMonth() + 1) + "-" + firstday.getDate();
                        let formatted_date2 = lastday.getFullYear() + "-" + (lastday.getMonth() + 1) + "-" + lastday.getDate();

                        var url = '/gestionTAIDI/api/chp_api4/' +formatted_date1+ '/'  + formatted_date2

                        fetch(url, myInit)
                            /*.then(function(){
                                console.log("Chargement...")
                            })*/
                            .then(function (response) {
                                return response.json();
                                // console.log(response.json())
                            })
                            .then(function (json) {

                                json.forEach(([{designation}, occurence]) => {
                                    designations.push(designation+" Quantité :"+ occurence);
                                    occurences.push(occurence)
                                })
                                console.log(designations+"\n\n"+occurences);

                                //if (current !== designations.length) {
                                 //   current = designations.length
                                    var config = {
                                        type: 'pie',
                                        data: {
                                            datasets: [{
                                                data: [...occurences],
                                                backgroundColor: [
                                                    window.chartColors.red,
                                                    window.chartColors.orange,
                                                    window.chartColors.yellow,
                                                    window.chartColors.green,
                                                    window.chartColors.blue,
                                                ],
                                                label: 'Dataset 2'
                                            }],
                                            labels: [...designations]
                                        },
                                        options: {
                                            responsive: true,
                                            legend: {
                                                position: 'right',
                                                labels:{
                                                    fontSize: 16,

                                                }
                                            },
                                            title:{
                                                display:true,
                                                text:'ytergplkjhgr',
                                            }
                                        }
                                    };
                                    window.myPie = new Chart(ctx, config);
                               // }

                            });
                    } else {
                        // Faire quelque chose avec XMLHttpRequest?
                        console.log("error!!!");
                    }
            //    }, 3000)

                //Call addPaginationListener au chargement de la page : DIDIER **************************************************************************************************************************
                if(!!paginationContainer){
                    addPaginationListener();
                }
            };


            document.getElementById('actualiser').addEventListener('click', function () {

                myPie.destroy()

                var datedebut = document.getElementById('start').value
                var datefin = document.getElementById('end').value

                var current = 0
                //window.setInterval(function () {

                    var designations = []
                    var occurences = []
                    if (window.fetch) {
                        var myHeaders = new Headers();

                        var myInit = {
                            method: 'GET',
                            //headers: myHeaders,
                            mode: 'cors',
                            cache: 'default'
                        };
                        var url = '/gestionTAIDI/api/chp_api4/' + datedebut + '/' + datefin

                        fetch(url, myInit)
                            /*.then(function(){
                                console.log("Chargement...")
                            })*/
                            .then(function (response) {
                                return response.json();
                                // console.log(response.json())
                            })
                            .then(function (json) {

                                json.forEach(([{designation}, occurence]) => {
                                    designations.push(designation)
                                    occurences.push(occurence)
                                })

                                //if (current !== designations.length) {
                                   // current = designations.length
                                    var config3 = {
                                        type: 'pie',
                                        data: {
                                            datasets: [{
                                                data: [...occurences],
                                                backgroundColor: [
                                                    window.chartColors.red,
                                                    window.chartColors.orange,
                                                    window.chartColors.yellow,
                                                    window.chartColors.green,
                                                    window.chartColors.blue,
                                                ],
                                                label: 'Dataset 2'
                                            }],
                                            labels: [...designations]
                                        },
                                        options: {
                                            responsive: true
                                        }
                                    };


                                    window.myPie = new Chart(ctx, config3);

                              //  }

                            });
                    } else {
                        // Faire quelque chose avec XMLHttpRequest?
                    }
               // }, 3000)

            //Manage commands container : DIDIER **************************************************************************************************************************


            });

        }
        if (!!ctx1) {
            console.log('testons')
            var current = 0
            //window.setInterval(function () {

                var designations = []
                var occurences = []
                if (window.fetch) {
                    var myHeaders = new Headers();

                    var myInit = {
                        method: 'GET',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default'
                    };

                    fetch('/gestionTAIDI/api/chp_api1', myInit)
                        /*.then(function(){
                            console.log("Chargement...")
                        })*/
                        .then(function (response) {
                            return response.json();
                            // console.log(response.json())
                        })
                        .then(function (json) {

                            json.forEach(([{designation}, occurence]) => {
                                designations.push(designation)
                                occurences.push(occurence)
                            })

                            //if (current !== designations.length) {
                                //current = designations.length
                                var config3 = {
                                    type: 'pie',
                                    data: {
                                        datasets: [{
                                            data: [...occurences],
                                            backgroundColor: [
                                                window.chartColors.red,
                                                window.chartColors.orange,
                                                window.chartColors.yellow,
                                                window.chartColors.green,
                                                window.chartColors.blue,
                                            ],
                                            label: 'Dataset 2'
                                        }],
                                        labels: [...designations]
                                    },
                                    options: {
                                        responsive: true
                                    }
                                };
                                window.myPie = new Chart(ctx1, config3);
                           // }

                        });
                } else {
                    // Faire quelque chose avec XMLHttpRequest?
                }
           // }, 3000)

        }

        if (!!ctx2) {
            var current = 0
            //window.setInterval(function () {

                var designations = []
                var occurences = []
                if (window.fetch) {
                    var myHeaders = new Headers();

                    var myInit = {
                        method: 'GET',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default'
                    };

                    fetch('/gestionTAIDI/api/chp_api2', myInit)
                        /*.then(function(){
                            console.log("Chargement...")
                        })*/
                        .then(function (response) {
                            return response.json();
                            // console.log(response.json())
                        })
                        .then(function (json) {

                            json.forEach(([{designation}, occurence]) => {
                                designations.push(designation)
                                occurences.push(occurence)
                            })

                            //if (current !== designations.length) {
                                //current = designations.length
                                var config3 = {
                                    type: 'pie',
                                    data: {
                                        datasets: [{
                                            data: [...occurences],
                                            backgroundColor: [
                                                window.chartColors.red,
                                                window.chartColors.orange,
                                                window.chartColors.yellow,
                                                window.chartColors.green,
                                                window.chartColors.blue,
                                            ],
                                            label: 'Dataset 2'
                                        }],
                                        labels: [...designations]
                                    },
                                    options: {
                                        responsive: true
                                    }
                                };
                                window.myPie = new Chart(ctx2, config3);
                           // }

                        });
                } else {
                    // Faire quelque chose avec XMLHttpRequest?
                }
           // }, 3000)

        }

        if (!!ctx3) {
            var current = 0
            //window.setInterval(function () {

                var designations = []
                var occurences = []
                if (window.fetch) {
                    var myHeaders = new Headers();

                    var myInit = {
                        method: 'GET',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default'
                    };

                    fetch('/gestionTAIDI/api/chp_api3', myInit)
                        /*.then(function(){
                            console.log("Chargement...")
                        })*/
                        .then(function (response) {
                            return response.json();
                            // console.log(response.json())
                        })
                        .then(function (json) {

                            json.forEach(([{designation}, occurence]) => {
                                designations.push(designation)
                                occurences.push(occurence)
                            })

                            //if (current !== designations.length) {
                                //current = designations.length
                                var config3 = {
                                    type: 'pie',
                                    data: {
                                        datasets: [{
                                            data: [...occurences],
                                            backgroundColor: [
                                                window.chartColors.red,
                                                window.chartColors.orange,
                                                window.chartColors.yellow,
                                                window.chartColors.green,
                                                window.chartColors.blue,
                                            ],
                                            label: 'Dataset 2'
                                        }],
                                        labels: [...designations]
                                    },
                                    options: {
                                        responsive: true
                                    }
                                };
                                window.myPie = new Chart(ctx3, config3);
                            //}

                        });
                } else {
                    // Faire quelque chose avec XMLHttpRequest?
                }
           // }, 3000)

        }

        if (!!ctx4) {


            /*var designations = []
                var occurences = []

                    if (window.fetch) {
                    var myHeaders = new Headers();

                    var myInit = { method: 'GET',
                        //headers: myHeaders,
                        mode: 'cors',
                        cache: 'default' };

                    fetch('/gestionTAIDI/api/chp_api2',myInit)
                        /!*.then(function(){
                            console.log("Chargement...")
                        })*!/
                        .then(function(response) {
                            return response.json();
                            // console.log(response.json())
                        })
                    .then(function(json) {

                        json.forEach(([{designation}, occurence]) => {
                            designations.push(designation)
                            occurences.push(occurence)
                        })

                                }
                            )}*/


            /*var config5 = {type:"bar",
                data:{labels:["January","February","March","April","May","June","July"],
                    datasets:[
                        {label:"Restauration",
                            backgroundColor: "rgb(54, 162, 235)",
                            data:[20,30,60,50,40,10,80
                            ]},

                        {label:"Service Traiteur",
                            backgroundColor: "rgb(75, 192, 192)",
                            data:[20,30,60,50,40,40,100]},

                        {label:"Sérigraphie",
                            backgroundColor: "rgb(54, 162, 235)",
                            data:[0,30,100,50,40,10,80]},

                        {label:"Location de chambres",
                            backgroundColor: "rgb(75, 192, 192)",
                            data:[20,30,60,20,40,10,80]}
                    ]
                },
                options:{responsive:!0,
                    legend:{position:"top"},
                    title:{display:!1,
                        text:"Chart.js Bar Chart"
                    }}}

                window.myPie = new Chart(ctx4,config5);*/
        }


        var speedData = {
            labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
            datasets: [{
                label: "Car Speed",
                data: [0, 59, 75, 20, 20, 55, 40],
            }]
        };

        var chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 80,
                    fontColor: 'black'
                }
            }
        };

    }


)()








var canvas = document.getElementById("pieChart");
var ctx = canvas.getContext('2d');

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;
var theHelp = Chart.helpers;

var data = {
  labels: ["she returns it ", "she keeps it"],
  datasets: [{
    fill: true,
    backgroundColor: [
      'black',
      'white'
    ],
    data: [5, 95],
    borderColor: ['black', 'black'],
    borderWidth: [2, 2]
  }]
};

var options = {
  title: {
    display: true,
    text: 'What happens when you lend your Hoodie to a girl ?',
    position: 'top'
  },
  rotation: -0.7 * Math.PI,
  legend: {
    display: true,

    // generateLabels changes from chart to chart,  check the source,
    // this one is from the doughut :
    // https://github.com/chartjs/Chart.js/blob/master/src/controllers/controller.doughnut.js#L42
    labels: {
      generateLabels: function(chart) {
        var data = chart.data;
        if (data.labels.length && data.datasets.length) {
          return data.labels.map(function(label, i) {
            var meta = chart.getDatasetMeta(0);
            var ds = data.datasets[0];
            var arc = meta.data[i];
            var custom = arc && arc.custom || {};
            var getValueAtIndexOrDefault = theHelp.getValueAtIndexOrDefault;
            var arcOpts = chart.options.elements.arc;
            var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
            var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
            var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
              return {
              // And finally :
              text: ds.data[i] + "% of the time " + label,
              fillStyle: fill,
              strokeStyle: stroke,
              lineWidth: bw,
              hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
              index: i
            };
          });
        }
        return [];
      }
    }
  }
};

// Chart declaration:
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: data,
  options: options
});

console.log(myPieChart.generateLegend());



//Plugin from githubExample:
//https://github.com/chartjs/Chart.js/blob/master/samples/data_labelling.html


Chart.plugins.register({
  afterDatasetsDraw: function(chartInstance, easing) {
    // To only draw at the end of animation, check for easing === 1
    var ctx = chartInstance.chart.ctx;
    chartInstance.data.datasets.forEach(function(dataset, i) {
      var meta = chartInstance.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function(element, index) {
          // Draw the text in black, with the specified font
          ctx.fillStyle = 'grey';
          var fontSize = 16;
          var fontStyle = 'normal';
          var fontFamily = 'Helvetica Neue';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
          // Just naively convert to string for now
          var dataString = dataset.data[index].toString();
          // Make sure alignment settings are correct
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var padding = 5;
          var position = element.tooltipPosition();
          ctx.fillText(dataString + '%', position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  }
});
