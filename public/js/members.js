
$(document).ready(function() {

  $("#fakeMatches1").hide();
  $("#fakeMatches2").hide();
  $("#fakeMatches3").hide();
  
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  //this.data('id')

  $("#results").on('click', '.events', function(event){
    var event_id = $(this).attr("data-id");
    console.log("id= " + event_id);
     //$.ajax({url: "/api/grabEventMatches", type: 'POST', data: {"id": event_id}, success: function(result){
        //console.log(result);

    //}});

    if(event_id = 1){
      $("#fakeMatches1").show();
      $("#results").hide();
    }

    else if (event_id = 2){
      $("#fakeMatches2").show();
      $("#results").hide();
    }

    else if(event_id = 3){
      $("#fakeMatches3").show();
      $("#results").hide();
    }

    else{
      console.log("no matches");
    }
    
  });

  $(".back").on('click', function(){
    $("#results").show();
    $("#fakeMatches1").hide();
    $("#fakeMatches2").hide();
    $("#fakeMatches3").hide();
  });

  $("#add-zip").on('click', function(event){
    event.preventDefault();
    function displayEventInfo() {

      var zipCode = $("#zip-input").val();
      var queryURL = "https://api.seatgeek.com/2/recommendations?events.id=1162104&postal_code=" + zipCode + "&client_id=ODQ5MDMzN3wxNTAyNTQ2NTQ2Ljg1";
      
	  $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(response){
        console.log(response);
      for (var i = 0; i < response.recommendations.length; i++){
        eventLabel = i + 1;
         console.log(eventName);
         console.log(eventDate);
         console.log(eventVenue);

       var eventDiv = $('<div>');
       var eventName = $('<a target="_blank">').text(response.recommendations[i].event.short_title);
       eventName.attr("href", response.recommendations[i].event.url);
       var formattedDate = moment(response.recommendations[i].event.datetime_local).format("dddd, MMMM Do, h:mm:ss a");
       console.log(formattedDate);
       var eventDate = $('<p>').text(formattedDate);
       var eventVenue = $('<p>').text(response.recommendations[i].event.venue.name);
       var matchButton = $('<button style="background-color:#888;" class="events" data-id="'+ eventLabel +'"></button>').text("Find Matches");
       var boarder = $('<div style="background-color:white;padding:.5px;margin-bottom:20px;margin-top:10px"></div>');

    

       eventDiv.append(eventName);
       eventDiv.append(eventDate);
       eventDiv.append(eventVenue);
       eventDiv.append(matchButton);
       eventDiv.append(boarder);

      $("#results").append(eventDiv);

        };
    });
};
    displayEventInfo();
 });

$(".modal-wide").on("show.bs.modal", function() {
  var height = $(window).height() - 200;
  $(this).find(".modal-body").css("max-height", height);
});
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBlCyslg0Enpg29zDKk17j8UhVoIq2sEA4",
  authDomain: "livechat-170317.firebaseapp.com",
  databaseURL: "https://livechat-170317.firebaseio.com",
  projectId: "livechat-170317",
  storageBucket: "livechat-170317.appspot.com",
  messagingSenderId: "208050247301"
};
firebase.initializeApp(config);
var myFirebase = firebase.database()

$("#post").on("click", function(){
  event.preventDefault();
  
				//alert is just a placeholder, this will change to something else that's not really annoying
				
       
        var msgUser =$("#username").val().trim();
        var msgText = $("#text").val().trim();
		// if statement would go here for rules on the input text
    myFirebase.ref("/UserInput").push({
      username: msgUser,
      text: msgText
    });
    var nameSaver = msgUser;
    console.log(nameSaver);
    $("#username").val('');
    $("#text").val('');
  });

var startListening = function() {
  myFirebase.ref("/UserInput").on('child_added', function(snapshot) {
    var msg = snapshot.val();
    console.log(msg);
    
    var msgUsernameElement = $("<b>");
    msgUsernameElement = msg.username;
    
    var msgTextElement = $("<p>");
    msgTextElement  = msg.text;
    
    var msgElement = $("<div>");
				//need css to format these divs to make them look nice
        msgElement.append(msgUsernameElement + ': ');
        msgElement.append(msgTextElement);

        $("#modal-results").append(msgElement);
      });
}
startListening();




});
