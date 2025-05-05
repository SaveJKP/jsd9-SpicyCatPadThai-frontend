import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { bannersWithCategories } from "../data/ShowAll";

export function TopListCard({title, banner, author, rank}) {
    return (
        <CarouselItem className="basis-2/3 md:basis-3/7 lg:basis-2/7 ">
            <div className="w-full flex flex-col justify-center items-center p-4 gap-2 rounded-2xl">
                <img src={banner} alt={title || "Book cover"}
                className="w-120 h-60 object-cover rounded-full"/>
                <span className="absolute z-10 -translate-x-20 -translate-y-30  text-text shadow-lg text-7xl font-bold -mb-2">{rank}</span>
                <CardTitle className="text-text text-center line-clamp-2 mt-2 -mb-2">{title}</CardTitle>
                <CardDescription className="text-text">{author}</CardDescription>
            </div>
        </CarouselItem>
    );
}
export default function TopListSlider() {
  const relevantBooks = bannersWithCategories;

  return  (
    <div className="w-full px-4 md:px-8 py-8">
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
            <CarouselPrevious className="absolute left-[-10px] md:left-[-30px] top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-[-10px] md:right-[-30px] top-1/2 -translate-y-1/2" />
        </Carousel>
    </div>
  );
}
