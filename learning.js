// var ans = (function (){
//     console.log("runnig")
// });
// console.log(typeof(ans));

var budgetcontroller = (function(){
    var x = 23;
    var add = function(a){
          return x+a;
    }
    return {
        publictest: function(b){
            return add(b);
        }
    }

})();
///////////interacting between modules///////////////
var controlller  = (function(controlbudget){

return{
    publicanother : function(b){
        return controlbudget.publictest(b);
    }
}

})(budgetcontroller)
var ans  = controlller.publicanother(23);
console.log(ans);
/////////////through controller we communicated with budgetcontroller////
// console.log(budgetcontroller.x); not work since x is indie an iffe
// console.log(budgetcontroller.publictest(27));