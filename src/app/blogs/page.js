import BlogOverview from "@/components/blog-overview";
import React from "react";

async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store",
    });

    const result = await apiResponse.json();

    return result?.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs. Please try again later.");
  }
}

async function Blogs() {
  let blogList = [];

  try {
    blogList = await fetchListOfBlogs();
  } catch (error) {
    throw new Error(error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-10">
          Explore Our Latest Blogs
        </h1>
        <BlogOverview blogList={blogList} />
      </div>
    </div>
  );
}

export default Blogs;
