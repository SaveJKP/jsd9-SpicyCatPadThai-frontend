import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"


  export default function BannerSlider({name}) {
    return <div className="flex flex-col bg-banner w-full h-auto justify-between items-center md:flex-row">
      <Carousel className="w-[100%] h-auto">
        <CarouselContent>
          <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">
            <div className="w-full md:w-1/2">
                <div className="text-text px-6 py-8 flex flex-col gap-6">
                    <h2 className="text-3xl font-bold">Bangkok Legacy</h2>
                    <p>In the heart of Bangkok, Thanawat is pulled into the deadly world of the Thai mafia to protect his family. As danger closes in, he must navigate betrayal, loyalty, and the blurred line between right and wrong.</p>
                    <Button
                    className="bg-buttonBlue text-text font-bold w-1/2 hover:cursor-pointer hover:bg-blue-600">Read More</Button>
                    </div>
                </div>
            <div className="hidden md:flex w-1/2 text-text">
                <img src="/src/assets/bangkoklegacy_banner.jpg" alt=""
                className="h-auto w-[100%]"/>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 bg-box rounded-2xl">2</CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>;
  }



  <article
        className="flex flex-col bg-banner w-full h-auto justify-between items-center md:flex-row">
          {/* Promotion Banner */}
          <div className="w-full md:w-1/2">
            <div className="text-text px-6 py-8 flex flex-col gap-6">
              <h2 className="text-3xl font-bold">Bangkok Legacy</h2>
              <p>In the heart of Bangkok, Thanawat is pulled into the deadly world of the Thai mafia to protect his family. As danger closes in, he must navigate betrayal, loyalty, and the blurred line between right and wrong.</p>
              <Button
              className="bg-buttonBlue text-text font-bold w-1/2 hover:cursor-pointer hover:bg-blue-600">Read More</Button>
            </div>
          </div>
          <div className="hidden md:flex w-1/2 text-text">
          <img src="/src/assets/bangkoklegacy_banner.jpg" alt=""
          className="h-auto w-[100%]"/>
          </div>
</article>