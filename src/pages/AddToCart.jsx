import Cart from "../components/Cart";

export default function AddToCart() {
  return (
    <div className="container__div text-[var(--color-text)]">
      <div>
        <div class="grid grid-cols-1 gap-4 min-[1024px]:grid-cols-2 md:gap-10 md:p-10 md:px-20">
          {/* show product */}
          <div class="grid grid-cols-1">
            <img
              src="https://placehold.co/350x450" //product.img
              alt="book-cover"
              class="max-w-[100%] place-self-center object-cover shadow-lg"
            />
          </div>
          <div class="space-y-2 rounded-[10px] bg-[var(--color-buttonBrown)] p-[32px] py-12 text-[var(--cls-white)] max-sm:pt-[30px]">
            <p class="text-2xl font-bold md:text-3xl">"product.title"</p>
            <p class="text-2xl">"product.author"</p>
            <p class="py-5 text-3xl md:text-5xl">"product.price"</p>

            <div class="flex flex-row space-x-8 pb-15 md:items-center md:py-5">
              <p class="text-xl md:text-2xl">Quantity</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#e3e3e3"
                class="bg-[#939393]"
              >
                <path d="M200-440v-80h560v80H200Z" />
              </svg>
              <span class="place-self-center md:text-2xl">1</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#e3e3e3"
                class="bg-[#939393]"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </div>
            <button class="mb-4 rounded-lg bg-[var(--color-buttonBlue)] px-4 py-2 text-lg text-white shadow hover:bg-[#2e648ecc] md:mt-10 md:text-2xl">
              Add to Cart
            </button>
          </div>

          {/* fetching product.description */}
          <div class="space-y-2 rounded-[10px] bg-[var(--color-box)] px-[24px] py-[32px] text-[var(--cls-white)] md:mb-[50px]">
            <h3 class="text-xl font-bold">Description</h3>
            <p class="mb-5">"product.description"</p>

            {/* fetching product.genre */}
            <h4 class="mb-4 text-lg font-bold">Genre</h4>
            <div className="flex flex-row flex-wrap gap-2">
              <span class="mr-[8px] rounded-[8px] bg-[#2C2C2C] p-[8px] text-sm">
                "product.genre"
              </span>
              <span class="mr-[8px] rounded-[8px] bg-[#2C2C2C] p-[8px] text-sm">
                "product.genre"
              </span>
              <span class="mr-[8px] rounded-[8px] bg-[#2C2C2C] p-[8px] text-sm">
                "product.genre"
              </span>
            </div>
          </div>

          {/* //same genre */}
          <div class="mb-[50px] flex flex-col gap-3 space-y-2 rounded-[10px] bg-[var(--color-box)] px-[24px] py-[16px] text-[var(--cls-white)] md:pt-[18px]">
            <h3>Other books you may like:</h3>
            <div class="grid grid-cols-1 gap-2 md:flex md:flex-row md:py-5">
              <div>
                <img
                  src="https://placehold.co/100x150" //product.img
                  alt="book-cover"
                  class="mb-2.5 shadow-xl md:max-w-[50%] md:place-self-center"
                />
                <p class="flex flex-col justify-center md:text-center">
                  <span>"product.title" </span>
                  <span>"product.author"</span>
                  <span>"product.price"</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sticky AddToCart Button */}
      <div class="sticky bottom-0 flex w-full flex-row justify-between overflow-hidden border-t-1 border-[#eef1f34d] bg-[var(--color-greenBackground)] px-[16px] lg:hidden">
        <p class="p-2 text-2xl text-[var(--color-text]">฿9,999.99</p>
        <button class="my-1 rounded-lg bg-[var(--color-buttonBlue)] px-4 text-lg shadow hover:bg-[#2e648ecc]">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
