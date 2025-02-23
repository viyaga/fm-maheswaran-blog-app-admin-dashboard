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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { addCategory, updateCategory } from '@/lib/actions/category';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.',
  }),
  slug: z.string().min(2, {
    message: 'Slug must be at least 2 characters.',
  }),
  description: z.string().optional(),
  parent_id: z.string().optional(),
});

export default function CategoryForm({ categoryData }) {
  const router = useRouter();

  let defaultValues = {
    name: '',
    slug: '',
    description: '',
    parent_id: '',
  };

  if (categoryData?.id) {
    const { name, slug, description, parent_id } = categoryData;
    defaultValues = {
      name,
      slug,
      description,
      parent_id,
    };
  }

  const form = useForm({ resolver: zodResolver(formSchema), defaultValues });

  const onSubmit = async (values) => {
    const { name, slug, description, parent_id } = values;

    if (!name || !slug) {
      return toast.error('Please enter the required fields.');
    }

    const data = { name, slug, description, parent_id };

    // Update category
    if (categoryData?.documentId) {
      const updatedCategory = await updateCategory({
        documentId: categoryData?.documentId,
        categoryData: data,
        defaultValues,
      });

      if (updatedCategory?.error) return toast.error(updatedCategory?.error);

      toast.success(updatedCategory.message);
      return router.push('/dashboard/categories');
    }

    // Add new category
    const newCategory = await addCategory(data);

    if (newCategory?.error) return toast.error(newCategory?.error);

    toast.success(newCategory.message);

    form.reset();

    router.push('/dashboard/categories');
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {categoryData ? 'Category Information' : 'Add New Category'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Category Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parent_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Parent Category ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="flex justify-end">
              {categoryData ? 'Update' : 'Add'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
