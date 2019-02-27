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


function queryHandle(id){
const url = `https://peaceful-thicket-95451.herokuapp.com/api/${id}`;
fetch(url)
.then(response => response.json())  //transform data from GET into JSON format. 
.then(jsonData =>{                  //pivot to data.
Object.entries(jsonData).forEach(sitem => {
let infoData = (JSON.stringify(sitem[1],['_id','firstname','lastname','age'],1)).split(",");
let curriculumData = (JSON.stringify(sitem[1].curriculum,['class','GPA}','absences',],1)).split(",");
organizer(infoData);
organizer(curriculumData);

})
})
}

let organizer = (data => {
data.forEach(item =>{
  item = item.replace(/[\[\]\{\}]/g, "");
console.log(item)
$('#results ul').append(`<li>${item}</li>`);
})
});
