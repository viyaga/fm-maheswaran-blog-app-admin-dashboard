'use client';

import { SubmitButton } from '@/components/shared/submitButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginUser } from '@/lib/strapi/actions/authenticate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export default function UserAuthForm() {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const router = useRouter()

  const form = useForm({ resolver: zodResolver(formSchema), defaultValues: { email: "", password: "" } });

  const onLogin = async ({ email, password }) => {

    if (!email || !password) return toast.error("Please enter the required field")

    const res = await loginUser(email.toLowerCase(), password)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success('Signed In Successfully!');
      form.reset()
      router.replace('/dashboard')
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onLogin)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    {...field}
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
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton className="ml-auto w-full">
            Submit
          </SubmitButton>
        </form>
      </Form>
      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase text-center">
          <span className="bg-background px-2 text-muted-foreground">
            Welcome back! Manage your content, track insights, and keep your blog thriving—all from one powerful dashboard.
          </span>
        </div>
      </div>
    </>
  );
}
