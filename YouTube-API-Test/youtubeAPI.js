$(document).ready(function() {
    // Query URL
    const queryURL = "https://www.googleapis.com/youtube/v3/search";

    // Function for the search
    const videoSearch = () => {
        // API Key
        const apiKey = "AIzaSyCjuGA0pvhgoecbDeHFEn4iygJX6zzLGA0";

        // Define our search terms
        const searchTerms = $("#searchForm").val().split(" ").join("+");

        $.ajax({
            url : queryURL,
            method : "GET",
            data : {
                key : apiKey,
                maxResults : 10,
                part : "snippet, id",
                q : `${searchTerms}`,
                type : "video"
            } 
        }).then(function(response) {
            // Render video gallery
            const videoRender = () => {
                $("#resultArea").empty();
                
                for (var i = 0; i < 10; i++) {
                    let videoDiv = $("<div>");
                    let thumbnail = $("<img>");
                    let videoTitle = $("<p>");

                    thumbnail.attr("src", response.items[i].snippet.thumbnails.high.url);
                    videoTitle.text(response.items[i].snippet.title);
                    
                    $(videoDiv).append(thumbnail);
                    $(videoDiv).append(videoTitle);

                    $("#resultArea").append(videoDiv);
                };
            };

            console.log(response);
            videoRender();
        });
    };

    // Submit button function
    $("#searchBtn").on("click", function() {
        event.preventDefault();
        videoSearch();
    });
});