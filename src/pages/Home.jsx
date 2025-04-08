import BannerSlider from "../components/BannerSlider"
import CardSlider from "../components/CardSlider"
import ShowAll from "../components/ShowAll"

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
              <BannerSlider/>
          </div>
        </div>

        <div className="bg-greenBackground">
          <div className="container__div">
              <CardSlider name="New Release"/>
              <CardSlider name="Best Seller"/>
          </div>
        </div>
    </main>
  )
}
