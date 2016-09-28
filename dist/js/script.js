/**
 * Created by 915128 on 9/20/16.
 */


$(document).ready(function(){

  $(".overlay").fadeOut();
  $(".search-launch").click(function(){
    $(this).blur();
    $(".overlay").fadeIn();
    $(".search").val('').focus();
  });

  $(".close").click(function(){
    $(".overlay").fadeOut();
    $("#content").fadeOut();
    $(".search").val('');
    $(".result").remove();
  });

});