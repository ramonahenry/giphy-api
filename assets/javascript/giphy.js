//Giphy animation returns reality show giphy information

   
var topics = ["rhoa", "rhob", "basketball-wives"];
var state = "still";


function gifDisplay(){


    function renderbuttons(){

   
   $("#giphy-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var realBtn = $("<button>");
      realBtn.attr("data-name", topics[i]); 
      realBtn.addClass("gifTopics");
      realBtn.text(topics[i]); 
      $("#giphy-buttons").append(realBtn); 
      console.log(topics.length);
      console.log(realBtn);
  }

}renderbuttons();

$('.gifTopics').on('click', function(){
   

      var gifTopics = $(this).attr('data-name');
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifTopics + "&api_key=dc6zaTOxFJmzC&limit=20";
      console.log(queryURL);

   
//Ajax call
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      
//use repsonse data to populate images to the page
      var getGiphy = response.data;
       $("#giphyImg").text("");
      for (var g=0; g < getGiphy.length; g++){
           var realImg = $("<img>");
           realImg.attr("src", getGiphy[g].images.fixed_width_still.url);
           realImg.addClass("giphyStatus");
           realImg.attr("data-still", getGiphy[g].images.fixed_width_still.url); 
           realImg.attr("data-animate", getGiphy[g].images.fixed_width.url); 
           realImg.attr("data-sate", getGiphy[g].images.fixed_width.url); 
           
           
           var animationURL = getGiphy[g].images.fixed_width.url;

            $("#giphyImg").append(realImg);


            //var rating = response.data[g].rating;
            
 
       
     
      }  //use reponse data to populate rating

       var rating = response.data[0].rating;
       rating = rating.toUpperCase();
       $("#rating").text("Rated: " + rating);

    //toggle animation
      $(".giphyStatus").on("click", function() { 
      var state = $(this).attr("data-state"); 

      //animation toggle 
      if (state == 'still') { 
           $(this).attr("src", $(this).data("animate")); 
            $(this).attr('data-state', "animate"); 
        } 
        else  { 
            $(this).attr("src", $(this).data("still")); 
            $(this).attr('data-state', "still"); 
        } 
    }); 
 
      
    });//end done function
  


  });//end ajax call

   

  } gifDisplay();

  


  

 $('#addShow').on('click', function(){ 
    var newShow = $("#newShowInput").val().trim(); 
    topics.push(newShow); 
    gifDisplay(); 
    return false; 
}); 


    
   


 