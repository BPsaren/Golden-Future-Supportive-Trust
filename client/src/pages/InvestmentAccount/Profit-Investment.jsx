import React, { useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';

const defaultContactFormData = {
  type: 'profit_on_customer_investment',
  date: '',
  consumer_name: '',
  account_no: '',
  profit_on_customer_investment: '',

};

export const ProfitInvestment = () => {
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
      const response = await fetch(`http://localhost:3000/api/admin/profitoncustomerinvestment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(member),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Money Added successfully");
        setMember(defaultContactFormData); // Clear form on successful submission
      } else {
        const errorData = await response.json(); // Handle specific error messages from server
        toast.error(errorData.message || "Money Not Added");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred");
    }
  };

  return (
    <div>
      <section>
        <main>
          <div className="section-registration">
            <h1>Loan Credit</h1>
            <br/>
            <form onSubmit={handleSubmit}>
              
              <div>
                <label htmlFor="account_no"> Account Number</label>
                <input 
                  type="number" 
                  name="account_no"
                  id="account_no"
                  placeholder="Enter account number"
                  required 
                  autoComplete="off"
                  value={member.account_no}
                  onChange={handleInput}
                />
              </div>
              
              <div>
                <label htmlFor="profit_on_customer_investment"> Loan Credit Amount</label>
                <input 
                  type="number" 
                  name="profit_on_customer_investment"
                  id="profit_on_customer_investment"
                  placeholder="Enter loan deposit amount"
                  required 
                  autoComplete="off"
                  value={member.profit_on_customer_investment}
                  onChange={handleInput}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </main>
      </section>
    </div>
  );
};
