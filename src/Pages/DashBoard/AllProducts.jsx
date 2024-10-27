import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import Utils from "../../utils/Utils";
import toast from "react-hot-toast";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    thumbnailUrl: "",
    ratings: 0.0,
    price: 0,
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch(Utils.ALL_PRODUCTS_URL);
      const data = await response.json();
      setProducts(data);
      console.log("Loaded Products: ", data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(Utils.ALL_CATEGORIES_URL);
      const data = await response.json();
      setCategories(data);
      console.log("Loaded Categories: ", data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Open the edit modal with the Products's current details
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title || "",
      details: product.details || "",
      thumbnailUrl: product.thumbnailUrl || "",
      ratings: product.ratings || 0.0,
      price: product.price || "",
    });
    setSelectedCategory(product.category);
    setIsEditModalOpen(true);
  };

  const openAddProductModal = () => {
    setFormData({
      title: "",
      details: "",
      thumbnailUrl: "",
      ratings: 0.0,
      price: 0,
    });
    setIsAddModalOpen(true);
  };
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Update product info
  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        ...selectedProduct,
        title: formData.title,
        thumbnailUrl: formData.thumbnailUrl,
        details: formData.details,
        ratings: formData.ratings,
        price: formData.price,
        category: selectedCategory,
      };
      console.log("selected Product: ", selectedProduct);
      const response = await fetch(
        Utils.PRODUCT_DETAILS_URL({ id: selectedProduct._id }),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      fetchProducts();
      setIsEditModalOpen(false);
      if (response.ok) {
        toast.success("Product Updated Successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  };

  //add Product
  const handleAddProductClick = async () => {
    try {
      const response = await fetch(Utils.ALL_PRODUCTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          details: formData.details || "",
          thumbnailUrl: formData.thumbnailUrl,
          ratings: formData.ratings,
          price: formData.price,
        }),
      });
      console.log(response);
      if (response.ok) {
        const addedProduct = response.json();
        console.log("Added Product", addedProduct);

        toast.success("Product Added Successfully", {
          position: "top-right",
        });
      }
      fetchProducts();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        Utils.PRODUCT_DETAILS_URL({ id: selectedProduct._id }),
        {
          method: "DELETE",
        }
      );
      fetchProducts();
      setIsDeleteModalOpen(false);
      if (response.ok) {
        toast.success("Product Deleted Successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error in deleting product:", error);
    }
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex  justify-between m-2">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div
          className="btn btn-outline"
          onClick={
            () => openAddProductModal()
            //document.getElementById("product_add_modal").showModal()
          }
        >
          <TbCategoryPlus />
          <span>Add Product</span>
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
          {products.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{product?.title || "N/A"}</td>
              <td className="py-2 px-4 border">
                <img
                  src={
                    product?.thumbnailUrl || "https://via.placeholder.com/50"
                  }
                  alt="Product"
                  className="w-14 "
                />
              </td>

              <td className="py-2 px-4 border">
                <button
                  onClick={() => openEditModal(product)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Edit Product"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => openDeleteModal(product)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Delete Product"
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Edit Product</h3>
            <div className="mb-2">
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
            <div className="mb-2">
              <label className="block text-sm font-medium">Details:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
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
            <div className="mb-2">
              <label className="block text-sm font-medium">Ratings:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.ratings}
                onChange={(e) =>
                  setFormData({ ...formData, ratings: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Price:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-medium"
                htmlFor="category-select"
              >
                Select a Category:
              </label>

              <select
                id="category-select"
                className="w-full p-2 border rounded"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
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
      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed  inset-0  flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg w-1/3">
            <h3 className="text-xl mb-4"> Product Addition</h3>
            <div className="mb-2">
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

            <div className="mb-2">
              <label className="block text-sm font-medium">Details:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
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
            <div className="mb-2">
              <label className="block text-sm font-medium">Ratings:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.ratings}
                onChange={(e) =>
                  setFormData({ ...formData, ratings: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Price:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium"
                htmlFor="category-select"
              >
                Select a Category:
              </label>

              <select
                id="category-select"
                className="w-full p-2 border rounded"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddProductClick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Product
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

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('product_add_modal').showModal()}>open modal</button> */}
      <dialog id="product_add_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-xl mb-4"> Product Addition</h3>
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
            <label className="block text-sm font-medium">Details:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
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
          <div className="mb-4">
            <label className="block text-sm font-medium">Ratings:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.ratings}
              onChange={(e) =>
                setFormData({ ...formData, ratings: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Price:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={handleAddProductClick}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-4"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h1 className="text-xl mb-4">Delete Product</h1>
            <h4 className="my-7">Are you sure you want to delete Product?</h4>
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

export default AllProductsPage;
