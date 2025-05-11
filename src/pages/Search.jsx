import ShowSearch from "../components/ShowSearch";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 




export default function Search() {

  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchText.trim() !== '') {
      e.preventDefault()
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
    }
  };
  return (
    <div className="bg-greenBackground">
      <div className="container__div">
        <main className="h-full min-w-full flex-col pt-[3%]">
          <input
            type="text"
            className="bg-text flex w-[75%] items-center justify-self-center rounded-2xl px-4 py-2 min-[1024px]:hidden "
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearch}
          />
          <ShowSearch />
        </main>
      </div>
    </div>
  );
}
