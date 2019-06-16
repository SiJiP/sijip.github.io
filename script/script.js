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
  closePopup.addEventListener('click', (e) => {
    loginPopBox.style.display = "none";
  })
  logButton.addEventListener('click', () => {
    loginPopBox.style.display = "block";
  })


  /* gallery slideshow */

  var slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function nextSlides(n) {
    var i;
    var slides = document.getElementsByClassName("gallery-slides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }


function showSlides() {
  var i;
  var slides = document.getElementsByClassName("gallery-slides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
} 

///////////////////


(function(){



})());