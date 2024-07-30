import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    if (passwords) {
      console.log(passwords);
      setPasswordArray(passwords);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordArray, form])
      setForm({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Password not saved. Please fill all fields correctly.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      toast("Password deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("🦄 Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="p-3 md:container min-h-[89vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"></span>
          <span>Password Manager</span>
          {/* <span className="text-green-500">OP/&gt;</span> */}
        </h1>
        <p className="text-green-900 text-lg text-center">
          It will manage your password
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <div className="flex flex-col w-full gap-8">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="rounded-full border border-gray-500 w-full p-4 py-1"
              type="text"
              name="site"
              id="site"
            />
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              name="username"
              className="rounded-full border border-gray-500 w-full p-4 py-1"
              type="text"
              id="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-gray-500 w-full p-4 py-1"
                type={showPassword ? "text" : "password"}
                name="password"
              />
              <span
                className="absolute right-3 top-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <img
                  className="p-1"
                  width={26}
                  src={showPassword ? "public/eye.png" : "public/eyecross.png"}
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center gap-2 items-center bg-gray-500 hover:bg-red-200 rounded px-8 py-2 w-fit border border-green-500"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords p-3">
          <h2 className="text-2xl font-bold text-center">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-green-800 mt-4">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="border border-green-600 px-4 py-2">
                      Website
                    </th>
                    <th className="border border-green-600 px-4 py-2">
                      Username
                    </th>
                    <th className="border border-green-600 px-4 py-2">
                      Password
                    </th>
                    <th className="border border-green-600 px-4 py-2">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item) => (
                    <tr key={item.id} className="bg-green-100">
                      <td className="justify-center border border-green-600 px-4 py-2">
                        <a href={item.site}>{item.site}</a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="justify-center border border-green-600 px-4 py-2">
                        {item.username}
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="justify-center border border-green-600 px-4 py-2">
                        {item.password}
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="justify-center border border-green-600 px-4 py-2">
                        <span
                          className="cursor-pointer"
                          onClick={() => deletePassword(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gsqxdxog.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
