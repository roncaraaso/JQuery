
$(document).ready(function () {

    var tBody = $('#tBody')
    var updateBtn = $('#updateBtn')
    var sendBtn = $('#sendBtn')
    var checkedElements;
    var dataList = [];
    var checkboxList;
    var inputCheckbox;
    var num;
    var stopCount = true;
    var checkbox = $("input[name='checkbox']")

getaAll();

    //updte btn function   
    updateBtn.click(function () {

        checkboxList = $('input[name = "checkbox"]')
        inputCheckbox = $('input[name = "inputCheckbox"]')

        checkedElements = [];

        for (i = 0; i < checkboxList.length; i++) {
            if (checkboxList[i].checked == true) {
                checkedElements.push(checkboxList[i].id)
            }
        }
   
        //  check if all check boxes are checked
        if (checkedElements.length != 0) {
            num = 0
            // console.log(i)
            for (i = 0; i < checkedElements.length; i++) {
                stopCount = true;
                for (j = num; j < dataList.length; j++) {

                    //check if check box is checkd and if it machs row data
                    if (checkedElements[i] == dataList[j]._Id) {

                        var ronwId = $('#tr' + dataList[j]._Id + '')

                        ronwId.empty()
                        ronwId.append("<td> <input type='checkbox' id='" + dataList[j]._Id + "'name='inputCheckbox' value='" + dataList[j]._Id + "' checked='true'></td>" +
                            "<td>" + dataList[j]._Id + "</td>" +
                            "<td><input type='text' id='firstName'name='input' value='" + dataList[j]._First_Name + "' placeholder='" + dataList[j]._First_Name + "'></td>" +
                            "<td><input type='text' id='lastName'name='input' value='" + dataList[j]._Last_Name + "' placeholder='" + dataList[j]._Last_Name + "'></td>" +
                            "<td><input type='text' id='userName'name='input' value='" + dataList[j]._User_Name + "' placeholder='" + dataList[j]._User_Name + "'></td>" +
                            "<td><input type='text' id='password'name='input' value='" + dataList[j]._Password + "' placeholder='" + dataList[j]._Password + "'></td>" +
                            "<td><input type='text' id='address'name='input' value='" + dataList[j]._Address + "' placeholder='" + dataList[j]._Address + "'></td>" +
                            "<td><input type='text' id='phoneNumbr'name='input' value='" + dataList[j]._Phone_No + "' placeholder='" + dataList[j]._Phone_No + "'></td>" +
                            "<td><input type='text' id='creditCardNumber'name='input' value='" + dataList[j]._Credit_Card_Number + "' placeholder='" + dataList[j]._Credit_Card_Number + "'></td>")
                        num = j + 1
                        stopCount = false
                    }
                    if (stopCount == false) {
                        break
                    }
                }
            }
        }

        //checking the iput fildes if checked
        if (inputCheckbox.length != 0) {

            num = 0
            for (i = 0; i < inputCheckbox.length; i++) {
                stopCount = true
                // console.log("i", i)
                for (j = num; j < dataList.length; j++) {
                    // console.log(j)
                    if (dataList[j]._Id == inputCheckbox[i].id) {

                        if (inputCheckbox[i].checked == true) {

                            num = j + 1
                            break;
                        } else {
                            var ronwId = $('#tr' + dataList[j]._Id + '')

                            ronwId.empty()
                            ronwId.append("<td><input type='checkbox' id='" + dataList[j]._Id + "' name='checkbox' value=' " + dataList[j]._Id + "'></td>" +
                                "<td>" + dataList[j]._Id + "</td>" +
                                "<td>" + dataList[j]._First_Name + "</td>" +
                                "<td>" + dataList[j]._Last_Name + "</td>" +
                                "<td>" + dataList[j]._User_Name + "</td>" +
                                "<td>" + dataList[j]._Password + "</td>" +
                                "<td>" + dataList[j]._Address + "</td>" +
                                "<td>" + dataList[j]._Phone_No + "</td>" +
                                "<td>" + dataList[j]._Credit_Card_Number + "</td>")
                            num = j + 1
                            stopCount = false
                        }
                    }

                    if (stopCount == false) {
                        break;
                    }
                }
            }
        }
        if (checkedElements.length == 0 && inputCheckbox.length == 0) {
            alert("No check box was selected \n Please check one check box to continue")
        }
    });

    //send btn function
    sendBtn.click(function () {
        inputCheckbox = $('input[name = "inputCheckbox"]')
        input = $('input[name = "input"]')
    
        checkedElements = [];
        for (i = 0; i < inputCheckbox.length; i++) {
            if (inputCheckbox[i].checked == true) {
                checkedElements.push(inputCheckbox[i].id)
            }
        }
        console.log(checkedElements)
       
        var numberOfRepeats = input.length / checkedElements.length

        num = 0
        $(checkedElements).each(function (index, data) {
            console.log("data", data)
        
            if (index > 0) {
                num = index * numberOfRepeats
            }
            console.log(num)
            $.ajax({
                url: 'http://localhost:52832/api/administrator/updatecustomerdetails',
                type: 'PUT',  // http method
                headers: {
                    'Authorization': 'Basic ' + btoa('Admin:9999')
                },
                data: {
                    _Id: checkedElements[index],
                    _First_Name: input[num].value,
                    _Last_Name: input[(num + 1)].value,
                    _User_Name: input[(num + 2)].value,
                    _Password: input[(num + 3)].value,
                    _Address: input[(num + 4)].value,
                    _Phone_No: input[(num + 5)].value,
                    _Credit_Card_Number: input[(num + 6)].value
                },  // data to submit
                success: function (data, status, xhr) {
                  getaAll();
                },

            });

        });

    });
  
  function getaAll(){
    $.get("http://localhost:52832/api/anonymous/getallcustomersforsearchlist", function (data, status) {
        tBody.empty();
        dataList = [];

        $(data).each(function (index, Data) {
            tBody.append("<tr id='tr" + Data._Id + "'><td>" +
                "<input type='checkbox' id='" + Data._Id + "'name='checkbox' value=' " + Data._Id + "'></td>" +
                "<td>" + Data._Id + "</td>" +
                "<td>" + Data._First_Name + "</td>" +
                "<td>" + Data._Last_Name + "</td>" +
                "<td>" + Data._User_Name + "</td>" +
                "<td>" + Data._Password + "</td>" +
                "<td>" + Data._Address + "</td>" +
                "<td>" + Data._Phone_No + "</td>" +
                "<td>" + Data._Credit_Card_Number + "</td></tr>")
            dataList.push(Data)
            // console.log(dataList)
        });
    });
  }

});


