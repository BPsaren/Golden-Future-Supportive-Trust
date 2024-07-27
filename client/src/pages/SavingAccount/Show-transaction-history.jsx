import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link, useParams } from "react-router-dom";

export const ShowTransactionHistory = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const { authorizationToken } = useAuth();
    const { account_no } = useParams();

    const fetchAllConsumerData = async () => {
        try {
            console.log(`Fetching data for account_no: ${account_no}`);
            console.log(`Authorization Token: ${authorizationToken}`);

            const response = await fetch(`http://localhost:3000/api/admin/transactionhistory/${account_no}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            console.log(response);

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            console.log(data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteUser = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`http://localhost:3000/api/admin/transactionhistory/delete/${id}`, {
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
    }, [account_no]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter((user) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (user.transaction_no && user.transaction_no.toLowerCase().includes(searchLower)) ||
            (user.type && user.type.toLowerCase().includes(searchLower))
        );
    });

    const consumerInfo = users.length > 0 ? users[0] : {};

    return (
        <section className="admin-users-section">
            <div className="container">
                <h1>Transaction History</h1>
                {consumerInfo && (
                    <div className="consumer-details">
                        <p><strong>Account Number:</strong> {consumerInfo.account_no}</p>
                        <p><strong>Consumer Name:</strong> {consumerInfo.consumer_name}</p>
                        <p><strong>Address:</strong> {consumerInfo.address}</p>
                        <p><strong>Aadhar Number:</strong> {consumerInfo.aadhar_no}</p>
                        <p><strong>Mobile Number:</strong> {consumerInfo.mobile_no}</p>
                        <p><strong>Email:</strong> {consumerInfo.mail_id}</p>
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Search by Transaction Number or Type"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
                />
            </div>
            <div>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ padding: "12px", textAlign: "left" }}>Transaction ID</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Transaction Type</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Credit</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Debit</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Remarks</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Total Balance</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((curUser) => (
                            <tr key={curUser._id} style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.transaction_no}</td>
                                <td style={{ padding: "12px", textAlign: "left" }}>{new Date(curUser.date).toLocaleDateString()}</td>
                                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.type}</td>
                                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.deposit_bal}</td>
                                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.withdraw_bal}</td>
                                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.remarks}</td>
                                <td style={{ padding: "12px", textAlign: "left" }}>{curUser.total_bal}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
