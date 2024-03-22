// ./frontend/src/app/[lang]/components/PostList.tsx

import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const imageUrl = getStrapiMedia(
            article.attributes.cover.data?.attributes.url
          );

          const category = article.attributes.category.data?.attributes;
          const authorsBio = article.attributes.authorsBio.data?.attributes;

          const avatarUrl = getStrapiMedia(
            authorsBio?.avatar.data.attributes.url
          );

          return (
            <Link
              href={`${category?.slug}/${article.attributes.slug}`}
              key={article.id}
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden"
            >
              <div className="relative" style={{ height: '220px' }}>
                {imageUrl && (
                  <Image
                    alt="presentation"
                    width="240"
                    height="240"
                    className="object-cover w-full h-80 opacity-30"
                    src={imageUrl}
                  />
                )}
                <div className="p-6 space-y-2 absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                      {article.attributes.title}
                    </h3>



<div className="object-cover flex space-x-2 absolute bottom-4 left-4">
                    {avatarUrl && (
                  <Image
                    alt="avatar"
                    width="80"
                    height="80"
                    src={avatarUrl}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                )}


                    <div className="flex flex-col">
                      <div className="text-s dark:text-gray-400">
                        {authorsBio && (
                          <span>{authorsBio.name}</span>
                        )}
                      </div>
                      <div className="text-xs dark:text-gray-400">
                        <span>{formatDate(article.attributes.publishedAt)}</span>
                      </div>
                    </div>
                    </div>


                    
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
