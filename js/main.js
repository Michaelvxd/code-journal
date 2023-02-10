var userImg = document.querySelector('img');
var inputImg = document.querySelector('.input-form-photo');
var myForm = document.querySelector('.myForm');
var entryUl = document.querySelector('.entry-container');
var zeroEntryTxt = document.querySelector('.zero-entries');
var viewEntries = document.querySelector('.view-entries');
var createNewEntry = document.querySelector('.btn-new');
var goHome = document.querySelector('.jrnl-header');
var allViews = [document.querySelector('[data-view="entry-form"]'),
  document.querySelector('[data-view="entries"]')];

toggleNoEntries();
viewSwap(data.view);

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
  var addEntry = renderEntry(data.entries[0]);
  entryUl.insertBefore(addEntry, entryUl.firstChild);
  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry) {
  var entryList = document.createElement('li');
  var imgDiv = document.createElement('div');
  var entryImg = document.createElement('img');
  var txtDiv = document.createElement('div');
  var entryTitle = document.createElement('h3');
  var entryNotes = document.createElement('p');
  var entryTitleTxt = document.createTextNode(entry.title);
  var entryNotesTxt = document.createTextNode(entry.userNotes);

  imgDiv.setAttribute('class', 'user-image column-half');
  entryImg.setAttribute('src', entry.photoUrl);
  entryList.setAttribute('class', 'stored-entry');
  entryImg.setAttribute('class', 'img');
  txtDiv.setAttribute('class', 'entry-text column-half');
  entryTitle.appendChild(entryTitleTxt);
  entryNotes.appendChild(entryNotesTxt);

  imgDiv.appendChild(entryImg);
  entryList.appendChild(imgDiv);
  entryList.appendChild(txtDiv);
  txtDiv.appendChild(entryTitle);
  txtDiv.appendChild(entryNotes);

  return entryList;
}

document.addEventListener('DOMContentLoaded', function (entry) {
  for (let i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntry(data.entries[i]);
    entryUl.appendChild(newEntry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});

function toggleNoEntries() {
  if (data.entries.length) {
    zeroEntryTxt.classList.add('hidden');
    entryUl.classList.remove('hidden');
  } else {
    zeroEntryTxt.classList.remove('hidden');
    entryUl.classList.add('hidden');
  }
}

function viewSwap(targetView) {
  allViews.forEach(view => {
    if (view.getAttribute('data-view') === targetView) {
      view.classList.remove('hidden');
    } else {
      view.classList.add('hidden');
    }
  });
  data.view = targetView;
}

viewEntries.addEventListener('click', function () {
  viewSwap('entries');
});

createNewEntry.addEventListener('click', function () {
  viewSwap('entry-form');
});

goHome.addEventListener('click', function () {
  viewSwap('entry-form');
});
