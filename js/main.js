var userImg = document.querySelector('img');
var inputImg = document.querySelector('.input-form-photo');
var myForm = document.querySelector('.myForm');
var entryUl = document.querySelector('.entry-container');
var deleteBtn = document.querySelector('.delete-btn');
var saveDiv = document.querySelector('.save');
var zeroEntryTxt = document.querySelector('.zero-entries');
var viewEntries = document.querySelector('.view-entries');
var createNewEntry = document.querySelector('.btn-new');
var goHome = document.querySelector('.jrnl-header');
var allViews = [document.querySelector('[data-view="entry-form"]'),
  document.querySelector('[data-view="entries"]')];
var formTitle = document.querySelector('.entry-txt');
var baseImage = 'images/placeholder-image-square.jpg';
var deleteModal = document.querySelector('.delete-modal');
var cancelBtn = deleteModal.querySelector('.cancel-btn');
var confirmBtn = deleteModal.querySelector('.confirm-btn');

toggleNoEntries();
viewSwap(data.view);

inputImg.addEventListener('input', function (event) {
  if (inputImg.value && inputImg.checkValidity()) {
    userImg.src = inputImg.value;
  } else {
    userImg.src = baseImage;
  }
});

myForm.addEventListener('submit', function (e) {
  e.preventDefault();

  var formSubmission = {
    title: myForm.elements.title.value,
    photoUrl: myForm.elements['photo-url'].value,
    userNotes: myForm.elements.notes.value,
    entryIdPosition: data.nextEntryId
  };
  data.nextEntryId++;

  if (data.editing === null) {
    data.entries.unshift(formSubmission);
    var addEntry = renderEntry(data.entries[0]);
    entryUl.insertBefore(addEntry, entryUl.firstChild);
  } else {
    formSubmission.entryIdPosition = data.editing.entryIdPosition;
    var editEntryIndex = data.entries.findIndex(entry => entry.entryIdPosition === formSubmission.entryIdPosition);
    data.entries[editEntryIndex] = formSubmission;
    var editedEntry = renderEntry(formSubmission);
    var entryList = entryUl.querySelector(`[data-entry-id="${formSubmission.entryIdPosition}"]`);
    entryList.parentNode.replaceChild(editedEntry, entryList);
    myForm.querySelector('.entry-txt').textContent = 'New Entry';
    data.editing = null;
  }

  userImg.src = baseImage;
  myForm.reset();
  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry) {
  var entryList = document.createElement('li');
  var imgDiv = document.createElement('div');
  var entryImg = document.createElement('img');
  var txtDiv = document.createElement('div');
  var entryTitle = document.createElement('h3');
  var entryTitleIcon = document.createElement('i');
  var entryNotes = document.createElement('p');
  var entryTitleTxt = document.createTextNode(entry.title);
  var entryNotesTxt = document.createTextNode(entry.userNotes);
  var dialogDiv = document.createElement('div');
  var dialog = document.createElement('dialog');
  var dialogTxt = document.createElement('p');
  var dialogBtnDiv = document.createElement('div');
  var btnOne = document.createElement('button');
  var btnTwo = document.createElement('button');
  var cancelBtnTxt = document.createTextNode('CANCEL');
  var confirmBtnTxt = document.createTextNode('CONFIRM');
  entryTitleIcon.setAttribute('class', 'fa fa-pencil');
  entryList.setAttribute('class', 'stored-entry');
  entryList.setAttribute('data-entry-id', entry.entryIdPosition);
  imgDiv.setAttribute('class', 'user-image column-half');
  entryImg.setAttribute('src', entry.photoUrl);
  entryImg.setAttribute('class', 'img');
  txtDiv.setAttribute('class', 'entry-text column-half');
  dialogDiv.setAttribute('class', 'dialog-div');
  dialog.setAttribute('class', 'delete-modal');
  dialogBtnDiv.setAttribute('class', 'dialog-btns');
  btnOne.setAttribute('type', 'button');
  btnOne.setAttribute('class', 'cancel-btn');
  btnTwo.setAttribute('type', 'button');
  btnOne.setAttribute('class', 'confirm-btn');
  entryTitle.appendChild(entryTitleTxt);
  entryTitle.appendChild(entryTitleIcon);

  entryNotes.appendChild(entryNotesTxt);

  imgDiv.appendChild(entryImg);
  entryList.appendChild(imgDiv);
  entryList.appendChild(txtDiv);
  txtDiv.appendChild(entryTitle);
  txtDiv.appendChild(entryNotes);

  dialogDiv.appendChild(dialog);
  dialog.appendChild(dialogTxt);
  dialog.appendChild(dialogBtnDiv);
  dialogBtnDiv.appendChild(btnOne);
  btnOne.appendChild(cancelBtnTxt);
  dialogBtnDiv.appendChild(btnTwo);
  btnTwo.appendChild(confirmBtnTxt);

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
  resetFormValues();
});

goHome.addEventListener('click', function () {
  viewSwap('entry-form');
  resetFormValues();
});

entryUl.addEventListener('click', function (event) {
  if (event.target.classList.contains('fa-pencil')) {
    var editEntry = event.target.parentElement.parentElement.parentElement.dataset.entryId;
    var editEntryIndex = data.entries.findIndex(entry => entry.entryIdPosition === Number(editEntry));
    data.editing = data.entries[editEntryIndex];
    populateEditForm(data.editing);
    viewSwap('entry-form');
  }
});

function populateEditForm() {
  var populateEditEntry = data.editing;
  myForm.elements.title.value = populateEditEntry.title;
  myForm.elements['photo-url'].value = populateEditEntry.photoUrl;
  userImg.src = populateEditEntry.photoUrl;
  myForm.elements.notes.value = populateEditEntry.userNotes;
  formTitle.textContent = 'Edit Entry';
  deleteBtn.classList.remove('hidden');
  saveDiv.style['justify-content'] = 'space-between';

}

function resetFormValues() {
  myForm.elements.title.value = '';
  myForm.elements['photo-url'].value = '';
  userImg.src = baseImage;
  myForm.elements.notes.value = '';
  formTitle.textContent = 'New Entry';
  deleteBtn.classList.add('hidden');
  saveDiv.style['justify-content'] = 'flex-end';
}

deleteBtn.addEventListener('click', function () {
  deleteModal.showModal();
  deleteModal.setAttribute('data-entry-id', data.editing.entryIdPosition);
});

cancelBtn.addEventListener('click', function () {
  deleteModal.close();
});

confirmBtn.addEventListener('click', function () {
  var deleteEntryId = deleteModal.getAttribute('data-entry-id');
  var deleteEntryIndex = data.entries.findIndex(entry => entry.entryIdPosition === deleteEntryId);
  data.entries.splice(deleteEntryIndex, 1);
  var removeEntry = entryUl.querySelector(`[data-entry-id="${deleteEntryId}"]`);
  removeEntry.remove();
  data.editing = null;
  deleteModal.close();
  toggleNoEntries();
  viewSwap('entries');

});
