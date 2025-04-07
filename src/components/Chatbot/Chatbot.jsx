import React, { useState } from "react";
import axios from "axios";

const model = process.env.REACT_APP_SERVER_URL;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Visibilidad del chat

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${model}/api/ia/chat`, { prompt: input });
      const botText = response.data.response || "No se pudo obtener una respuesta válida del bot.";
      const botMessage = { text: botText, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = { text: "Hubo un error al procesar tu solicitud.", sender: "bot" };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón flotante */}
      <button
        className="btn btn-primary btn-circle text-xl"
        onClick={() => setIsOpen(!isOpen)}
        title="Abrir chat"
      >
        {isOpen ? "✖" : "💬"}
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="card w-80 bg-base-100 shadow-xl mt-4">
          <div className="card-body p-4 flex flex-col h-[400px]">
            <h2 className="card-title mb-2">Chatbot</h2>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto space-y-2 mb-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat ${
                    msg.sender === "user" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-bubble">
                    <strong>{msg.sender === "user" ? "Tú" : "Bot"}:</strong>{" "}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input y botón */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Escribe tu mensaje..."
                className="input input-bordered input-sm w-full"
              />
              <button
                onClick={sendMessage}
                className="btn btn-primary btn-sm"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner loading-sm" /> : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
