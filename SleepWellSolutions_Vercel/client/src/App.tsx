import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";

import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ArticlesPage from "@/pages/ArticlesPage";
import ArticleDetailPage from "@/pages/ArticleDetailPage";
import SleepQuizPage from "@/pages/SleepQuizPage";
import NotFound from "@/pages/not-found";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/products/:slug" component={ProductDetailPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/learn" component={ArticlesPage} />
          <Route path="/learn/:slug" component={ArticleDetailPage} />
          <Route path="/quiz" component={SleepQuizPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <div id="modal-root"></div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router />
      <Toaster />
    </CartProvider>
  );
}

export default App;
