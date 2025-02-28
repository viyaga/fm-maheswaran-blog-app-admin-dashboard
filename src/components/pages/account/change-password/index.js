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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { changePassword } from '@/lib/strapi/actions/profile';

const formSchema = z.object({
  current_password: z.string().min(6, {
    message: 'Current password must be at least 6 characters.'
  }),
  new_password: z.string().min(6, {
    message: 'New password must be at least 6 characters.'
  }),
  confirm_new_password: z.string().min(6, {
    message: 'Confirm password must be at least 6 characters.'
  })
}).refine((data) => data.new_password === data.confirm_new_password, {
  message: 'New password and confirm password must match.',
  path: ['confirm_new_password']
});

export default function ChangePassword({ adminId }) {
  const router = useRouter();

  const form = useForm({ resolver: zodResolver(formSchema), defaultValues: {
    current_password: '', new_password: '', confirm_new_password: ''
  }});

  const onSubmit = async (values) => {
    const { current_password, new_password } = values;

    const response = await changePassword({ id: adminId, current_password, new_password });
    if (response?.error) return toast.error(response?.error);
    
    toast.success(response.message);
    form.reset();
    router.push("/dashboard/chess-admins");
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField control={form.control} name="current_password" render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter Current Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="new_password" render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter New Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="confirm_new_password" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm New Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" className="flex justify-end">Change Password</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
