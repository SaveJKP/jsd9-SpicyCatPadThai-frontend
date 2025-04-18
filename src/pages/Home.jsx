import BannerSlider from "../components/BannerSlider"
import CardSlider from "../components/CardSlider"
import ShowAll from "../components/ShowAll"
import TopList from "../components/TopList"
import { useState } from "react";

export default function Home() {

  return (
    <main>
        <div className="bg-banner">
          <div className="container__div">
              <BannerSlider/>
          </div>
        </div>

        <div className="bg-greenBackground">
          <div className="container__div">
              <CardSlider name="New Release"/>
              <CardSlider name="Best Seller"/>
          </div>
        </div>

        <div className="bg-banner">
          <div className="container__div">
              <TopList/>
          </div>
        </div>

        <div className="bg-greenBackground">
          <div className="container__div">
          </div>
          <ShowAll/>
        </div>
    </main>
  )
}
