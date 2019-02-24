let id ='';
$('#searchStudent').submit(function(event){
event.preventDefault();
id = $('#studentID').val();
let ln = $('#lastName').val();
let fn= $('#firstName').val();
console.log(`SID: ${id} fn: ${fn} ln: ${ln}`)
$('#results').empty();
$('#results').removeClass('hideSection')
queryHandle(id);
}); 

(#resultsArea').removeClass('hideSection')
//$('#results').empty();
//let ipAddress = $('#ip').val(); 
//queryHandle(ipAddress);

//end of Submit function

function queryHandle(id){
const url = `http://localhost:8080/api/${id}`;

fetch(url)
.then(response => response.json())  //transform data from GET into JSON format. 
.then(jsonData =>{//pivot to data. 
Object.entries(jsonData).forEach(item => { //iterate tru each object entrie and adds to the list of the html page. 
$('#results').append(`<li><strong>${item[0]}</strong>:  <font color="red">${item[1]}</font></li>`); // add data object to the HTML OL. 
}); //Object.entries section 
}); //Data pivot section
}; //query handle function