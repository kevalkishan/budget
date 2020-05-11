
//////////budget controller data calculation///////////
var budgetcontroller = (function(){
var Expenses = function(id,description,value){
this.id = id;
this.description = description;
this.value =value
}    
var income = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value =value;
    }    
    var total = function(type){
        var sum=0;
        data.allitems[type].forEach(function(curr){
sum+=curr.value;
        })
        data.totals[type] = sum;
    }
var data  = {
    allitems :{
        exp: [],
        inc : []
         
    },
    totals :{
        exp :0,
        inc :0, 
    },
    budget:0,
    percentage:-1

}
return {
    testing :function(){
console.log(data);
    },
    calculatebudget : function(){
        //sumup the income and expenses
total('inc');
total('exp');
//calculate budget
data.budget = data.totals.inc - data.totals.exp;

//calculate percentage 
if(data.totals.inc>0)
data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);

    },
    getbudget:function(){
return {
    totalexpense :data.totals.exp,
    totalincome :data.totals.inc,
    budget:data.budget,
    percentage:data.percentage
}
    },
    additems : function(ty,des,val){
        var newitem;
     //   id = 0;//id is unique no to assign any expense or income////one way to do that
        //is len of array +1  but agar delete krna pade then problem hoga 
         //create new id
         if(data.allitems[ty].length>0){
        id = data.allitems[ty][data.allitems[ty].length -1].id +1;
         }else{
             id=0;
         }
        if(ty === "inc"){
            newitem = new income(id,des,val);
        
        }else{
             newitem = new Expenses(id,des,val);
        }
data.allitems[ty].push(newitem);
return newitem;
    },
    deleteitems: function(ty,id){
        console.log(ty)
//        var arr =  data.allitems[ty].map(function(current){
// return 1;
//         })
//         //map fucntion is differnet then foreach as it returns an array like here
//         //arr will contain 1 only
      
var idarray = data.allitems[ty].map(function(current){
    
        return current.id;
   
})
var index = idarray.indexOf(id);

if(index!=-1){
    data.allitems[ty].splice(index,1);//index se start kerga delete krna and one elemtn will be deleted
}
console.log(data.allitems[ty]);
    }
   

    
}

})();




/////////////ui controller all calculated goes to user interface/////////
var uicontroller = (function(){
//return an object 
var domstring ={
    budgetlabel:".budget__value",
    budgetincomelabel:".budget__income--value",
    budgetexpenselabel : ".budget__expenses--value",
    budgetpercentage:".budget__expenses--percentage",
    inputtype :".add__type",
    inputdescrption :".add__description",
    inputvalue : ".add__value",
    inputbtn :".add__btn",
    incomecontainer:".income__list",
    expensecontainer:".expenses__list",
    container:".container"
}
return {
getinput : function(){

return {
     type :document.querySelector(domstring.inputtype).value,
     description : document.querySelector(domstring.inputdescrption).value,
     value :parseFloat(document.querySelector(domstring.inputvalue).value) ,//string change to float
}
},
addlistitem : function(obj,type){
//create html string with placeholder data
var html, newHtml, element;
// Create HTML string with placeholder text

if (type === 'inc') {
    element = domstring.incomecontainer;
    
    html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
} else if (type === 'exp') {
    element = domstring.expensecontainer;
    
    html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
}

// Replace the placeholder text with some actual data
newHtml = html.replace('%id%', obj.id);
newHtml = newHtml.replace('%description%', obj.description);
newHtml = newHtml.replace('%value%', obj.value);

// Insert the HTML into the DOM
document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
},
clearFields :function(){
    var fields;
fields = document.querySelectorAll(domstring.inputdescrption + "," + domstring.inputvalue);
//qeryselectorall return list//
//field.slice will not work slice 

fields = Array.prototype.slice.call(fields);
//now fields is an array
//for each loop
// fields.forEach(fucntion(currentval,index,fields) {

// });
fields.forEach(function (currentval,index,fields){
currentval.value = "";
})
fields[0].focus();

},
displaybudget:function(obj){
    document.querySelector(domstring.budgetlabel).textContent = obj.budget;
    document.querySelector(domstring.budgetincomelabel).textContent = obj.totalincome;
    document.querySelector(domstring.budgetexpenselabel).textContent = obj.totalexpense;
    if(obj.percentage>0)
    document.querySelector(domstring.budgetpercentage).textContent = obj.percentage + "%";
    else{
        document.querySelector(domstring.budgetpercentage).textContent = "--";

    }

},
getdomstrings : function (){
    return domstring
},
deleteItem :function(id){
    console.log(id)
// document.querySelector("#" + id).remove();///this also work

document.getElementById(id).remove();
}
};


})();




////////////controller here evenet listner works /////////////
var controlller  = (function(controlbudget,controlui){
    var setupeventlistner  = function(){
        var dom = uicontroller.getdomstrings();
        var input = uicontroller.getinput;
        document.querySelector(dom.container).addEventListener("click",controlFucntiondelete);
        document.querySelector(dom.inputbtn).addEventListener("click",ctrlfunction);

///for add description and value we need event listner ///
document.addEventListener("keypress",function(event){
    // var val = uicontroller.getinput.value;
    var input = uicontroller.getinput;

// console.log(event.keyCode===13);///old browoser has event.which for keycode enter has keycode 13 

if(event.keyCode===13){
    ctrlfunction();
}

})
    }
    
   
    var updatebudget  = function(){
//1 calculate budget
budgetcontroller.calculatebudget();
var budget = budgetcontroller.getbudget();
// console.log(budget.percentage);
// console.log(budget.totalexpense);
// console.log(budget.totalincome);
// console.log(budget.budget);


//5 display the budget
uicontroller.displaybudget(budget);
    }











    //ctrlfucntion 
    var ctrlfunction = function(){
        // alert("i am here")

        var dom = uicontroller.getdomstrings();

//1 get the filled input data
var input = uicontroller.getinput();
// console.log(input);

//if right input taken then only 
if(input.value!==isNaN(input.value) && input.description!=="" &&input.value>0){
//2 add item to budgetcontroller
var  newitems= budgetcontroller.additems(input.type,input.description,input.value);

// console.log(newitems.id);
// console.log(newitems.description);
// console.log(input.type);


//3.add item to userinterface
uicontroller.addlistitem(newitems,input.type);
//3.1 clear the fields
uicontroller.clearFields();

//calculate and update budget
updatebudget();
//delete item if 




}
    }
    var controlFucntiondelete = function(event){
        var itemId,splitId,type,ID;
         itemId = (event.target.parentNode.parentNode.parentNode.parentNode.id);
        //  console.log(itemId)
         if(itemId){
             splitId = itemId.split("-");
             type = splitId[0];
             ID = parseInt(splitId[1]);
             //1 delete item from datastructure
budgetcontroller.deleteitems(type,ID);
             //2 delete item from userinterface
uicontroller.deleteItem(itemId);
             //3 upadate and show new budget
             updatebudget();

         }
            }

return {
    init: function(){
        // console.log("running well");
 
        uicontroller.displaybudget({
            totalexpense :0,
            totalincome :0,
            budget:0,
            percentage:-1
        })
        setupeventlistner();
    }
}

})(budgetcontroller,uicontroller);

///initliaes
controlller.init();












































