import bcrypt from "bcryptjs";

export const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};
