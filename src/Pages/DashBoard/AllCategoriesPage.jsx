import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import Utils from "../../utils/Utils";
import toast from "react-hot-toast";

const AllCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
  });

  // Fetch all categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await fetch(Utils.ALL_CATEGORIES_URL);
      const data = await response.json();
      setCategories(data);
      console.log("Loaded Categories: ", data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Load categories when the component mounts
  }, []);

  // Open the edit modal with the categories's current details
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      title: category.title || "",
      thumbnailUrl: category.thumbnailUrl || "",
    });
    setIsEditModalOpen(true);
  };

  const openAddCategoryModal = () => {
    setFormData({
      title: "",
      thumbnailUrl: "",
    });
    setIsAddModalOpen(true);
  };
  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  // Update category info
  const handleUpdate = async () => {
    try {
      const updatedCategory = {
        ...selectedCategory,
        title: formData.title,
        thumbnailUrl: formData.thumbnailUrl,
      };
      console.log("selected category: ", selectedCategory);
      const response = await fetch(
        Utils.CATEGORY_DETAILS_URL({ id: selectedCategory._id }),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCategory),
        }
      );
      fetchCategories(); // Reload categories after update
      setIsEditModalOpen(false);
      if (response.ok) {
        toast.success("Category Updated Successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  //add category
  const handleAddCategoryClick = async () => {
    try {
      const response = await fetch(Utils.ALL_CATEGORIES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          thumbnailUrl: formData.thumbnailUrl,
        }),
      });
      console.log(response);
      if (response.ok) {
        const addedCategory = response.json();
        console.log("added category", addedCategory);

        toast.success("Category Added Successfully", {
          position: "top-right",
        });
      }
      fetchCategories(); // Reload categories after update
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        Utils.CATEGORY_DETAILS_URL({ id: selectedCategory._id }),
        {
          method: "DELETE",
        }
      );
      fetchCategories(); // Reload categories after update
      setIsDeleteModalOpen(false);
      if (response.ok) {
        toast.success("Category Deleted Successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex  justify-between m-2">
        <h2 className="text-2xl font-bold mb-4">All Categories</h2>
        <div className="btn btn-outline" onClick={() => openAddCategoryModal()}>
          <TbCategoryPlus />
          <span>Add Category</span>
        </div>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{category?.title || "N/A"}</td>
              <td className="py-2 px-4 border">
                <img
                  src={
                    category?.thumbnailUrl || "https://via.placeholder.com/50"
                  }
                  alt="category"
                  className="w-14 "
                />
              </td>

              <td className="py-2 px-4 border">
                <button
                  onClick={() => openEditModal(category)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Edit Category"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => openDeleteModal(category)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Delete Category"
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Edit Category</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  console.log("Form Data", formData);
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Photo URL:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.thumbnailUrl}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnailUrl: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4"> Category Addition</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">Title:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  console.log("Form Data", formData);
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Photo URL:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.thumbnailUrl}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnailUrl: e.target.value })
                }
              />
            </div>

            <button
              onClick={handleAddCategoryClick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Category
            </button>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h1 className="text-xl mb-4">Delete Category</h1>
            <h4 className="my-7">Are you sure you want to delete category?</h4>
            <button
              onClick={() => handleDeleteClick()}
              className={`bg-green-500 text-white px-4 py-2 rounded`}
            >
              Delete
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategoriesPage;
