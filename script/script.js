  let burger = document.getElementById('burger');

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