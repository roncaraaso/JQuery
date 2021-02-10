$(document).ready(function () {
 
    $('#clearbtn').click(function(){
        $('#tbody').empty();
    });

    $("#Searchbtn").click(function () {
    
        const table = $("#tbody");
        const landing = 'Landing';
        const landed = ' Landed';
        const notFinal = 'Not Final'

        $.get("http://localhost:52832/api/anonymous/getallflights", function (data, status) {
            table.empty();
            
            
            $(data).each(function (index, Data) {
                console.log(index, Data)
              let num = Math.floor(Math.random()* 11)


                table.append('<tr><td>' + Data._AirlineCompany_Id + '</td>' +
                    '<td>' + Data._Origen_Cuntry_code + '</td>' +
                    '<td>' + Data._Destination_Contrey_Code + '</td>' +
                    '<td>' + Data._Landing_Time + '</td>' +
                    '<td>' + RemdomStatus(num) + '</td></tr></br>')

            });
        });
    
      
          // this func makes random status for flights
        const RemdomStatus = function (x) {
            if (x >= 6 )
                return '<label class="badge badge-success">' + landing + '</label>';
            else if (x >= 0 && x <=4)
                return '<label class="badge badge-warning">' + landed + '</label>';
                else if(x==5)
            return '<label class="badge badge-danger">' + notFinal + '</label>';
        };
    });

});