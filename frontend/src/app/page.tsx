"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [msg,setmsg] = useState("");
  
  const fetchBackend = async () => {
    try {
      const response = await axios.get("http://localhost:5000");
      setmsg(response.data.message);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }
  };

  const triggerHeavyTask = async () => {
    try {
      const response = await axios.get("http://localhost:5000/heavy");
      setmsg(response.data.message);
    } catch (error) {
      console.error("Error triggering heavy task:", error);
    }
  };

  useEffect(() => {
    fetchBackend();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-4">Backend Message:</h1>
      <p className="text-lg mb-8">{msg || "Loading..."}</p>
      <button
        onClick={triggerHeavyTask}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Trigger Heavy Task
      </button>
    </main>
  );
}   