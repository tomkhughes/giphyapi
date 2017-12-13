$(document).ready(function() {
  var athletes;

var topics = ['tom brady', 'lebron james', 'kyrie irving', 'payton manning', 'eli manning', 'stephen curry', 'michael jordan', 'magic johnson'];

function createButton() {
  for (var i = 0; i < topics.length; i++) {
    var b = $('<button>');
    b.addClass('btn btn-outline-primary athleteButton');
    b.attr('data-person', topics[i]);
    b.text(topics[i]);
    $('.buttons').append(b);
  }
};
createButton();

//adding new button
$(document).on('click', '#addAthlete', function(e) {
    e.preventDefault();
    $('.athlete-giph').empty();
    athletes = $('#athlete-input').val();
    var b = $('<button>');
    b.addClass('btn btn-outline-primary newButtonClass');
    b.attr('data-person', athletes);
    b.text(athletes);
    $('.buttons').append(b);
    

    var person = $('.newButtonClass').attr('data-person');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log("person is " + person);

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      console.log(response);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating =results[i].rating;
        var paragraph = $('<p>').text("Rating: " + rating);
        var personImage=$('<img>');
        personImage.attr("class","gif");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-state","still")
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            gifDiv.prepend(paragraph);
            gifDiv.prepend(personImage);

        $(".athlete-giph").prepend(gifDiv);
      }
    })
})





$("button").on("click", function() {
  console.log('button click');
      //setting up person var with data person attribute. so you can plug it into the url key 
      var person = $(this).attr("data-person");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          console.log(response);
          var results = response.data;
//for loop through the array of gifs and assigns class item 
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
          // Added a data-attribute

            var rating = results[i].rating;
            //adding a paragraph with rating 
            var paragraph = $("<p>").text("Rating: " + rating);
        //assigning a src and alt atribute. to image 

            var personImage = $("<img>");
            personImage.attr("class","gif");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-state","still")
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            gifDiv.prepend(paragraph);
            gifDiv.prepend(personImage);

            $(".athlete-giph").prepend(gifDiv);
          }
        });
      //each time a button is clicked the div is emptied and repopulated 

      $('.athletes').empty();
    });

//Worked once I used document.on click instead of selecting the gif class and adding on click???

$(document).on('click', '.gif', function() {
    console.log('animate click');
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } 
       else {
         $(this).attr("src", $(this).attr("data-still"));
         $(this).attr("data-state", "still");
       }
    });



})



