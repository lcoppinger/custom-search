/**
 * Created by 915128 on 9/22/16.
 */
function search_query(index) {
  var query = new $(".search").val();
  var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=002543439049758568798:vdmav7qp1dw&q=";
  var results = "&start=" + index;
  var request = url+query+results;
  var news_request = url+query+"+more:pagemap:metatags-category:News"+results;
  var actions_request = url+query+"+more:pagemap:metatags-category:Actions"+results;
  var information_request = url+query+"+more:pagemap:metatags-category:Information"+results;
  var suggestedSpelling =  $("#search_query");

  //All requests
  $.get(request, function(data) {

    //Remove previous results
        $(".r-1").remove();
        $(".count").remove();
        $(suggestedSpelling).empty();

    //Spell check
    if(data.hasOwnProperty("spelling")){
      var spellingQuery = data.spelling.correctedQuery;
      var correctedRequest = data.spelling.htmlCorrectedQuery;
      var correctText = "<p>Showing results for " + correctedRequest + "</p>";

      $(suggestedSpelling).append(correctText);
      query = spellingQuery;
      request = url+query+results;

      $.get(request, function(data){

        $(".r-1").remove();
        $(".count").remove();

        //Display search results
        if(data.hasOwnProperty('items')){
          for (var i = 0; i < data.items.length; i++) {
            var item = data.items[i];

            var title = "<h3 class='title'>" + "<a href='" + item.link + "'>" + item.htmlTitle + "</a>" + "</h3>";
            var link = "<a href='" + item.link + "' target='_blank'>" + item.link + "</a>";
            var snippet = "<p class='snippet'>" + item.htmlSnippet + "</p>";
            var path = "<ol class='path'></ol>";

            if (item.displayLink == "digital.pwc.com") {
              document.getElementById("tab-1").innerHTML += "<div class='result r-1'>" + title + link + snippet + path + "</div>";
            } else {
              document.getElementById("tab-1").innerHTML += "<div class='result r-1'>" + title + snippet + path + "</div>";
            }

            if (item.hasOwnProperty('pagemap')) {
              var breadcrumbs = item.pagemap.thing;
              $.each( breadcrumbs, function( index, value ){
                var crumb = "<li>" + value.name + "</li>";
                $(".path").append(crumb);
              });
            }
          }

          //total results count
          var totalResults = data.searchInformation.formattedTotalResults;
          var count = "<p class='count'>(" + totalResults + " results)</p>";
          var totalPages = data.searchInformation.formattedTotalResults / 10;
          totalPages = Math.round(totalPages);
          $(".all").append(count);
          $(".total").text(totalPages);

          if (totalResults < 11 || totalResults == 0 ) {
            $(".next-page").hide();
          } else {
            $(".next-page").show();
          }

        } else {
          document.getElementById("tab-1").innerHTML += "<div class='noresult r-1'>No results found for " + query +"</div>"
        }

        if(data.hasOwnProperty('promotions')) {
          for (var x = 0; x < data.promotions.length; x++) {
            var promotion = data.promotions[x];


            var promoTitle = "<h3 class='title'>" + "<a href='" + promotion.link + "'>" + promotion.htmlTitle + "</a>" + "</h3>";
            var promoLink = "<a href='" + promotion.link + "' target='_blank'>" + promotion.link + "</a>";
            var promoSnippet = "<p class='snippet'>" + promotion.bodyLines[x].htmlTitle + "</p>";
            var promoPath = "<ol class='path'></ol>";


            if (promotion.displayLink == "digital.pwc.com") {
              document.getElementById("tab-1").innerHTML += "<div class='result r-1 promotion'>" + promoTitle  + promoLink + promoSnippet + promoPath + "</div>";
            } else {
              document.getElementById("tab-1").innerHTML += "<div class='result r-1 promotion'>" + promoTitle  + promoSnippet + promoPath + "</div>";
            }

            if (promotion.hasOwnProperty('pagemap')) {
              var promoBreadcrumbs = promotion.pagemap.thing;
              $.each( promoBreadcrumbs, function( index, value ){
                var crumb = "<li>" + value.name + "</li>";
                $(".path").append(crumb);
              });
            }
          }
        }

        $("#tab-1").prepend($(".promotion"));
      });
    } else {
      $.get(request, function(data){

        $(".r-1").remove();
        $(".count").remove();

        //Display search results
        if(data.hasOwnProperty('items')){
          for (var i = 0; i < data.items.length; i++) {
            var item = data.items[i];

            var title = "<h3 class='title'>" + "<a href='" + item.link + "'>" + item.htmlTitle + "</a>" + "</h3>";
            var link = "<a href='" + item.link + "' target='_blank'>" + item.link + "</a>";
            var snippet = "<p class='snippet'>" + item.htmlSnippet + "</p>";
            var path = "<ol class='path'></ol>";

            if (item.displayLink == "digital.pwc.com") {
              document.getElementById("tab-1").innerHTML += "<div class='result r-1'>" + title + link + snippet + path + "</div>";
            } else {
              document.getElementById("tab-1").innerHTML += "<div class='result r-1'>" + title + snippet + path + "</div>";
            }

            if (item.hasOwnProperty('pagemap')) {
              var breadcrumbs = item.pagemap.thing;
              $.each( breadcrumbs, function( index, value ){
                var crumb = "<li>" + value.name + "</li>";
                $(".path").append(crumb);
              });
            }
          }

          //total results count
          var totalResults = data.searchInformation.formattedTotalResults;
          var count = "<p class='count'>(" + totalResults + " results)</p>";
          var totalPages = data.searchInformation.formattedTotalResults / 10;
          totalPages = Math.round(totalPages);
          $(".all").append(count);
          $(".total").text(totalPages);

          if (totalResults < 11 || totalResults == 0 ) {
            $(".next-page").hide();
          } else {
            $(".next-page").show();
          }

        } else {
          document.getElementById("tab-1").innerHTML += "<div class='noresult r-1'>No results found for " + query +"</div>"
        }

        if(data.hasOwnProperty('promotions')) {
          for (var x = 0; x < data.promotions.length; x++) {
            var promotion = data.promotions[x];


            var promoTitle = "<h3 class='title'>" + "<a href='" + promotion.link + "'>" + promotion.htmlTitle + "</a>" + "</h3>";
            var promoLink = "<a href='" + promotion.link + "' target='_blank'>" + promotion.link + "</a>";
            var promoSnippet = "<p class='snippet'>" + promotion.bodyLines[x].htmlTitle + "</p>";
            var promoPath = "<ol class='path'></ol>";


            if (promotion.displayLink == "digital.pwc.com") {
              document.getElementById("tab-1").innerHTML += "<div class='result r-1 promotion'>" + promoTitle  + promoLink + promoSnippet + promoPath + "</div>";
            } else {
              document.getElementById("tab-1").innerHTML += "<div class='result r-1 promotion'>" + promoTitle  + promoSnippet + promoPath + "</div>";
            }

            if (promotion.hasOwnProperty('pagemap')) {
              var promoBreadcrumbs = promotion.pagemap.thing;
              $.each( promoBreadcrumbs, function( index, value ){
                var crumb = "<li>" + value.name + "</li>";
                $(".path").append(crumb);
              });
            }
          }
        }

        $("#tab-1").prepend($(".promotion"));
      });
    }
  });



  //News category requests
  $.get(news_request, function(data){

    $(".r-2").remove();

    if(data.hasOwnProperty('items')){
      for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];

        var title = "<h3 class='title'>" + "<a href='" + item.link + "'>" + item.htmlTitle + "</a>" + "</h3>";
        var link = "<a href='" + item.link + "' target='_blank'>" + item.link + "</a>";
        var snippet = "<p class='snippet'" + item.htmlSnippet + "</p>";

        if (item.displayLink == "digital.pwc.com") {
          document.getElementById("tab-2").innerHTML += "<div class='result r-2'>" + title + link + snippet + "</div>";
        } else {
          document.getElementById("tab-2").innerHTML += "<div class='result r-2'>" + title + snippet + "</div>";
        }

        if (item.hasOwnProperty('pagemap')) {
          var breadcrumbs = item.pagemap.thing;
          $.each( breadcrumbs, function( index, value ){
            var crumb = "<li>" + value.name + "</li>";
            $(".path").append(crumb);
          });
        }
      }

      $(".tab2").removeClass("disabled");
    } else {
      document.getElementById("tab-2").innerHTML += "<div class='noresult r-2'>No results found for " + query +"</div>";
      $(".tab2").addClass("disabled");
    }

  });

  //Actions category requests
  $.get(actions_request, function(data){

    $(".r-3").remove();

    if(data.hasOwnProperty('items')){
      for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];

        var title = "<h3 class='title'>" + "<a href='" + item.link + "'>" + item.htmlTitle + "</a>" + "</h3>";
        var link = "<a href='" + item.link + "' target='_blank'>" + item.link + "</a>";
        var snippet = "<p class='snippet'" + item.htmlSnippet + "</p>";

        if (item.displayLink == "digital.pwc.com") {
          document.getElementById("tab-3").innerHTML += "<div class='result r-3'>" + title + link + snippet + "</div>";
        } else {
          document.getElementById("tab-3").innerHTML += "<div class='result r-3'>" + title + snippet + "</div>";
        }

        if (item.hasOwnProperty('pagemap')) {
          var breadcrumbs = item.pagemap.thing;
          $.each( breadcrumbs, function( index, value ){
            var crumb = "<li>" + value.name + "</li>";
            $(".path").append(crumb);
          });
        }
        $(".tab3").removeClass("disabled");
      }
    } else {
      document.getElementById("tab-3").innerHTML += "<div class='noresult r-3'>No results found for " + query +"</div>"
      $(".tab3").addClass("disabled");
    }

  });

  //Information category requests
  $.get(information_request, function(data){

    $(".r-4").remove();

    if(data.hasOwnProperty('items')){
      for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];

        var title = "<h3 class='title'>" + "<a href='" + item.link + "'>" + item.htmlTitle + "</a>" + "</h3>";
        var link = "<a href='" + item.link + "' target='_blank'>" + item.link + "</a>";
        var snippet = "<p class='snippet'" + item.htmlSnippet + "</p>";

        if (item.displayLink == "digital.pwc.com") {
          document.getElementById("tab-4").innerHTML += "<div class='result r-4'>" + title + link + snippet + "</div>";
        } else {
          document.getElementById("tab-4").innerHTML += "<div class='result r-4'>" + title + snippet + "</div>";
        }

        if (item.hasOwnProperty('pagemap')) {
          var breadcrumbs = item.pagemap.thing;
          $.each( breadcrumbs, function( index, value ){
            var crumb = "<li>" + value.name + "</li>";
            $(".path").append(crumb);
          });
        }

        $(".tab4").removeClass("disabled");

      }
    } else {
      document.getElementById("tab-4").innerHTML += "<div class='noresult r-4'>No results found for " + query +"</div>";
      $(".tab4").addClass("disabled");
    }

  });

  console.log(request);
}

$(document).ready(function(){

  var search = $(".search");
  var page = 1;
  var startIndex = 1;
  var prev = $(".previous-page");
  var next = $(".next-page");

  $("#content").fadeOut();

  $(search).on("change paste keyup", function() {
    if ($(search).val().length > 3){
      startIndex = 1;
      page = 1;
      search_query(startIndex);
      $("#content").fadeIn();
    } else if ($(search).val().length == 0) {
      $(".result").remove();
      $(".noresult").remove();
      $(".count").remove();
      $("#content").fadeOut();
    }
  });

  $(".search-button").click(function(){
      startIndex = 1;
      page = 1;
      search_query(startIndex);
      $("#content").fadeIn();
  });

  $(search).keypress(function (e) {
    if (e.which == 13) {
      startIndex = 1;
      page = 1;
      search_query(startIndex);
      $("#content").fadeIn();
    }
  });



  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');

  });

  $(next).click(function(){
    page++;
    startIndex = startIndex + 10;

    if (page == 2) {
      $(prev).show();
    }
    search_query(startIndex);

    $(".n-number").text(page + 1);
    $(".p-number").text(page - 1);
  });

  $(prev).click(function(){
    page--;
    startIndex = startIndex - 10;

    if (page == 1) {
      $(prev).hide();
    }
    search_query(startIndex);

    $(".n-number").text(page + 1);
    $(".p-number").text(page - 1);
  });

  if (page == 1) {
    $(prev).hide();
  }


});

