import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { BookCard } from "./BookCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function NewReleaseSlider({ name }) {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const getItemsCardSlider = async () => {
      try {
        const response = await axios.get(
          "https://katsubook-backend.onrender.com/products/new-release",
        );
        setBanners(response.data.titles || []);
      } catch (err) {
        console.error(err);
        setBanners([]);
      }
    };

    getItemsCardSlider();
  }, []);

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <h1 className="text-text mb-4 px-2 text-3xl font-semibold md:text-4xl">
        {name}
      </h1>
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
              picture={banner.title_picture}
              author={banner.authorDetails.author_name}
            />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
