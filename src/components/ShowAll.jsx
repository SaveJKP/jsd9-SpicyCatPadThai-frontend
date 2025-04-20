import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { books } from "../data/products";
import { BookCard } from "./BookCard";
import { useState } from "react";

export default function ShowAll() {
  {/* set page */}
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(books.length / itemsPerPage)

  {/* set index items to show book */}
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBooks = books.slice(startIndex, endIndex)

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

  return <div>
        <h1 className="text-text flex justify-start items-center ml-[5%] pt-[5%]">All Products</h1>
          <section className="flex flex-row flex-wrap justify-center items-center p-8 gap-4">
          {currentBooks.map((book) => (
          <BookCard key={book.id} title={book.title} banner={book.banner} author={book.author} />
        ))}
          </section>

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
                <PaginationLink
                  href="#"
                  className="text-banner text-xl"
                  isActive>{currentPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
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
  </div>;
}
