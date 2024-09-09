import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addNewUser: any = createAsyncThunk(
  "user/addNewUser",
  async (item: any, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      const existingUser = response.data.find(
        (user: any) => user.email === item.email
      );

      if (existingUser) {
        alert("Tài khoản đã được cài đặt, vui lòng tạo tài khoản khác!");
        return rejectWithValue("User already exists");
      } else {
        const newId =
          response.data.length > 0
            ? Math.max(...response.data.map((user: any) => user.id || 0)) + 1
            : 0;
        const newUser = { ...item, id: String(newId) };
        const postResponse = await axios.post(
          "http://localhost:8080/users",
          newUser
        );
        window.alert("Tạo tài khoản thành công");
        
        return postResponse.data;

      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const login: any = createAsyncThunk(
  "user/login",
  async (item: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      const user = response.data.find(
        (u: any) => u.email === item.email && u.password === item.password
      );

      if (user) {
        if (user.block) {
          return rejectWithValue(
            "Your account has been blocked. Please contact support."
          );
        } else {
          user.onl = true;
          swal("Good job!", "Login successful", "success");
          await axios.patch(`http://localhost:8080/users/${user.id}`, {
            onl: true,
          });
          return user;
        }
      } else {
        return rejectWithValue("Invalid email or password");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getAllUser: any = createAsyncThunk(
  "reducer/getAllUser",
  async () => {
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
  }
);

export const blockUser: any = createAsyncThunk(
  "users/blockUser",
  async (item: { id: string; block: boolean }) => {
    await axios.patch(`http://localhost:8080/users/${item.id}`, {
      block: !item.block,
    });
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
  }
);
export const deleteUser: any = createAsyncThunk(
  "reducer/deleteUser",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/users/${id}`);
    return id;
  }
);

export const increaseItem: any = createAsyncThunk(
  "reducer/increaseItem",
  async (item: any) => {
    await axios.patch(`http://localhost:8080/products/${item.id}`, item);
    return item
  }
);

export const addItemToCard: any = createAsyncThunk(
  "users/addItemToCard",
  async (item: any) => {
    try {
      const userOnl = JSON.parse(localStorage.getItem("userOnl") || "{}");
      let updatedCart = [...userOnl.cart];

      const tim = updatedCart.findIndex(
        (cartItem: any) => cartItem.id == item.id
      );

      if (tim != -1) {
        console.log("cap nhat");

        updatedCart[tim].quantity += 1;
      } else {
        updatedCart.push({ ...item, quantity: 1 });
      }

      userOnl.cart = [...updatedCart];
      localStorage.setItem("userOnl", JSON.stringify(userOnl));

      await axios.patch(`http://localhost:8080/users/${Number(userOnl.id)}`, {
        cart: [...updatedCart],
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  }
);
