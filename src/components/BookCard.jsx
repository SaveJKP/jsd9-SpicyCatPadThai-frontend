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

export function BookCard({ id,title, banner, author }) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };
  return (
    <>
      <div>
        <Card onClick={handleOpenModal} className="bg-box border-banner flex h-75 w-45 flex-col items-center justify-center hover:cursor-pointer">
          <img src={ banner || "https://placehold.co/200x250"} alt={title} className="w-full aspect-[3/4] object-cover -mb-8 p-4" />
          <CardContent>
            <CardTitle className="text-text text-lg font-bold line-clamp-1">
              {title}
            </CardTitle>
            <p className="text-text flex items-center justify-start opacity-75 md:justify-center truncate">
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
