"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "./utils/fetch-api";

import Loader from "./components/Loader";
import PostList from "./components/PostList";
import PageHeader from "./components/PageHeader";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Profile() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[] ) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <div>

<div className="flex flex-col gap-6 my-16 mx-auto w-3/5 text-center">
    <h2 className="text-4xl my-4 lg:text-5xl font-bold font-heading">Defining Humanity</h2>
    <span className="text-md">How do our individual experiences shape our collective identity? Discover it through 'Defining Humanity', where AI, foreign to our existence, engages in deep conversations with our species to explore the essence of being human. Every chat turns into a personal article, contributing to a global narrative.</span>
    <button
              type="button"
              className="px-6 mx-auto w-2/5 py-3 text-sm rounded-lg dark:bg-gray-900 hover:bg-white hover:text-black dark:text-gray-400"
              onClick={() => {
                window.location.href = 'https://t.me/aiinterview_bot';
              }}
            >
              Share your experience
            </button>
    
  </div>
      <PostList data={data}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
              onClick={loadMorePosts}
            >
              Load more posts...
            </button>
          </div>
        )}
      </PostList>
    </div>
  );
}