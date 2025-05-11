import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardDescription, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { bannersWithCategories } from "../data/ShowAll";

export function TopListCard({ title, banner, author, rank }) {
  return (
    <CarouselItem className="basis-2/3 md:basis-3/7 lg:basis-2/7">
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl p-4">
        <img
          src={banner}
          alt={title || "Book cover"}
          className="h-60 w-120 rounded-full object-cover"
        />
        <span className="text-text absolute z-10 -mb-2 -translate-x-20 -translate-y-30 text-7xl font-bold shadow-lg">
          {rank}
        </span>
        <CardTitle className="text-text mt-2 -mb-2 line-clamp-2 text-center">
          {title}
        </CardTitle>
        <CardDescription className="text-text">{author}</CardDescription>
      </div>
    </CarouselItem>
  );
}
export default function TopListSlider() {
  const relevantBooks = bannersWithCategories;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchNewRelease = async () => {
      try {
        const response = await axios.get("");
        setBooks(response.data.newRelease);
      } catch (err) {
        console.error("Error fetching new release:", err);
      }
    };

    fetchNewRelease();
  }, []);

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <Carousel
        opts={{
          align: "start",
          //loop: true
        }}
        className="w-full"
      >
        <CarouselContent className="ml-6 gap-4">
          {relevantBooks.map((banner, i) => (
            <TopListCard
              key={banner.banner_id}
              title={banner.name}
              banner={banner.picture}
              author={banner.author_name}
              rank={i + 1}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-[-10px] -translate-y-1/2 md:left-[-30px]" />
        <CarouselNext className="absolute top-1/2 right-[-10px] -translate-y-1/2 md:right-[-30px]" />
      </Carousel>
    </div>
  );
}
