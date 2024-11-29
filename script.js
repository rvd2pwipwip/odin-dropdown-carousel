const dropdownMenus = [...document.querySelectorAll('.dropdown-container')];

if (dropdownMenus) {
  dropdownMenus.forEach((dropdownContainer) => {
    const dropdownBtn = dropdownContainer.querySelector('#btn');
    const dropdownMenu = dropdownContainer.querySelector('#dropdown');
    const toggleArrow = dropdownContainer.querySelector('#arrow');

    // Toggle the show class on the dropdown element and rotate the dropdown arrow when the button is clicked.
    const toggleDropdown = () => {
      dropdownMenu.classList.toggle('show');
      toggleArrow.classList.toggle('arrow');
    };

    dropdownBtn.addEventListener('click', function (e) {
      e.stopPropagation();

      // Hide all dropdown menus
      dropdownMenus.forEach((container) => {
        const menu = container.querySelector('.dropdown');
        const arrow = container.querySelector('.arrow');
        if (menu !== dropdownMenu && menu.classList.contains('show')) {
          menu.classList.remove('show');
          arrow.classList.remove('arrow');
        }
      });

      // Toggle the clicked dropdown menu
      toggleDropdown();
    });

    // Add event listener to close the dropdown when users click outside
    document.addEventListener('click', (e) => {
      const rect = dropdownMenu.getBoundingClientRect();
      const isInDropdown =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInDropdown && dropdownMenu.classList.contains('show')) {
        toggleDropdown();
      }
    });

    // Add click event listener to dropdown parent for event delegation
    dropdownMenu.addEventListener('click', (e) => {
      const targetItem = e.target.closest('a');
      if (targetItem && dropdownMenu.classList.contains('show')) {
        toggleDropdown();
      }
    });
  });
}

const track = document.querySelector('.carousel__track');
const slides = [...track.children];
const previousButton = document.querySelector('.carousel__button--previous');
const nextButton = document.querySelector('.carousel__button--next');
const carouselNav = document.querySelector('.carousel__nav');
const navDots = [...carouselNav.children];

// calculate slideview width to move from slide to slide
const slideWidth = slides[0].getBoundingClientRect().width;
// position slides next to one another
const setSlidePositions = (slides, slideWidth) => {
  slides.forEach((slide, index) => {
    slide.style.left = `${index * slideWidth}px`;
  });
};
setSlidePositions(slides, slideWidth);

const moveToSlide = (track, currentSlide, targetSlide) => {
  currentSlide = track.querySelector('.current-slide');
  currentSlide.classList.toggle('current-slide');
  targetSlide.classList.toggle('current-slide');

  const offset = targetSlide.style.left;
  track.style.transform = `translateX(-${offset})`;
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.toggle('current-slide');
  targetDot.classList.toggle('current-slide');
};

const hideShowArrows = (targetIndex) => {
  if (targetIndex === 0) {
    previousButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
  } else if (targetIndex === slides.length - 1) {
    previousButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
  } else {
    previousButton.classList.remove('hidden');
    nextButton.classList.remove('hidden');
  }
};
// click previous to display previous slide
previousButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  const previousSlide = currentSlide.previousElementSibling;
  const currentDot = carouselNav.querySelector('.current-slide');
  const previousDot = currentDot.previousElementSibling;

  moveToSlide(track, currentSlide, previousSlide);
  updateDots(currentDot, previousDot);
  hideShowArrows(slides.indexOf(previousSlide));
});
// click next to display next slide
nextButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = carouselNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides.indexOf(nextSlide));
});
// click nav indicator to display corresponding slide
carouselNav.addEventListener('click', (e) => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;
  const currentDot = carouselNav.querySelector('.current-slide');
  const currentSlide = track.querySelector('.current-slide');
  const targetIndex = navDots.indexOf(targetDot);
  const targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(targetIndex);
});
