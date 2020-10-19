/*
....###....########.########.########.########......................##..#######....
...##.##...##..........##....##.......##.....##.....................##.##.....##...
..##...##..##..........##....##.......##.....##.....................##.##.....##...
.##.....##.######......##....######...########.....#######..........##.##.....##...
.#########.##..........##....##.......##...##.................##....##.##..##.##...
.##.....##.##..........##....##.......##....##................##....##.##....##....
.##.....##.##..........##....########.##.....##................######...#####.##...
*/

function ajaxdata(datasent, datasuccess) {
    $.ajax({
        "url": "../app/enc.php",
        "method": "POST",
        "data":datasent,
        success: function (response) {$(datasuccess).html(response);}
    });
}
function fastV(ele, method, customItem = null) {
    // Get value Of Send
    var sendData = $(ele).data(method);
    
    var dataLength = $('[data-'+ sendData + ']').length;    
    datasent = {'awesomeLotfyFW':sendData};
    
    for (i = 0; i < dataLength; i++) {
        var currInput = $('[data-'+ sendData + ']').eq(i).val();
        if (currInput.length != 0) {
            var dataNameValue = $('[data-'+ sendData + ']').eq(i).data(sendData);
            var dataValue = $('[data-'+ sendData + ']').eq(i).val();
            datasent[dataNameValue] = dataValue;
        }
    }
    $.extend( datasent, customItem );

    var datasuccess = $('[data-success = "'+sendData+'"]'); 
    ajaxdata(datasent, datasuccess);
}
$(document).on('click', '[data-send]', function () {

    fastV(this,'send');

});
