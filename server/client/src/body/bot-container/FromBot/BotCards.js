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

const BotCards = ({ cards, hide, image }) => {
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
          loop={true}
          autoHeight={true}
          keyboard={{
            enabled: true,
          }}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: true,
          // }}
          pagination={{
            // el: ".swiper-pagination",
            // type: "bullets",
            clickable: true,
            // dynamicBullets: true,
          }}
          navigation
          scrollbar={{ draggable: true }}
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
