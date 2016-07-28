$(document).ready(function() {


  $('.all').on('click', function() {

    $('.list-group-item').show();
  });
  $('.offline').on('click', function() {
    $('.list-group-item').show();
    $('.list-group-item:contains("LIVE")').hide();
  });
  $('.online').on('click', function() {
    $('.list-group-item').hide();
    $('.list-group-item:contains("LIVE")').show();
  });

  var channels = ['nl_Kripp', 'EG_JWong', 'TeamSp00ky', 'comster404', 'monstercat', 'bmkibler','freecodecamp'];
  var streamerList = $('.list-group');
  $.each(channels, function(i) {
    $.getJSON('https://api.twitch.tv/kraken/channels/' + channels[i], function(channelData) {
      var streamStatus = $("<span class='pull-right label '/>");
      
      var listItem = $("<a href=" + channelData.url + ">" + "<img src=" + channelData.logo + " /><strong>" + channelData.display_name + "</strong></a>").addClass('list-group-item').appendTo(streamerList);
      
      streamStatus.text('OFFLINE').appendTo(listItem);
      $.getJSON("https://api.twitch.tv/kraken/streams/" + channels[i], function(streamData) {
        if (streamData.stream != null) {
var statTitle=$("<p class='title'> <strong>Streaming:</strong> " + streamData.stream.channel.status + "</p>");
          streamStatus.addClass('label-success').text('LIVE');
          statTitle.show();
          statTitle.appendTo(listItem);
        } else {
          streamStatus.removeClass('label-success').text('OFFLINE');
          streamStatus.addClass('label-danger');
          statTitle.hide();
        }
      });
    }).fail(function(error) {
      $('<li/>').addClass('list-group-item list-group-item-danger error').html("<p> Channel '" + channels[i] + "' could not be found, or has been deleted by its owner</p>").appendTo(streamerList);

    });

  });
});