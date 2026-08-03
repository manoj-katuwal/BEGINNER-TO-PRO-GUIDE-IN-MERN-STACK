import { useState } from "react";

const Form = () => {
  // Individual states for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // Completed Submit Handler function
  const handleSubmit = (e) => {
    e.preventDefault(); // Page reload huna didaina

    // Console ma input values log garchha
    console.log("Submitted Data:");
    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Address: ", address);
    console.log("Password: ", password);

    alert(`Form submitted for ${name}`);

    setName("");
    setEmail("");
    setAddress("");
    setPassword("");
  };

  return (
    <div className='bg-blue-800 w-screen h-screen flex items-center'>
      {/* 1. Added onSubmit={handleSubmit} here */}
      <form onSubmit={handleSubmit} className='bg-white lg:w-[40%] sm:w-[80%] w-full rounded-md h-auto py-6 mx-auto'>
        <h1 className='py-3 text-center text-xl font-bold'>Registration</h1>

        <div className='w-full px-4 flex flex-col gap-y-2'>
          
          {/* Name Field */}
          <span>Name</span> 
          <input 
            type='text'
            placeholder='Enter your name'
            value={name} // State value connect gareko
            onChange={(e) => setName(e.target.value)} // State update gareko
            className='border-black border-1 shadow shadow-black rounded-md px-2 py-1 mb-4' 
            required
          />

          {/* Email Field */}
          <span>Email</span>
          <input 
            type='email'
            placeholder='Enter your email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-black border-1 shadow shadow-black rounded-md px-2 py-1 mb-4' 
            required
          />
          
          {/* Address Field */}
          <span>Address</span>
          <input 
            type='text' 
            placeholder='Enter your address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border-black border-1 shadow shadow-black rounded-md px-2 py-1 mb-4' 
            required
          />
          
          {/* Password Field */}
          <span>Password</span>
          <input 
            type='password' 
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border-black border-1 shadow shadow-black rounded-md px-2 py-1 mb-4' 
            required
          />
        </div>
        
        {/* Submit Button */}
        <div className='w-full px-4 flex py-3'>
          <input type='submit' value="Submit" className='bg-blue-600 cursor-pointer py-2 mx-auto px-5 w-[70%] rounded-md text-white font-bold hover:bg-blue-700 transition' />
        </div>

        <div className='w-full px-4 py-3'>
          <p className='text-center'>Already have an account? <span className='text-blue-600 underline cursor-pointer'>Login Now</span></p>
        </div>
      </form>
    </div>
  );
};

export default Form;
