import Banner from "./Catalog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function CardSlider() {
  return <div>
    <Carousel>
      <CarouselContent>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>;
}
