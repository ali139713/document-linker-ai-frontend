"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function ChatUI() {
  const [messages, setMessages] = useState([{ role: "system", text: "Ask me anything about your documents!" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("http://localhost:8000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", text: data.response }]);
  };

  return (
    <div className="p-4 border rounded-xl space-y-4">
      <div className="h-64 overflow-y-auto space-y-2 border rounded-lg p-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <div
              className={msg.role === "user" ? "bg-blue-100 inline-block px-3 py-2 rounded-xl" : "bg-gray-200 inline-block px-3 py-2 rounded-xl"}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
