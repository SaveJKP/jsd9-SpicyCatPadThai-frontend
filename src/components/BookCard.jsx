import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Catalog from "./Catalog";
import { useState } from "react";
import { createPortal } from "react-dom";

export function BookCard({ id,title, picture, author }) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };
  return (
    <>
      <div>
        <Card onClick={handleOpenModal} className="bg-box border-banner flex h-70 w-40 flex-col items-center justify-center hover:cursor-pointer">
          <img src={ picture || "https://placehold.co/200x250"} alt={title} className="w-full aspect-[3/4] object-cover mt-2 -mb-8 p-3" />
          <CardContent>
            <CardTitle className="text-text text-md font-bold line-clamp-2">
              {title}
            </CardTitle>
            <p className="text-text flex mb-4 items-center justify-start opacity-75 md:justify-center truncate">
              {author}
            </p>
          </CardContent>
        </Card>
      </div>
      {open && createPortal(
        <Catalog id={id} onClose={() => setOpen(false)} />,
        document.getElementById('modal-root')
      )}
    </>
  );
}
