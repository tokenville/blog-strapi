import { formatDate, getStrapiMedia } from '@/app/[lang]/utils/api-helpers';
import { postRenderer } from '@/app/[lang]/utils/post-renderer';
import Image from 'next/image';

interface Article {
    id: number;
    attributes: {
        title: string;
        description: string;
        slug: string;
        cover: {
            data: {
                attributes: {
                    url: string;
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
        blocks: any[];
        updatedAt: string;
    };
}

export default function Post({ data }: { data: Article }) {
    const { title, description, updatedAt, cover, authorsBio } = data.attributes;
    const author = authorsBio.data?.attributes;
    const imageUrl = getStrapiMedia(cover.data?.attributes.url);
    const authorImgUrl = getStrapiMedia(authorsBio.data?.attributes.avatar.data.attributes.url);

    return (
        <article className="space-y-8 dark:bg-black dark:text-gray-50">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="article cover image"
                    width={400}
                    height={400}
                    className="w-full h-96 object-cover rounded-lg"
                />
            )}
            <div className="space-y-6">
                <h1 className="leading-tight text-center text-5xl font-bold ">{title}</h1>
                <div className="flex flex-col text-center">
                <div className="text-xs dark:text-gray-400">
                    <span>Defination of</span>
                    </div>
                    <div className="text-s dark:text-gray-400">
                    {authorsBio && (
                        <span>{author && author.name}</span>
                    )}
                    </div>
                    <div className="text-xs dark:text-gray-400">
          <span>{formatDate(updatedAt)}</span>
        </div>
                    </div>
                <p className="text-lg">{description}</p>
                <div className="flex flex-col items-center justify-between w-full md:flex-row md:items-center">
                    <div className="flex items-center md:space-x-2">
                        <p className="text-sm bg-gray-800 p-3">
                        Disclaimer: This entry is based on an interview with {author && author.name}, last updated on {formatDate(updatedAt)}. The text and questions are generated automatically by Artificial Intelligence as part of 'Defining Humanity' project.
                        </p>
                    </div>
                </div>
            </div>
            <div className="dark:text-gray-100">
            {data.attributes.blocks.map((section, index) => postRenderer(section, index, author?.name || "unknown"))}
            </div>
            {/* <div className="flex gap-4"> */}
                {/* {authorImgUrl && (
                    <Image
                        src={authorImgUrl}
                        alt="article cover image"
                        width={200}
                        height={200}
                        className="w-11 h-11 rounded-full mx-a"
                    />
                )} */}
                
            {/* </div> */}
            <h3 className="text-lg text-center py-5 my-10 lg:text-2xl font-bold font-heading">About Defining Humanity</h3>
    <span className="text-md">How do our individual experiences shape our collective identity? Discover it through 'Defining Humanity', where AI, foreign to our existence, engages in deep conversations with our species to explore the essence of being human. Every chat turns into a personal article, contributing to a global narrative.</span>


        </article>
        
    );
}
