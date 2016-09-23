/**
 * Created by 915128 on 9/22/16.
 */

$(document).ready(function(){


  $(".search-button").click(function(){
      var query = $(".search").val();
      var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=002543439049758568798:vdmav7qp1dw&q=";
      var http = new XMLHttpRequest();
      var request = url+query;

      $.get(request, function(data){
        for (var i = 0; i < data.items.length; i++) {
          var item = data.items[i];
          // in production code, item.htmlTitle should have the HTML entities escaped.
          document.getElementById("title").innerHTML += "<br>" + item.htmlTitle;
        }
      });



      console.log(request);
  });

});

