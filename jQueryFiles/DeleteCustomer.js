
$(document).ready(function () {
 
    var tBody = $('#tBody');
    var checkbox = $('input[name ="checkbox"]');
    var deleteBtn = $('#deleteBtn')
    var LoadListBtn = $('#loadListBtn')         
    var dataList = [];
    var num =0;
    var elements;
    var elementsChecked;
    var continueCuont = true;

    LoadListBtn.click(function () {
        $.get("http://localhost:52832/api/anonymous/getallcustomersforsearchlist", function (data, status) {
            tBody.empty();
            dataList = [];
            $(data).each(function (index, Data) {
                tBody.append("<tr id='tr" + Data._Id +"'><td>" + "<input type='checkbox' id='" + Data._Id + "'name='checkbox' value=' " + Data._Id + "'></td>" +
                    "<td>" + Data._Id + "</td>" +
                    "<td>" + Data._First_Name + "</td>" +
                    "<td>" + Data._Last_Name + "</td>" +
                    "<td>" + Data._User_Name + "</td>" +
                    "<td>" + Data._Password + "</td>" +
                    "<td>" + Data._Address + "</td>" +
                    "<td>" + Data._Phone_No + "</td>" +
                    "<td>" + Data._Credit_Card_Number + "</td></tr>")
                dataList.push(Data._Id)
            });
           // console.log(dataList)
        });
    });

    //delete function 
    deleteBtn.click(function () {
        elementsChecked = [];

        //array of elements
        elements = $('input[name="checkbox"]')//.attr("checked") 
       
        // check of element "checked"
        for (i = 0; i < elements.length; i++) {
            if (elements[i].checked == true) {
                elementsChecked.push(elements[i].id)
            }
        }

      //check if checkbox are pressed and ajax call to delete
        if (elementsChecked.length !=0) {
            console.log(elementsChecked)
        
           $(elementsChecked).each(function(index , data){
                $.ajax({
                    url: "http://localhost:52832/api/administrator/removecustomer",
                    type: "DELETE",
                    headers:{
                         'Authorization': 'Basic ' + btoa('Admin:9999')
                    },
                    data:{
                        _Id:elementsChecked[index]
                    },
                    success: function (response) {
     alert();
                    }
                });
            });


             // loop for deleting deleted items
             num=0;
            for (i = 0; i < elementsChecked.length; i++) {
               continueCuont =true;
                for (j = num; j < dataList.length; j++) {

                    if (dataList[j] == elementsChecked[i]) {
                  
                       var rowId =$("#tr"+dataList[j]+"")
                      
                          rowId.fadeOut()
         
                         continueCuont = false;
                    }
                
                    if (continueCuont == false) {
                        num =j+1
                        break;
                    }
                }
             
            }
        }
        else{
            alert("You didnt select any check box")
        }
    });
});
