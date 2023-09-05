import { Swiper as SwiperComponent } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper } from "swiper/types";

export default function SwiperSlider({
  items,
  ...props
}: {
  props?: Swiper;
  items: any;
}) {
  return (
    <SwiperComponent
      loop={false}
      effect="slide"
      className="mySwiper"
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Navigation]}
      {...props}
    >
      {items}
    </SwiperComponent>
  );
}
