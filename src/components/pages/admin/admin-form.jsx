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
import { useRouter } from 'next/navigation';
import { addAdmin, updateAdmin } from '@/lib/strapi/actions/admin';

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
  password: z.string(),
  confPassword: z.string(),
});

export default function AdminForm({ adminData }) {

  const router = useRouter()

  let defaultValues = {
    first_name: '', last_name: '', email: '',
    country: '', password: '', confPassword: ''                              // if add new admin
  }

  if (adminData?.id) {
    const { first_name, last_name, email, country } = adminData

    defaultValues = {
      first_name, last_name, email, country,                                  //if update admin
      password: '', confPassword: '',
    }

  }

  const form = useForm({ resolver: zodResolver(formSchema), defaultValues });

  const onSubmit = async (values) => {
    const { first_name, last_name, email, country, password, confPassword } = values

    if (!first_name || !last_name || !email || !country) return toast.error("Please enter the required field")
    if (password !== confPassword) return toast.error("Password and confirm password must be same")
    if (password?.length > 0 && password?.length < 6) return toast.error("Password must be at least 6 characters.")

    const data = { first_name, last_name, email, country, password, confPassword }

    //update admin
    if (adminData?.id) {

      const updatedAdmin = await updateAdmin({ id: adminData?.id, adminData: data, defaultValues })

      if (updatedAdmin?.error) return toast.error(updatedAdmin?.error)

      toast.success(updatedAdmin.message)
      return router.push("/dashboard/admins")
    }

    //add new admin
    const newAdmin = await addAdmin(data)

    if (newAdmin?.error) return toast.error(newAdmin?.error)

    toast.success(newAdmin.message)

    form.reset()

    router.push("/dashboard/admins")
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {adminData ? "Admin Information" : "Add New Admin"}
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
                      <Input placeholder="Enter Admin's First Name" {...field} />
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
                      <Input placeholder="Enter Admin's Last Name" {...field} />
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
                        placeholder="Enter Admin's Email"
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
            <Button type="submit" className="flex justify-end">{adminData ? "Update" : "Add"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}