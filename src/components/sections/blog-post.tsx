import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/** Strip all HTML tags except safe inline elements (a, strong, em, br, li, ul, ol, p) */
function sanitizeHtml(html: string): string {
  return html.replace(/<\/?(?!a\b|strong\b|em\b|br\b|li\b|ul\b|ol\b|p\b)[a-z][^>]*>/gi, "");
}

interface RelatedPost {
  id: string;
  title: string;
  image?: string;
  pubDate: string;
  categories: string[];
}

const BlogPost = ({
  post,
  relatedPosts = [],
  categories = {},
  children,
}: {
  post: any;
  relatedPosts?: RelatedPost[];
  categories?: Record<string, string>;
  children: React.ReactNode;
}) => {
  const {
    title,
    authorName = "Team Plivo",
    image,
    pubDate,
    description,
    keyTakeaways,
    categories: postCategories = [],
  } = post.data;

  return (
    <div className="relative">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container max-w-4xl py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-400">
            <a href="/" className="hover:text-gray-600 transition-colors">Home</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <a href="/blog/" className="hover:text-gray-600 transition-colors">Blog</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-600 truncate max-w-xs">{title}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="relative bg-white pb-8 pt-10 md:pt-16">
        <div className="container max-w-4xl">
          <div className="mb-8 text-center">
            {/* Category badges */}
            {postCategories.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                {postCategories.slice(0, 3).map((cat: string) => (
                  <a key={cat} href={`/blog/?category=${cat}`}>
                    <Badge
                      variant="outline"
                      className="px-3 py-1 text-xs text-gray-500 border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                    >
                      {categories[cat] || cat}
                    </Badge>
                  </a>
                ))}
              </div>
            )}

            <h1 className="mb-4 font-sora text-2xl font-medium leading-tight tracking-tight md:text-3xl lg:text-4xl text-black">
              {title}
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-normal leading-relaxed text-gray-500">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span>{format(pubDate, "MMMM d, yyyy")}</span>
            <span>&middot;</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
            <span>&middot;</span>
            <span>By {authorName}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {image && (
        <div className="relative mx-auto -mt-2 max-w-4xl px-4 md:-mt-4">
          <div className="aspect-[16/9] overflow-hidden rounded-lg border border-gray-200">
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container">
        <div className="mx-auto my-10 max-w-3xl space-y-10 md:my-14">
          {/* Key Takeaways */}
          {keyTakeaways && (
            <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
                Key Takeaways
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-600 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(keyTakeaways) }}
              />
            </div>
          )}

          {/* Article Body */}
          <article className="blog-content prose prose-lg prose-h1:font-sora prose-h2:font-sora prose-headings:font-medium prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-base prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-[#323dfe] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-blockquote:border-l-[#323dfe] prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:not-italic prose-strong:text-black prose-li:text-gray-700 max-w-none">
            {children}
          </article>

          <Separator className="bg-gray-200" />

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#cd3ef9] via-[#323dfe] to-black text-white font-semibold text-lg">
              P
            </div>
            <div>
              <div className="font-semibold text-black">{authorName}</div>
              <div className="text-sm text-gray-500">Plivo Blog</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="container max-w-7xl">
            <h2 className="font-sora text-2xl font-medium text-black mb-8">
              Related Articles
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <a
                  key={rp.id}
                  href={`/blog/${rp.id}/`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    {rp.image && (
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {rp.categories?.[0] && (
                      <span className="mb-2 inline-block w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {categories[rp.categories[0]] || rp.categories[0]}
                      </span>
                    )}
                    <h3 className="text-base font-semibold text-black leading-tight group-hover:text-gray-700 transition-colors line-clamp-2">
                      {rp.title}
                    </h3>
                    <span className="mt-3 text-xs text-gray-400">
                      {format(new Date(rp.pubDate), "MMM d, yyyy")}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { BlogPost };
