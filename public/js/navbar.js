function newNavbarItem(text, url) {
  const itemLink = document.createElement('a');
  itemLink.className = 'ui item';
  itemLink.innerHTML = text;
  itemLink.href = url;

  return itemLink
}

function renderNavbar(user) {
  const navbarDiv = document.getElementById("navbar");

  navbarDiv.appendChild(newNavbarItem('About', '/about-us'));
  navbarDiv.appendChild(newNavbarItem('Maps', '/map'));

  if (typeof(user) !== 'undefined' && user._id !== undefined) {
    navbarDiv.appendChild(newNavbarItem('Profile', '/u/profile?'+user._id));
    navbarDiv.appendChild(newNavbarItem('Add Store/Event', '/add-store-event'));
  }
  navbarDiv.appendChild(navbarRightMenu());
}

function navbarRightMenu() {
  const rightMenu = document.createElement('div');
  rightMenu.className = "right menu";

  //create search bar in navbar
  const search = document.createElement('div');
  search.className = 'item';
  
  const searchBar = document.createElement('div');
  searchBar.className = 'ui icon input';
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search...'
  const i = document.createElement('i');
  i.className = 'search link icon'
  searchBar.appendChild(input);
  searchBar.appendChild(i);
  search.append(searchBar);
  rightMenu.appendChild(search);

  //login or logout depending on whether the user logged in
  if (typeof(user) !== 'undefined' && user._id !== undefined) {
    rightMenu.appendChild(newNavbarItem('Logout', '/logout'));
  } else {
    rightMenu.appendChild(newNavbarItem('Login', '/auth/google'));
  }

  return rightMenu;
}
