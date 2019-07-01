window.addEventListener('load', function () {

  /* gallery slideshow */
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
    if (currentSlide == 0) {
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
  container.addEventListener('mouseover', function () {
    clearInterval(timer)
  });
  container.addEventListener('mouseout', function () {
    timer = setInterval(startSlideshow, 3000);
  });

  /*tab content*/
  let musicTab = document.querySelector('.tab');
  let tabcontent = document.getElementsByClassName("tabcontent");
  let tablinks = document.getElementsByClassName("tablinks");
  activeClass();


  function activeClass() {
    tabcontent[0].style.display = "block";
    tablinks[0].className += " active";
  }

  function openCity(cityName) {

    let i;

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
  }

  musicTab.addEventListener('click', function (event) {
    openCity(event.target.innerHTML);
    event.target.className += " active";
  })

})