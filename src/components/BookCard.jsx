import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function BookCard({title, banner}) {
    return (
            <>
            <div>
                <Card className="flex flex-col justify-center items-center w-50 md:w-90 bg-box
                border-banner">
                    <CardContent>
                        <img src={banner} alt=""
                        className="w-[100%] rounded-2xl"/>
                    </CardContent>
                    <CardFooter>
                        <CardTitle className="text-lg font-semibold text-text">{title}</CardTitle>
                    </CardFooter>
                </Card>
            </div>
            </>
    );
}