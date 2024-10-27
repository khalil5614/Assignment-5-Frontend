import React, { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Utils from "../../utils/Utils";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        Utils.ALL_ORDERS_BY_USER_URL({ user_id: currentUser.uid })
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        console.log("Loaded Products: ", data);
      }
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        Utils.ORDER_DETAILS_URL({ id: selectedProduct._id }),
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex  justify-between m-2">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
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
                  title="Complete Payment"
                ></button>
                <button
                  onClick={() => openDeleteModal(product)}
                  className="mr-2 p-2 rounded-full bg-red-500 text-white"
                  title="Cancel Order"
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default MyProductsPage;
