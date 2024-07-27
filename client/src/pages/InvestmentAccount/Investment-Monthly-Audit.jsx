import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";

export const  InvestmentMonthlyAudit = () => {
  const [users, setUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInvestmentAmount, settotalInvestmentAmount] = useState(0);
  const [recoveryInvestmentTotalAmount, setrecoveryInvestmentTotalAmount] = useState(0);
  const [remainingTotalAmount, setremainingTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { authorizationToken } = useAuth();

  const fetchAllConsumerData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/getallinvestments", {
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
        settotalInvestmentAmount(data.totalInvestmentAmount);
        setrecoveryInvestmentTotalAmount(data.recoveryInvestmentTotalAmount);
        setremainingTotalAmount(data.remainingTotalAmount);
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

  useEffect(() => {
    fetchAllConsumerData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    const accountNo = user.account_no ? user.account_no.toLowerCase() : "";
    const consumerName = user.consumer_name ? user.consumer_name.toLowerCase() : "";
    const transactionNo = user.transaction_no ? user.transaction_no.toLowerCase() : "";
    return (
      accountNo.includes(searchLower) ||
      consumerName.includes(searchLower) ||
      transactionNo.includes(searchLower)
    );
  });

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Consumer list</h1>
        <p>All Consumers Total Amount is: {totalAmount}</p>
        <p>Total Loan Amount is: {totalInvestmentAmount}</p>
        <p>Total Recovery Loan: {recoveryInvestmentTotalAmount}</p>
        <p>Remaining Total Loan: {remainingTotalAmount}</p>
        <input
          type="text"
          placeholder="Search by Account Number or Consumer Name"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
        />
      </div>

      <div>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Transaction No</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Account Number</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Consumer Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Total Loan Amount</th>
              <th style={{ padding: "12px", textAlign: "left" }}>EMI</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Amount Of Loan Recovery</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Remaining Loan</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((curUser) => (
              <tr key={curUser._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.date}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.transaction_no}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.account_no}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.consumer_name}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.investment_of_customers_business}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.profit_on_customer_investment}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.amount_of_investment_recovery}</td>
                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.individual_total__investment}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
