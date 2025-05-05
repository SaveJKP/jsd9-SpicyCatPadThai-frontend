import TopListSlider from "./TopListSlider";
import React from 'react'

  export default function TopList() {
    return <div className="flex justify-center items-center w-full h-fit bg-banner">
        <main className="w-[100%] h-[100%]">

            <section className="flex flex-row px-2 py-6 justify-center md:justify-between items-center w-[100%]">
                <div className="hidden md:flex justify-center items-center w-1/2">
                    <img src="/logo_katsubook_no-text.png" alt=""
                    className="w-[50%]"/>
                </div>
                <div className="flex flex-col w-[75%] md:w-1/2 justify-center md:mr-12">
                    <h1 className="text-text mb-6 font-bold">Trending Series</h1>
                    <p className="text-text">
                        🌟 Discover the series that’s capturing hearts and headlines.
                    </p>
                    <TopListSlider />
                </div>
            </section>

        </main>
  </div>;
  }
