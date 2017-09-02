var topics = ["Wine", "Girls Night Out", "Party", "Happy", "Olivia Pope Slay", "TGIF", "Game of Thrones"];

function createButton(topic) {
    var buttonDiv = $('<button data-topic="' + topic.toLowerCase() + '">' + topic + '!</button>');
    $("#topic-buttons").prepend(buttonDiv);
    return buttonDiv;
}
for (var i = 0; i < topics.length; i++) {
    createButton(topics[i]);
};

function addGif() {
    $("#fun-stuffs-here").empty();
    var topics = $(this).attr("data-topic");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=4ba4f4a33654414d9d8d9b08a34ce847";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length && i < 10; i++) {

            var gifDiv = $("<div class='stuff'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var stuffs = $("<img>");
            stuffs.attr("src", results[i].images.fixed_height_still.url);

            gifDiv.prepend(p);
            gifDiv.prepend(stuffs);

            $("#fun-stuffs-here").prepend(gifDiv);
        }
    });
}

$("#topic-buttons").on("click", "button", addGif);

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var newTopic = $("#topic-input").val();
    var button = createButton(newTopic);
    button.click();

});
