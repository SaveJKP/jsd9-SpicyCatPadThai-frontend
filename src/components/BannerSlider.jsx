import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

  export default function BannerSlider() {
    return <div className="flex justify-center items-center w-full h-fit bg-banner">
    <Carousel className="w-[100%] h-[100%]">
        <CarouselContent>
            <CarouselItem className="flex flex-row justify-between items-center w-[100%]">
                <div className="flex flex-col md:w-1/3 px-6 py-8 lg:w-1/2">
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
            <CarouselItem>2</CarouselItem>
            <CarouselItem>3</CarouselItem>
        </CarouselContent>
       {/*  <CarouselPrevious />
        <CarouselNext /> */}
    </Carousel>
  </div>;
  }
