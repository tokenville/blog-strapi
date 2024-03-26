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
              <div className="relative flex items-center justify-center" style={{ height: '500px' }}>
                <div className="p-6 space-y-2">
                  <div>
                    <h3 className="text-2xl text-center font-semibold group-hover:underline group-focus:underline">
                      {article.attributes.title}
                    </h3>
                    
                    {imageUrl && (
                    <Image
                      alt="presentation"
                      width="240"
                      height="240"
                      className="object-cover w-full h-80 mx-auto"
                      src={imageUrl}
                    />
                    )}
                    <div className="mx-auto">
                      
      <div className="flex flex-col text-center">
        <div className="text-s dark:text-gray-400">
          {authorsBio && (
            <span>{authorsBio.name}</span>
          )}
        </div>
        <div className="text-xs dark:text-gray-400">
          <span>{formatDate(article.attributes.updatedAt)}</span>
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
