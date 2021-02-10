
$(document).ready(function () {
    //variables
    var selectedItemForSearch = $('#selectitemforsearch');
    var selectedFlightsStatus = $('#selectFlightStatus');
    var selectDetails = $('#selectDetails');
    var flightInput= $('#flightInput')
    var tBody = $("#tBody");
    var tHead = $('#thead');



    // html select menu code 
    selectedItemForSearch.focus(function () {

        $(selectedItemForSearch).click(function () {

            switch (selectedItemForSearch.val()) {
                case "select":
                    flightInput.hide();
                    selectDetails.hide();
                    selectedFlightsStatus.hide()
                    break;
                case "airplaneName":
                    GetNamesOfAirplanes();
                    flightInput.hide();
                    selectDetails.show();
                    selectedFlightsStatus.show();
                    break;
                case "flightNumber":
                   flightInput.show();
                    selectedFlightsStatus.hide();
                    break;

                default:
                    GetNamesOfCountries();
                    flightInput.hide();
                    selectDetails.show();
                    selectedFlightsStatus.show();
            }
        });
    });

    //search button get and disply code
    $('#SearchBtn').click(function () {

        console.log(selectedItemForSearch.val());
        let selectDetailsForChoise = selectDetails.val();
        let flightStatus = selectedFlightsStatus.val();
        let inputNumber = flightInput.val();
        let noContent = 'No content'
        tBody.empty();
        tHead.empty();

        switch (selectedItemForSearch.val()) {

            case "select":
                GetAllFlights();
                break;

            case "airplaneName":
                $.get("http://localhost:52832/api/anonymous/getallflights", function (data, status) {

                    $(tHead).append('<tr><td>'
                        + 'Airline Company ' + '</td><td>'
                        + 'Origen_Cuntry code' + '</td><td>'
                        + 'Destination Contrey ' + '</td><td>'
                        + 'Departure Time' + '</td><td>'
                        + 'Landing Time' + '</td><td>'
                        + 'Remaining Tikes</td></tr>')

                    console.log(selectDetailsForChoise)

                    $(data).each(function (index, Data) {

                        if (selectDetailsForChoise == Data._AirlineCompany_Id && flightStatus == 'departuerFlights') {
                            $(tBody).append('<tr><td>' + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td > <td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + Data._Departure_Time + '</td><td>'
                                + noContent + '</td><td>'
                                + noContent + '</td></tr>')
                        }

                        else if (selectDetailsForChoise == Data._AirlineCompany_Id && flightStatus == 'landingFlights') {
                            $(tBody).append('<tr><td>' + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td > <td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + noContent + '</td><td>'
                                + Data._Landing_Time + '</td><td>'
                                + noContent + '</td><tr>')
                        }
                        else if ((selectDetailsForChoise == Data._AirlineCompany_Id && flightStatus == 'allFlights')) {

                            $(tBody).append('<tr><td>' + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td > <td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + Data._Departure_Time + '</td><td>'
                                + Data._Landing_Time + '</td><td>'
                                + Data._Remaining_Tikes + '</td><tr>')
                        }
                    });
                });
                break;

            case "origenCuntry":

                $.get("http://localhost:52832/api/anonymous/getallflights", function (data, status) {

                    $(tHead).append('<tr><td>'
                        + 'Airline Company ' + '</td><td>'
                        + 'Origen_Cuntry code' + '</td><td>'
                        + 'Destination Contrey ' + '</td><td>'
                        + 'Departure Time' + '</td><td>'
                        + 'Landing Time' + '</td><td>'
                        + 'Remaining Tikes' + '</td></tr>')

                    let name = selectDetails.val();
                    console.log(name)
                    $(data).each(function (index, Data) {

                        if (selectDetailsForChoise == Data._Origen_Cuntry_code && flightStatus == 'departuerFlights') {
                            $(tBody).append("<tr><td>" + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td><td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + Data._Departure_Time + '</td><td>'
                                + no + '</td><td>'
                                + Data._Remaining_Tikes + '</td><tr>')
                        }
                        else if (selectDetailsForChoise == Data._Origen_Cuntry_code && flightStatus == 'landingFlights') {
                            $(tBody).append("<tr><td>" + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td><td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + noContent + '</td><td>'
                                + Data._Landing_Time + '</td><td>'
                                + noContent + '</td><tr>')
                        }
                        else if (selectDetailsForChoise == Data._Origen_Cuntry_code && flightStatus == 'allFlights') {
                            $(tBody).append("<tr><td>" + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td><td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + Data._Departure_Time + '</td><td>'
                                + Data._Landing_Time + '</td><td>'
                                + Data._Remaining_Tikes + '</td><tr>')
                        }
                    });
                });
                break;

            case "flightNumber":
                $.get("http://localhost:52832/api/anonymous/getallflights", function (data, status) {

                    $(tHead).append('<tr><td>'
                        + 'Airline Company ' + '</td><td>'
                        + 'Origen_Cuntry code' + '</td><td>'
                        + 'Destination Contrey ' + '</td><td>'
                        + 'Departure Time' + '</td><td>'
                        + 'Landing Time' + '</td><td>'
                        + 'Remaining Tikes' + '</td></tr>')

console.log(inputNumber)

                    $(data).each(function (index, Data) {

                        if (inputNumber == Data._Id ) {
                            $(tBody).append("<tr><td>" + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td><td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + Data._Departure_Time + '</td><td>'
                                + Data._Landing_Time + '</td><td>'
                                + Data._Remaining_Tikes + '</td><tr>')
                        }

                    });
                });
               
                break;

            case "destinationContrey":

                $.get("http://localhost:52832/api/anonymous/getallflights", function (data, status) {
                    $(tHead).append('<tr><td>'
                        + 'Airline Company ' + '</td><td>'
                        + 'Origen_Cuntry code' + '</td><td>'
                        + 'Destination Contrey ' + '</td><td>'
                        + 'Departure Time' + '</td><td>'
                        + 'Landing Time' + '</td><td>'
                        + 'Remaining Tikes' + '</td></tr>')

                    $(data).each(function (index, Data) {

                        if (selectDetailsForChoise == Data._Destination_Contrey_Code && flightStatus == 'departuerFlights') {
                            $(tBody).append("<tr><td>" + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td><td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + Data._Departure_Time + '</td><td>'
                                + noContent + '</td><td>'
                                + Data._Remaining_Tikes + '</td><tr>')
                        }
                        else if (selectDetailsForChoise == Data._Destination_Contrey_Code && flightStatus == 'landingFlights') {
                            $(tBody).append("<tr><td>" + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td><td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + noContent + '</td><td>'
                                + Data._Landing_Time + '</td><td>'
                                + noContent + '</td><tr>')

                        } else if (selectDetailsForChoise == Data._Destination_Contrey_Code && flightStatus == 'allFlights') {
                            $(tBody).append("<tr><td>" + Data._AirlineCompany_Id + '</td><td>'
                                + Data._Origen_Cuntry_code + '</td><td>'
                                + Data._Destination_Contrey_Code + '</td><td>'
                                + Data._Departure_Time + '</td><td>'
                                + Data._Landing_Time + '</td><td>'
                                + Data._Remaining_Tikes + '</td><tr>')
                        }
                    });
                });

                break;
        }
    });

    selectedFlightsStatus.hide();
    selectDetails.hide();
    flightInput.hide();

    GetNamesOfAirplanes = function () {

        $.get("http://localhost:52832/api/anonymous/getnamesofairplanes", function (data, status) {
            console.log(selectDetails.val())
            selectDetails.empty();
            console.log(data)
            $(data).each(function (index, Data) {
                console.log(Data._AirLine_Name)
                selectDetails.append('<option value = ' + Data._Id + '>' + Data._AirLine_Name + '</option>')
            });

        });
    };

    GetNamesOfCountries = function () {
        $.get("http://localhost:52832/api/anonymous/getallcountries", function (data, status) {
            //  console.log(selectDetails.val())
            selectDetails.empty();
            $(data).each(function (index, Data) {

                selectDetails.append('<option value = ' + Data._Id + '>' + Data._Country_Name + '</option>')
            });
            console.log(data)
        });
    };

    GetAllFlights = function () {

        $.get("http://localhost:52832/api/anonymous/getallflights", function (data, status) {
            console.log(data)
            $(tHead).append('<tr><td>'
                + 'Airline Company ' + '</td><td>'
                + 'Origen_Cuntry code' + '</td><td>'
                + 'Destination Contrey ' + '</td><td>'
                + 'Departure Time' + '</td><td>'
                + 'Landing Time' + '</td><td>'
                + 'Remaining Tikes' + '</td></tr>')

            $(data).each(function (index, Data) {
                console.log(Data)

                $(tBody).append("<tr><td>" + Data._AirlineCompany_Id + '</td><td>'
                    + Data._Origen_Cuntry_code + '</td><td>'
                    + Data._Destination_Contrey_Code + '</td><td>'
                    + Data._Departure_Time + '</td><td>'
                    + Data._Landing_Time + '</td><td>'
                    + Data._Remaining_Tikes + '</td><tr>')
            });

        });

    }
});
