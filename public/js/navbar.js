function newNavbarItem(text, url) {
  const itemLink = document.createElement('a');
  itemLink.className = 'item';
  itemLink.innerHTML = text;
  itemLink.href = url;

  return itemLink
}

function renderNavbar(user) {
  const navbarDiv = document.getElementsByClassName("ui stackable inverted teal menu");

  navbarDiv.appendChild(newNavbarItem('Home', '/'));

  if (user._id !== undefined) {
    navbarDiv.appendChild(newNavbarItem('Profile', '/u/profile?'+user._id));
    navbarDiv.appendChild(newNavbarItem('Logout', '/logout'));
  } else {
    navbarDiv.appendChild(newNavbarItem('Login', '/auth/google'));
  }
}
