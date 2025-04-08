export default function Purchase() {
  return (
    <div className="bg-[var(--cls-greenBackground)]">
      <section class="container__div">
        <h2 class="py-4 text-3xl">My Cart</h2>
        <div class="grid grid-cols-1 md:flex md:flex-row md:gap-6">
          <div class="bg-[#F5F5F5] max-sm:rounded-t-2xl md:w-[60%] md:rounded-2xl">
            <div class="flex flex-row space-x-2 p-2 md:h-10">
              <div class="flex justify-baseline">
                <label class="relative flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked
                    class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[var(--cls-darkblue)] shadow transition-all checked:bg-[var(--cls-darkblue)] hover:shadow-md"
                    id="check1"
                  />
                  <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
              <p>Select all</p>
            </div>

            <div class="my-[32px] flex flex-col px-[8px]">
              <div class="flex flex-row">
                <label class="relative flex cursor-pointer items-start">
                  <input
                    type="checkbox"
                    checked
                    class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[var(--cls-darkblue)] shadow transition-all checked:bg-[var(--cls-darkblue)] hover:shadow-md"
                    id="check1"
                  />
                  <span class="top-1/2 left-1/2 -translate-x-[17px] translate-y-1 transform text-white opacity-0 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <img
                  src="/assets/supernova.jpg"
                  class="h-auto max-w-[45%] object-contain object-top px-[8px]"
                  alt="Book Cover"
                />
                <div class="flex w-[55%] flex-col px-[8px]">
                  <h3 class="pb-[8px] text-sm font-bold">Super Nova No.2</h3>
                  <p class="pb-[8px]">Supa Navo</p>
                  <p>฿160.00</p>
                  <div class="grid grid-cols-3 gap-3 place-self-start py-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#e3e3e3"
                      class="bg-[#939393]"
                    >
                      <path d="M200-440v-80h560v80H200Z" />
                    </svg>
                    <p class="place-self-center text-sm">1</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#e3e3e3"
                      class="bg-[#939393]"
                    >
                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                  </div>
                  <div class="flex justify-end pr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 -960 960 960"
                      width="25px"
                      fill="#1e1e1e"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-[#F5F5F5] pb-3 max-sm:rounded-b-2xl md:w-[45%] md:rounded-2xl md:py-[50px]">
            <div class="mx-8 text-xl leading-10 max-sm:mx-4">
              <h2 class="text-4xl font-bold max-sm:hidden md:mb-14">
                Order List
              </h2>
              <p class="flex justify-between">
                Quantity
                <span>2</span>
              </p>
              <p class="flex justify-between py-4 text-2xl font-bold">
                Total
                <span>฿320.00</span>
              </p>
              <a href="/index.html">
                <button class="flex w-[100%] justify-center rounded-2xl bg-[var(--cls-darkblue)] p-2 text-xl text-[var(--cls-white)] hover:bg-[var(--cls-blue)] md:mt-[200px]">
                  Proceed
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
