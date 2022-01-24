'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrole = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SELECTION

const header = document.querySelector('.header');
const section = document.querySelectorAll('.section');

document.getElementById('section--1');
const allBtn = document.getElementsByTagName('button');

document.getElementsByClassName('btn');

// insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML =
//   'We use cookies, like everybody! <button class="btn btn--close-cookie">Got it</button>';
// header.append(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// message.style.width = '120%';

btnScrole.addEventListener('click', function (e) {
  const s1coord = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coord.left + window.pageXOffset,
    top: s1coord.top + window.pageYOffset,
    behavior: 'smooth',
  });
  //new variation
  // section1.scrollIntoView({behavior: "smooth"})
});

//NAV old
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//NAV NEW Bubbling(more efficient)

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});
//sticky COOKIES
// const initialCords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCords.top) {
//     message.classList.add('stickym');
//   } else message.classList.remove('stickym');
// });

const stickyNav = function (e) {
  const [entry] = e;
  const navHight = nav.getBoundingClientRect().height;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headObs.observe(header);

const allSections = document.querySelectorAll('.section');
const revialSections = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revialSections, {
  root: null,
  threshold: 0.2,
});
allSections.forEach(function (e) {
  sectionObserver.observe(e);
  e.classList.add('section--hidden');
});
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgTaregets = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-150px',
});
imgTaregets.forEach(img => imgObserver.observe(img));

//slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let current = 0;
const maxSlide = slides.length;
const dotContainer = document.querySelector('.dots');

const dotsCreate = function () {
  slides.forEach(function (s, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot dots__dot--active" data-slide="${index}"></button>`
    );
  });
};
dotsCreate();
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goTo = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${100 * (index - slide)}%)`)
  );
};
goTo(0);
activateDot(0);
const nextSlide = function () {
  if (current === maxSlide - 1) current = 0;
  else {
    current++;
  }
  goTo(current);
  activateDot(current);
};
const prevSlide = function () {
  if (current === 0) current = maxSlide - 1;
  else {
    current--;
  }
  goTo(current);
  activateDot(current);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  else {
    nextSlide();
  }
});
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goTo(slide);
    activateDot(slide);
  }
});
////// ??? ////////
