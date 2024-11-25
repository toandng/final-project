"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RegisterForm from "./register-form";

// Schema validation với Zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Page = () => {

  return (
    <div>
      <h1 className="text-center text-[20px] ">
        REGISTER
        
      </h1>
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default Page;
