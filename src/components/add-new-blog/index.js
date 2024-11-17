"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function AddNewBlog({
  openBlogDialog,
  setOpenBlogDialog,
  loading,
  setBlogFormData,
  blogFormData,
  handleSaveBlogData,
  currentEditedBlogID,
  setCurrentEditedBlogID,
}) {
  return (
    <Fragment>
      <div className="flex justify-end">
        <Button
          onClick={() => setOpenBlogDialog(true)}
          className="bg-green-500 text-white hover:bg-green-700 transition-all"
        >
          + Add New Blog
        </Button>
      </div>
      <Dialog
        open={openBlogDialog}
        onOpenChange={() => {
          setOpenBlogDialog(false);
          setBlogFormData({
            title: "",
            description: "",
          });
          setCurrentEditedBlogID(null);
        }}
      >
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {currentEditedBlogID ? "Edit Blog" : "Add New Blog"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="title"
                className="text-right font-semibold text-gray-700"
              >
                Title
              </Label>
              <Input
                name="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    title: event.target.value,
                  })
                }
                id="title"
                className="col-span-3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-blue-500"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="description"
                className="text-right font-semibold text-gray-700"
              >
                Description
              </Label>
              <Input
                name="description"
                placeholder="Enter blog description"
                value={blogFormData.description}
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: event.target.value,
                  })
                }
                id="description"
                className="col-span-3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-blue-500"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              onClick={handleSaveBlogData}
              type="button"
              className={`w-full py-3 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white font-semibold rounded-md shadow-md transition-all`}
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Saving changes...</span>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default AddNewBlog;
