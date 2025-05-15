import BannerSlider from "../components/BannerSlider";
import CardSlider from "../components/CardSlider";
import NewReleaseSlider from "../components/NewReleaseSlider";
import ShowAll from "../components/ShowAll";
import TopList from "../components/TopList";

export default function Home() {
  return (
    <main>
      <div className="bg-banner">
        <div className="container__div">
          <BannerSlider />
        </div>
      </div>

      <div className="bg-greenBackground">
        <div className="container__div">
          <CardSlider name="🥇 Trending Manga" />
          <NewReleaseSlider name="🆕 New Releases" />
        </div>
      </div>

      <div className="bg-banner">
        <div className="container__div">
          <TopList />
        </div>
      </div>

      <div className="bg-greenBackground">
        <div className="container__div">
          <ShowAll />
        </div>
      </div>
    </main>
  );
}
