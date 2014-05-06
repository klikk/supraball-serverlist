// $.ajax({
//     url: url + "list",
//     type: "POST",
//     crossDomain: true,
//     contentType : 'application/json',
//     data: "{}",
//     processData:true,
//     success: function (result) {
//       data = result;
//       console.log(data);
//       $('#server-list').DataTable( {
//         data: data.servers,
//         dataSrc: "servers",
//         columns: [
//           { data: 'ip' },
//           { data: 'port' },
//           { data: 'title' },
//           { data: 'description' },
//           { data: 'max_players' },
//           { data: 'max_spectators' },
//           { data: 'max_duration' },
//           { data: 'max_goals' },
//           { data: 'current_players' },
//           { data: 'current_duration' },
//           { data: 'current_goals_red' },
//           { data: 'current_goals_blue' },
//           { data: 'map' },
//           { data: 'training' }
//         ]
//       });
//     },
//     error: function (xhr, ajaxOptions, thrownError) {
//         console.log("Error: " ,xhr, ", " ,thrownError);
//     }
// });

// Define variables

var serverList;
var url = "http://supraverse.net:8989/list";
var data;

// Define functions

function dataReloaded() {
  // Fire a notification that the data has been successfully reloaded

  var successNoty = noty({
    text: 'Refresh complete!',
    layout: 'topRight',
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

  // So after DOM loads setup the Ajax request and the datatable

  serverList = $('#server-list').DataTable({
    autoWidth: false,
    order: [
      [2, "asc"]
    ],
    ajax: {
      url: url,
      type: "POST",
      crossDomain: true,
      contentType: 'application/json',
      data: "{}",
      processData: false,
      dataSrc: "servers",
      error: function (xhr, ajaxOptions, thrownError) {
        console.log("Error: " ,xhr, ", " ,thrownError);
      }
    },
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

  // Autorefresh in every 5 secs

  // window.setInterval(function () {
  //   serverList.ajax.reload(dataReloaded);
  // }, 8000);

});