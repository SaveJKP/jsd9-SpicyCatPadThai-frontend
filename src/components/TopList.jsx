import TopListSlider from "./TopListSlider";

export default function TopList() {
  return (
    <div className="bg-banner flex h-fit w-full items-center justify-center">
      <main className="h-[100%] w-[100%]">
        <section className="flex w-[100%] flex-row items-center justify-center px-2 py-6 md:justify-between">
          <div className="hidden w-1/2 items-center justify-center md:flex">
            <img src="/logo_katsubook_no-text.png" alt="" className="w-[50%]" />
          </div>
          <div className="flex w-[75%] flex-col justify-center md:mr-12 md:w-1/2">
            <h1 className="text-text mb-6 font-bold">Popular Now</h1>
            <p className="text-text hidden md:block">
              🌟 Discover the series that’s capturing hearts and headlines.
              These reader-favorite titles are topping the charts and lighting
              up book communities everywhere.
            </p>
            <p className="text-text block md:hidden">
              🌟 Popular Now: Dive into the most talked-about series — beloved
              by fans and praised by critics!
            </p>
            <TopListSlider />
          </div>
        </section>
      </main>
    </div>
  );
}
