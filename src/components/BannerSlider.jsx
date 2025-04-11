import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import React, { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'

  export default function BannerSlider() {
    const plugin = React.useRef(
        Autoplay({ delay: 6000, stopOnInteraction: false })
      )

    return <div className="flex justify-center items-center w-full h-fit bg-banner">
    <Carousel className="w-[100%] h-[100%]"
     plugins={[plugin.current]}
     onMouseEnter={plugin.current.stop}
     onMouseLeave={plugin.current.reset}
     >
        <CarouselContent>
            {/* Product 1 */}
            <CarouselItem className="flex flex-row justify-center md:justify-between items-center w-[100%]">
                <div className="flex flex-col md:w-1/3 px-6 py-8 lg:w-1/2 justify-center pl-12">
                    <h1 className="text-text mb-6 font-bold">Bangkok Legacy</h1>
                    <p className="text-text mb-6">
                        In the heart of Bangkok, Thanawat is pulled into the deadly world of the Thai mafia to protect his family.
                        As danger closes in, he must navigate betrayal, loyalty, and the blurred line between right and wrong.
                    </p>
                    <Button className="w-1/2 bg-buttonBlue font-semibold hover:cursor-pointer">Check out</Button>
                </div>
                <div className="hidden md:flex w-2/3 lg:w-1/2">
                    <img src="/src/assets/bangkoklegacy_banner.jpg" alt=""/>
                </div>
            </CarouselItem>

            {/* Product 2 */}
            <CarouselItem className="flex flex-row justify-between items-center w-[100%]">
                <div className="flex flex-col md:w-1/3 px-6 py-8 lg:w-1/2 justify-center pl-12">
                    <h1 className="text-text mb-6 font-bold">Food Striker</h1>
                    <p className="text-text mb-6">
                    In the high-stakes world of competitive cooking, young Shota sets out to become the world’s greatest chef.
                    Armed with his spoon and big dreams, he faces quirky rivals, learns life lessons, and discovers the true magic
                    of food and friendship.
                    </p>
                    <Button className="w-1/2 bg-buttonBlue font-semibold hover:cursor-pointer">Check out</Button>
                </div>
                <div className="hidden md:flex w-2/3 lg:w-1/2">
                    <img src="/src/assets/foodstriker_banner.jpg" alt=""/>
                </div>
            </CarouselItem>

            {/* Product 3 */}
            <CarouselItem className="flex flex-row justify-between items-center w-[100%]">
                <div className="flex flex-col md:w-1/3 px-6 py-8 lg:w-1/2 justify-center pl-12">
                    <h1 className="text-text mb-6 font-bold">Junior Software Developer 9</h1>
                    <p className="text-text mb-6">
                    Generation Thailand JSD9 follows a group of diverse Thais as they take on a tough coding bootcamp.
                    Amid struggles with imposter syndrome and industry pressure, they build lasting friendships and
                    discover their true potential.
                    </p>
                    <Button className="w-1/2 bg-buttonBlue font-semibold hover:cursor-pointer">Check out</Button>
                </div>
                <div className="hidden md:flex w-2/3 lg:w-1/2">
                    <img src="/src/assets/jsd_banner.jpg" alt=""/>
                </div>
            </CarouselItem>

        </CarouselContent>
    </Carousel>
  </div>;
  }
