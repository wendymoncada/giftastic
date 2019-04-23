
var animals = ["dog", "cat", "bird", "chicken", "rhino", "horse", "hamster"];
var animal = "";


function renderButtons() {

    $("#buttons-display").empty();

    for (var x = 0; x < animals.length; x++) {
        var newButton = $("<button>" + animals[x] + "</button>");
        newButton.attr("data-name", animals[x]);
        newButton.attr("class", "button");
        $("#buttons-display").append(newButton);
    }
    populateGif();
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var inputText = $("#animal-input").val().trim();
    animals.push(inputText);
    renderButtons();
});

renderButtons();

function populateGif() {

    $(".button").on("click", function () {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&limit=10&api_key=904ymJ7OUL8Nn6eq5OMkD7PLydDW9WsT";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".animalDiv").empty();

            console.log(response);

            var results = response.data;

            for (var x = 0; x < results.length; x++) {

                var animalDiv = $("<div>");
                animalDiv.attr("class", "animalDiv");

                var p = $("<p>").text(rating);

                var rating = results[x].rating;

                var animalImage = $("<img>");
                animalImage.attr("src", results[x].images.fixed_height_still.url);
                animalImage.attr("data-animate-url", results[x].images.fixed_height.url)
                animalImage.attr("data-still-url", results[x].images.fixed_height_still.url)
                animalImage.attr("data-state", "still")

                animalImage.attr("class", "gif");

                animalDiv.prepend(p);
                animalDiv.prepend(animalImage);

                $("#animal-gifs").prepend(animalDiv);
            }

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate-url"));
                    $(this).attr("data-state", "animate");
                }
                else {
                    $(this).attr("src", $(this).attr("data-still-url"));
                    $(this).attr("data-state", "still");
                }

            });
        });
    });
}