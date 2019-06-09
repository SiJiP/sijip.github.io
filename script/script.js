  let burger = document.getElementById('burger');
  let closePopup = document.querySelector('.x');
  let loginPopBox = document.getElementById('login-popup');
  let logButton = document.getElementById('navbar-login-button');
  let links = document.getElementById("links");


  //event for hidden navbar
  burger.addEventListener('click', function () {

      if (links.style.display === "block") {
          links.classList.toggle('d-flex-ul');
          burger.classList.toggle("change");
      } else {
          burger.classList.toggle("change");
          links.classList.toggle('d-flex-ul');
      }
  });


  // events for login popup
  closePopup.addEventListener('click', (e)=>{
    loginPopBox.style.display = "none";
  })
  logButton.addEventListener('click', ()=>{
    loginPopBox.style.display = "block";
  })