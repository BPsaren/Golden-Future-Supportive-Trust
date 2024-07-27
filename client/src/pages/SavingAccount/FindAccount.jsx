import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import PDFViewerComponent from './PDFViewerComponent'; // Import the PDFViewerComponent

export const FindAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [viewCustomer, setViewCustomer] = useState([]);
  const [showPDFViewer, setShowPDFViewer] = useState(false); // State to toggle PDF viewer
  const { authorizationToken } = useAuth();

  const handleInput = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/admin/findaccount?account_no=${selectedAccount}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setViewCustomer(data);
        setShowPDFViewer(true); // Show PDF viewer after fetching data
        toast.success("Data fetched successfully");
      } else {
        toast.error("No data found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    // Optionally, you can perform any initial data fetching here
  }, []);

  return (
    <div className="container mx-auto">
      <section className="next-container" style={{ backgroundColor: "#f3f4f6", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>View Customer Account</h1>
        <div className="form-control">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="account_no" style={{ fontSize: "14px", fontWeight: "600", color: "#4b5563", marginBottom: "4px", display: "block" }}>Account Number</label>
              <input
                type="number"
                name="account_no"
                id="account_no"
                style={{ marginTop: "4px", width: "100%", borderRadius: "4px", border: "1px solid #e5e7eb", padding: "8px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", outline: "none" }}
                value={selectedAccount}
                onChange={handleInput}
              />
            </div>
            <button type="submit" style={{ backgroundColor: "#3b82f6", color: "#fff", fontWeight: "600", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", border: "none" }}>
              Submit
            </button>
          </form>
        </div>
        {showPDFViewer && <PDFViewerComponent data={viewCustomer} />} {/* Conditionally render PDFViewerComponent */}
      </section>
    </div>
  );
};
