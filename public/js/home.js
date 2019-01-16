function main() {
  renderSearch();
}

function renderSearch() {
  const searchbtn = document.getElementById("search-btn");
  searchbtn.addEventListener('click', runSearch);
}

function runSearch() {
  const searchContent = document.getElementById('search-content');
  //add searchContent.innerText in the params for the get
  get('/api/locations', {}, function() {
    console.log("hello");
    window.location.href="../../src/views/maps.html";
    //post new locations on the maps page
  });
  searchContent.innerText='';
}

main();
