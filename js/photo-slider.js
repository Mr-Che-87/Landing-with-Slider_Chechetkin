
/* сюда загружаем фотки и подписи - массив объектов*/
let images = [{
    url: "img/projects_photo_admiral.jpg",
    title: "ЖК АДМИРАЛ, Ростов-на-Дону"
  }, {
    url: "img/projects_photo_patriot.jpg",
    title: "ЖК ПОЛЯНА, Сочи"
  }, {
    url: "img/projects_photo_polyana.jpg",
    title: "ЖК ПАТРИОТ, Ростов-на-Дону"
  }
];



/* ==общая огромная функция, инициализирующая слайдер== */
function initSlider(options) {
  if (!images || !images.length) return;
  

  /*дефолтные настройки опций на всяк случай (объясняется на 1:20 в вебинаре). но и ибез этого всё работает*/
  options = options || {  
    titles: false, 
    dots: true,
    autoplay: false,
    
    
  };   
  


/* ищем родительское дивы для картинок/стрелок/точек*/
  let sliderImages = document.querySelector(".slider__images");
  
  let sliderArrows = document.querySelector(".projects__total");

  let sliderDots = document.querySelector(".slider__dots"); 
  
  let sliderLinks = document.querySelectorAll(".slider__newTitle")

  let sliderInfo = document.querySelectorAll(".projects__info")

  


/*далее вызываем функции (будут расписаны позже)
можно было бы вызвать их и в самом конце, но так нагляднее*/
  initImages();
  initArrows();

  changeTitle(0);
  initEventOnLinks();

  changeInfo(0);




  
/* if - т.к. включены опции - работают потому что лишь в случае, если это нужно*/  
if (options.dots) {     initDots();   }
/*if (options.titles) {    initTitles();   } - если это включить, то не будет работать автоперемотка?*/
if (options.autoplay) {    initAutoplay();  }
  


/* далее расписываем функции: */
//ДЛЯ КАРТИНОК
  function initImages() {    
    images.forEach((image, index) => {  
      let imageDiv = `<img class="image n${index} ${index === 0? "active" : ""}" src="${images[index].url}" data-index="${index}" alt="object_photo">`
            /* это поменял
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;  */
      sliderImages.innerHTML += imageDiv;  
    });
  }

  

  //ДЛЯ СТРЕЛОЧЕК
  function initArrows() {   
   sliderArrows.querySelectorAll(".changePhoto").forEach(arrow => {
      arrow.addEventListener("click", function() {  
        
        let curNumber = +sliderImages.querySelector(".active").dataset.index; 
        let nextNumber;  
       
          if (arrow.classList.contains("left")) {   
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {    
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);   
      });
    });
  }


 

  //ДЛЯ ТОЧЕК
  function initDots() {    
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });   
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() { 
        moveSlider(this.dataset.index);   
      })
    })
  }





  // ФУНКЦИЯ ПЕРЕМОТКИ ИМЕННО ФОТОК
  function moveSlider(num) {   
    
 sliderImages.querySelector(".active").classList.remove("active");  
    sliderImages.querySelector(".n" + num).classList.add("active");
    
  
    
    
    if (options.dots) {  
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);

    changeInfo(num);

  }
  



//ДЛЯ ПОДПИСЕЙ
function initEventOnLinks(){
  sliderLinks.forEach((link, index) => {
    link.addEventListener("click", function() { 
      moveSlider(index);   
    })
  })
}
 
/* + смена подписи вместе со сменой картинки*/
  function changeTitle(num) {
    document.querySelector('.slider__newTitle.active')?.classList.remove('active');    sliderLinks[num].classList.add('active')
  }


  
//ДЛЯ INFO - толькл  смена подписи вместе со сменой картинки
  function changeInfo(num) {
    document.querySelector('.projects__info.active')?.classList.remove('active');    sliderInfo[num].classList.add('active')
  }
  









  
/*функция сокращения названия, если не влезает в экран (бонус)   
  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }
  */
  




  // ДЛЯ АВТОПЕРЕМОТКИ
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;  
      moveSlider(nextNumber);
    }, options.autoplayInterval);  
  }
}  /*==конец огромной функции==*/






let sliderOptions = {   /*объект со свойствами, которые включают/выключают опции - точки, автопроигрывание, подписи и тп*/
  dots: true,
  titles: true, /*хоть titles  и выкл, без этого не работает цвет active на newTitles*/
  autoplay: false,
  autoplayInterval: 7000,
  
};



document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});  /*как я понял, чтобы всё это в целом загрузилось*/


/* ОБРАТНАЯ СВЯЗЬ ОТ МЕНТОРА:
 Да и правда "гениально" решили вопрос переключения информации. На самом деле так не очень хорошо делать. Тем более у вас 3 прям очень больших одинаковых блока в вёрстке. Так же у Вас дважды перебирается один и тот же объект images. Это все можно сделать в одном цикле. Например в initImages цикл, а в этом цикле вызывается initDots, передавая в него index. В реакте с реактивностью будет проще такое реализовывать.
 */