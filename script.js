const dropdownMenus = [...document.querySelectorAll('.dropdown-container')];

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
