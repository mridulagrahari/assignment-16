let MANDATORYCHECK = [];
var submitbtn = document.querySelector("#submit");
submitbtn.addEventListener("click",function(){  
    submitBtn();
});
document.querySelector("#nodata").removeAttribute("class");
let submitBtn = ()=>{   
    let formObj = {};
    let foodArr = [];
    formObj.fName = document.querySelector("#firstname").value;
    formObj.lName = document.querySelector("#lastname").value;
    formObj.address = document.querySelector("#address").value;
    formObj.pincode = document.querySelector("#pincode").value;
    formObj.gender = document.querySelector("#gender").value;
    document.querySelectorAll(".form-checkbox:checked").forEach((e)=>{foodArr.push(e.value)});
    formObj.foodSelect = foodArr;
    formObj.state = document.querySelector("#state").value;
    formObj.country = document.querySelector("#country").value;

    validateMandate(formObj);
    if(!MANDATORYCHECK.includes(false) && formObj.foodSelect.length >= 2){
        formObj.foodSelect = foodArr.join(",");
        appendTableRecord(formObj);
    } else{        
        errAppendCheck("food_error",false,"Please select choice of food");
    }    
};

let validateMandate = (obj)=> {
    MANDATORYCHECK = [];    
    isNull(obj.fName) == true ? errAppendCheck("firstname_error",false,"Please enter firstname") : errAppendCheck("firstname_error",true,"");
    isNull(obj.lName) == true ? errAppendCheck("lastname_error",false,"Please enter lastname") : errAppendCheck("lastname_error",true,"");
    isNull(obj.address) == true ? errAppendCheck("address_error",false,"Please enter address") : errAppendCheck("address_error",true,"");
    isNull(obj.pincode) == true ? errAppendCheck("pincode_error",false,"Please enter pincode") : errAppendCheck("pincode_error",true,"");
    isNull(obj.gender) == true ? errAppendCheck("gender_error",false,"Please enter gender") : errAppendCheck("gender_error",true,"");
    isNull(obj.state) == true ? errAppendCheck("state_error",false,"Please select state") : errAppendCheck("state_error",true,""); 
    isNull(obj.country) == true ? errAppendCheck("country_error",false,"Please select country") : errAppendCheck("country_error",true,"");        
}
let errAppendCheck = (elm,status,error)=> {
    MANDATORYCHECK.push(status);
    document.getElementById(elm).removeAttribute("class","dispnone");
    document.getElementById(elm).setAttribute("class","error");
    document.getElementById(elm).innerText = error;
}

let isNull = (data)=> {
    return (data == "" || data == undefined || data == null || data == "Please select") == true ? true: false;
}
let clearForm = ()=> {
    document.querySelectorAll('[type="text"]').forEach((elm,index)=> {document.querySelectorAll('[type="text"]')[index].value = "";})
    document.querySelectorAll("select").forEach((elm,index)=> {document.querySelectorAll("select")[index].value = "Please select";})
    document.querySelectorAll("[type=checkbox]").forEach((elm,index)=> {document.querySelectorAll("[type=checkbox]")[index].checked = false;})
   // document.querySelectorAll("select").value = "Please select";
}

let appendTableRecord = (obj)=>{
   console.log(obj);
   document.querySelector("#nodata").setAttribute("class","dispnone");
   var table = document.getElementById("table_id");
   let tbody = document.getElementById("tb_body");
   let tr = document.createElement("TR");
   Object.keys(obj).forEach((elm,index)=>{   
    let td = document.createElement("TD");
    td.appendChild(document.createTextNode(obj[elm]));        
    tr.appendChild(td);
    tbody.appendChild(tr);      
  });
  table.appendChild(tbody);
  clearForm();
}

var foucusEvt = document.querySelectorAll(".form-input");
foucusEvt.forEach((elm)=>{
    elm.addEventListener("focus",()=>{               
        if(elm.type.toLowerCase() == "checkbox"){
            elm.id = "food";
        }
        document.getElementById(elm.id+"_error").setAttribute("class","dispnone");
    })
})