var userImg = document.querySelector('img');
var inputImg = document.querySelector('.input-form-photo');
var myForm = document.querySelector('.myForm');

inputImg.addEventListener('input', function (event) {
  if (inputImg.value && inputImg.checkValidity()) {
    userImg.src = inputImg.value;
  } else {
    userImg.src = 'images/placeholder-image-square.jpg';
  }
});

myForm.addEventListener('submit', function (e) {
  e.preventDefault();

  var formSubmission = {};

  formSubmission.title = myForm.elements.title.value;
  formSubmission.photoUrl = myForm.elements['photo-url'].value;
  formSubmission.userNotes = myForm.elements.notes.value;
  formSubmission.EntryId = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(formSubmission);

  userImg.src = 'images/placeholder-image-square.jpg';
  myForm.reset();
});
