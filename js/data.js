/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function () {
  localStorage.setItem('data', JSON.stringify(data));
});

if (localStorage.getItem('data')) {
  data = JSON.parse(localStorage.getItem('data'));
}
