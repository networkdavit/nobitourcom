document.addEventListener('DOMContentLoaded', () => {
	burgerInit('.burger', '.menu');

	// фишка чтобы подружить vh и размеры экранов мобилок
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

	const dateFields = document.querySelectorAll('.field-date');
	dateFields.forEach(dateField => dateField.addEventListener('click', () => {
		dateField.querySelector('.calendar').classList.toggle('active');
	}));

	const langBtn = document.querySelector('.lang__btn');
	const langList = document.querySelector('.lang__list');
	const langOverlay = document.querySelector('.lang-overlay');
	const langBtns = document.querySelectorAll('.lang__list_btn');

	langBtns.forEach(btn => btn.addEventListener('click', () => {
		langBtn.classList.remove('active');
			langList.classList.remove('active');
			langOverlay.classList.remove('active');
	}));

	langBtn.addEventListener('click', () => {
		if (langList.classList.contains('active')) {
			langBtn.classList.remove('active');
			langList.classList.remove('active');
			langOverlay.classList.remove('active');
		} else {
			langBtn.classList.add('active');
			langList.classList.add('active');
			langOverlay.classList.add('active');
		}
	});
	langOverlay.addEventListener('click', () => {
		document.querySelector('.lang__btn').classList.remove('active');
		langList.classList.remove('active');
		langOverlay.classList.remove('active');
	});

	new Swiper('.hero-swiper', {
		slidesPerView: 7,
		spaceBetween: 30,
		navigation: {
			prevEl: '.hero-btn-prev',
			nextEl: '.hero-btn-next',
		},
		pagination: {
			el: '.hero-pagination',
			clickable: true,
			bulletClass: 'hero-pagination-bullet',
			bulletActiveClass: 'hero-pagination-bullet-active',
		},
		breakpoints: {
			0: {
				slidesPerView: 'auto',
				spaceBetween: 40,
			},
			1024: {
				slidesPerView: 5,
				spaceBetween: 30,
			},
			1300: {
				slidesPerView: 7
			}
		}
	});

	if (document.querySelector('.partner-swiper')) {
		new Swiper('.partner-swiper', {
			slidesPerView: 9,
			spaceBetween: 30,
			navigation: {
				prevEl: '.partner-btn-prev',
				nextEl: '.partner-btn-next',
			},
			pagination: {
				el: '.partner-pagination',
				clickable: true,
				bulletClass: 'partner-pagination-bullet',
				bulletActiveClass: 'partner-pagination-bullet-active',
			},
			breakpoints: {
				0: {
					slidesPerView: 'auto'
				},
				1200: {
					slidesPerView: 7
				},
				1400: {
					slidesPerView: 9
				}
			}
		});
	}
	if (document.querySelector('.ex-swiper')) {
		const exThumbs = document.querySelectorAll('.ex__thumb');

		const exSwiper = new Swiper('.ex-swiper', {
			slidesPerView: 1,
			spaceBetween: 100,
			navigation: {
				prevEl: '.partner-btn-prev',
				nextEl: '.partner-btn-next',
			},
			on: {
				slideChange: function() {
					document.querySelector('.ex__thumb.active').classList.remove('active');
					exThumbs[this.activeIndex].classList.add('active');
				}
			}
		});


		exThumbs.forEach((thumb, i) => thumb.addEventListener('click', () => {
			exSwiper.slideTo(i);
		}));
	}
});

function burgerInit(burgerSel, contentSel, onClickEv = function() {}) {
    const burgers = document.querySelectorAll(burgerSel);
    const menu = document.querySelector(contentSel);

    burgers.forEach(burger => burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('body-block');
        document.querySelector('html').classList.toggle('body-block');

        onClickEv(burger, menu);
    }));

}