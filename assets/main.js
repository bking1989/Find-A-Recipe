$(document).ready(function () {

    //This array will hold all of the ingredients the user enters
    let ingredients = [];

    //Three different query types from TheMealDB API will be utilized based on ingredients, the name of the recipe, or the
    //meal's ID
    const ingQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
    const recipeQueryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const idQueryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

    //Clicking this button will add the entered ingredient into the list. If there's nothing in the text box,
    //nothing happens.
    $("#add-ingredients").on("click", function () {
        event.preventDefault();

        let ingredient = $("#searchbar2").val().trim();
        $("#searchbar2").val("");

        if (ingredient !== "") {
            ingredients.push(ingredient);

            createList(ingredients);
        };
    });

    //For each item in the ingredients list, there's a button to remove it from the list.
    $(document).on("click", ".remove-btn", function () {
        let removeIndex = $(this).attr("index");

        ingredients.splice(removeIndex, 1);
        createList(ingredients);
    });

    //This button will create a list of all of the recipes that contains at least one of the ingredients
    //in the list. 
    $("#search-button").on("click", function () {

        $("#search-results").empty();

        //We need to take the search value and format it for the API query
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

        //Set up the query URL based off the ingredients
        let query = ingQueryURL + searchTerms;

        //We want to be sure we get recipes. If nothing is pulled up, the user is notified that recipes couldn't
        //be found. Also, if the user hasn't added ingredients to the list, he/she will be notified of that as well.
        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {
            $("#search-results").empty();

            if (response.meals === null) {
                $("#search-results").append("<p>No recipes found. Please try again.</p>");
            }
            else if (searchTerms === "") {
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

    //The user clicks on a recipe in the search results and the entire recipe shows in the appropriate container.
    $(document).on("click", "#recipe-result", function () {
        let recipeID = $(this).attr("recipe-id");
        let recipeQuery = idQueryURL + recipeID;

        showRecipe(recipeQuery);

    });

    // Listener and function for top most search button and pulls up a recipe based on the name of the recipe.
    $(document).on("click", "#topSearchBtn", function () {
        event.preventDefault();

        let nameSearchTerm = $("#searchbar1").val().trim();
        $("#searchbar1").val("");

        let searchTerms = "";

        for (let i = 0; i < nameSearchTerm.length; i++) {

            if (nameSearchTerm[i] === " ") {
                searchTerms += "%20";
            }
            else {
                searchTerms += nameSearchTerm[i];
            }
        };

        if (nameSearchTerm == "") {
            return false;
        } else {
            showRecipe(recipeQueryURL + searchTerms);
        };
    });

    // Listener for video link. When a video is clicked, it will replace whatever is in the reciper container with an
    //embedded YouTube video.
    $(document).on("click", '.video-link', function () {
        $("#recipe-container").empty();

        const videoSrc = $(this).attr("data-video");

        const videoIframe = $("<iframe id='ytplayer' class='my-3' type='text/html' width='560' height='340' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen>");
        $(videoIframe).attr("src", "https://www.youtube.com/embed/" + videoSrc + "?autoplay=0");

        $("#recipe-container").append(videoIframe);
    });

    //This is how we create the ingredients list with the remove button next to each item
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
    };

    //Function to display the recipe
    function showRecipe(query) {
        /*Setting up places to append our list of ingredients and measurements, the name of the dish,
         photo of the dish, attributes, and the cooking instructions*/
        let ingredientList = $("<ul>");
        let foodImageHtml = $("<img class='img-thumbnail' style='height: 300px;'>");
        let imageURL;
        let imageAlt;
        let recipeText;
        let ingMeasureArr = [];
        let recipeNameP = $("<p>");

        $.ajax({
            url: query,
            method: "GET"
        }).then(function (recipe) {


            //Image HTML setup
            imageURL = recipe.meals[0].strMealThumb;
            imageAlt = recipe.meals[0].strMeal;
            foodImageHtml.attr("src", imageURL);
            foodImageHtml.attr("alt", imageAlt);
            foodImageHtml.addClass("rounded mx-auto d-block");

            //Cooking instructions
            recipeText = recipe.meals[0].strInstructions;


            /*Here lies the tedious part. Due to how the properties are set up for each recipe in TheMealDB's API,
            we cannot loop through each measurement or ingredient property. Additionally, there is always 20
            ingredient and measurement properties in each recipe JSON, even if there aren't 20 ingredients in the recipe.
            These empty properties are either filled with an empty string or null with no rhyme or reason. So we need to make
            sure these extraneous properties are not added to the page when the recipe is called up. But once this is done
            we have an array of the measurement for each ingredient*/
            if (recipe.meals[0].strMeasure1 !== "" && recipe.meals[0].strMeasure1 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure1 + " " + recipe.meals[0].strIngredient1);
            }
            if (recipe.meals[0].strMeasure2 !== "" && recipe.meals[0].strMeasure2 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure2 + " " + recipe.meals[0].strIngredient2);
            }
            if (recipe.meals[0].strMeasure3 !== "" && recipe.meals[0].strMeasure3 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure3 + " " + recipe.meals[0].strIngredient3);
            }
            if (recipe.meals[0].strMeasure4 !== "" && recipe.meals[0].strMeasure4 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure4 + " " + recipe.meals[0].strIngredient4);
            }
            if (recipe.meals[0].strMeasure5 !== "" && recipe.meals[0].strMeasure5 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure5 + " " + recipe.meals[0].strIngredient5);
            }
            if (recipe.meals[0].strMeasure6 !== "" && recipe.meals[0].strMeasure6 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure6 + " " + recipe.meals[0].strIngredient6);
            }
            if (recipe.meals[0].strMeasure7 !== "" && recipe.meals[0].strMeasure7 !== null) {
                ingMeasureArr.push(recipe.meals[0].strMeasure7 + " " + recipe.meals[0].strIngredient7);
            }
            if (recipe.meals[0].strMeasure8 !== "" && recipe.meals[0].strMeasure8 !== null) {
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


            //Create a list of the measurements for each ingredient
            ingMeasureArr.forEach(function (element) {
                let ingItem = $("<li>");
                ingItem.text(element);
                ingredientList.append(ingItem);
            });

            //div to store all of the recipe items we're going to add
            let recipeItems = $("<div>");

            //Simple styling of the name for the recipe
            recipeNameP.text(imageAlt);
            recipeNameP.addClass("text-center");
            recipeNameP.attr("style", "text-decoration:underline; font-size: 2em; font-weight: bold");

            //Put all of the recipe items together
            recipeItems.append(recipeNameP, foodImageHtml, ingredientList, recipeText);

            //We want to replace anything currently in the recipe container with the recipe the user wants to see.
            $("#recipe-container").html(recipeItems);

            // YouTube API starts here

            // Search term for YouTube API
            const videoSearchTerm = imageAlt;

            // Query URL
            const queryURL = "https://www.googleapis.com/youtube/v3/search";

            // API Key
            const apiKey = "AIzaSyCjuGA0pvhgoecbDeHFEn4iygJX6zzLGA0";
            
            $.ajax({
                url: queryURL,
                method: "GET",
                data: {
                    key: apiKey,
                    maxResults: 4,
                    part: "snippet, id",
                    q: `${videoSearchTerm}`,
                    type: "video"
                }
            }).then(function (response) {
                // Render video gallery
                const videoRender = () => {
                    $("#videoContainer").empty();

                    for (var i = 0; i < response.items.length; i++) {
                        let videoLink = $("<a class='my-3 video-link'>");
                        let videoDiv = $("<div class='m-3' style='display: inline-block; height: 160px;'>");
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
    };
});
