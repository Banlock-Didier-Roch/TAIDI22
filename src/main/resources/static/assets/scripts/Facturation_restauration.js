
//Rendre l'élément btnEnregistrer non-cliquable
var btnEnregistrer = document.getElementById("btnEnregistrer");
btnEnregistrer.style.pointerEvents = "none";
btnEnregistrer.style.backgroundColor = "grey";

var table = document.getElementById("liste_plats");
var rows = table.getElementsByTagName("tr");

//ajout des écouteurs des champs de recherche
addSearchListener("search_restauration");

for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function(row) {
        return function() {
            var cell = row.getElementsByTagName("th")[0];
            var id = cell.innerHTML;
            quantites.push(1);
            selectProduct(listeProduitsRestauration, listeProduitsCommande, id);
            addRefresh(id, listeProduitsCommande);
            setMontantTotalCommande();

            //réactiver le bouton btnEnregistrer
            if(listeProduitsCommande.length == 1){
                btnEnregistrer.style.pointerEvents = "auto";
                btnEnregistrer.style.backgroundColor = "#2955c8";
            }
        };
    };
    currentRow.onclick = createClickHandler(currentRow);
}

//appliquer un Listener sur le bouton d'enregistrement
validate("btnEnregistrer");


function selectProduct(listeProduitsRestauration, listeProduitsCommande, id){
    for (var i=0 ; i<listeProduitsRestauration.length; i++){
        if(listeProduitsRestauration[i].id == id){
            listeProduitsCommande.push(listeProduitsRestauration[i]);
        }
    }
}

function addRefresh(id, listeProduitsCommande){
    //Rendre l'élément non-cliquable
    document.getElementById("produit"+id).style.pointerEvents = "none";
    document.getElementById("produit"+id).style.backgroundColor = "#b4c5f0";

    //rafraîchir les listes
    var table = document.getElementById("panier");
    table.innerHTML='';
    var quantite = 1;
    for(var i=0 ; i<listeProduitsCommande.length; i++){
        if(quantites[i]!=NaN){
            quantite = quantites[i];
        }
        var row = ` <tr id="panier${listeProduitsCommande[i].id}">
                            <th scope="row">${listeProduitsCommande[i].id}</th>
                            <td>${listeProduitsCommande[i].designation}</td>
                            <td>${listeProduitsCommande[i].prix}</td>
                            <td><input id="${i}" type="number" name="" value="${quantite}" min="1"></td>
                            <td><button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger" id="supprimerPanier${listeProduitsCommande[i].id}"><i class="pe-7s-trash btn-icon-wrapper"> </i></button></td>
                        </tr>`;
        table.innerHTML += row;
    }

    for(var i=0 ; i<listeProduitsCommande.length; i++){
        //Ajout de l'evennement qui permet de mettre à jour le montant quand la quantite d'un produit est changée et la suppression d'un produit du panier
        var currentSpinner = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].getElementsByTagName("input")[0];
        var currentDeleteButton = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].getElementsByTagName("button")[0];
        var cell = table.getElementsByTagName("tr")[i].getElementsByTagName("th")[0];
        var id = cell.innerHTML;

        var createClickHandlerSpinner = function(spinner) {
            return function() {
                var id = spinner.id;
                var value = spinner.value;
                if(value === String(parseInt(value, 10))){
                    quantites[id]=parseInt(value);
                    setMontantTotalCommande();
                }
            };
        };
        var createClickHandlerDelete = function(id1) {
            return function() {

                //console.log("panier"+id);
                //Supprimer du panier
                var row = document.getElementById("panier"+id1);
                table.removeChild(row);


                deleteFromID(id1);
                //listeProduitsCommande.splice(index, 1);
                //listeProduitsCommande.splice(index, 1); //suppression

                //Reconstruire la liste de produits
                rebuiltTable(FilterFunction(document.getElementById("search_restauration").value, listeProduitsRestauration));

                console.log(listeProduitsCommande);

            };
        };
        //currentSpinner.onclick = createClickHandler(currentSpinner);
        //currentSpinner.onkeyup = createClickHandler(currentSpinner);
        currentSpinner.oninput = createClickHandlerSpinner(currentSpinner);
        currentDeleteButton.onclick = createClickHandlerDelete(id);
    }

    setMontantTotalCommande();
}

function deleteFromID(id) {
    for(var i=0 ; i<listeProduitsCommande.length; i++){
        if(listeProduitsCommande[i].id == id){
            listeProduitsCommande.splice(i, 1);
        }
    }

}

function setMontantTotalCommande() {
    var total = 0;

    for(var i=0 ; i<listeProduitsCommande.length; i++){
        total += listeProduitsCommande[i].prix * quantites[i];
    }

    var labelMontantTotal = document.getElementById("montantTotal");
    labelMontantTotal.innerText = " "+total+" FCFA";
    document.getElementById("hiddenMontantTotal").value = total;
}

function addSearchListener(id){
    var currentSearch = document.getElementById(id);
    var createOnKeyUpListener = function (search) {
        return function () {
            var value = $(this).val();

            //Get Filtered Product List
            var data = FilterFunction(value, listeProduitsRestauration);

            //Rebuilt the table
            rebuiltTable(data);
        }
    }
    currentSearch.onkeyup = createOnKeyUpListener(currentSearch);
}

function FilterFunction(value, data){
    var filteredData = [];
    for(var i=0;i<data.length; i++){
        value = value.toLowerCase();
        var fname = data[i].designation.toLowerCase();

        if(fname.includes(value)){
            filteredData.push(data[i]);
        }
    }
    return filteredData;
}

function rebuiltTable(data) {
    //rafraîchir les listes
    table.innerHTML='';
    for(var i=0 ; i<data.length; i++){
        var row = ` <tr id="produit${data[i].id}">
                            <th scope="row">${data[i].id}</th>
                            <td>${data[i].designation}</td>
                            <td>${data[i].prix}</td>
                        </tr>`;
        table.innerHTML += row;

        if(listeProduitsCommande.includes(data[i])){
            document.getElementById("produit"+data[i].id).style.pointerEvents = "none";
            document.getElementById("produit"+data[i].id).style.backgroundColor = "#b4c5f0";
        }
    }

    for(var i=0 ; i<data.length; i++){
        //Add onClickListener
        //var currentRow = table.rows[i];
        var currentRow = document.getElementById("produit"+data[i].id);
        var createClickHandler = function(row) {
            return function() {
                var cell = row.getElementsByTagName("th")[0];
                var id = cell.innerHTML;
                quantites.push(1);
                selectProduct(listeProduitsRestauration, listeProduitsCommande, id);
                addRefresh(id, listeProduitsCommande);
                setMontantTotalCommande();

                //réactiver le bouton btnEnregistrer
                if(listeProduitsCommande.length == 1){
                    btnEnregistrer.style.pointerEvents = "auto";
                    btnEnregistrer.style.backgroundColor = "#2955c8";
                }
            };
        };
        currentRow.onclick = createClickHandler(currentRow);
    }
}

function validate(btnEnregistrer){
    var btnEnregistrer = document.getElementById(btnEnregistrer);

    var createClickHandler = function(button) {
        var service = "Restauration";
        return function() {
            var json = JSON.stringify({
                "produits" : listeProduitsCommande,
                "quantites" : quantites,
                "prixTotal" : document.getElementById("hiddenMontantTotal").value,
                "service" : service
            });
            //console.log(json);
            $.ajax({
                type: "POST",
                url: "/EnregistrerCommande",
                //data: JSON.stringify(Object.assign({}, listeProduitsCommande)),
                data:json,
                contentType : 'application/json; charset=utf-8',
                dataType : 'json',
                success: function (response) {
                    //service.php response
                    //alert("done!!!");
                    //location = location;
                    //console.log(response.id);
                },
                complete: function (response) {
                    var url = "http://localhost:8080/html2pdf/"+response.responseJSON.id;
                    window.open(url, "_blank");
                    location = location;
                }

            });
            //console.log(Object.assign({}, listeProduitsCommande));
        };
    };
    btnEnregistrer.onclick = createClickHandler(btnEnregistrer);
}