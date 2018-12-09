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

        $(".ingredients-list").empty();

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
            $(".modal-id").empty();

            if (response.meals === null) {
                $(".modal-id").append("<p>No recipes found. Please try again.</p>");
            }
            else {
                let recipeList = $("<ol>");
                response.meals.forEach(function (obj) {
                    recipeList.append(`<li><a href='#' id='recipe-result' recipe-id=${obj.idMeal}>${obj.strMeal}</a></li>`);
                });

                $(".modal-id").append(recipeList);
            }
        });

        ingredients = [];

    });

    $(document).on("click", "#recipe-result", function () {
        let recipeID = $(this).attr("recipe-id");
        let recipeQuery = idQueryURL + recipeID;
        let ingredientList = $("<ul>");
        let foodImageHtml = $("<img >");
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

            if (recipe.meals[0].strMeasure1 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure1 + " " + recipe.meals[0].strIngredient1);
            }
            if (recipe.meals[0].strMeasure2 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure2 + " " + recipe.meals[0].strIngredient2);
            }
            if (recipe.meals[0].strMeasure3 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure3 + " " + recipe.meals[0].strIngredient3);
            }
            if (recipe.meals[0].strMeasure4 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure4 + " " + recipe.meals[0].strIngredient4);
            }
            if (recipe.meals[0].strMeasure5 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure5 + " " + recipe.meals[0].strIngredient5);
            }
            if (recipe.meals[0].strMeasure6 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure6 + " " + recipe.meals[0].strIngredient6);
            }
            if (recipe.meals[0].strMeasure7 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure7 + " " + recipe.meals[0].strIngredient7);
            }
            if (recipe.meals[0].strMeasure8 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure8 + " " + recipe.meals[0].strIngredient8);
            }
            if (recipe.meals[0].strMeasure9 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure9 + " " + recipe.meals[0].strIngredient9);
            }
            if (recipe.meals[0].strMeasure10 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure10 + " " + recipe.meals[0].strIngredient10);
            }
            if (recipe.meals[0].strMeasure11 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure11 + " " + recipe.meals[0].strIngredient11);
            }
            if (recipe.meals[0].strMeasure12 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure12 + " " + recipe.meals[0].strIngredient12);
            }
            if (recipe.meals[0].strMeasure13 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure13 + " " + recipe.meals[0].strIngredient13);
            }
            if (recipe.meals[0].strMeasure14 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure14 + " " + recipe.meals[0].strIngredient14);
            }
            if (recipe.meals[0].strMeasure15 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure15 + " " + recipe.meals[0].strIngredient15);
            }
            if (recipe.meals[0].strMeasure16 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure16 + " " + recipe.meals[0].strIngredient16);
            }
            if (recipe.meals[0].strMeasure17 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure17 + " " + recipe.meals[0].strIngredient17);
            }
            if (recipe.meals[0].strMeasure18 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure18 + " " + recipe.meals[0].strIngredient18);
            }
            if (recipe.meals[0].strMeasure19 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure19 + " " + recipe.meals[0].strIngredient19);
            }
            if (recipe.meals[0].strMeasure20 !== "") {
                ingMeasureArr.push(recipe.meals[0].strMeasure20 + " " + recipe.meals[0].strIngredient20);
            }

            ingMeasureArr.forEach(function (element) {
                let ingItem = $("<li>");
                console.log(element);
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
});
