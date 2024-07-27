import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const params = useParams();
  const { authorizationToken } = useAuth();

  // get single user data
  const singleDataById = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/${params.id}`, {
        method: "get",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const dataFromServer = await response.json();
      console.log("user single data:", dataFromServer);
      setData(dataFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  // get the single user data
  useEffect(() => {
    singleDataById();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(data);

    try {
      const response = await fetch (`http://localhost:3000/api/admin/users/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("User data updated successfully");
      } else {
        toast.error("Sorry, user data not updated");
      }
    } catch (error) {
      console.log({message: error.message});
    }
  };

  return (
    <div>
      <section>
        <main>
          <div className="section-registration">
            <h1>Update user Information</h1>
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  id="username"
                  required
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  id="email"
                  required
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  id="phone"
                  required
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                />
              </div>

              <button type="submit">Update</button>
            </form>
          </div>
        </main>
        <section></section>
      </section>
    </div>
  );
};
