import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/models/hotel";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

//Register
export const register = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.message);
  }
};

//Sign in
export const signIn = async (formData: SignInFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message);
  }
  return body;
};

//Validate token
export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Token invalid!");
  }

  return res.json();
};

//Sign Out
export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Error during sign out!");
  }
};

//Add Hotel
export const addMyHotel = async (hotelFormData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!res.ok) {
    throw new Error("Failed to add hotel");
  }

  return res.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error fetching hotels!");
  }

  return res.json();
};
