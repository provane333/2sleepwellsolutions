import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { 
  insertProductSchema, 
  insertArticleSchema, 
  insertUserSchema, 
  insertOrderSchema, 
  insertCartSchema,
  insertFaqSchema,
  insertNewsletterSchema,
  insertTestimonialSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Error handling middleware for Zod validation errors
  const handleZodError = (error: unknown) => {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return { message: validationError.message };
    }
    return { message: String(error) };
  };

  // Products Endpoints
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (_req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/bestsellers", async (_req, res) => {
    try {
      const bestSellers = await storage.getBestSellerProducts();
      res.json(bestSellers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bestseller products" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const product = await storage.getProductBySlug(slug);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      const errorMessage = handleZodError(error);
      res.status(400).json(errorMessage);
    }
  });

  // Articles Endpoints
  app.get("/api/articles", async (_req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/featured", async (_req, res) => {
    try {
      const featuredArticles = await storage.getFeaturedArticles();
      res.json(featuredArticles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });

  app.get("/api/articles/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const articles = await storage.getArticlesByCategory(category);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles by category" });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const articleData = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(articleData);
      res.status(201).json(article);
    } catch (error) {
      const errorMessage = handleZodError(error);
      res.status(400).json(errorMessage);
    }
  });

  // Testimonials Endpoints
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/featured", async (_req, res) => {
    try {
      const featuredTestimonials = await storage.getFeaturedTestimonials();
      res.json(featuredTestimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(testimonial);
    } catch (error) {
      const errorMessage = handleZodError(error);
      res.status(400).json(errorMessage);
    }
  });

  // FAQs Endpoints
  app.get("/api/faqs", async (_req, res) => {
    try {
      const faqs = await storage.getFAQs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  app.post("/api/faqs", async (req, res) => {
    try {
      const faqData = insertFaqSchema.parse(req.body);
      const faq = await storage.createFAQ(faqData);
      res.status(201).json(faq);
    } catch (error) {
      const errorMessage = handleZodError(error);
      res.status(400).json(errorMessage);
    }
  });

  // User Endpoints
  app.post("/api/users/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Check if email already exists
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      const errorMessage = handleZodError(error);
      res.status(400).json(errorMessage);
    }
  });

  // Cart Endpoints
  app.get("/api/carts/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const cart = await storage.getCartBySessionId(sessionId);
      
      if (!cart) {
        // Return an empty cart if not found
        return res.json({ id: 0, sessionId, items: [], createdAt: new Date(), updatedAt: new Date() });
      }
      
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/carts", async (req, res) => {
    try {
      const cartData = insertCartSchema.parse(req.body);
      const cart = await storage.createCart(cartData);
      res.status(201).json(cart);
    } catch (error) {
      const errorMessage = handleZodError(error);
      res.status(400).json(errorMessage);
    }
  });

  app.put("/api/carts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await storage.getCart(Number(id));
      
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      
      const updatedCart = await storage.updateCart(Number(id), req.body);
      res.json(updatedCart);
    } catch (error) {
      res.status(400).json({ message: String(error) });
    }
  });

  app.delete("/api/carts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteCart(Number(id));
      
      if (!success) {
        return res.status(404).json({ message: "Cart not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete cart" });
    }
  });

  // Order Endpoints
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      const errorMessage = handleZodError(error);
      res.status(400).json(errorMessage);
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const order = await storage.getOrder(Number(id));
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.get("/api/users/:userId/orders", async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await storage.getUserOrders(Number(userId));
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user orders" });
    }
  });

  // Newsletter Endpoints
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // Check if already subscribed
      const isSubscribed = await storage.isEmailSubscribed(email);
      if (isSubscribed) {
        return res.json({ message: "Email already subscribed" });
      }
      
      const newsletter = await storage.subscribeToNewsletter(email);
      res.status(201).json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  return httpServer;
}
