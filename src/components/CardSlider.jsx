import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function CardSlider({name}) {
  return <div className="flex justify-end items-start w-[100%] h-[100%] mb-6">
    <Carousel className="w-[100%] md:w-[90%] h-auto">
      <h1 className="text-text mb-2">{name}</h1>
      <CarouselContent className="w-80 h-100 md:w-160 md:h-100 gap-6">
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">1</CarouselItem>
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">2</CarouselItem>
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">3</CarouselItem>
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">4</CarouselItem>
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">5</CarouselItem>
        <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">6</CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  </div>;
}
