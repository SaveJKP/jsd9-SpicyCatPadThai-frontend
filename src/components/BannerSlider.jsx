import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function BannerSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  );

  const bannerItems = [
    {
      id: 1,
      title: "Enjoy 10% OFF with our Katsu Selection!",
      banner: "/promotion_banner_1.jpg",
      description:
        "Discover handpicked books specially curated by our team just for you. Whether you're into fiction, self-help, or inspiration, the Katsu Selection offers something special at an exclusive 10% discount. Don't miss out — this offer is available for a limited time only!",
    },
    {
      id: 2,
      title: "Food Striker",
      banner: "/foodstriker_banner.jpg",
      description:
        "In the high-stakes world of competitive cooking, young Shota sets out to become the world’s greatest chef. Armed with his spoon and big dreams, he faces quirky rivals, learns life lessons, and discovers the true magic of food and friendship.",
    },
    {
      id: 3,
      title: "Junior Software Developer 9",
      banner: "/jsd_banner.jpg",
      description:
        "Generation Thailand JSD9 follows a group of diverse Thais as they take on a tough coding bootcamp. Amid struggles with imposter syndrome and industry pressure, they build lasting friendships and discover their true potential.",
    },
  ];

  return (
    <div className="bg-banner flex h-fit w-full items-center justify-center">
      <Carousel
        className="h-[100%] w-[100%]"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {bannerItems.map((item) => {
            return (
              <CarouselItem
                className="flex w-[100%] flex-row items-center justify-center md:justify-between"
                key={item.id}
              >
                <div className="relative z-10 flex flex-col justify-center px-6 py-8 pl-12 md:w-1/3 lg:w-1/2">
                  <h1 className="text-text mb-6 font-bold">{item.title}</h1>
                  <p className="text-text mb-6">{item.description}</p>
                  <Button className="bg-buttonBlue w-1/2 font-semibold hover:cursor-pointer">
                    Check out
                  </Button>
                </div>
                <div className="absolute z-0 w-full md:relative md:flex md:w-2/3 lg:w-1/2">
                  <img
                    src={item.banner}
                    alt={item.title}
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-65 md:hidden"></div>
                </div>
              </CarouselItem>
            );
          })}
          ;
        </CarouselContent>
      </Carousel>
    </div>
  );
}
