// Mock de base de datos de usuarios en memoria
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  loginAttempts?: number;
  lockedUntil?: Date;
}

// Base de datos simulada en memoria
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$8Z1qZ5Z5Z5Z5Z5Z5Z5Z5ZeuJJGvKxKxKxKxKxKxKxKxKxKxKxKxK", // password: admin123
    loginAttempts: 0,
  },
];

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const createUser = (name: string, email: string, hashedPassword: string): User => {
  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email,
    password: hashedPassword,
    loginAttempts: 0,
  };
  users.push(newUser);
  return newUser;
};

export const incrementLoginAttempts = (email: string): void => {
  const user = findUserByEmail(email);
  if (user) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;
    
    // Bloquear usuario después de 5 intentos fallidos por 15 minutos
    if (user.loginAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
    }
  }
};

export const resetLoginAttempts = (email: string): void => {
  const user = findUserByEmail(email);
  if (user) {
    user.loginAttempts = 0;
    user.lockedUntil = undefined;
  }
};

export const isUserLocked = (email: string): boolean => {
  const user = findUserByEmail(email);
  if (user && user.lockedUntil) {
    if (new Date() < user.lockedUntil) {
      return true;
    } else {
      // Si ya pasó el tiempo de bloqueo, resetear
      user.lockedUntil = undefined;
      user.loginAttempts = 0;
      return false;
    }
  }
  return false;
};
