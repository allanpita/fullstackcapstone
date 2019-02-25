let id ='';
$('#searchStudent').submit(function(event){
event.preventDefault();
id = $('#studentID').val();
let ln = $('#lastName').val();
let fn= $('#firstName').val();
console.log(`SID: ${id} fn: ${fn} ln: ${ln}`)
$('#results').removeClass('hideContent');
$('#results ul').empty();
queryHandle(id);
}); 

//end of Submit function




function queryHandle(id){
const url = `https://peaceful-thicket-95451.herokuapp.com/api/${id}`;
fetch(url)
.then(response => response.json())  //transform data from GET into JSON format. 
.then(jsonData =>{                  //pivot to data.
Object.entries(jsonData).forEach(item =>{
  let mainString = `${item[0]['firstname']}`;
  console.log(mainString)
}) 
Object.entries(jsonData.curriculum).forEach(sitem => {
  console.log(sitem[1].class); 
//$('#results ul').append(`<li>${item[1]}</li>`);
})
})
}
