(function () {

    //Manage chaertjs : SELATSA
    var ctx = document.getElementById('chart-arearestaurant')?.getContext('2d');
    var ctx1 = document.getElementById('chart-arealocation')?.getContext('2d');
    var ctx2 = document.getElementById('chart-areatraiteur')?.getContext('2d');
    var ctx3 = document.getElementById('chart-areasérigraphie')?.getContext('2d');
    var ctx4 = document.getElementById('canvasglobale')?.getContext('2d');
    var current2 = 0

    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontSize = 16;
    var theHelp = Chart.helpers;

//Manage PaginationIndices : DIDIER **************************************************************************************************************************
    var paginationContainer = document.getElementById('paginationContainer');
    var commandContainer = document.getElementById('commandContainer');
    var currentPage = document.getElementById('currentPage');
    if (!!paginationContainer) {
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
                            currentPage.innerText = "" + index + "";
                            pageSelectionnee = index;

                            commandContainer.innerHTML = '';

                            var premierElement = (index - 1) * 10;

                            if ((premierElement + 9) < listeCommandes.length) {
                                for (var i = premierElement; i < premierElement + 10; i++) {

                                    var row = ` <tr data-toggle="modal" data-target="#afficher${listeCommandes[i].id}">
                                                    <td class="text-center text-muted" th:text="">${listeCommandes[i].id}</td>
                                                    <td class="text-center">${listeCommandes[i].date}</td>
                                                    <td class="text-center">${listeCommandes[i].heure}</td>
                                                    <td class="text-center">${listeCommandes[i].prix_total}</td>
                                                </tr>`;
                                    commandContainer.innerHTML += row;

                                }
                            } else {
                                for (var i = premierElement; i < listeCommandes.length; i++) {

                                    var row = `<tr data-toggle="modal" data-target="#afficher${listeCommandes[i].id}">
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


    if (!!ctx) {
        var current2 = 0

        window.onload = function () {

            var current = 0
            //window.setInterval(function () {

            var designations = []
            var occurences = []
            if (window.fetch) {
                var myHeaders = new Headers();


                chartItems.forEach(([{designation}, occurence]) => {
                    designations.push(designation);
                    occurences.push(occurence)
                })
                console.log(designations + "\n\n" + occurences);

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
                        title: {
                            display: true,
                            text: 'Ce graphe présente les 5 produits qui ont été le plus commandés',
                            position: 'top'
                        },
                        rotation: -0.7 * Math.PI,
                        legend: {
                            //position: 'right',
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
                                                //text: "Le produit '" + label+"' a été commandé "+ds.data[i]+" fois" ,
                                                text: label+"("+ds.data[i]+")",
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
                    }
                };
                window.myPie = new Chart(ctx, config);
                // }

                Chart.plugins.register({
                    afterDatasetsDraw: function(chartInstance, easing) {
                        // To only draw at the end of animation, check for easing === 1
                        var ctx = chartInstance.chart.ctx;
                        chartInstance.data.datasets.forEach(function(dataset, i) {
                            var meta = chartInstance.getDatasetMeta(i);
                            if (!meta.hidden) {
                                meta.data.forEach(function(element, index) {
                                    // Draw the text in black, with the specified font
                                    ctx.fillStyle = 'white';
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
                                    ctx.fillText(dataString + ' commandes', position.x, position.y - (fontSize / 2) - padding);
                                });
                            }
                        });
                    }
                });


            } else {
                // Faire quelque chose avec XMLHttpRequest?
                console.log("error!!!");
            }
            //    }, 3000)

            //Call addPaginationListener au chargement de la page : DIDIER **************************************************************************************************************************
            if (!!paginationContainer) {
                addPaginationListener();
            }
        };
        document.getElementById('actualiser').addEventListener('click', function () {

            var datedebut = document.getElementById('start').value;
            var datefin = document.getElementById('end').value;

            window.location.replace("/restaurant/"+datedebut+"/"+datefin);

        });

    }
}

)()