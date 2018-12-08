$(document).ready(function() {
    // Listener for buttons
    $(".modalBtn").on("click", function() {
        // Format term for query
        const formattedTerms = $(this).attr("data-link").split(" ").join("+");

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
                $("#videoCol").empty();
                
                for (var i = 0; i < 10; i++) {
                    let videoDiv = $("<div>");
                    let thumbnail = $("<img class='img-fluid'>");
                    let videoTitle = $("<p>");

                    thumbnail.attr("src", response.items[i].snippet.thumbnails.high.url);
                    videoTitle.text(response.items[i].snippet.title);
                    
                    $(videoDiv).append(thumbnail);
                    $(videoDiv).append(videoTitle);

                    $("#videoCol").append(videoDiv);
                };
            };

            console.log(response);
            videoRender();
        });
    });
});