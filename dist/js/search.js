/**
 * Created by 915128 on 9/22/16.
 */
function search_query() {
  var query = $(".search").val();
  var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=002543439049758568798:vdmav7qp1dw&q=";
  var http = new XMLHttpRequest();
  var request = url+query;

  $.get(request, function(data){

    for (var i = 0; i < data.items.length; i++) {
      var item = data.items[i];
      // in production code, item.htmlTitle should have the HTML entities escaped.

      var title = "<h3 class='title'>" + "<a href='" + item.link + "'" + item.htmlTitle + "</a>" + "</h3>";
      var snippet = "<p class='snippet'" + item.htmlSnippet + "</p>";

      document.getElementById("content").innerHTML += "<div class='result'>" + title + snippet + "</div>";
    }
    console.log(data.items);
  });

  console.log(request);
}


$(document).ready(function(){


    $.post("demo_test_post.asp",
      {
        url: "/custom-search/PageMap.xml"
      },
      function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
      });


  $(".search-button").click(function(){
    $(".result").remove();
      search_query()
  });

  $('.search').keypress(function (e) {
    if (e.which == 13) {
      $(".result").remove();
      search_query()
    }
  });

});

