import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaUserShield } from "react-icons/fa";
import Utils from "../../utils/Utils";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAdminToggleModalOpen, setIsAdminToggleModalOpen] = useState(false);
  const { deleteUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoURL: "",
    address: "",
  });

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      console.log("User Url: ", Utils.ALL_USERS_URL);
      const response = await fetch(Utils.ALL_USERS_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Load users when the component mounts
  }, []);

  // // Block a user
  // const handleBlock = async () => {
  //   try {
  //     console.log({ selectedUser });
  //     const updatedUser = {
  //       ...selectedUser,
  //       isBlocked: !selectedUser?.isBlocked,
  //     };
  //     console.log({ updatedUser });

  //     await fetch(Utils.USER_DETAILS_URL({ user_id: selectedUser.uid }), {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedUser),
  //     });
  //     fetchUsers(); // Reload users after update
  //     setIsBlockModalOpen(false);
  //   } catch (error) {
  //     console.error("Error blocking/unblocking user:", error);
  //   }
  // };

  // Toggle admin status
  const handleToggleAdmin = async () => {
    try {
      console.log({ selectedUser });
      const updatedUser = { ...selectedUser, isAdmin: !selectedUser?.isAdmin };

      await fetch(Utils.USER_DETAILS_URL({ user_id: selectedUser.uid }), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      fetchUsers(); // Reload users after update
      setIsAdminToggleModalOpen(false);
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  // Open the edit modal with the user's current details
  const openEditModal = (user) => {
    console.log("Selected User", user);
    setSelectedUser(user);
    setFormData({
      displayName: user.displayName || "",
      phone: user.phone || "",
      photoURL: user.photoUrl || "",
      address: user.address || "",
    });
    setIsEditModalOpen(true);
  };

  // Update user info
  const handleUpdate = async () => {
    try {
      const updatedUser = {
        ...selectedUser,
        displayName: formData.displayName,
        phone: formData.phone,
        photoUrl: formData.photoURL,
        address: formData.address,
      };

      await fetch(Utils.USER_DETAILS_URL({ user_id: selectedUser.uid }), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      fetchUsers(); // Reload users after update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUserClicked = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const handleClickedSetUserOrAdminRole = (user) => {
    setSelectedUser(user);
    setIsAdminToggleModalOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      deleteUser(selectedUser);
      const response = await fetch(
        Utils.USER_DETAILS_URL({ user_id: selectedUser.uid }),
        {
          method: "DELETE",
        }
      );
      fetchUsers();
      setIsDeleteModalOpen(false);
      if (response.ok) {
        toast.success("User Deleted Successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error in deleting user:", error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{user?.displayName || "N/A"}</td>
              <td className="py-2 px-4 border">{user?.email}</td>
              <td className="py-2 px-4 border">
                <img
                  src={user?.photoUrl || "https://via.placeholder.com/50"}
                  alt="user"
                  className="w-10 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="py-2 px-4 border">
                {user.isBlocked ? "Blocked" : "Active"}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleClickedSetUserOrAdminRole(user)}
                  className={`mr-2 p-2 rounded-full text-white ${
                    user.isAdmin ? "bg-green-500" : "bg-blue-500"
                  } ${
                    user.email === "superadmin@codecloud.com"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  title="Toggle Admin/User"
                  disabled={user.email === "superadmin@codecloud.com"}
                >
                  <FaUserShield />
                </button>

                <button
                  onClick={() => openEditModal(user)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Edit User"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteUserClicked(user)}
                  className={`p-2 rounded-full bg-red-500 text-white ${
                    user.email === "superadmin@codecloud.com"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  title="Delete User"
                  disabled={user.email === "superadmin@codecloud.com"}
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Edit User</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.displayName}
                onChange={(e) => {
                  setFormData({ ...formData, displayName: e.target.value });
                  console.log("Form Data", formData);
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Photo URL:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.photoURL}
                onChange={(e) =>
                  setFormData({ ...formData, photoURL: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Address:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
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

      {/* Block Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h1 className="text-xl mb-4">Delete User</h1>
            <h4 className="my-7">Are you sure you want to delete User?</h4>
            <button
              onClick={() => handleDeleteClick()}
              className={`bg-red-500 text-white px-4 py-2 rounded`}
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

      {/* Toggle Admin Modal */}
      {isAdminToggleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">
              {selectedUser.isAdmin
                ? "Revoke Admin Privileges?"
                : "Grant Admin Privileges?"}
            </h3>
            <button
              onClick={handleToggleAdmin}
              className={`bg-green-500 text-white px-4 py-2 rounded`}
            >
              {selectedUser.isAdmin ? "Revoke" : "Grant"}
            </button>
            <button
              onClick={() => setIsAdminToggleModalOpen(false)}
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

export default AllUsersPage;
