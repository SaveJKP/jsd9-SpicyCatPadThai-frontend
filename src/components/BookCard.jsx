import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export function BookCard({title, banner, author}) {
    return (
            <>
            <div>
                <Card className="flex flex-col justify-center items-center w-50 md:w-90 bg-box
                border-banner">
                        <img src={banner}
                        alt=""
                        className="w-[100%] rounded-2xl p-4"/>
                    <CardContent>
                        <CardTitle className="text-lg font-bold text-text">{title}</CardTitle>
                        <p className="text-text opacity-75 flex justify-center items-center">{author}</p>
                    </CardContent>
                </Card>
            </div>
            </>
    );
}