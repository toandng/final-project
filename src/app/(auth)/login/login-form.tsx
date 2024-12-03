"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Schema validation với Zod
export const LoginBody = z.object({
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginBodyType = z.infer<typeof LoginBody>;

const LoginForm = () => {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState(""); // Trạng thái hiển thị thông báo

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Hàm xử lý khi submit form
  async function onSubmit(values: LoginBodyType) {
    setStatusMessage(""); // Reset thông báo
    try {
      const response = await axios.post(
        "https://rtk9rj-8080.csb.app/users",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // setStatusMessage("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/verify-phone"); // Chuyển hướng tới trang Dashboard
        }, 1000); // Chuyển sau 2 giây
      } else {
        setStatusMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Error occurred during login. Please try again.");
      console.error("Error:", error);
    }
  }

  return (
    <div className="max-w-md h-screen mx-auto  text-white text-[40px] p-6 rounded-md shadow-md">
      <div>
          <div>
            <h2 className="text-black text-[20px] text-center font-bold">Welcome to Scrap Plan</h2>
            <p className="text-black text-[12px] text-center">Create an account or login to join your orders</p>
          </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} className="text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-[350px] text-center">
            Đăng nhập
          </Button>
          <a href="#" className="text-black text-[14px] text-center mt-4 p-[30%]">Forgot your password</a>
        </form>
       
        
      </Form>
      <footer className="mt-auto text-center">
        <a
          href="#"
          className="text-[14px] text-black mt-4 text-center hover:underline"
        >
          Don't have an account? Register here
        </a>
      </footer>
    </div>
  );
};

export default LoginForm;
