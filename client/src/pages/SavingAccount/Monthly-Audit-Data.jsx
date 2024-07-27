import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { PDFViewer } from "@react-pdf/renderer";
import ConsumerPDFViewer from "./ConsumerPDFViewer"; // Assuming this is the PDF viewer component you want to use
import "./MonthlyAuditData.css"; // Optional: CSS for styling

export  const MonthlyAuditData = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(""); // State for selected month
  const { authorizationToken } = useAuth();

  // Function to fetch consumer data
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

  // Function to filter users by selected month
  const filterByMonth = (users, month) => {
    return users.filter(user => {
      const userMonth = new Date(user.date).getMonth() + 1; // Get month from user date (0-indexed, so +1)
      return userMonth === parseInt(month);
    });
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchAllConsumerData();
  }, []);

  // Handler for month selection change
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Filtered users based on selected month
  const filteredUsers = selectedMonth ? filterByMonth(users, selectedMonth) : users;

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Consumer List</h1>
        <p>All Consumers Total Amount is: {totalAmount}</p>
        <label htmlFor="month">Select Month:</label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* Optional: Render PDF viewer */}
      {selectedMonth && (
        <div className="pdf-viewer-container">
          <ConsumerPDFViewer data={filteredUsers} />
        </div>
      )}

      <div>
        <table className="consumer-table">
          <thead>
            <tr className="table-header">
              <th>Date</th>
              <th>Transaction No</th>
              <th>Account Number</th>
              <th>Consumer Name</th>
              <th>Total Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((curUser) => (
              <tr key={curUser._id}>
                <td>{curUser.date}</td>
                <td>{curUser.transaction_no}</td>
                <td>{curUser.account_no}</td>
                <td>{curUser.consumer_name}</td>
                <td>{curUser.total_bal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};


