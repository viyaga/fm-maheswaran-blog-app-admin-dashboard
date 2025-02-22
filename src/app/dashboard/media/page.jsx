import MediaLibrary from '@/components/pages/media'
import { searchParamsCache } from '@/lib/searchparams';
import React from 'react'

const page = async ({ searchParams }) => {
  await searchParamsCache.parse(searchParams);
  
  return <MediaLibrary />
}

export default page
