'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { addCategory, updateCategory } from '@/lib/strapi/actions/category';
import { generateSlug } from '@/lib/utils';
import { SubmitButton } from '@/components/shared/submitButton';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.',
  }),
  slug: z.string().min(2, {
    message: 'Slug must be at least 2 characters.',
  }),
  description: z.string().optional(),
  image: z.string().url({ message: 'Invalid URL format' }), // Added image field
  parent_category: z.string().optional(),
});

export default function CategoryForm({ categoryData, categories }) {
  const router = useRouter();
  console.log({ categoryData, categories });

  let defaultValues = {
    name: '',
    slug: '',
    description: '',
    image: '',
    parent_category: 'null',
  };

  if (categoryData?.documentId) {
    const { name, slug, description, image, parent_category } = categoryData;
    defaultValues = {
      name,
      slug,
      description,
      image: image || '',
      parent_category: parent_category ? parent_category?.documentId : 'null',
    };
  }

  const form = useForm({ resolver: zodResolver(formSchema), defaultValues });

  const onSubmit = async (values) => {
    console.log({ values });

    const { name, slug, description, image, parent_category } = values;

    if (!name || !slug || !image) {
      return toast.error('Please enter the required fields.');
    }

    const data = { 
      name, 
      slug, 
      description, 
      image, 
      parent_category: parent_category === 'null' ? null : parent_category 
    };

    console.log({ data });

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
                      <Input
                        placeholder="Enter Category Name"
                        {...field}
                        onChange={(e) => {
                          form.setValue('name', e.target.value);
                          form.setValue('slug', generateSlug(e.target.value));
                        }}
                      />
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parent_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Add Parent Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='null'>
                          Null
                        </SelectItem>
                        {categories
                          .filter((category) => categoryData?.documentId !== category.documentId)
                          .map((category) => (
                            <SelectItem key={category.documentId} value={category.documentId}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <SubmitButton className="flex justify-end">
              {categoryData ? 'Update' : 'Add'}
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
