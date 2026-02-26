// "use client";

// import React, { useState, ChangeEvent, FormEvent } from "react";

// interface FormData {
//   name: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// interface FormErrors {
//   name?: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   password?: string;
//   confirmPassword?: string;
// }

// export default function LoginPage() {

//   const initialFormData: FormData = {
//     name: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const [formData, setFormData] =
//     useState<FormData>(initialFormData);

//   const [errors, setErrors] =
//     useState<FormErrors>({});
//   const [loading, setLoading] = useState<boolean>(false)
//   const [apiError, setApiError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<boolean>(false);
//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


//   const validate = (): FormErrors => {

//     const newErrors: FormErrors = {};

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     }
//     else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (formData.password.length < 6) {
//       newErrors.password =
//         "Password must be at least 6 characters";
//     }


//     if (formData.confirmPassword !== formData.password) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }


//     return newErrors;
//   };


//   const handleSubmit = async (
//     e: FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();
//     setSuccess(false);
//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     }


//     if (Object.keys(validationErrors).length === 0) {
//       console.log("Form Submitted:", formData);
//     }
//     try {
//       setLoading(true);
//       setApiError(null);

//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       }
//       );
//       if (!response.ok) {
//         throw new Error("failed to login");
//       }
//       const data = await response.json();
//       console.log("Success", data);
//       setSuccess(true);

//     }
//     catch (error) {
//       if (error instanceof Error) {
//         setApiError(error.message);
//       }
//     }
//     finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}

//         className="bg-blue-200 p-8 rounded-lg shadow-md w-96"
//       ><h2 className="text-2xl font-bold mb-4">login</h2>

//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           placeholder="Enter First Name"
//           className="border p-2 text-blue-500 rounded mb-2 w-full"
//         />
//         {errors.firstName && <p>{errors.firstName}</p>}

//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           placeholder="Enter Last Name"
//           className="border p-2 rounded text-blue-500 mb-2 w-full"
//         />

//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className={`border p-2 text-blue-500 rounded mb-2 w-full ${errors.email ? "border-red-500" : ""}`}
//         />
//         {errors.email && <p className="text-red-500">{errors.email}</p>}

//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="border p-2  text-blue-500 rounded mb-2 w-full"
//         />
//         {errors.password && <p className="text-red-500">{errors.password}</p>}

//         <input
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm Password"
//           className="border text-blue-500 p-2 rounded mb-2 w-full"
//         />
//         {errors.confirmPassword && (
//           <p>{errors.confirmPassword}</p>
//         )}
//         {apiError && (
//           <p className="text-red-600 text-sm mb-2 text-center">{apiError}</p>
//         )}

//         {success && (
//           <p className="text-green-600 text-sm mb-2 text-center">login success ful</p>
//         )}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded w-full"
//         >
//           Submit
//         </button>

//       </form>
//     </div>
//   );
// }





//Data fetching with useEffect

"use client";

import React from "react";
import { useState, useEffect, use } from "react";
import { set } from "react-hook-form";

interface User {
  id: number;
  name: string;
  email: string;
}   

export default function UserPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch("https://jsonplaceholder.typicode.com/users");     
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data: User[] = await response.json();
                setUsers(data);
            }   
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
            finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
            if (loading) {
                return (
                    <div className="min-h-screen flex items-center justify-center">
                        <p className="text-lg text-blue-500">Loading users...</p>
                    </div>
                );
            }
            if (error) {
                return (
                    <div className="min-h-screen flex items-center justify-center">
                        <p className="text-lg text-red-500">Error: {error}</p>
                    </div>
                );
            }
            if (users.length === 0) {
                return (
                    <div className="min-h-screen flex items-center justify-center">
                        <p className="text-lg text-gray-500">No users found.</p>
                    </div>
                );
            }
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <div className="grid gap-4 max-w-3xl mx-auto">
                {users.map((user) => (
                    <div key={user.id} className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>      
        </div>
    );
}

            
