import { Link } from "react-router";

export default function ErrorHandling() {
  return (
    <div>
      <div className="container__div">
        <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-violet-700 text-2xl font-semibold text-white">
          <h1 className="m-4 text-6xl">404 Not Found</h1>
          <Link
            to="/"
            className="underline underline-offset-8 hover:text-amber-400"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
