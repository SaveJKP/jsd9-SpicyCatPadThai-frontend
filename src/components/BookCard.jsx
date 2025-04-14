import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Catalog from "./Catalog";
import { useState } from "react";

export function BookCard({ title, banner, author }) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };
  return (
    <>
      <div>
        <Card onClick={handleOpenModal} className="bg-box border-banner flex h-80 w-50 flex-col items-center justify-center md:h-auto md:w-90">
          <img src={banner} alt="" className="w-[100%] rounded-4xl p-4" />
          <CardContent>
            <CardTitle className="text-text text-lg font-bold">
              {title}
            </CardTitle>
            <p className="text-text flex items-center justify-start opacity-75 md:justify-center">
              {author}
            </p>
          </CardContent>
        </Card>
      </div>
      {open && <Catalog onClose={() => setOpen(false)}/>}
    </>
  );
}
