const nav = document.querySelector('.nav');
const navToggleButton = document.querySelector('.nav__toggle-button');

navToggleButton.addEventListener('click', () => {
  console.log(nav.classList);
  Array.from(nav.classList).includes('nav--active')
    ? nav.classList.remove('nav--active')
    : nav.classList.add('nav--active');
});
