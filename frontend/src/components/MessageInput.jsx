import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { Image, Send, X } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !previewImage) return;

    try {
      await sendMessage({ text: text.trim(), image: previewImage });
      setText("");
      setPreviewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="p-3 sm:p-4 w-full">
      {previewImage && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1"
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex flex-wrap sm:flex-nowrap items-center gap-2"
      >
        <div className="flex-1 flex items-center gap-2 w-full">
          <input
            type="text"
            className="input input-bordered input-sm sm:input-md flex-grow w-full rounded-md"
            placeholder="Type something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-circle p-2 bg-base-200 hover:bg-base-300"
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className={`btn btn-sm sm:btn-md text-white rounded-xl px-3 py-2 transition ${
            text || previewImage
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!text.trim() && !previewImage}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
