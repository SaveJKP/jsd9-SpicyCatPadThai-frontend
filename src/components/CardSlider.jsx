import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BookCard } from "./BookCard";
import { bannersWithCategories } from "../data/ShowAll";

export default function CardSlider({name}) {
  const relevantBooks = bannersWithCategories;

  return  (
    <div className="w-full px-4 md:px-8 py-8">
        <h1 className="text-text text-2xl mb-4 font-semibold px-2">{name}</h1>
        <Carousel
            opts={{
                align: "start",
                // loop: true
            }}
            className="w-full"
        >
            <CarouselContent className="ml-6 gap-4">
                {relevantBooks.map((banner) => (
                   <BookCard
                   key={banner.banner_id}
                   id={banner.banner_id}
                   title={banner.name}
                   banner={banner.picture}
                   author={banner.author_name}
                 />
                ))}
            </CarouselContent>
            {/* <CarouselPrevious className="absolute left-[-10px] md:left-[-20px] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-[-10px] md:right-[-20px] top-1/2 -translate-y-1/2" /> */}
        </Carousel>
    </div>
  );
}
