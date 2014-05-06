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

$(function () {

  // Define variables

  var serverList;
  var url = "http://supraverse.net:8989/list";
  var data;

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
          "targets": [13,9,5,7],
          "visible": false,
          "searchable": false
        }
        ]
      });
    }
  }

  queryServer();

  //Autorefresh in every 5 secs

  window.setInterval(function () {
    queryServer();
  }, 8000);

  // $('#server-list').on( 'draw.dt', function () {
  //     dataReloaded();
  // } );

});