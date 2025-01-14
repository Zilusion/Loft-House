// Nav 
const navButton = document.querySelector('.nav-button');
const nav = document.querySelector('.header__top');

let isMenuOpen = false;

navButton.onclick = function () {
    navButton.classList.add('nav-button--disabled');

    if (isMenuOpen) {
        nav.classList.add('header__top--closing');

        setTimeout(() => {
            nav.classList.remove('header__top--mobile');
            nav.classList.remove('header__top--closing');
            document.body.classList.remove('no-scroll');
            navButton.classList.remove('nav-button--disabled');
        }, 850);
    } else {
        nav.classList.add('header__top--mobile');
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            navButton.classList.remove('nav-button--disabled');
        }, 850);
    }
    isMenuOpen = !isMenuOpen;
    navButton.classList.toggle('nav-button--active');
};

window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;
    const isMobileView = screenWidth <= 1024;

    if (!isMobileView && isMenuOpen) {
        navButton.classList.add('nav-button--disabled');
        nav.classList.add('header__top--closing');
        setTimeout(() => {
            nav.classList.remove('header__top--mobile');
            nav.classList.remove('header__top--closing');
            document.body.classList.remove('no-scroll');
            navButton.classList.remove('nav-button--active');
            isMenuOpen = false;
            navButton.classList.remove('nav-button--disabled');
        }, 850);
    }
});

// Phone mask
mask('[data-tel-input]');

// Удаляем '+' если больше ничего не введено, чтобы показать placeholder
const phoneInputs = document.querySelectorAll('[data-tel-input]');
phoneInputs.forEach((input)=>{
	input.addEventListener('input', ()=>{
		if (input.value == '+') input.value = '';
	})
	input.addEventListener('blur', ()=>{
		if (input.value == '+') input.value = '';
	})
});

// Yandex Map

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
	// Создание карты.
	var map = new ymaps.Map('map', {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [59.943543, 30.338928],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 16,
	});

    var myPlacemark = new ymaps.Placemark(
        [59.943543, 30.338928],
        {
            balloonContent: 
            `
				<div class="balloon">
					<div class="balloon__address">Наб. реки Фонтанки 10-15</div>
					<div class="balloon__contacts">
						<a href="tel:+78121234567">+8 (812) 123-45-67</a>
					</div>
				</div>
			`
        },
        {
            iconLayout: 'default#image',
            iconImageHref: '../images/blocks/map/location-pin.svg',
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40]
        }
    );

	map.controls.remove('geolocationControl'); // удаляем геолокацию
	map.controls.remove('searchControl'); // удаляем поиск
	map.controls.remove('trafficControl'); // удаляем контроль трафика
	map.controls.remove('typeSelector'); // удаляем тип

	// map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	// map.controls.remove('zoomControl'); // удаляем контрол зуммирования
	map.controls.remove('rulerControl'); // удаляем контрол правил
	map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

	map.geoObjects.add(myPlacemark);
    myPlacemark.balloon.open();

}