import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";


export const AllConsumerData = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]); // State for selected users
  const { authorizationToken } = useAuth();

  const fetchAllConsumerData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/allConsumers", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalAmount(data.totalAmount);
      } else {
        console.error("Data is not an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/allConsumers/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        alert("User deleted successfully");
        fetchAllConsumerData();
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSelectedUsers = async () => {
    try {
      const deleteRequests = selectedUsers.map(id =>
        fetch(`http://localhost:3000/api/admin/allConsumers/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        })
      );

      const responses = await Promise.all(deleteRequests);
      const allSuccessful = responses.every(response => response.ok);

      if (allSuccessful) {
        alert("Selected users deleted successfully");
        setSelectedUsers([]);
        fetchAllConsumerData();
      } else {
        alert("Failed to delete some users");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllConsumerData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers(prevState =>
      prevState.includes(id)
        ? prevState.filter(userId => userId !== id)
        : [...prevState, id]
    );
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.account_no.toLowerCase().includes(searchLower) ||
      user.consumer_name.toLowerCase().includes(searchLower) ||
      user.transaction_no.toLowerCase().includes(searchLower)
    );
  });

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Consumer list</h1>
        <p>All Consumers Total Amount is: {totalAmount}</p>
        <input
          type="text"
          placeholder="Search by Account Number or Consumer Name or Transaction No"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
        />
        {selectedUsers.length > 0 && (
          <button onClick={deleteSelectedUsers} style={{ marginBottom: "20px" }}>
            Delete Selected Consumers
          </button>
        )}
      </div>

      <div>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "12px", textAlign: "left" }}></th>
              <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Transaction No</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Account Number</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Consumer Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Address</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Aadhar No</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Mobile Number</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Mail Id</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Opening Bal</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Total Balance</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((curUser) => (
              <tr key={curUser._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px", textAlign: "left" }}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(curUser._id)}
                    onChange={() => handleCheckboxChange(curUser._id)}
                  />
                </td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.date}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.transaction_no}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>
                  <Link to={`/admin/transactionhistory/${curUser.account_no}/datafetch`} style={{ marginRight: "8px" }}>
                    {curUser.account_no}
                  </Link>
                </td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.consumer_name}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.address}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.aadhar_no}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.mobile_no}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.mail_id}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.opening_bal}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.total_bal}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>
                  <Link to={`/admin/allConsumers/${curUser._id}/edit`} style={{ marginRight: "8px" }}>
                    Edit
                  </Link>
                  <button onClick={() => deleteUser(curUser._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
