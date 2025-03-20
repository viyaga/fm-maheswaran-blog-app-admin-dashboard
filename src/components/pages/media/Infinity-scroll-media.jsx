"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import MediaCard from "./media-card";
import { getAllMediaFiles } from "@/lib/strapi/actions/media";
import { Loader2 } from "lucide-react";

// Debounce function to prevent excessive API calls
const debounce = (callback, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

const InfinityScrollMedia = ({ initialMediaFiles }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [page, setPage] = useState(2); // Start from page 2 as page 1 is loaded on the server
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const pageSize = 10;
  const sort = "createdAt:DESC";
  const fields = "name,url,width,height,alternativeText,ext";

  const loadMoreMediaFiles = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await getAllMediaFiles({
        fields,
        filters: [],
        pagination: { page, pageSize },
        sort,
        revalidate: 60 * 60 * 24 * 365,
        tags: ["mediaFiles"],
      });

      if (!response.length || response.error) {
        setHasMore(false);
        return;
      }

      setMediaFiles((prev) => [...prev, ...response]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading more media files:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  const debouncedLoadMoreMediaFiles = useCallback(debounce(loadMoreMediaFiles, 300), [loadMoreMediaFiles]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) debouncedLoadMoreMediaFiles();
      },
      { rootMargin: "100px" }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [debouncedLoadMoreMediaFiles, hasMore]);

  useEffect(() => {
    if (initialMediaFiles.length) setMediaFiles(initialMediaFiles);
    setHasMore(true); setPage(2);
  }, [initialMediaFiles, setHasMore, setPage]);

  return (
    <>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 w-full mx-auto">
        {mediaFiles.map((item, index) => (
          <MediaCard key={index} {...item} />
        ))}
      </div>
      {isLoading &&
        <p className="flex justify-center items-center gap-2">
          <Loader2 className="mt-4 h-8 w-8 animate-spin text-primary" />
          Loading...
        </p>
      }
      <div ref={observerRef} className="h-10"></div>
    </>
  );
};

export default InfinityScrollMedia;
