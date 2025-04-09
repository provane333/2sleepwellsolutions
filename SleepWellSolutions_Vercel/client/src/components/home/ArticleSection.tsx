import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateText } from "@/lib/utils";
import { type Article } from "@shared/schema";

const ArticleSection = () => {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles/featured'],
  });
  
  if (isLoading) {
    return (
      <section id="learn" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Risorse sul Sonno</h2>
              <p className="text-neutral-600">Informati sui disturbi del sonno e su come migliorare la qualità del tuo sonno</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-neutral-200 rounded-lg overflow-hidden">
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
        </div>
      </section>
    );
  }
  
  if (!articles || articles.length === 0) {
    return null;
  }
  
  return (
    <section id="learn" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Risorse sul Sonno</h2>
            <p className="text-neutral-600">Informati sui disturbi del sonno e su come migliorare la qualità del tuo sonno</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/learn" className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors">
              Visualizza Tutti gli Articoli
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/learn/${article.slug}`} className="group">
              <div className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
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
                  <h3 className="text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 flex-1">{article.summary}</p>
                  <div className="flex items-center text-sm text-neutral-500">
                    <span>{article.readTime} min di lettura</span>
                    <span className="mx-2">•</span>
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
