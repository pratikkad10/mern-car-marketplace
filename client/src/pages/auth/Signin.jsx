import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/ui/form";


import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function Signin() {

  const { loading, login } = useContext(AuthContext);


  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    login(values)
  }

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-white dark:bg-[radial-gradient(ellipse_800px_600px_at_88%_12%,rgba(216,180,180,0.08),transparent_65%),radial-gradient(ellipse_700px_500px_at_15%_88%,rgba(158,164,199,0.12),transparent_60%),radial-gradient(ellipse_600px_400px_at_42%_75%,rgba(255,140,80,0.06),transparent_55%),radial-gradient(ellipse_500px_350px_at_78%_45%,rgba(120,200,140,0.04),transparent_50%),radial-gradient(ellipse_900px_700px_at_55%_35%,rgba(27,29,36,0.9),transparent_75%),linear-gradient(135deg,#080808_0%,#1b1d24_35%,#0f1015_70%,#0a0a0a_100%)] dark:bg-blend-soft-light dark:bg-overlay dark:bg-multiply dark:bg-screen"
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg dark:bg-black/20 bg-white text-black backdrop-blur-md border border-white/10 dark:text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-center">
          Login
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 sm:gap-5"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
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
                  <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full py-2.5 sm:py-3 text-sm sm:text-base">
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/user/signup")}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}