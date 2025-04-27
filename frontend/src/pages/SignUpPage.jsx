import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isSigningUp, chedkAuth } = useAuthStore();

  const validateForm = () => {};

  const handleSubmit = () => {};

  return;
};

export default SignUpPage;
