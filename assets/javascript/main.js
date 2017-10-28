var topics = ["texas chainsaw massacre", "friday the 13th", "puppet master", "evil dead", "the thing"]


$(function () {

    // loop through array to add buttons to page.
    var addButton = function () {
        for (var i = 0; i < topics.length; i++) {

            var button = $('<button />', {
                text: topics[i],
                id: 'btn' + i,
                class: "button"

            });

            $("#buttons").append(button);

        }
    };

    addButton();

    // click a button to display 10 random gifs (still images)
    //  $(".button").on("click", function () {

    $(document.body).on("click", ".button", function () {

        // Upon clicking new button it empties the content before applying new content.
        $("#gifs-appear-here").empty();

        // In this case, the "this" keyword refers to the button that was clicked
        var person = $(this).text();
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .done(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item'>");
                        // Storing the result item's rating
                        var rating = results[i].rating;
                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);
                        // Creating an image tag
                        var personImage = $("<img>");
                        personImage.addClass('personGif');
                        // starting image as a still image.  but also attaching attributes for fixed height and to animate them.
                        personImage.attr('src', results[i].images.fixed_height_still.url)
                        personImage.attr('data-still', results[i].images.fixed_height_still.url)
                        personImage.attr('data-animate', results[i].images.fixed_height.url)

                        personImage.attr('data-state', 'still');
                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(personImage);
                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#gifs-appear-here").prepend(gifDiv);
                    }
                }

                // click on gif to animate
                // click on gif to stop animation
                $('.personGif').on('click', function () {
                    var state = $(this).attr('data-state');
                    console.log(this);
                    if (state === 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                });
            });
    });

    // adding a movie to the array

    $('#submit-new-movie').on('click', function () {
        if ($("#add-movie").val() === "") {
            return false;
        };
        var movieButton = $("#add-movie").val();
        topics.push(movieButton);
        console.log(topics);

        //adds the new movie

        var Button = $("<button>").addClass("button").attr('id', "btn5").html(movieButton)

        $("#buttons").append(Button);

    });



});