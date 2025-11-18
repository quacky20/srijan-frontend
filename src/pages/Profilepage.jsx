import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Profilepage.css";

export function Profile() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");

  const navigate = useNavigate();

  async function getUser() {
    try {
      const res = await axios.get(
        "https://srijan-2026.onrender.com/api/v1/user/current-user",
        { withCredentials: true }
      );
      setUser(res.data.data.fullname);
      setEmail(res.data.data.email);
      setMobileNumber(res.data.data.mobilenumber);
    } catch (error) {
      setUser("");
      setEmail("");
      setMobileNumber("");
    }
  }

  async function logout() {
    try {
      await axios.get(
        "https://srijan-2026.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );
      setUser("");
      setEmail("");
      setMobileNumber("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full min-h-screen flex  justify-center items-center gap-8 px-4">

      {/* PROFILE CARD */}
      <div className="glow-card w-full max-w-md p-10 rounded-2xl border-4 border-[#FED000] font-['Cinzel Decorative'] bg-black/10 flex flex-col gap-4">

        <h2 className="text-3xl text-center mb-3 text-[#FED000]">
          Profile Details
        </h2>

        <div className="flex flex-col gap-3 text-lg tracking-wide text-white">

          <div className="flex justify-between border-b border-[#FED000]/30 pb-1">
            <span className="text-[#FED000]">Name:</span>
            <span>{user}</span>
          </div>

          <div className="flex justify-between border-b border-[#FED000]/30 pb-1">
            <span className="text-[#FED000]">Email:</span>
            <span>{email}</span>
          </div>

          <div className="flex justify-between border-b border-[#FED000]/30 pb-1">
            <span className="text-[#FED000]">Mobile:</span>
            <span>{mobilenumber}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-4 w-full bg-[#FED000] text-black py-2 rounded-xl text-xl tracking-wide hover:bg-yellow-400 transition"
        >
          LOGOUT
        </button>
      </div>

      {/* SECOND CARD */}
      <div className="glow-card w-full max-w-md p-6 rounded-2xl border-4 border-[#FED000] font-['Pirata One'] bg-black/10 flex items-center justify-center">
        
        {/* INNER BOX */}
        <div className="w-40 h-28 border-4 border-[#FED000] rounded-xl flex items-center justify-center text-[#FED000] text-xl">
          BOX
        </div>

      </div>

    </div>
  );
}
