import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <div className="container mx-auto flex flex-col justify-center items-center text-center">
        <h2 className="text-5xl text-white font-extrabold mb-6 drop-shadow-lg">
          Browse Our Blog Collection
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-md">
          Discover the latest articles, insights, and stories from our expert
          authors. Click below to dive in!
        </p>
        <Link
          className="bg-white text-blue-700 text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition-transform transform hover:scale-105"
          href={"/blogs"}
        >
          Explore Blogs
        </Link>
      </div>
    </div>
  );
}
