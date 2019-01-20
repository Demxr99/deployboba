function newNavbarItem(text, url) {
  const itemLink = document.createElement('a');
  itemLink.className = 'item';
  itemLink.innerHTML = text;
  itemLink.href = url;

  return itemLink
}

function renderNavbar(user) {
  const navbarDiv = document.getElementById("navbar");

  const logo = document.createElement('div');
  logo.className = 'ui item';
  logo.innerHTML = 'LOGO';

  navbarDiv.appendChild(logo);
  const brand = document.createElement('a');
  brand.className = 'header item';
  brand.id = "brand"
  brand.innerHTML = 'BOBA RUN';
  brand.href = '/';

  navbarDiv.appendChild(brand);

  navbarDiv.appendChild(newNavbarItem('About', '/about'));
  navbarDiv.appendChild(newNavbarItem('Maps', '/map'));

  if (user !== undefined && user.googleid !== undefined) {
    navbarDiv.appendChild(newNavbarItem('Profile', '/u/profile?'+user._id));
    //navbarDiv.appendChild(newNavbarItem('Add Store/Event', '/add-store-event'));
  }
  navbarDiv.appendChild(navbarRightMenu(user));
}

function navbarRightMenu(user) {
  console.log('creating');
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
  //rightMenu.appendChild(search);

  //login or logout depending on whether the user logged in
  if (user !== undefined && user.googleid !== undefined) {
    console.log('here');
    rightMenu.appendChild(newNavbarItem('Logout', '/logout'));
  } else {
    rightMenu.appendChild(newNavbarItem('Login', '/auth/google'));
  }

  return rightMenu;
}
