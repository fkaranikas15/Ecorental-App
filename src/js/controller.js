'use strict';

//////////////////////
// IMPLEMENT NAVIGATION
//////////////////////

const nav = document.querySelector('.header__nav');
const navList = document.querySelector('.header__nav-list');
const footerNav = document.querySelector('.footer__nav');
const btnScrollTo = document.querySelectorAll('.btn--scroll-to');
const sectionForm = document.querySelector('#section--form');
const menuBtn = document.querySelector('.header__menu');

const toggleBtn = function () {
  document.querySelector('.header__icon--close').classList.toggle('open');
  document.querySelector('.header__icon--open').classList.toggle('close');
};

navList.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('smooth--scroll')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggleBtn();
    }
  } else if (e.target.classList.contains('header__nav-link')) {
    location.href = e.target.getAttribute('href');
  }
});

footerNav.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('footer__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

menuBtn.addEventListener('click', function () {
  nav.classList.toggle('open');
  toggleBtn();
});

btnScrollTo.forEach(btn => {
  btn.addEventListener('click', function (e) {
    sectionForm.scrollIntoView({ behavior: 'smooth' });
  });
});

//////////////////////
// IMPLEMENT PICKER BIKE
//////////////////////

const picker = function () {
  const border = document.querySelector('.border__models');
  const borderImg = document.querySelectorAll('.border__img');
  const price = document.querySelector('.border__price-price');
  const model = document.querySelector('.model');
  const year = document.querySelector('.year');
  const size = document.querySelector('.size');
  const wheels = document.querySelector('.wheels');
  const gear = document.querySelector('.gear');

  const bikes = {
    price: ['$4', '$5', '$3', '$2', '$5'],
    model: ['Street', 'Mountain', 'Electric', 'BMX', 'Racing'],
    year: ['2020', '2021', '2019', '2022', '2023'],
    size: ['Large', 'Large', 'Medium', 'Small', 'Large'],
    wheels: ['26', '26', '24', '16', '20'],
    gear: ['Multiple', 'Multiple', 'Single', 'Single', 'Multiple'],
  };

  border.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('border__btn')) {
      border.querySelectorAll('.border__btn').forEach(btn => {
        btn.classList.remove('active');
      });
      borderImg.forEach(img => {
        img.classList.remove('border__img--active');
      });
      e.target.classList.add('active');
      const id = e.target.getAttribute('data-number');
      borderImg[id].classList.add('border__img--active');
      price.textContent = bikes.price[id];
      model.textContent = bikes.model[id];
      year.textContent = bikes.year[id];
      size.textContent = bikes.size[id];
      wheels.textContent = bikes.wheels[id];
      gear.textContent = bikes.gear[id];
    }
  });
};

//////////////////////
// IMPLEMENT SLIDER
//////////////////////

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (curSlide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - curSlide) * 100}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click', nextSlide);
};

//////////////////////
// IMPLEMENT FAQ
//////////////////////

const faqBox = document.querySelectorAll('.faq__box');

faqBox.forEach(box => {
  box.addEventListener('click', function (e) {
    e.preventDefault();
    box.parentElement.classList.toggle('faq__active');
  });
});

//////////////////////
// IMPLEMENT MODAL
//////////////////////

const modal = function () {
  const formBtn = document.querySelector('.form__btn');
  const errorEl = document.querySelector('.error');
  const doneEl = document.querySelector('.book-done');
  const formInputs = document.querySelectorAll('.form__input');
  const modalEl = document.querySelector('.modal');
  const modalImg = document.querySelectorAll('.modal__img');
  const modalBtn = document.querySelector('.modal__btn');
  const modalCloseBtn = document.querySelector('.modal__close--btn');
  const modalInputs = document.querySelectorAll('.modal__form--input');
  const overlay = document.querySelector('.overlay');
  const nameEl = document.querySelector('.name');
  const pickDateEl = document.querySelector('.pick--date');
  const dropDateEl = document.querySelector('.drop--date');
  const pickLocationEl = document.querySelector('.pick--location');
  const dropLocationEl = document.querySelector('.drop--location');

  const toggleModal = function () {
    modalEl.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
  };

  formBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log(document.querySelector('.form__input').value);
    let count = 0;
    formInputs.forEach(input => {
      if (input.value === '') {
        count++;
      }
    });
    if (count > 0) {
      errorEl.style.display = 'block';
    } else {
      toggleModal();
      modalImg.forEach(img => {
        img.classList.remove('modal__img--active');
        if (img.classList.contains(`modal__img--${formInputs[0].value}`)) {
          img.classList.add('modal__img--active');
        }
      });
      nameEl.textContent = formInputs[0].value.toUpperCase();
      pickDateEl.textContent = formInputs[1].value;
      dropDateEl.textContent = formInputs[2].value;
      pickLocationEl.textContent = formInputs[3].value;
      dropLocationEl.textContent = formInputs[4].value;
    }
  });

  overlay.addEventListener('click', function () {
    toggleModal();
  });

  modalCloseBtn.addEventListener('click', function () {
    toggleModal();
  });

  modalBtn.addEventListener('click', function () {
    let count = 0;
    modalInputs.forEach(input => {
      if (input.value === '') {
        count++;
      }
    });
    if (count === 0) {
      errorEl.style.display = 'none';
      doneEl.style.display = 'block';
      toggleModal();
      modalInputs.forEach(input => {
        input.value = '';
      });
    }
  });
};

if (
  window.location.pathname === '/' ||
  window.location.pathname === '/index.html'
) {
  slider();
  picker();
  modal();
}
