import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/ui/form"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { signupUser } from "../../services/api"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  username: z.string().min(2, "Username must be at least 2 characters."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(10, "Phone number must be valid."),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Select gender" }),
  role: z.enum(["Buyer", "Seller", "Both"], { required_error: "Select role" }),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Confirm your password."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function Signup() {

  const navigate = useNavigate()
  // const { start, stop } = useLoading()
  const { loading, setLoading } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      phone: "",
      gender: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  })


  async function onSubmit(values) {
    setLoading(true) 
    try {
      const res = await signupUser({
        username: values.username,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        gender: values.gender,
        phone: values.phone,
      });

      console.log("Signup success:", res.data);
      toast.success(`Account created! Welcome, ${res.data.user.fullName}`);

      navigate("/user/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false)
    }
  }


  return (
   <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-white dark:bg-[radial-gradient(ellipse_800px_600px_at_88%_12%,rgba(216,180,180,0.08),transparent_65%),radial-gradient(ellipse_700px_500px_at_15%_88%,rgba(158,164,199,0.12),transparent_60%),radial-gradient(ellipse_600px_400px_at_42%_75%,rgba(255,140,80,0.06),transparent_55%),radial-gradient(ellipse_500px_350px_at_78%_45%,rgba(120,200,140,0.04),transparent_50%),radial-gradient(ellipse_900px_700px_at_55%_35%,rgba(27,29,36,0.9),transparent_75%),linear-gradient(135deg,#080808_0%,#1b1d24_35%,#0f1015_70%,#0a0a0a_100%)] dark:bg-blend-soft-light dark:bg-overlay dark:bg-multiply dark:bg-screen"
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl p-6 sm:p-8 md:p-10 my-8 rounded-2xl shadow-lg bg-white dark:bg-black/20 backdrop-blur-md border border-white/10 text-black dark:text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-center">
          Create Account
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm sm:text-base">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm sm:text-base">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Choose a username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm sm:text-base">Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm sm:text-base">Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm sm:text-base">Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="I am a..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buyer">Buyer</SelectItem>
                        <SelectItem value="Seller">Seller</SelectItem>
                        <SelectItem value="Both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm sm:text-base">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <Button
              type="submit"
              className="w-full py-2.5 sm:py-3 text-sm sm:text-base md:col-span-2"
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/user/login")}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
