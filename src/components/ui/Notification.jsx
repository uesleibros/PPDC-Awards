"use client";

import { useState, useEffect } from "react";

const Notification = ({
  message,
  type = "info",
  onClose,
  duration = 3000,
  position = "top-right",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timeout);
  }, [onClose, duration]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-black";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case "top-left":
        return "top-5 left-5";
      case "top-right":
        return "top-5 right-5";
      case "bottom-left":
        return "bottom-5 left-5";
      case "bottom-right":
        return "bottom-5 right-5";
      case "center":
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      default:
        return "top-5 right-5";
    }
  };

  return (
    <div
      className={`fixed z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
      } ${getTypeStyles()} ${getPositionStyles()} p-4 rounded-lg shadow-lg`}
    >
      <span className="font-bold">{message}</span>
    </div>
  );
};

export default Notification;
