import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CardSlider({name}) {
  return <div className="flex justify-end items-start w-[100%] h-[100%] px-6 py-8">

    <Carousel className="w-[100%] md:w-[95%] h-auto">
      <h1 className="text-text mb-2 font-semibold">{name}</h1>

      <CarouselContent className="ml-1 gap-4 w-70 md:w-90">

        <CarouselItem className="bg-box rounded-2xl">
          <div className="w-full flex flex-col justify-center items-center p-4 gap-2">
            <img src="/src/assets/jsd_4.jpg" alt=""
            className="w-[100%] rounded-2xl"/>
            <h3 className="text-text">Generation Thailand JSD9</h3>
          </div>
        </CarouselItem>

        <CarouselItem className="bg-box rounded-2xl">
          <div className="w-full flex flex-col justify-center items-center p-4 gap-2">
            <img src="/src/assets/foodstriker_4.jpg" alt=""
            className="w-[100%] rounded-2xl"/>
            <h3 className="text-text">Food Striker</h3>
          </div>
        </CarouselItem>

        <CarouselItem className="bg-box rounded-2xl">
          <div className="w-full flex flex-col justify-center items-center p-4 gap-2">
            <img src="/src/assets/hikarilove.jpg" alt=""
            className="w-[100%] rounded-2xl"/>
            <h3 className="text-text">Hikari Love</h3>
          </div>
        </CarouselItem>

        <CarouselItem className="bg-box rounded-2xl">
          <div className="w-full flex flex-col justify-center items-center p-4 gap-2">
            <img src="/src/assets/katanaway.jpg" alt=""
            className="w-[100%] rounded-2xl"/>
            <h3 className="text-text">Katanaway</h3>
          </div>
        </CarouselItem>

        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">2</CarouselItem>
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">3</CarouselItem>
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">4</CarouselItem>
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">5</CarouselItem>
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">6</CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  </div>
}
