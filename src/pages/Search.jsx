import ShowAll from "../components/ShowAll"


export default function Search() {
  return (
    <div className="bg-greenBackground">
          <div className="container__div">
              <main className="min-w-full min-h-screen flex-col pt-[3%]">
                <input type="text"
                className="flex justify-self-center items-center w-[75%] bg-text rounded-2xl px-4 py-2 md:hidden" placeholder="Search" />
                <ShowAll />
              </main>
          </div>
    </div>
  )
}