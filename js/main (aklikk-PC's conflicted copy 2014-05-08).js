// Define functions

function dataReloaded() {
  // Fire a notification that the data has been successfully reloaded

  var successNoty = noty({
    text: 'Refresh complete!',
    layout: 'bottomRight',
    type: 'success',
    animation: {
      open: {
        height: 'toggle'
      },
      close: {
        height: 'toggle'
      },
      easing: 'swing',
      speed: 300 // opening & closing animation speed
    },
    timeout: 1000
  });

}


//TODO Refactor so it wont calculate it with frontend shit. Use the data from the backend

function calculateOnlinePlayers(){
  $("#server-list tr td:nth-child(5)").each(function(){
    sumPlayers = sumPlayers + parseInt($(this).html());
  });
  $(".online-players").html(sumPlayers);
}




// Define variables

var serverList;
var url = "http://supraverse.net:8989/list";
var data;
var sumPlayers = 0;












//on DOM ready

$(function () {

  // So after DOM loads setup the Ajax request and the datatable

  function queryServer(){
    $.ajax({
      url: url,
      type: "POST",
      crossDomain: true,
      contentType : 'application/json',
      data: "{}",
      processData:true,
      success: function (result) {
        launchTable(result);
      },
      error: function (xhr, ajaxOptions, thrownError) {
          console.log("Error: " ,xhr, ", " ,thrownError);
      }
    });
  }

  function launchTable(result){
    if (serverList != null){
      serverList.clear().rows.add(result.servers).draw(false);
      //TODO: callback for this
      dataReloaded();
    }else{
      serverList = $('#server-list').DataTable({
        data: result.servers,
        autoWidth: false,
        lengthMenu: [ [100, -1], [100, "All"] ],
        order: [
          [8, "desc"]
        ],
        displayLength: 100,
        columns: [{
          data: 'ip'
        }, {
          data: 'port'
        }, {
          data: 'title'
        }, {
          data: 'description'
        }, {
          data: 'max_players'
        }, {
          data: 'max_spectators'
        }, {
          data: 'max_duration'
        }, {
          data: 'max_goals'
        }, {
          data: 'current_players'
        }, {
          data: 'current_duration'
        }, {
          data: 'current_goals_red'
        }, {
          data: 'current_goals_blue'
        }, {
          data: 'map'
        }, {
          data: 'training'
        }],
        createdRow: function ( row, data, index ) {
          if (data.max_players == data.current_players) {
            $(row).addClass('danger');
          }else if (data.max_players - 2 <= data.current_players) {
            $(row).addClass('warning');
          }else if (data.current_players > 0) {
            $(row).addClass('success');
          }
        },
        columnDefs: [
        {
          render: function ( data, type, row ) {
            return row.current_players + '/' + data;
          },
          targets: 4
        },
        {
          "targets": [13,9,5,7,8],
          "visible": false,
          "searchable": false
        }
        ]
      });
      calculateOnlinePlayers();
      serverList.on( 'draw', function () {
        sumPlayers = 0;
        calculateOnlinePlayers();
      });
    }
  }

  //Start the show
  queryServer();

  //Autorefresh in every 5 secs

  window.setInterval(function () {
    queryServer();
  }, 8000);

  //Event listeners


});