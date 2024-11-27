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

// Schema validation với Zod
export const LoginBody = z.object({
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginBodyType = z.infer<typeof LoginBody>;

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Hàm xử lý khi submit form
  async function onSubmit(values: LoginBodyType) {
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

      if (response.status === 201 || response.status === 200) {
        console.log("User logged in successfully:", response.data);
        router.push("/"); // Chuyển hướng về trang Home
      } else {
        console.log("Error occurred:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while logging in user:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 text-white text-[40px] p-6 rounded-md shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-[350px] text-center">
            Đăng nhập
          </Button>
        </form>
        <footer>
          <Link href="/register" passHref>
            <Button className="mt-4 text-center w-[350px]">
              Don't have account? Register
            </Button>
          </Link>
        </footer>
      </Form>
    </div>
  );
};

export default LoginForm;
