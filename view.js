function create_nav(current, before) {
  var s =`
  <a class="navbar-brand" >
    <img src="https://www.clipartmax.com/png/middle/320-3207864_clip-art-royalty-free-icon-school-education-icons-canteen-icon-png.png" width="45" height="45" alt="" loading="lazy">
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">

      <li class="nav-item active">
        <a class="nav-link">Home <span class="sr-only">(current)</span></a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/history">history</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/profile">profile</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/">logout</a>
      </li>

    </ul>

    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button type="button" class="btn btn-outline-primary">search</button>
    </form>

  </div>`
  
  console.log("hello world", before, current);
  var nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg navbar-light bg-light";
  nav.innerHTML=s;
  var before_ele = document.getElementById(before);
  console.log(nav, before_ele);
  document.body.insertBefore(nav, before_ele);
}