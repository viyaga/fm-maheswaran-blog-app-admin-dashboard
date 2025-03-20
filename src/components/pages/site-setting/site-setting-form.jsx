'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateSiteSetting } from '@/lib/strapi/actions/site-setting';
import { capitalize, Utils } from '@/lib/utils';
import { SubmitButton } from '@/components/shared/submitButton';

const formSchema = z.object({
    title: z.string().max(255, 'Title is too long').nonempty('Title is required'),
    description: z.string().max(1000, 'Description is too long').nonempty('Description is required'),
    logo: z.string().max(255, 'Logo URL is too long').url('Invalid URL').nonempty('Logo URL is required'),
    favicon: z.string().max(255, 'Favicon URL is too long').url('Invalid URL').nonempty('Favicon URL is required'),
    meta_title: z.string().nonempty('Meta title is required'),
    meta_keywords: z.string().nonempty('Meta keywords are required'),
    meta_description: z.string().nonempty('Meta description is required'),
    facebook_url: z.string().max(255),
    x_url: z.string().max(255).optional(),
    instagram_url: z.string().max(255).optional(),
    youtube_url: z.string().max(255).optional(),
    contact_email: z.string().max(255, 'Email is too long').email('Invalid email').nonempty('Contact email is required'),
    contact_phone: z.string().max(20, 'Phone number is too long').nonempty('Contact phone is required'),
    address: z.string().max(500, 'Address is too long').nonempty('Address is required'),
});

export default function SiteSettingForm({ siteSettingData }) {
    const router = useRouter();

    const defaultValues = {
        title: siteSettingData?.title || "",
        description: siteSettingData?.description || "",
        logo: siteSettingData?.logo || "",
        favicon: siteSettingData?.favicon || "",
        meta_title: siteSettingData?.meta_title || "",
        meta_keywords: siteSettingData?.meta_keywords || "",
        meta_description: siteSettingData?.meta_description || "",
        facebook_url: siteSettingData?.facebook_url || "",
        x_url: siteSettingData?.x_url || "",
        instagram_url: siteSettingData?.instagram_url || "",
        youtube_url: siteSettingData?.youtube_url || "",
        contact_email: siteSettingData?.contact_email || "",
        contact_phone: siteSettingData?.contact_phone || "",
        address: siteSettingData?.address || "",
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (values) => {
        const updatedSetting = await updateSiteSetting({ settingData: values, defaultValues });

        if (updatedSetting?.error) return toast.error(updatedSetting.error);
        toast.success(updatedSetting.message);
        router.refresh();
    };

    return (
        <div className='flex flex-col space-y-8'>
            <Card className="mx-auto w-full">
                <CardHeader>
                    <CardTitle className="text-left text-2xl font-bold">
                        Site Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {Object.keys(defaultValues).map((field) => (
                                    <FormField
                                        key={field}
                                        control={form.control}
                                        name={field}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{Utils.textCapitalize(field.name.replace(/_/g, ' '))}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={`Enter ${field.name.replace(/_/g, ' ')}`} {...field} />
                                                </FormControl>
                                                {field.name === 'meta_title' && <FormDescription>Meta title should be within 60 characters for best SEO results.</FormDescription>}
                                                {field.name === 'meta_keywords' && <FormDescription>Use comma-separated keywords to optimize search visibility.</FormDescription>}
                                                {field.name === 'meta_description' && <FormDescription>Meta description should be concise and under 160 characters.</FormDescription>}
                                                {field.name === 'title' && <FormDescription>Title of your site, displayed in the browser tab.</FormDescription>}
                                                {field.name === 'description' && <FormDescription>Brief description of your site, used in search engine results.</FormDescription>}
                                                {field.name === 'x_url' && <FormDescription>URL of your X (formerly Twitter) profile.</FormDescription>}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                            <SubmitButton className="flex justify-end">
                                {siteSettingData ? 'Update Setting' : 'Add Setting'}
                            </SubmitButton>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
