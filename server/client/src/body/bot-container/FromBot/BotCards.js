import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./bot-messages-type-style/cards.css";

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Keyboard,
} from "swiper/core";

// Import Swiper styles

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Keyboard]);

// install Swiper modules

const BotCards = ({ cards, hide, image, options }) => {
  console.log(options, "CARDS OPTIONS");
  const slides = [];
  for (let i = 0; i < cards.length; i++) {
    slides.push(
      <div className='swiper-container' key={i}>
        <SwiperSlide key={`slide-${i}`} tag='li'>
          <div className='item__img'>
            <img src={cards[i].image} alt='' />
            <p className='card-title'>{cards[i].title}</p>
            <p className='card-description'>{cards[i].description}</p>
            <div className='card__buttons'>
              {cards[i].actions &&
                cards[i].actions.map((action, index) => (
                  <button key={index} className='action-buttons'>
                    {action.title}
                  </button>
                ))}
            </div>
          </div>
        </SwiperSlide>
      </div>
    );
  }

  return (
    <div className='from-bot'>
      <div className='bot-icon-messages'>
        {!hide && <img className='message-icon' src={image} alt='logo' />}
      </div>
      <div className='wrapper'>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={options.loop ? options.loop : false}
          autoHeight={options.autoHeight ? options.autoHeight : false}
          keyboard={{
            enabled: options.keyboardChanging ? options.keyboardChanging : true,
          }}
          autoplay={
            options.autoplay
              ? {
                  delay: options.autoplay.delay ? options.autoplay.delay : 2500,
                  disableOnInteraction: options.autoplay.disableOnInteraction
                    ? options.autoplay.disableOnInteraction
                    : true,
                }
              : false
          }
          pagination={
            cards.length === 1
              ? false
              : {
                  // el: ".swiper-pagination",
                  // type: "bullets",
                  clickable: true,
                  // dynamicBullets: true,
                }
          }
          navigation={cards.length === 1 ? false : true}
          scrollbar={{
            draggable: options.scrollbarDraggable
              ? options.scrollbarDraggable
              : true,
          }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {slides}
        </Swiper>
      </div>
    </div>
  );
};

export default BotCards;
