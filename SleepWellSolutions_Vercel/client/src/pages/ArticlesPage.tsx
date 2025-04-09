import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { type Article } from "@shared/schema";

const ArticlesPage = () => {
  const [category, setCategory] = useState<string>("all");
  
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });
  
  const filteredArticles = articles && category !== 'all'
    ? articles.filter(article => article.category === category)
    : articles;
  
  const categoryLabels: Record<string, string> = {
    all: "All Articles",
    sleep_disorders: "Sleep Disorders",
    sleep_tips: "Sleep Tips",
    supplements: "Supplements",
    research: "Research",
  };
  
  return (
    <>
      <Helmet>
        <title>Sleep Resources & Articles | TrimSleep</title>
        <meta name="description" content="Learn about sleep disorders, better sleep habits, and the science behind sleep supplements." />
      </Helmet>
      
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Sleep Resources</h1>
          <p className="max-w-2xl mx-auto text-lg text-neutral-100">
            Expert articles, research, and tips to help you understand and improve your sleep quality.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            {Object.entries(categoryLabels).map(([value, label]) => (
              <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-7 w-full mb-3" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredArticles && filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <Link key={article.id} href={`/learn/${article.slug}`} className="group">
                    <div className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col bg-white">
                      <div className="overflow-hidden">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title} 
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <span className="text-accent text-sm font-medium">
                          {article.category.replace('_', ' ').toUpperCase()}
                        </span>
                        <h2 className="text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-neutral-600 mb-4 flex-1">{article.summary}</p>
                        <div className="flex items-center text-sm text-neutral-500">
                          <span>{article.readTime} min read</span>
                          <span className="mx-2">•</span>
                          <span>{article.author}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-neutral-600">
                  Check back soon for new content or select a different category.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ArticlesPage;
