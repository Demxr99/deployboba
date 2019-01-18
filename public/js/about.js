function main() {
    // get('/api/whoami', {}, function(user){
    //   renderNavbar(user);
    // })
    renderNavbar({
      name        	: 'Anonymous',
      googleid     	: 'anonid',
      points   	    : 0,
      status        : 'Boba Apprentice',
      favStore      : 'None Added',
      favDrink      : 'None Added',
      badges        : [],
      storesVisited : [],
    });
  }

  main();