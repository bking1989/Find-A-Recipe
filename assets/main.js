$(document).ready(function () {

    let ingredients = [];

    const ingQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
    const recipeQueryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const idQueryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

    


    $("#add-ingredients").on("click", function () {
        event.preventDefault();

        let ingredient = $("#searchbar2").val().trim();
        $("#searchbar2").val("");

        if (ingredient !== "") {
            ingredients.push(ingredient);

            createList(ingredients);
        }
    });

    $(document).on("click", ".remove-btn", function () {
        let removeIndex = $(this).attr("index");

        ingredients.splice(removeIndex, 1);
        createList(ingredients);
    });


    $("#search-button").on("click", function () {

        $("#search-results").empty();

        let searchTerms = "";

        for (let i = 0; i < ingredients.length; i++) {

            for (let j = 0; j < ingredients[i].length; j++) {
                if (ingredients[i][j] === " ") {
                    searchTerms += "%20";
                }
                else {
                    searchTerms += ingredients[i][j];
                }
            };

            if (i !== ingredients.length - 1) {
                searchTerms += "&";
            };
        };

        let query = ingQueryURL + searchTerms;

        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {
            $("#search-results").empty();

            if (response.meals === null) {
                $("#search-results").append("<p>No recipes found. Please try again.</p>");
            }
            else if(searchTerms === ""){
                $("#search-results").append("<p>Please add ingredients.</p>");
            }
            else {
                let recipeList = $("<ol>");
                response.meals.forEach(function (obj) {
                    recipeList.append(`<li><a href='#' id='recipe-result' recipe-id=${obj.idMeal}>${obj.strMeal}</a></li>`);
                });

                $("#search-results").append(recipeList);
            }
        });


    });

    $(document).on("click", "#recipe-result", function () {
        let recipeID = $(this).attr("recipe-id");
        let recipeQuery = idQueryURL + recipeID;
        let ingredientList = $("<ul>");
        let foodImageHtml = $("<img class='img-thumbnail' style='height: 300px;'>");
        let imageURL;
        let imageAlt;
        let recipeText;

        let ingMeasureArr = [];

        $.ajax({
            url: recipeQuery,
            method: "GET"
        }).then(function (recipe) {

            imageURL = recipe.meals[0].strMealThumb;

            imageAlt = recipe.meals[0].strMeal;
            foodImageHtml.attr("src", imageURL);
            foodImageHtml.attr("alt", imageAlt);
            recipeText = recipe.meals[0].strInstructions;

            if (recipe.meals[0].strMeasure1 !== "" && recipe.meals[0].strMeasure1 !== null){
                ingMeasureArr.push(recipe.meals[0].strMeasure1 + " " + recipe.meals[0].strIngredient1);
            }
            if (recipe.meals[0].strMeasure2 !== "" && recipe.meals[0].strMeasure2 !== null){
                ingMeasureArr.push(recipe.meals[0].strMeasure2 + " " + recipe.meals[0].strIngredient2);
            }
            if (recipe.meals[0].strMeasure3 !== "" && recipe.meals[0].strMeasure3 !== null){
                ingMeasureArr.push(recipe.meals[0].strMeasure3 + " " + recipe.meals[0].strIngredient3);
            }
            if (recipe.meals[0].strMeasure4 !== "" && recipe.meals[0].strMeasure4 !== null){
                ingMeasureArr.push(recipe.meals[0].strMeasure4 + " " + recipe.meals[0].strIngredient4);
            }
            if (recipe.meals[0].strMeasure5 !== "" && recipe.meals[0].strMeasure5 !== null){
                ingMeasureArr.push(recipe.meals[0].strMeasure5 + " " + recipe.meals[0].strIngredient5);
            }
            if (recipe.meals[0].strMeasure6 !== "" && recipe.meals[0].strMeasure6 !== null){
                ingMeasureArr.push(recipe.meals[0].strMeasure6 + " " + recipe.meals[0].strIngredient6);
            }
            if (recipe.meals[0].strMeasure7 !== "" && recipe.meals[0].strMeasure7 !== null){
                ingMeasureArr.push(recipe.meals[0].strMeasure7 + " " + recipe.meals[0].strIngredient7);
            }
            if (recipe.meals[0].strMeasure8 !== "" && recipe.meals[0].strMeasure8 !== null){
                ingMeasureArr.push(recipe.meals[0].strMeasure8 + " " + recipe.meals[0].strIngredient8);
            }
            if (recipe.meals[0].strMeasure9 !== "" && recipe.meals[0].strMeasure9 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure9 + " " + recipe.meals[0].strIngredient9);
            }
            if (recipe.meals[0].strMeasure10 !== "" && recipe.meals[0].strMeasure10 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure10 + " " + recipe.meals[0].strIngredient10);
            }
            if (recipe.meals[0].strMeasure11 !== "" && recipe.meals[0].strMeasure11 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure11 + " " + recipe.meals[0].strIngredient11);
            }
            if (recipe.meals[0].strMeasure12 !== "" && recipe.meals[0].strMeasure12 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure12 + " " + recipe.meals[0].strIngredient12);
            }
            if (recipe.meals[0].strMeasure13 !== "" && recipe.meals[0].strMeasure13 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure13 + " " + recipe.meals[0].strIngredient13);
            }
            if (recipe.meals[0].strMeasure14 !== "" && recipe.meals[0].strMeasure14 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure14 + " " + recipe.meals[0].strIngredient14);
            }
            if (recipe.meals[0].strMeasure15 !== "" && recipe.meals[0].strMeasure15 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure15 + " " + recipe.meals[0].strIngredient15);
            }
            if (recipe.meals[0].strMeasure16 !== "" && recipe.meals[0].strMeasure16 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure16 + " " + recipe.meals[0].strIngredient16);
            }
            if (recipe.meals[0].strMeasure17 !== "" && recipe.meals[0].strMeasure17 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure17 + " " + recipe.meals[0].strIngredient17);
            }
            if (recipe.meals[0].strMeasure18 !== "" && recipe.meals[0].strMeasure18 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure18 + " " + recipe.meals[0].strIngredient18);
            }
            if (recipe.meals[0].strMeasure19 !== "" && recipe.meals[0].strMeasure19 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure19 + " " + recipe.meals[0].strIngredient19);
            }
            if (recipe.meals[0].strMeasure20 !== "" && recipe.meals[0].strMeasure20 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure20 + " " + recipe.meals[0].strIngredient20);
            }

            ingMeasureArr.forEach(function (element) {
                let ingItem = $("<li>");
                ingItem.text(element);
                ingredientList.append(ingItem);
            });
            let recipeItems = $("<div>");
            recipeItems.append(foodImageHtml, ingredientList, recipeText);

            $("#recipe-container").html(recipeItems);

        });

    });

    function createList(arr) {
        $(".ingredients-list").empty();
        let index = 0;
        arr.forEach(function (element) {
            let arrP = $("<p>");
            let removeBtn = $("<button>");
            removeBtn.addClass("remove-btn");
            removeBtn.attr("index", index);
            removeBtn.text("✓");
            arrP.text(element);
            arrP = arrP.prepend(removeBtn);

            $(".ingredients-list").append(arrP);
            index++;
        });
    }
    
    // Listener and function for top most search button
    $(document).on("click", "#topSearchBtn", function() {
        event.preventDefault();

        let nameSearchTerm = $("#searchbar1").val().trim();
        $("#searchbar1").val("");

        if (nameSearchTerm == "") {
            return false;
        } else {
            $.ajax({
                url : recipeQueryURL + nameSearchTerm,
                method : "GET"
            }).then(function(response) {
                console.log(response);
                $("#recipe-container").empty();
                
                if (response.meals == null) {
                    $("#recipe-container").append("<p>No recipes found. Please try again.</p>");
                } else {
                    let recipeList = $("<ol>");
                    
                    response.meals.forEach(function (obj) {
                        recipeList.append(`<li><a href='#' id='recipe-result' recipe-id=${obj.idMeal}>${obj.strMeal}</a></li>`);
                    });
                    
                    $("#recipe-container").append(recipeList);
                };
            });
        };
    });
    
    // Listener for buttons
    $(document).on("click", "#recipe-result", function() {
        // Format term for query
        const formattedTerms = $(this).text().split(" ").join("+");

        // Query URL
        const queryURL = "https://www.googleapis.com/youtube/v3/search";

        // API Key
        const apiKey = "AIzaSyCjuGA0pvhgoecbDeHFEn4iygJX6zzLGA0";

        $.ajax({
            url : queryURL,
            method : "GET",
            data : {
                key : apiKey,
                maxResults : 4,
                part : "snippet, id",
                q : `${formattedTerms}`,
                type : "video"
            } 
        }).then(function(response) {
            // Render video gallery
            const videoRender = () => {
                $("#videoContainer").empty();
                
                for (var i = 0; i < response.items.length; i++) {
                    let videoLink = $("<a class='my-3 video-link'>");
                    let videoDiv = $("<div class='m-3' style='display: inline-block; height: 200px;'>");
                    let thumbnail = $("<img class='img-fluid'>");
                    let videoTitle = $("<p>");

                    $(videoLink).attr("data-video", response.items[i].id.videoId);
                    $(thumbnail).attr("src", response.items[i].snippet.thumbnails.high.url);
                    $(videoTitle).text(response.items[i].snippet.title);
                    
                    $(videoDiv).append(thumbnail);
                    $(videoDiv).append(videoTitle);

                    $(videoLink).append(videoDiv);
                    $("#videoContainer").append(videoLink);
                };
            };

            videoRender();
        });
    });

    // Listener for video link
    $(document).on("click", '.video-link', function() {
        $("#recipe-container").empty();
        
        const videoSrc = $(this).attr("data-video");

        const videoIframe = $("<iframe id='ytplayer' class='m-3' type='text/html' width='640' height='360' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");
        $(videoIframe).attr("src", "https://www.youtube.com/embed/" + videoSrc + "?autoplay=0");

        $("#recipe-container").append(videoIframe);
    });
});
