import bcrypt from "bcryptjs"

export const createPasswordHash = (password) => bcrypt.hash(password, 8);

export const checkPassword = (user, password) => bcrypt.compare(password, user.password);