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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { updateProfile } from '@/lib/actions/profile';

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: 'First name must be at least 2 characters.'
  }),
  last_name: z.string().min(2, {
    message: 'Last name must be at least 2 characters.'
  }),
  country: z.string().min(2, {
    message: 'Please enter a valid country name.'
  }),
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  fide_id: z.string().optional(),
  bio: z.string().max(500, {
    message: 'Bio must be at most 500 characters.'
  })
});

export default function ProfilePage({ adminData }) {

  let defaultValues = {
    first_name: '', last_name: '', country: '', username: '', email: '', fide_id: '', bio: ''
  };

  if (adminData?.id) {
    const { first_name, last_name, country, username, email, fide_id, bio } = adminData;
    defaultValues = { first_name, last_name, country, username, email, fide_id, bio };
  }

  const form = useForm({ resolver: zodResolver(formSchema), defaultValues });

  const onSubmit = async (values) => {
    const { first_name, last_name, country, username, email, fide_id, bio } = values;

    if (!first_name || !last_name || !country || !username || !email) return toast.error("Please enter the required fields");

    const data = { first_name, last_name, country, username, email, fide_id, bio };

    if (adminData?.id) {
      const updatedAdmin = await updateProfile({ id: adminData.id, adminData: data });
      if (updatedAdmin?.error) return toast.error(updatedAdmin?.error);
      toast.success(updatedAdmin.message);
      return
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {adminData ? "Chess Blog Admin Profile" : "Add Chess Blog Admin"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField control={form.control} name="first_name" render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="last_name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="country" render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="fide_id" render={({ field }) => (
                <FormItem>
                  <FormLabel>FIDE ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter FIDE ID (Optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="bio" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <Button type="submit" className="flex justify-end">{adminData ? "Update" : "Add"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
