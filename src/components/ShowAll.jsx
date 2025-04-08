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

export default function ShowAll() {
  return <div>
          <section className="flex flex-row flex-wrap justify-center items-center p-8 gap-4">
          {books.map((e) => (
          <BookCard title={e.title} price={e.price} banner={e.banner} />
        ))}
          </section>

          <Pagination className="p-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="text-text text-xl"/>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="text-text text-xl">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className="text-text text-xl"/>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="text-text text-xl"/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
  </div>;
}
