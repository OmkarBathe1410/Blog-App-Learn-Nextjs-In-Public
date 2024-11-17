"use client";
import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const initialBlogFormData = {
  title: "",
  description: "",
};

function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogID !== null
          ? await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              body: JSON.stringify(blogFormData),
            });
      const result = await apiResponse.json();
      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        setCurrentEditedBlogID(null);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function handleDeleteBlogByID(getCurrentID) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();

      if (result?.success) router.refresh();
    } catch (e) {
      console.log(e);
    }
  }

  function handleEdit(getCurrentBlog) {
    setCurrentEditedBlogID(getCurrentBlog?._id);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
    setOpenBlogDialog(true);
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 p-8">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditedBlogID={currentEditedBlogID}
        setCurrentEditedBlogID={setCurrentEditedBlogID}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {blogList &&
          blogList.map((blogItem) => (
            <Card
              key={blogItem._id}
              className="p-5 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold mb-3 text-gray-800">
                  {blogItem?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {blogItem?.description}
                </CardDescription>
                <div className="mt-5 flex gap-3 items-center">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => handleEdit(blogItem)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => handleDeleteBlogByID(blogItem._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      {blogList && blogList.length == 0 && (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 rounded-lg">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-red-600 mb-4">
              Oops! Something went wrong.
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              We couldn't fetch the blogs at this time. Please try again later.
            </p>
            <button
              onClick={() => location.reload()}
              className="text-lg bg-blue-500 text-white px-8 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      <div className="mt-10 flex justify-center">
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    </div>
  );
}

export default BlogOverview;
