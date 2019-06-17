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
  });


  /* gallery slideshow */
  (function () {
    var slides = document.querySelectorAll('.gallery-slides');
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    var container = document.querySelector('.gallery-container');
    var currentSlide = 0;
    var timer;

    startSlideshow();
    timer = setInterval(startSlideshow, 3000);

    function startSlideshow() {
      slides[currentSlide].className = 'gallery-slides ';
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].className = 'gallery-show fade';
    }


    prev.addEventListener('click', function () {
      slides[currentSlide].className = 'gallery-slides ';
      if(currentSlide == 0) {
        currentSlide = slides.length;
      }
      currentSlide = (currentSlide - 1) % slides.length;
      slides[currentSlide].className = 'gallery-show fade';

    });

    next.addEventListener('click', function () {
      slides[currentSlide].className = 'gallery-slides ';
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].className = 'gallery-show fade';
    });
    
    /* stop slideshow when mouseover*/
    container.addEventListener('mouseover', function(){
      clearInterval(timer)
    });
    container.addEventListener('mouseout', function(){
      timer = setInterval(startSlideshow, 3000);
    });
  })();
