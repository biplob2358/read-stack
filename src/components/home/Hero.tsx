const Hero = () => {
  return (
    <section className="bg-gray-50 text-gray-900">
      <div className="container flex flex-col justify-center  mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            Welcome to <span className="text-blue-600">ReadStack</span>
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Explore, borrow, and manage your favorite books — all in one place.
            <br className="hidden md:inline lg:hidden" />
            Discover stories that inspire and knowledge that empowers.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <a
              href="/books"
              className="px-8 py-3 text-lg font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Browse Books
            </a>
            <a
              href="/borrow-summary"
              className="px-8 py-3 text-lg font-semibold border rounded border-gray-300 hover:bg-gray-100 transition"
            >
              Borrow Summary
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-10 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem]">
          <img
            src="/img/banner.svg"
            alt="Library Banner"
            className="object-contain h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
