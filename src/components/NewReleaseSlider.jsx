import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel"
import { BookCard } from "./BookCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function NewReleaseSlider({name}) {

  const [banners, setBanners] = useState([])

  useEffect(() => {
    const getItemsCardSlider = async() => {
      try {
        const response = await axios.get('http://localhost:3000/products/new-release')
        console.log(response)
        setBanners(response.data.titles || [])
      } catch (err) {
        console.log(err)
        setBanners([])
      }
    };

    getItemsCardSlider();
  }, []);

  return  (
    <div className="w-full px-4 md:px-8 py-8">
        <h1 className="text-text text-3xl md:text-4xl mb-4 font-semibold px-2">{name}</h1>
        <Carousel
            opts={{
                align: "start",
                // loop: true
            }}
            className="w-full"
        >
            <CarouselContent className="ml-6 gap-4">
                {banners.map((banner) => (
                   <BookCard
                   key={banner._id}
                   id={banner._id}
                   title={banner.title_name}
                   banner={banner.title_picture}
                   author={banner.authorDetails.author_name}
                 />
                ))}
            </CarouselContent>
        </Carousel>
    </div>
  );
}
