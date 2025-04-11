import {
    CarouselItem,
  } from "@/components/ui/carousel"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


export function CarouselCard({title, banner, author}) {
    return (
        <CarouselItem className="basis-2/3 md:basis-3/7 lg:basis-2/7 ">
            <Card className="w-full flex flex-col justify-center items-center p-4 gap-2 bg-box rounded-2xl border-banner">
                <img src={banner} alt={title || "Book cover"}
                className="w-full object-cover rounded-2xl"/>
                <CardTitle className="text-text text-center line-clamp-2 mt-2 -mb-2">{title}</CardTitle>
                <CardDescription className="text-text">{author}</CardDescription>
            </Card>
        </CarouselItem>
    );
}
