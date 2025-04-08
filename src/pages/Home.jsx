import CardSlider from "../components/CardSlider"
import ShowAll from "../components/ShowAll"
import { Button } from "@/components/ui/button"

export default function Home() {

  return (
    <div>
      <div className="container__div">

        {/* Promotion Banner */}
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

        {/* Card Slider Section */}
        <section className="w-full h-fit bg-greenBackground px-6 py-8 gap-4">
          <CardSlider name="New Release"/>
          <CardSlider name="Best Seller"/>
        </section>




        {/* Promote Section */}
        <article
        className="flex flex-col bg-banner w-full h-auto justify-between items-center md:flex-row">
          {/* Promotion Banner */}
          <div className="hidden md:flex w-1/2 text-text">
            <img src="/src/assets/logo_katsubook_no-text.png" alt=""
            className="h-auto w-full px-6 py-8"/>
          </div>
          <div className="w-full md:w-1/2">
            <div className="text-text px-6 py-8 flex flex-col gap-6">
              <h2 className="text-3xl font-bold">Top #1 of month</h2>
              <p>This</p>
            </div>
          </div>
        </article>

        {/* All Products Section */}
        <section className="w-full h-150 bg-greenBackground">
          <p className="text-text">Card Slider</p>
        </section>
      </div>
    </div>
  )
}