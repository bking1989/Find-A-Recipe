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
                
                for (var i = 0; i < response.items.length; i++) {
                    let videoLink = $("<a class='my-3 video-link'>");
                    let videoDiv = $("<div>");
                    let thumbnail = $("<img class='img-fluid'>");
                    let videoTitle = $("<p>");

                    $(videoLink).attr("href", "https://www.youtube.com/watch?v=" + response.items[i].id.videoId);
                    $(videoLink).attr("target", "_blank");
                    $(thumbnail).attr("src", response.items[i].snippet.thumbnails.high.url);
                    $(videoTitle).text(response.items[i].snippet.title);
                    
                    $(videoDiv).append(thumbnail);
                    $(videoDiv).append(videoTitle);

                    $(videoLink).append(videoDiv);
                    $("#videoCol").append(videoLink);
                };
            };

            console.log(response);

            videoRender();

            const videoHeader = $("<h5>Here are some relevant videos you can use, too.</h5>");
            $("#videoCol").prepend(videoHeader);
        });
    });
});