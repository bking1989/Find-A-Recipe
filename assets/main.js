$(document).ready(function () {

    let ingredients = [];
    let ingQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
    let recipeQueryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    $("#add-ingredients").on("click", function () {
        event.preventDefault();

        let ingredient = $("#searchbar2").val().trim();
        $("#searchbar2").val("");

        if (ingredient !== "") {
            ingredients.push(ingredient);

            createList(ingredients);
        }
    });

    $(document).on("click" , ".remove-btn", function(){
        let removeIndex = $(this).attr("index");
    
        ingredients.splice(removeIndex, 1);
        createList(ingredients);
    });

    $("#search-button").on("click", function(){

        $("#ingredients-list").empty();

        let searchTerms = "";

        for(let i = 0; i < ingredients.length; i++){

            for(let j = 0; j < ingredients[i].length; j++){
                if(ingredients[i][j] === " "){
                    searchTerms += "%20";
                }
                else{
                    searchTerms += ingredients[i][j];
                }
            };

            if(i !== ingredients.length-1){
                searchTerms += "&";
            };
        };

        console.log(ingQueryURL+searchTerms);
        ingredients = [];
        console.log(ingredients);
        
    });
    
    function createList(arr){
        $("#ingredients-list").empty();
        let index = 0;
        arr.forEach(function (element) {
            let arrP = $("<p>");
            let removeBtn = $("<button>");
            removeBtn.addClass("remove-btn");
            removeBtn.attr("index", index);
            removeBtn.text("✓");
            arrP.text(element);
            arrP = arrP.prepend(removeBtn);
    
            $("#ingredients-list").append(arrP);
            index++;
        });
    }
});
