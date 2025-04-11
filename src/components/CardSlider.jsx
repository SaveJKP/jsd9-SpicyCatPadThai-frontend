import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { books } from "../data/products";
import { CarouselCard } from "./CarouselCard";

export default function CardSlider({name}) {
  const relevantBooks = books;

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
                {relevantBooks.map((book) => (
                    <CarouselCard
                        key={book.id}
                        title={book.title}
                        banner={book.banner}
                        author={book.author}
                    />
                ))}
            </CarouselContent>
            {/* <CarouselPrevious className="absolute left-[-10px] md:left-[-20px] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-[-10px] md:right-[-20px] top-1/2 -translate-y-1/2" /> */}
        </Carousel>
    </div>
  );
}
