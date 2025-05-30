import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BookCard } from "./BookCard";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ShowSearch() {
  const [banners, setBanners] = useState([]);
  {
    /* set page */
  }
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(banners.length / itemsPerPage);
  const location = useLocation(); //get quey from url e.g.,  If the URL is https://katsubook-backend.onrender.com/search?query=naruto, then location.search is "?query=naruto
  const queryParams = new URLSearchParams(location.search);
  const searchText = (queryParams.get("query") || "").trim(); //get the query text e.g, naruto

  useEffect(() => {
    if (!searchText) {
      setBanners([]);
      setCurrentPage(1);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://katsubook-backend.onrender.com/api/titles/search?query=${encodeURIComponent(searchText)}`,
        );
        setBanners(response.data.title || []);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setBanners([]);
        setCurrentPage(1);
      }
    };

    fetchSearchResults();
  }, [location.search]);
  {
    /* set index items to show book */
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBanners = banners.slice(startIndex, endIndex);

  const handleNextPage = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  {
    /* Get Items Banner */
  }

  return (
    <div className="container__div">
      <div className="flex flex-col items-start justify-start">
        <h2 className="mt-12 px-[10%] text-3xl font-semibold text-white md:text-4xl">
          Search Result: {searchText}{" "}
        </h2>

        {banners.length === 0 && searchText !== "" ? (
          <div className="flex h-96 w-full items-center justify-center">
            <p className="text-2xl font-medium text-white">
              Book title not found
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-2 items-center justify-center gap-4 self-center p-8 md:grid-cols-4 lg:grid-cols-6">
            {currentBanners.map((banner) => (
              <BookCard
                key={banner._id}
                id={banner._id}
                title={banner.title_name}
                picture={banner.title_picture}
                author={banner.authorInfo?.author_name}
              />
            ))}
          </section>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className="p-8">
          <PaginationContent>
            <PaginationItem>
              {/* Previous Page */}
              <PaginationPrevious
                href="#"
                className="text-text text-xl"
                onClick={handlePreviousPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="text-banner text-xl" isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              {/* <PaginationEllipsis className="text-text text-xl" /> */}
            </PaginationItem>
            <PaginationItem>
              {/* Next Page */}
              <PaginationNext
                href="#"
                className="text-text text-xl"
                onClick={handleNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
