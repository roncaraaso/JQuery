$(document).ready(function () {
    var tBody = $('#tBody');
     $.get("http://localhost:52832/api/anonymous/getallcustomersforsearchlist", function (data, status) {
         $(data).each(function (index, Data) {
         tBody.append("<tr><td>"+ Data._Id+"</td>"+
             "<td>"+ Data._First_Name+"</td>"+
             "<td>"+ Data._Last_Name+"</td>"+
             "<td>"+ Data._User_Name+"</td>"+
             "<td>"+ Data._Password+"</td>"+
             "<td>"+ Data._Address+"</td>"+
             "<td>"+ Data._Phone_No+"</td>"+
             "<td>"+ Data._Credit_Card_Number+"</td></tr>")
         });
     });


 });