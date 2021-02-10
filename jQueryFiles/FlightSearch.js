
$(document).ready(function () {

    var originList = $("#originCountryList");
    var DestinationList = $("#destinationCountryList");
    var price = $("#price");
    var departue = $("#departue");
    var tBody = $('#tBody');
    var searchBtn = $('#searchBtn');
    var orderSelect = $('#orderSelectDiv');
    var orderByBtn = $('#orderBtn');
    var selectOption = $('#selectOption');
    var clearBtn = $('#clearBtn');
    var dataListTochange = [];
    var countriesNames = [];
    var airlineCompanyName = [];
    // hides orde by div
    orderSelect.hide();

    // find countries names index for display from the array
    function matchCountries(countryCode) {

        for (i = 0; i < countriesNames.length; i++) {

            if (countryCode == String(countriesNames[i].id))
                return i
        }
    }
    //find airline company name index for display from the array
    function matchAirlineNames(countryCode) {

        for (i = 0; i < airlineCompanyName.length; i++) {

            if (countryCode == airlineCompanyName[i].id)
                return i
        }
    }

    //search btn function
    searchBtn.click(function () {
        orderSelect.show();
        dataListTochange = [];
        $.get("http://localhost:52832/api/anonymous/getallflights", function (data, status) {
            $(tBody).empty();

            $(data).each(function (index, Data) {

                if (originList.val() == Data._Origen_Cuntry_code && Data._Destination_Contrey_Code == DestinationList.val()) {
                    //appending to table data
                    (tBody).append('<tr><td>' + Data._Id + '</td>' +
                        '<td>' + airlineCompanyName[matchAirlineNames(Data._AirlineCompany_Id)].airlineName + '</td>' +
                        '<td>' + countriesNames[matchCountries(originList.val())].countryName + '</td>' +
                        '<td>' + countriesNames[matchCountries(DestinationList.val())].countryName + '</td>' +
                        '<td>' + Data._Departure_Time + '</td>' +
                        '<td>' + Data._Landing_Time + '</td>' +
                        '<td>' + Data._Remaining_Tikes + '</td></tr>');
                    dataListTochange.push(Data)
                }
            });
        });
    });

    //Order by btn function
    orderByBtn.click(function () {
        console.log(dataListTochange)

        //sort by price
        if (selectOption.val() == 'price') {
            tBody.empty()
            //sort logic
            dataListTochange.sort(function (a, b) {
                var A = a._Remaining_Tikes
                var B = b._Remaining_Tikes
                if (A > B)
                    return 1
                else if (B > A)
                    return -1
                return 0
            });
            //appending to table data
            $(dataListTochange).each(function (index, Data) {
                (tBody).append('<tr><td>' + Data._Id + '</td>' +
                    '<td>' + airlineCompanyName[matchAirlineNames(Data._AirlineCompany_Id)].airlineName + '</td>' +
                    '<td>' + countriesNames[matchCountries(originList.val())].countryName + '</td>' +
                    '<td>' + countriesNames[matchCountries(DestinationList.val())].countryName + '</td>' +
                    '<td>' + Data._Departure_Time + '</td>' +
                    '<td>' + Data._Landing_Time + '</td>' +
                    '<td>' + Data._Remaining_Tikes + '</td></tr>')
            });

        }
        //sort by departue time
        else if (selectOption == 'departue') {
            tBody.empty()
            //sort logic
            dataListTochange.sort(function (a, b) {
                var A = a._Departure_Time
                var B = b._Departure_Time
                if (A > B)
                    return 1
                else if (B > A)
                    return -1
                return 0
            });

            //appending to table data
            $(dataListTochange).each(function (index, Data) {
                (tBody).append('<tr><td>' + Data._Id + '</td>' +
                    '<td>' + airlineCompanyName[matchAirlineNames(Data._AirlineCompany_Id)].airlineName + '</td>' +
                    '<td>' + countriesNames[matchCountries(originList.val())].countryName + '</td>' +
                    '<td>' + countriesNames[matchCountries(DestinationList.val())].countryName + '</td>' +
                    '<td>' + Data._Departure_Time + '</td>' +
                    '<td>' + Data._Landing_Time + '</td>' +
                    '<td>' + Data._Remaining_Tikes + '</td></tr>')
            });
        } else {
            alert("Please select value")
        }
    });
    //clear btn
    clearBtn.click(function () {
        tBody.empty();
        orderSelect.hide();

    });
    //countries listes get!
    $.get("http://localhost:52832/api/anonymous/getallcountries", function (data, status) {

        $(data).each(function (index, Data) {
            countriesNames.push({ "id": Data._Id, "countryName": Data._Country_Name })
            originList.append("<option value='" + Data._Id + "'>" + Data._Country_Name + "</option>")
            DestinationList.append('<option value="' + Data._Id + '">' + Data._Country_Name + '</option>')
        });
    });

    //get airlines companies                          
    $.get("http://localhost:52832/api/anonymous/getnamesofairplanes", function (data, status) {

        $(data).each(function (index, Data) {
            airlineCompanyName.push({ "id": Data._Id, "airlineName": Data._AirLine_Name })

        });
    });

});
