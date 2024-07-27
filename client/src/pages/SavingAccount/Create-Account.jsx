import React, { useState } from "react";
//import { useAuth } from "../store/auth";
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';

const defaultContactFormData = {
  consumer_name: '',
  address: '',
  aadhar_no: '',
  mobile_no: '',
  mail_id: '',
  opening_bal: ''
};

const formStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  section: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    background: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export const CreateAccount = () => {
  const [member, setMember] = useState(defaultContactFormData);
  const { authorizationToken } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/admin/admincreateaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(member),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating account:", errorData);
       // toast.error(errorData.message || "Account not created");
       toast.error(errorData.extraDetails? errorData.extraDetails:errorData.message );
      } else {
        setMember(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast.success("Account created successfully");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Account not created");
    }
  };

  return (
    <div style={formStyles.container}>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div style={formStyles.section}>
          <div style={formStyles.formGroup}>
            <label htmlFor="consumer_name" style={formStyles.label}>Consumer Name</label>
            <input
              type="text"
              name="consumer_name"
              placeholder="Enter consumer name"
              required
              autoComplete="off"
              value={member.consumer_name}
              onChange={handleInput}
              style={formStyles.input}
            />
          </div>
          <div style={formStyles.formGroup}>
            <label htmlFor="address" style={formStyles.label}>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              required
              autoComplete="off"
              value={member.address}
              onChange={handleInput}
              style={formStyles.input}
            />
          </div>
        </div>

        <div style={formStyles.section}>
          <div style={formStyles.formGroup}>
            <label htmlFor="aadhar_no" style={formStyles.label}>Aadhar Number</label>
            <input
              type="number"
              name="aadhar_no"
              placeholder="Enter Aadhar number"
              required
              autoComplete="off"
              value={member.aadhar_no}
              onChange={handleInput}
              style={formStyles.input}
            />
          </div>
          <div style={formStyles.formGroup}>
            <label htmlFor="mobile_no" style={formStyles.label}>Mobile Number</label>
            <input
              type="number"
              name="mobile_no"
              placeholder="Enter mobile number"
              required
              autoComplete="off"
              value={member.mobile_no}
              onChange={handleInput}
              style={formStyles.input}
            />
          </div>
        </div>

        <div style={formStyles.section}>
          <div style={formStyles.formGroup}>
            <label htmlFor="mail_id" style={formStyles.label}>Email</label>
            <input
              type="email"
              name="mail_id"
              placeholder="Enter email address"
              required
              autoComplete="off"
              value={member.mail_id}
              onChange={handleInput}
              style={formStyles.input}
            />
          </div>
          <div style={formStyles.formGroup}>
            <label htmlFor="opening_bal" style={formStyles.label}>Opening Balance</label>
            <input
              type="number"
              name="opening_bal"
              placeholder="Enter opening balance"
              required
              autoComplete="off"
              value={member.opening_bal}
              onChange={handleInput}
              style={formStyles.input}
            />
          </div>
        </div>

        <button type="submit" style={formStyles.button}>Save</button>
      </form>
    </div>
  );
};
