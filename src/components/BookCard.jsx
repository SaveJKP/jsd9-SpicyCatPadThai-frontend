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
        <Card onClick={handleOpenModal} className="bg-box border-banner flex h-80 w-40 flex-col items-center justify-center md:h-auto md:w-90 hover:cursor-pointer">
          <img src={ banner || "https://placehold.co/200x250"} alt="" className="w-40 h-60 md:w-120 md:h-120 object-cover p-4 -mb-6" />
          <CardContent>
            <CardTitle className="text-text text-lg font-bold line-clamp-1 md:truncate">
              {title}
            </CardTitle>
            <p className="text-text flex items-center justify-start opacity-75 md:justify-center line-clamp-1 md:truncate">
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
