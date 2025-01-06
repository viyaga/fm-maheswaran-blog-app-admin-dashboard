'use client';


import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { addUser, updateUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: 'First name must be at least 1 characters.'
  }),
  last_name: z.string().min(1, {
    message: 'Last name must be at least 1 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  country: z.string({
    required_error: 'Please select a country.'
  }),
  role: z.string({
    required_error: 'Please select a role.'
  }),
  prime_membership: z.number().min(0, {
    message: 'Subscription amount is required.'
  }),
  password: z.string(),
  confPassword: z.string(),
});

export default function UserForm({ userData }) {

  const router = useRouter()

  let defaultValues = {
    first_name: '', last_name: '', email: '', country: '',
    prime_membership: '', role: '', password: '', confPassword: '' // if add new user
  }

  if (userData?.id) {
    const { first_name, last_name, email, country, prime_membership, role } = userData

    defaultValues = {
      first_name, last_name, email, country, prime_membership,  //if update user
      role: role?.id?.toString(), password: '', confPassword: '',
    }

  }

  const form = useForm({ resolver: zodResolver(formSchema), defaultValues });

  const onSubmit = async (values) => {
    const { first_name, last_name, email, country, role, prime_membership, password, confPassword } = values

    if (!first_name || !last_name || !email || !country || !role || !prime_membership) return toast.error("Please enter the required field")
    if (password !== confPassword) return toast.error("Password and confirm password must be same")

    const data = { first_name, last_name, email, country, role, prime_membership, password, confPassword }

    //update user
    if (userData?.id) {

      const updatedUser = await updateUser({ id: userData?.id, userData: data, defaultValues })

      if (updatedUser?.error) return toast.error(updatedUser?.error)

      toast.success(updatedUser.message)
      form.reset()
      return router.push("/dashboard/users")
    }

    //add new user
    const newUser = await addUser(data)

    if (newUser?.error) return toast.error(newUser?.error)

    toast.success(newUser.message)
    form.reset()
    router.push("/dashboard/users")
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {userData ? "User Information" : "Add New User"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter User's First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter User's Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter User's Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="usa">USA</SelectItem>
                        <SelectItem value="uk">UK</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="brazil">Brazil</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">User</SelectItem>
                        <SelectItem value="3">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prime_membership"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter subscription amount"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                      <Input placeholder="Enter Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Confirm Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="flex justify-end">{userData ? "Update" : "Add"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}