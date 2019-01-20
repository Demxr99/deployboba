function main() {
  get('/api/whoami', {}).then(function(user) {
    console.log(user);
    renderNavbar(user);
    renderSearch();
  });
}

function renderSearch() {
  const searchbtn = document.getElementById("search-btn");
  searchbtn.addEventListener('click', runSearch);
}

function runSearch() {
  const searchContent = document.getElementById('search-content');
  //add searchContent.innerText in the params for the get
  //document.cookie="search=true";
  document.cookie="search-content= "+searchContent.value;
  /*get('/api/locations', {'name': searchContent.value}).then(locations => {
    console.log(locations);
    //console.log("hello");
    window.location.href="/map";
  });
  */
  //console.log("hello");
  window.location.href="/map";
  searchContent.innerText='';
}

main();
