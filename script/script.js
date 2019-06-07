  let burger = document.getElementById('burger');
  let logClose = document.querySelector('.x');
  let loginPop = document.getElementById('login-popup');
  let logTop = document.getElementById('log-in-button');
  burger.addEventListener('click', function () {
      let links = document.getElementById("links");
      if (links.style.display === "block") {
          links.style.display = "none";
          burger.classList.toggle("change");
      } else {
          burger.classList.toggle("change");
          links.style.display = "block";
      }
  });

  logClose.addEventListener('click', (e)=>{
      loginPop.style.display = "none";
  })
  logTop.addEventListener('click', ()=>{
    loginPop.style.display = "block";
  })