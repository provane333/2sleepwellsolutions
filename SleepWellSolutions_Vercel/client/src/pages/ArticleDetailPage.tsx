import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { createMarkup } from "@/lib/utils";
import { type Article } from "@shared/schema";

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: [`/api/articles/${slug}`],
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-full mb-4" />
          <div className="flex items-center mb-6">
            <Skeleton className="h-6 w-32 mr-4" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="w-full h-96 rounded-lg mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/learn">Back to Articles</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{article.title} | TrimSleep</title>
        <meta name="description" content={article.summary} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="pl-0">
            <Link href="/learn">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
              {article.category.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
          
          <div className="flex flex-wrap items-center text-neutral-600 mb-8">
            <div className="flex items-center mr-6 mb-2">
              <User className="h-4 w-4 mr-2" />
              <span>{article.author}</span>
              {article.authorTitle && (
                <span className="text-neutral-500 ml-1">({article.authorTitle})</span>
              )}
            </div>
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 mr-2" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
          
          <div className="mb-8">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={createMarkup(article.content)} />
          </div>
          
          <Separator className="my-12" />
          
          <div className="bg-neutral-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Still having sleep issues?</h3>
            <p className="mb-6">Our science-backed sleep supplements can help you achieve better, more restful sleep.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/products">Browse Sleep Solutions</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/quiz">Take Sleep Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetailPage;
