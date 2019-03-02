$('nav li a').click((event)=>{
$('article').addClass('hideContent');
let navSelection = event.currentTarget.firstChild.data;
let navPage = event.currentTarget.attributes.href.nodeValue;
console.log(`${navSelection} was pressed. Navigating to ${navPage}`)
$(navPage).removeClass('hideContent');
 
if (navSelection == 'Add Student'){
  $('#addStudent .studentInfo').empty();
  $('#addStudent .curriculum').empty();
  $(studentInfo).appendTo('#addStudent .studentInfo');
  $(studentCur).appendTo('#addStudent .curriculum');
}else if (navSelection == 'Edit Student'){
  $('#editStudent .curriculum').empty();
  $(studentCur).appendTo('#editStudent .curriculum');
}
}); 
