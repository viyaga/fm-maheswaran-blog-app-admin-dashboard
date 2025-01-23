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
import { updateSiteSetting } from '@/lib/actions/site-setting'; // Update import according to your function

const formSchema = z.object({
    site_title: z.string().min(2, {
        message: 'Site title must be at least 2 characters.',
    }),
    site_description: z.string().optional(),
    site_logo_url: z.string().url().optional(),
    favicon_url: z.string().url().optional(),
    primary_color: z.string().min(7, {
        message: 'Primary color must be in hex format.',
    }),
    secondary_color: z.string().min(7, {
        message: 'Secondary color must be in hex format.',
    }),
    meta_keywords: z.string().optional(),
    meta_description: z.string().optional(),
    facebook_url: z.string().url().optional(),
    twitter_url: z.string().url().optional(),
    instagram_url: z.string().url().optional(),
    linkedin_url: z.string().url().optional(),
    youtube_url: z.string().url().optional(),
    contact_email: z.string().email({
        message: 'Please enter a valid contact email address.',
    }),
    contact_phone: z.string().optional(),
    address: z.string().optional(),
});

export default function SiteSettingForm({ siteSettingData }) {
    const router = useRouter();

    const {
        site_title,
        site_description,
        site_logo_url,
        favicon_url,
        primary_color,
        secondary_color,
        meta_keywords,
        meta_description,
        facebook_url,
        twitter_url,
        instagram_url,
        linkedin_url,
        youtube_url,
        contact_email,
        contact_phone,
        address,
    } = siteSettingData;

    const defaultValues = {
        site_title: site_title || "",
        site_description: site_description || "",
        site_logo_url: site_logo_url || "",
        favicon_url: favicon_url || "",
        primary_color: primary_color || "#000000", // Ensure a default hex color
        secondary_color: secondary_color || "#FFFFFF", // Ensure a default hex color
        meta_keywords: meta_keywords || "",
        meta_description: meta_description || "",
        facebook_url: facebook_url || "",
        twitter_url: twitter_url || "",
        instagram_url: instagram_url || "",
        linkedin_url: linkedin_url || "",
        youtube_url: youtube_url || "",
        contact_email: contact_email || "",
        contact_phone: contact_phone || "",
        address: address || "",
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (values) => {
        const { site_title, site_logo_url, favicon_url, contact_email } = values;

        // Check for required fields
        if (!site_title || !site_logo_url || !favicon_url || !contact_email) {
            return toast.error('Please enter the required fields.');
        }

        // Update site setting
        const updatedSetting = await updateSiteSetting({
            settingData: values,
            defaultValues
        });

        if (updatedSetting?.error) return toast.error(updatedSetting?.error);

        return toast.success(updatedSetting.message);
    }

    return (
        <div className='flex flex-col space-y-8'>
            <Card className="mx-auto w-full">
                <CardHeader>
                    <CardTitle className="text-left text-2xl font-bold">
                        Site Setting
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Site Title */}
                                <FormField
                                    control={form.control}
                                    name="site_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Site Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Site Description */}
                                <FormField
                                    control={form.control}
                                    name="site_description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Site Description"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Site Logo URL */}
                                <FormField
                                    control={form.control}
                                    name="site_logo_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Logo URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Site Logo URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Favicon URL */}
                                <FormField
                                    control={form.control}
                                    name="favicon_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Favicon URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Favicon URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Primary Color */}
                                <FormField
                                    control={form.control}
                                    name="primary_color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Primary Color</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Primary Color Hex" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Secondary Color */}
                                <FormField
                                    control={form.control}
                                    name="secondary_color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Secondary Color</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Secondary Color Hex" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Contact Email */}
                                <FormField
                                    control={form.control}
                                    name="contact_email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter Contact Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Contact Phone */}
                                <FormField
                                    control={form.control}
                                    name="contact_phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Contact Phone" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Address */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="flex justify-end">
                                {siteSettingData ? 'Update Setting' : 'Add Setting'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="mx-auto w-full">
                <CardHeader>
                    <CardTitle className="text-left text-2xl font-bold">
                        Site Setting
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Site Title */}
                                <FormField
                                    control={form.control}
                                    name="site_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Site Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Site Description */}
                                <FormField
                                    control={form.control}
                                    name="site_description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Site Description"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Site Logo URL */}
                                <FormField
                                    control={form.control}
                                    name="site_logo_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Logo URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Site Logo URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Favicon URL */}
                                <FormField
                                    control={form.control}
                                    name="favicon_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Favicon URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Favicon URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Primary Color */}
                                <FormField
                                    control={form.control}
                                    name="primary_color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Primary Color</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Primary Color Hex" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Secondary Color */}
                                <FormField
                                    control={form.control}
                                    name="secondary_color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Secondary Color</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Secondary Color Hex" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Contact Email */}
                                <FormField
                                    control={form.control}
                                    name="contact_email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter Contact Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Contact Phone */}
                                <FormField
                                    control={form.control}
                                    name="contact_phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Contact Phone" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Address */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="flex justify-end">
                                {siteSettingData ? 'Update Setting' : 'Add Setting'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="mx-auto w-full">
                <CardHeader>
                    <CardTitle className="text-left text-2xl font-bold">
                        Site Setting
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Site Title */}
                                <FormField
                                    control={form.control}
                                    name="site_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Site Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Site Description */}
                                <FormField
                                    control={form.control}
                                    name="site_description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Site Description"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Site Logo URL */}
                                <FormField
                                    control={form.control}
                                    name="site_logo_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Logo URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Site Logo URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Favicon URL */}
                                <FormField
                                    control={form.control}
                                    name="favicon_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Favicon URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Favicon URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Primary Color */}
                                <FormField
                                    control={form.control}
                                    name="primary_color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Primary Color</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Primary Color Hex" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Secondary Color */}
                                <FormField
                                    control={form.control}
                                    name="secondary_color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Secondary Color</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Secondary Color Hex" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Contact Email */}
                                <FormField
                                    control={form.control}
                                    name="contact_email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter Contact Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Contact Phone */}
                                <FormField
                                    control={form.control}
                                    name="contact_phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Contact Phone" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Address */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="flex justify-end">
                                {siteSettingData ? 'Update Setting' : 'Add Setting'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
