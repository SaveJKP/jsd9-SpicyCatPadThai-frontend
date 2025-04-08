export default function Hamburger() {
  const token = localStorage.getItem("token");

  return (
    <>
      {!token ? (
        <div className="relative overflow-hidden text-sm text-[var(--color-text)] min-[1024px]:hidden">
          <div className="bg-[var(--color-background)] pt-10 pb-30 leading-4 no-underline">
            <a
              href="/logout"
              className="mx-15 mb-6 block items-center rounded-xl bg-[var(--color-buttonBrown)] p-3 text-center hover:bg-[#dcd7c97c]"
            >
              Log out
            </a>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden text-sm">
          <div className="bg-[var(--color-background)] pt-10 pb-30 leading-4 no-underline">
            <a
              href="/login.html"
              className="mx-15 mb-6 block items-center rounded-xl bg-[var(--color-buttonBrown)] p-3 text-center hover:bg-[#dcd7c97c] md:hidden"
            >
              Log in
            </a>
            <a
              href="/register.html"
              className="mx-15 mb-6 block rounded-xl bg-[var(--color-buttonBlue)] p-3 text-center hover:bg-[#2c393095] md:hidden"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </>
  );
}
