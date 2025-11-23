/**
 * authApi: Placeholder API calls for authentication.
 * Replace with real backend calls.
 */
const fakeUserDB = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // plain text for demo only!
    role: "seeker",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    role: "employer",
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  login: async (email, password) => {
    await delay(500);
    const user = fakeUserDB.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) throw new Error("Invalid email or password");
    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token: "fake-token",
    };
  },
  signup: async (name, email, password, role) => {
    await delay(700);
    const exists = fakeUserDB.some((u) => u.email === email);
    if (exists) throw new Error("Email already registered");
    const newUser = {
      id: fakeUserDB.length + 1,
      name,
      email,
      password,
      role,
    };
    fakeUserDB.push(newUser);
    return {
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role },
      token: "fake-token",
    };
  },
  logout: async () => {
    await delay(100);
    return true;
  },
};
