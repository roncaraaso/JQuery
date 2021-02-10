
$(document).ready(function () {
    const table = $('#tbody');
    const delayed = 'Delayed';
    const onTime = 'On Time';
     
    $('#clearbtn').click(function(){
        $('#tbody').empty();
    });

    $("#Searchbtn").click(function () {
        $.get("http://localhost:52832/api/anonymous/getallflights", function (data, status) {
            table.empty();
         
            $(data).each( function (index,Data) {
                console.log(Data);
                let num = Math.floor(Math.random()*11)
                table.append('<tr><td>' + Data._AirlineCompany_Id + '</td>' +
                    '<td>' + Data._Origen_Cuntry_code+ '</td>' +
                    '<td>' + Data._Destination_Contrey_Code + '</td>' +
                    '<td>' + Data._Departure_Time + '</td>' +
                    '<td>' + Data._Remaining_Tikes +'</td>'+
                    '<td>' + statusChange(num) + '</td></tr>');
            });
        });
    });
    // thus func makes random statos for flights
    statusChange = function(x){
        if(x<=5)
        return '<label class="badge badge-danger">' + delayed + '</label>';                  
        return '<label  class="badge badge-success">' + onTime + '</label>';
       };

});