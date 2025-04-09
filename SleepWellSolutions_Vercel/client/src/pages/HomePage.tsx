import Hero from "@/components/home/Hero";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import Benefits from "@/components/home/Benefits";
import ProductCatalog from "@/components/home/ProductCatalog";
import Testimonials from "@/components/home/Testimonials";
import ArticleSection from "@/components/home/ArticleSection";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";
import Newsletter from "@/components/home/Newsletter";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>TrimSleep - Sonno Migliore, Domani Migliore</title>
        <meta name="description" content="Integratori per il sonno scientificamente testati per aiutarti ad addormentarti più velocemente, a dormire più a lungo e a svegliarti rigenerato." />
      </Helmet>
      
      <Hero />
      <FeaturedProduct />
      <Benefits />
      <ProductCatalog />
      <Testimonials />
      <ArticleSection />
      <HowItWorks />
      <FAQ />
      <CTASection />
      <Newsletter />
    </>
  );
};

export default HomePage;
