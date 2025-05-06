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
import { bannersWithCategories } from "../data/ShowAll";
import axios from "axios";

export default function ShowAll() {
  {
    /* set page */
  }
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bannersWithCategories.length / itemsPerPage);
  const [open, setOpen] = useState(false);

  {
    /* set index items to show book */
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBanners = bannersWithCategories.slice(startIndex, endIndex);

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
  const [banners, setBanners] = useState([])

  useEffect(() => {
    const getItemsShowAll = async() => {
      try {
        const response = await axios.get(' ')
        setBanners(response.data)
      } catch (err) {
        console.log(err)
      }
    };

    getItemsShowAll();
}, []);

  return (
    <div  className="container__div">
      <div className="flex flex-col items-start justify-start">
        <h2 className="px-[12%] text-white text-3xl md:text-4xl mt-12 font-semibold">📚 All Series</h2>
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-8 justify-center items-center self-center">
          {currentBanners.map((banner) => (
            <BookCard
              key={banner.banner_id}
              id={banner.banner_id}
              title={banner.name}
              banner={banner.picture}
              author={banner.author_name}
            />
          ))}
        </section>
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
