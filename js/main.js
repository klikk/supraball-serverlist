// var url = "http://supraverse.net:8989/";

// $.ajax({
//     url: url + "list",
//     type: "POST",
//     crossDomain: true,
//     contentType : 'application/json',
//     data: "{}",
//     processData:true,
//     success: function (result) {
//     data = result;
//     console.log(data);
    // $('#server-list').DataTable( {
    //   data: data.servers,
    //   dataSrc: "servers",
    //     columns: [
    //       { data: 'ip' },
    //       { data: 'port' },
    //       { data: 'title' },
    //       { data: 'description' },
    //       { data: 'max_players' },
    //       { data: 'max_spectators' },
    //       { data: 'max_duration' },
    //       { data: 'max_goals' },
    //       { data: 'current_players' },
    //       { data: 'current_duration' },
    //       { data: 'current_goals_red' },
    //       { data: 'current_goals_blue' },
    //       { data: 'map' },
    //       { data: 'training' }
    //     ]
    // });
//     },
//     error: function (xhr, ajaxOptions, thrownError) {
//         console.log("Error: " ,xhr, ", " ,thrownError);
//     }
// });

$(function(){
  serverList = $('#server-list').DataTable( {
    data: data.servers,
    dataSrc: "servers",
      columns: [
        { data: 'ip' },
        { data: 'port' },
        { data: 'title' },
        { data: 'description' },
        { data: 'max_players' },
        { data: 'max_spectators' },
        { data: 'max_duration' },
        { data: 'max_goals' },
        { data: 'current_players' },
        { data: 'current_duration' },
        { data: 'current_goals_red' },
        { data: 'current_goals_blue' },
        { data: 'map' },
        { data: 'training' }
      ]
  });
});