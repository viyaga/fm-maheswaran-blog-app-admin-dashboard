"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { addBlog, updateBlog } from '@/lib/actions/blog';
import RichTextEditor from './rich-text-editor';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  slug: z.string().min(1, { message: 'Slug is required.' }),
  excerpt: z.string().optional(),
  content: z.string().min(1, { message: 'Content is required.' }),
  featured_image: z.string().url({ message: 'Please enter a valid image URL.' }).optional(),
  blog_status: z.enum(['draft', 'published'], { message: 'Please select a status.' }),
  seo_meta_title: z.string().optional(),
  seo_meta_description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export default function BlogForm({ blogData }) {
  const [content, setContent] = React.useState("")
  const router = useRouter();

  let defaultValues = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    blog_status: 'draft',
    seo_meta_title: '',
    seo_meta_description: '',
    tags: [],
  };

  if (blogData?.documentId) {
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      blog_status,
      seo_meta_title,
      seo_meta_description,
      tags,
    } = blogData;

    defaultValues = {
      title,
      slug,
      excerpt: excerpt || '',
      content: content || '',
      featured_image: featured_image || '',
      blog_status: blog_status || '',
      seo_meta_title: seo_meta_title || '',
      seo_meta_description: seo_meta_description || '',
      tags: tags || [],
    };
  }

  const form = useForm({ resolver: zodResolver(formSchema), defaultValues });

  const onSubmit = async (values) => {
    const data = { ...values };

    return console.log({ content });

    if (blogData?.documentId) {
      const updatedBlog = await updateBlog({ documentId: blogData.documentId, blogData: data, defaultValues });
      if (updatedBlog?.error) return toast.error(updatedBlog.error);

      toast.success(updatedBlog?.message);
      return router.push('/dashboard/blogs');
    }

    const newBlog = await addBlog(data);

    if (newBlog?.error) return toast.error(newBlog.error);

    toast.success(newBlog.message);
    form.reset();
    router.push('/dashboard/blogs');
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {blogData ? 'Edit Blog' : 'Add New Blog'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
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
                      <Input placeholder="Enter blog slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter featured image URL"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="blog_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a short excerpt for the blog"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={content}
                      onChange={(newContent) => setContent(newContent)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField>
            <RichTextEditor
              content={content}
              onChange={(newContent) => setContent(newContent)}
            />
            </FormField> */}
            <Button type="submit" className="flex justify-end">
              {blogData ? 'Update Blog' : 'Add Blog'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
