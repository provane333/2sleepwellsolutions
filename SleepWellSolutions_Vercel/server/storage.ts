import {
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  articles, type Article, type InsertArticle,
  testimonials, type Testimonial, type InsertTestimonial,
  faqs, type FAQ, type InsertFAQ,
  carts, type Cart, type InsertCart,
  orders, type Order, type InsertOrder,
  newsletters, type Newsletter, type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getBestSellerProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Article operations
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // FAQ operations
  getFAQs(): Promise<FAQ[]>;
  createFAQ(faq: InsertFAQ): Promise<FAQ>;
  
  // Cart operations
  getCart(id: number): Promise<Cart | undefined>;
  getCartBySessionId(sessionId: string): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  updateCart(id: number, cart: Partial<InsertCart>): Promise<Cart | undefined>;
  deleteCart(id: number): Promise<boolean>;
  
  // Order operations
  getOrders(): Promise<Order[]>;
  getUserOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Newsletter operations
  subscribeToNewsletter(email: string): Promise<Newsletter>;
  isEmailSubscribed(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private articles: Map<number, Article>;
  private testimonials: Map<number, Testimonial>;
  private faqs: Map<number, FAQ>;
  private carts: Map<number, Cart>;
  private orders: Map<number, Order>;
  private newsletters: Map<number, Newsletter>;
  
  userIdCounter: number;
  productIdCounter: number;
  articleIdCounter: number;
  testimonialIdCounter: number;
  faqIdCounter: number;
  cartIdCounter: number;
  orderIdCounter: number;
  newsletterIdCounter: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.articles = new Map();
    this.testimonials = new Map();
    this.faqs = new Map();
    this.carts = new Map();
    this.orders = new Map();
    this.newsletters = new Map();
    
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.articleIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.faqIdCounter = 1;
    this.cartIdCounter = 1;
    this.orderIdCounter = 1;
    this.newsletterIdCounter = 1;
    
    // Initialize with seed data
    this.seedProducts();
    this.seedArticles();
    this.seedTestimonials();
    this.seedFAQs();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured,
    );
  }
  
  async getBestSellerProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.bestSeller,
    );
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const timestamp = new Date();
    const product: Product = { ...insertProduct, id, createdAt: timestamp };
    this.products.set(id, product);
    return product;
  }
  
  // Article operations
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }
  
  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }
  
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug,
    );
  }
  
  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (article) => article.featured,
    );
  }
  
  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (article) => article.category === category,
    );
  }
  
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.articleIdCounter++;
    const timestamp = new Date();
    const article: Article = { ...insertArticle, id, createdAt: timestamp };
    this.articles.set(id, article);
    return article;
  }
  
  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(
      (testimonial) => testimonial.featured,
    );
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const timestamp = new Date();
    const testimonial: Testimonial = { ...insertTestimonial, id, createdAt: timestamp };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // FAQ operations
  async getFAQs(): Promise<FAQ[]> {
    return Array.from(this.faqs.values());
  }
  
  async createFAQ(insertFaq: InsertFAQ): Promise<FAQ> {
    const id = this.faqIdCounter++;
    const faq: FAQ = { ...insertFaq, id };
    this.faqs.set(id, faq);
    return faq;
  }
  
  // Cart operations
  async getCart(id: number): Promise<Cart | undefined> {
    return this.carts.get(id);
  }
  
  async getCartBySessionId(sessionId: string): Promise<Cart | undefined> {
    return Array.from(this.carts.values()).find(
      (cart) => cart.sessionId === sessionId,
    );
  }
  
  async createCart(insertCart: InsertCart): Promise<Cart> {
    const id = this.cartIdCounter++;
    const timestamp = new Date();
    const cart: Cart = { 
      ...insertCart, 
      id, 
      createdAt: timestamp, 
      updatedAt: timestamp 
    };
    this.carts.set(id, cart);
    return cart;
  }
  
  async updateCart(id: number, updateData: Partial<InsertCart>): Promise<Cart | undefined> {
    const cart = this.carts.get(id);
    if (!cart) return undefined;
    
    const updatedCart: Cart = {
      ...cart,
      ...updateData,
      updatedAt: new Date()
    };
    
    this.carts.set(id, updatedCart);
    return updatedCart;
  }
  
  async deleteCart(id: number): Promise<boolean> {
    return this.carts.delete(id);
  }
  
  // Order operations
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId,
    );
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const timestamp = new Date();
    const order: Order = { ...insertOrder, id, createdAt: timestamp };
    this.orders.set(id, order);
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder: Order = {
      ...order,
      status: status as any
    };
    
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Newsletter operations
  async subscribeToNewsletter(email: string): Promise<Newsletter> {
    const existingNewsletter = Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email,
    );
    
    if (existingNewsletter) {
      return existingNewsletter;
    }
    
    const id = this.newsletterIdCounter++;
    const timestamp = new Date();
    const newsletter: Newsletter = { email, id, createdAt: timestamp };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  
  async isEmailSubscribed(email: string): Promise<boolean> {
    return Array.from(this.newsletters.values()).some(
      (newsletter) => newsletter.email === email,
    );
  }
  
  // Seed methods
  private seedProducts() {
    const products: InsertProduct[] = [
      {
        name: "Formula Sonno Trim",
        slug: "formula-sonno-trim",
        description: "Il nostro integratore del sonno con melatonina, valeriana e L-teanina ti aiuta ad addormentarti più velocemente e a dormire più a lungo. Svegliati riposato senza l'intontimento dei farmaci da prescrizione.",
        shortDescription: "Il nostro integratore del sonno formulato scientificamente ti aiuta ad addormentarti più velocemente e a svegliarti riposato senza l'intontimento dei farmaci da prescrizione.",
        price: 3999, // €39.99
        salePrice: null,
        category: "supplements",
        imageUrl: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: "Melatonina (3mg), Estratto di Valeriana (200mg), L-Teanina (100mg), Magnesio (120mg), GABA (100mg), Estratto di Melissa (80mg), Estratto di Passiflora (50mg)",
        benefits: ["Ingredienti clinicamente testati", "Formula non assuefacente", "Addormentati il 55% più velocemente", "Abbonati e risparmia il 20%"],
        featured: true,
        bestSeller: true,
        inStock: true,
        quantity: 30,
      },
      {
        name: "Sonno Profondo Trim",
        slug: "sonno-profondo-trim",
        description: "La nostra formula extra-forte è progettata per chi soffre di problemi persistenti del sonno. Questa potente combinazione di ingredienti naturali favorisce un sonno profondo e ristoratore anche nei casi più difficili di insonnia.",
        shortDescription: "Formula extra-forte per chi soffre di problemi persistenti del sonno.",
        price: 4999, // €49.99
        salePrice: null,
        category: "supplements",
        imageUrl: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: "Melatonina (5mg), Estratto di Valeriana (300mg), L-Teanina (200mg), Magnesio (150mg), GABA (200mg), 5-HTP (50mg), Estratto di Melissa (100mg), Estratto di Passiflora (100mg), Ashwagandha (100mg)",
        benefits: ["Formula extra-forte per casi difficili", "Favorisce cicli di sonno più profondi", "Tecnologia a rilascio prolungato", "Soluzione per il sonno senza farmaci"],
        featured: false,
        bestSeller: false,
        inStock: true,
        quantity: 30,
      },
      {
        name: "Bundle Sonno + Relax",
        slug: "bundle-sonno-relax",
        description: "La nostra formula completa giorno e notte affronta sia i problemi di sonno che lo stress diurno. La formula Sonno ti aiuta ad addormentarti naturalmente, mentre la formula Relax gestisce lo stress quotidiano che spesso porta a problemi di sonno.",
        shortDescription: "Formula giorno e notte per gestire lo stress e migliorare la qualità del sonno.",
        price: 7499, // €74.99
        salePrice: 5999, // €59.99
        category: "bundles",
        imageUrl: "https://images.unsplash.com/photo-1576967402682-19976eb930f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        ingredients: "Formula Sonno: Melatonina, Valeriana, L-Teanina, Magnesio. Formula Relax: Ashwagandha, L-Teanina, Rhodiola Rosea, Melissa, Magnesio.",
        benefits: ["Gestione sonno-stress 24 ore", "Risparmia il 25% rispetto all'acquisto separato", "Formule complementari che lavorano insieme", "Migliora sia la qualità del sonno che la resistenza allo stress"],
        featured: false,
        bestSeller: false,
        inStock: true,
        quantity: 60,
      }
    ];
    
    products.forEach(product => {
      this.createProduct(product);
    });
  }
  
  private seedArticles() {
    const articles: InsertArticle[] = [
      {
        title: "Comprendere l'Insonnia: Cause e Soluzioni",
        slug: "comprendere-insonnia-cause-soluzioni",
        content: `<p>L'insonnia è un disturbo del sonno comune che colpisce milioni di italiani. Comporta difficoltà ad addormentarsi, a mantenere il sonno o a sperimentare un sonno non ristoratore nonostante un'adeguata opportunità di dormire. Questo articolo esplora le cause sottostanti e gli approcci basati sull'evidenza per affrontare l'insonnia.</p>
        
        <h2>Cause Comuni dell'Insonnia</h2>
        <ul>
          <li><strong>Stress e Ansia:</strong> Forse il fattore scatenante più comune per l'insonnia, lo stress psicologico attiva la risposta di attacco o fuga del corpo, rendendo difficile rilassarsi e addormentarsi.</li>
          <li><strong>Cattive Abitudini di Sonno:</strong> Orari di sonno irregolari, tempo davanti agli schermi prima di dormire e ambienti di sonno scomodi possono disturbare il tuo ciclo naturale sonno-veglia.</li>
          <li><strong>Condizioni Mediche:</strong> Condizioni come dolore cronico, asma e malattia da reflusso gastroesofageo (GERD) possono rendere difficile addormentarsi.</li>
          <li><strong>Farmaci:</strong> Molti farmaci da prescrizione, inclusi alcuni antidepressivi, corticosteroidi e farmaci per l'ipertensione, possono disturbare i modelli di sonno.</li>
          <li><strong>Disturbi del Ritmo Circadiano:</strong> Lavoro a turni, jet lag e orari irregolari possono desincronizzare l'orologio interno del tuo corpo.</li>
        </ul>
        
        <h2>Soluzioni Basate sull'Evidenza</h2>
        <p>La ricerca ha dimostrato diversi approcci efficaci per gestire l'insonnia:</p>
        
        <h3>1. Terapia Cognitivo Comportamentale per l'Insonnia (CBT-I)</h3>
        <p>Questo programma strutturato aiuta a identificare e sostituire pensieri e comportamenti che causano o peggiorano i problemi di sonno con abitudini che promuovono un sonno sano. A differenza dei sonniferi, la CBT-I affronta le cause sottostanti dell'insonnia piuttosto che limitarsi a trattare i sintomi. I componenti includono:</p>
        <ul>
          <li>Terapia di controllo degli stimoli (associare il letto con il sonno)</li>
          <li>Restrizione del sonno (limitare il tempo a letto per costruire la pressione del sonno)</li>
          <li>Educazione all'igiene del sonno</li>
          <li>Tecniche di rilassamento</li>
          <li>Ristrutturazione cognitiva (affrontare convinzioni dannose sul sonno)</li>
        </ul>
        
        <h3>2. Integratori Naturali</h3>
        <p>Diversi composti naturali hanno dimostrato benefici per la qualità del sonno:</p>
        <ul>
          <li><strong>Melatonina:</strong> Questo ormone aiuta a regolare i cicli sonno-veglia. Studi clinici mostrano che può ridurre il tempo necessario per addormentarsi di una media di 7 minuti e può migliorare la qualità del sonno.</li>
          <li><strong>Valeriana:</strong> La ricerca suggerisce che questa erba può aiutare le persone ad addormentarsi più velocemente e migliorare la qualità del sonno, in particolare per coloro che soffrono di insonnia lieve.</li>
          <li><strong>L-teanina:</strong> Trovata nelle foglie di tè, questo amminoacido promuove il rilassamento senza sonnolenza e può migliorare la qualità del sonno riducendo l'ansia.</li>
          <li><strong>Magnesio:</strong> Questo minerale svolge un ruolo chiave nella regolazione dei neurotrasmettitori coinvolti nel sonno. La carenza è associata all'insonnia e l'integrazione può migliorare la qualità del sonno.</li>
        </ul>
        
        <h3>3. Modifiche allo Stile di Vita</h3>
        <p>Semplici cambiamenti nelle abitudini quotidiane possono influenzare drasticamente la qualità del sonno:</p>
        <ul>
          <li>Mantenere orari di sonno e di sveglia costanti (anche nei fine settimana)</li>
          <li>Limitare caffeina e alcol, specialmente nel pomeriggio e alla sera</li>
          <li>Esercizio fisico regolare (ma non troppo vicino all'ora di dormire)</li>
          <li>Creare un ambiente di sonno fresco, buio e tranquillo</li>
          <li>Stabilire una routine rilassante pre-sonno</li>
          <li>Evitare gli schermi 1-2 ore prima di dormire</li>
        </ul>
        
        <h2>Quando Cercare Aiuto Professionale</h2>
        <p>Considera di consultare un medico se la tua insonnia:</p>
        <ul>
          <li>Persiste per più di un mese nonostante il tentativo di strategie di auto-aiuto</li>
          <li>È accompagnata da sintomi di un altro disturbo (come depressione o apnea del sonno)</li>
          <li>Impatta significativamente sul tuo funzionamento diurno, umore o qualità della vita</li>
          <li>Si verifica con altri sintomi preoccupanti come movimenti insoliti durante il sonno o forte russamento</li>
        </ul>
        
        <p>Ricorda che un trattamento efficace spesso comporta l'affrontare le cause sottostanti piuttosto che semplicemente mascherare i sintomi con farmaci. Un approccio completo che combina cambiamenti comportamentali, affrontando fattori psicologici e un'integrazione appropriata offre il percorso più sostenibile per un sonno migliore.</p>`,
        summary: "Scopri il disturbo del sonno più comune che colpisce milioni di italiani e gli approcci basati sull'evidenza per il trattamento.",
        category: "sleep_disorders",
        author: "Dott.ssa Emilia Rossi",
        authorTitle: "Specialista del Sonno, MD, PhD",
        imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        readTime: 8,
        featured: true,
      },
      {
        title: "10 Consigli di Igiene del Sonno per un Riposo Migliore",
        slug: "consigli-igiene-sonno-riposo-migliore",
        content: `<p>Una buona igiene del sonno comprende le abitudini e le pratiche che favoriscono un buon sonno su base regolare. Implementare questi cambiamenti semplici ma efficaci nella tua routine quotidiana e nell'ambiente della camera da letto può migliorare drasticamente la qualità del tuo sonno.</p>
        
        <h2>1. Mantieni un Programma di Sonno Costante</h2>
        <p>Andare a dormire e svegliarsi alla stessa ora ogni giorno—anche nei fine settimana—aiuta a regolare l'orologio interno del tuo corpo (ritmo circadiano). Un programma di sonno regolare rafforza il ciclo sonno-veglia del tuo corpo e aiuta a promuovere una migliore qualità del sonno.</p>
        <p><strong>Consiglio:</strong> Se hai bisogno di modificare il tuo programma di sonno, fallo gradualmente spostando l'orario di 15-30 minuti prima o dopo ogni giorno fino a raggiungere l'orario desiderato.</p>
        
        <h2>2. Crea una Routine Rilassante Prima di Dormire</h2>
        <p>Una routine costante di 30-60 minuti prima di andare a letto segnala al tuo corpo che è ora di dormire. Le attività rilassanti potrebbero includere:</p>
        <ul>
          <li>Leggere un libro (non su uno schermo)</li>
          <li>Fare un bagno o una doccia calda</li>
          <li>Praticare stretching leggero o yoga</li>
          <li>Ascoltare musica rilassante</li>
          <li>Meditazione o esercizi di respirazione profonda</li>
        </ul>
        <p><strong>Consiglio:</strong> Cerca di svolgere queste attività in un'illuminazione soffusa per aiutare a stimolare la produzione di melatonina del tuo corpo.</p>
        
        <h2>3. Ottimizza il Tuo Ambiente di Sonno</h2>
        <p>La tua camera da letto dovrebbe essere un santuario per il sonno:</p>
        <ul>
          <li><strong>Temperatura:</strong> Mantieni la tua camera da letto fresca (18-20°C è ideale per la maggior parte delle persone)</li>
          <li><strong>Rumore:</strong> Minimizza i suoni fastidiosi o usa una macchina per il rumore bianco</li>
          <li><strong>Luce:</strong> Rendi la tua stanza il più buia possibile (le tende oscuranti possono aiutare)</li>
          <li><strong>Comfort:</strong> Investi in un materasso di supporto e biancheria da letto comoda e traspirante</li>
        </ul>
        <p><strong>Consiglio:</strong> Considera l'uso di una mascherina per gli occhi e tappi per le orecchie se non puoi controllare la luce o il rumore nel tuo ambiente.</p>
        
        <h2>4. Limita il Tempo davanti agli Schermi Prima di Dormire</h2>
        <p>La luce blu emessa da telefoni, tablet, computer e TV può interferire con la produzione di melatonina, l'ormone che regola il sonno. Cerca di evitare gli schermi per almeno 1 ora prima di andare a dormire.</p>
        <p><strong>Consiglio:</strong> Se devi usare dispositivi, attiva la modalità notturna/filtri luce blu o indossa occhiali che bloccano la luce blu.</p>
        
        <h2>5. Sii Consapevole di Cibo e Bevande</h2>
        <ul>
          <li>Evita pasti abbondanti entro 2-3 ore prima di andare a dormire</li>
          <li>Limita la caffeina dopo mezzogiorno (può rimanere nel tuo sistema per oltre 6 ore)</li>
          <li>Riduci il consumo di alcol, specialmente vicino all'ora di dormire</li>
          <li>Mantieniti idratato durante il giorno, ma riduci l'assunzione di liquidi la sera per minimizzare le visite al bagno durante la notte</li>
        </ul>
        <p><strong>Consiglio:</strong> Se hai fame prima di andare a dormire, opta per uno spuntino leggero che combini carboidrati complessi e proteine, come una piccola ciotola di farina d'avena con un cucchiaio di burro di mandorle.</p>
        
        <h2>6. Esercitati Regolarmente</h2>
        <p>L'attività fisica regolare può aiutarti ad addormentarti più velocemente e a godere di un sonno più profondo, ma il timing è importante. Cerca di finire l'esercizio moderato o vigoroso almeno 3 ore prima di andare a dormire.</p>
        <p><strong>Consiglio:</strong> Lo stretching leggero o lo yoga la sera possono aiutare a rilassare i muscoli e preparare il tuo corpo per il sonno.</p>
        
        <h2>7. Gestisci lo Stress e l'Ansia</h2>
        <p>Pensieri veloci e preoccupazioni sono comuni disturbatori del sonno. Prova queste tecniche per calmare la tua mente:</p>
        <ul>
          <li>Tenere un diario per "scaricare" i pensieri prima di dormire</li>
          <li>Creare una lista di cose da fare per domani</li>
          <li>Praticare la meditazione mindfulness</li>
          <li>Utilizzare tecniche di rilassamento guidato</li>
        </ul>
        <p><strong>Consiglio:</strong> Tieni un blocco note vicino al letto per annotare i pensieri che sorgono dopo aver spento le luci, permettendoti di metterli da parte fino al mattino.</p>
        
        <h2>8. Limita i Sonnellini Diurni</h2>
        <p>Mentre brevi sonnellini possono aumentare la vigilanza e le prestazioni, sonnellini lunghi o irregolari possono interferire con il sonno notturno. Limita i sonnellini a 20-30 minuti ed evita di farli dopo le 15:00.</p>
        <p><strong>Consiglio:</strong> Un "sonnellino caffè" (bere una tazza di caffè immediatamente prima di un sonnellino di 20 minuti) può massimizzare la vigilanza per le ore successive.</p>
        
        <h2>9. Esponiti alla Luce Naturale</h2>
        <p>L'esposizione alla luce naturale del giorno aiuta a mantenere il tuo ritmo circadiano. Cerca di prendere almeno 30 minuti di luce naturale al giorno, preferibilmente al mattino.</p>
        <p><strong>Consiglio:</strong> Se non puoi uscire, considera l'uso di una light box terapeutica, specialmente durante i mesi invernali o se lavori a turni di notte.</p>
        
        <h2>10. Usa il Tuo Letto Solo per Dormire e l'Intimità</h2>
        <p>Rafforza l'associazione mentale tra il tuo letto e il sonno evitando attività come lavorare, mangiare o guardare la TV a letto.</p>
        <p><strong>Consiglio:</strong> Se non riesci ad addormentarti dopo 20 minuti, alzati e fai qualcosa di rilassante in luce soffusa fino a quando non ti senti assonnato, poi torna a letto.</p>
        
        <h2>Mettere Tutto Insieme</h2>
        <p>Non è necessario implementare tutti questi cambiamenti contemporaneamente. Inizia con quelli che sembrano più rilevanti per la tua situazione e aggiungi gradualmente gli altri man mano che diventano abitudini. La coerenza è fondamentale: le pratiche di igiene del sonno sono più efficaci quando seguite regolarmente nel tempo.</p>
        
        <p>Ricorda che un buon sonno non riguarda solo la quantità ma la qualità. Sette ore di sonno ininterrotto e ristoratore sono meglio di nove ore di sonno frammentato e leggero. Incorporando queste pratiche di igiene del sonno nella tua routine, sarai sulla strada per un riposo più rinfrescante e rigenerante.</p>`,
        summary: "Cambiamenti semplici ma efficaci nella tua routine quotidiana e nell'ambiente della camera da letto che possono migliorare drasticamente la qualità del tuo sonno.",
        category: "sleep_tips",
        author: "Sara Bianchi",
        authorTitle: "Coach del Sonno",
        imageUrl: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        readTime: 6,
        featured: true,
      },
      {
        title: "La Scienza Dietro gli Integratori per il Sonno",
        slug: "scienza-dietro-integratori-sonno",
        content: `<p>In un'epoca in cui i disturbi del sonno colpiscono milioni di persone in tutto il mondo, gli integratori naturali per il sonno sono diventati alternative sempre più popolari ai farmaci da prescrizione. Questa guida completa esplora la scienza dietro i comuni integratori per il sonno, la loro efficacia e come scegliere quello giusto per le tue esigenze.</p>
        
        <h2>Comprendere la Fisiologia del Sonno</h2>
        <p>Prima di approfondire gli integratori, è importante capire come funziona il sonno. Il sonno è regolato da due processi principali:</p>
        <ol>
          <li><strong>Ritmo circadiano</strong> - L'orologio interno di 24 ore del tuo corpo che regola la sonnolenza e la veglia</li>
          <li><strong>Omeostasi sonno-veglia</strong> - L'accumulo di pressione del sonno (adenosina) più a lungo si rimane svegli</li>
        </ol>
        <p>Gli integratori efficaci per il sonno in genere mirano a uno o entrambi questi processi, sia potenziando i segnali naturali del sonno sia riducendo i fattori che interferiscono con essi.</p>
        
        <h2>Integratori per il Sonno Basati sull'Evidenza</h2>
        
        <h3>1. Melatonina</h3>
        <p><strong>La Scienza:</strong> La melatonina è un ormone prodotto naturalmente dalla ghiandola pineale in risposta all'oscurità. Segnala al tuo corpo che è ora di dormire legandosi ai recettori nel tuo cervello che riducono l'attività nervosa.</p>
        <p><strong>Evidenza di Ricerca:</strong> Molteplici meta-analisi hanno scoperto che l'integrazione di melatonina può ridurre il tempo necessario per addormentarsi (latenza del sonno) di una media di 7-12 minuti e può leggermente migliorare il tempo totale di sonno. È particolarmente efficace per i disturbi del ritmo circadiano e il jet lag.</p>
        <p><strong>Dosaggio Efficace:</strong> La maggior parte degli studi utilizza 0,5-5mg presi 30-60 minuti prima di andare a dormire. Dosi più basse (0,5-1mg) possono essere efficaci quanto dosi più alte con meno effetti collaterali.</p>
        <p><strong>Considerazioni:</strong> La melatonina ha un'emivita breve (2-3 ore), quindi le formulazioni a rilascio prolungato possono essere migliori per chi si sveglia durante la notte. Sembra avere effetti collaterali minimi e basso rischio di dipendenza.</p>
        
        <h3>2. Valeriana</h3>
        <p><strong>La Scienza:</strong> Si pensa che la valeriana aumenti i livelli di GABA nel cervello, un neurotrasmettitore che inibisce l'eccessiva attività cerebrale e aiuta a indurre calma e sonno.</p>
        <p><strong>Evidenza di Ricerca:</strong> Una revisione sistematica di 60 studi ha scoperto che la valeriana può aiutare le persone ad addormentarsi più velocemente e può migliorare la qualità del sonno, in particolare per coloro che soffrono di insonnia lieve. Tuttavia, i risultati sono incoerenti tra gli studi.</p>
        <p><strong>Dosaggio Efficace:</strong> La maggior parte degli studi utilizza 300-900mg presi 30-60 minuti prima di andare a dormire.</p>
        <p><strong>Considerazioni:</strong> La valeriana ha un odore e un sapore distintivi che alcuni trovano sgradevoli. Gli effetti possono impiegare 2-4 settimane per diventare evidenti con l'uso regolare.</p>
        
        <h3>3. L-teanina</h3>
        <p><strong>La Scienza:</strong> Questo amminoacido presente nelle foglie di tè aumenta le onde cerebrali alfa, che sono associate a uno stato di vigilanza rilassata. Aumenta anche i livelli di GABA, serotonina e dopamina.</p>
        <p><strong>Evidenza di Ricerca:</strong> Gli studi dimostrano che la L-teanina può ridurre lo stress e l'ansia senza causare sonnolenza. Quando combinata con GABA, ha significativamente migliorato la qualità del sonno in uno studio del 2019.</p>
        <p><strong>Dosaggio Efficace:</strong> La maggior parte degli studi utilizza 200-400mg.</p>
        <p><strong>Considerazioni:</strong> La L-teanina è generalmente ben tollerata e può essere particolarmente utile per coloro i cui problemi di sonno derivano dall'ansia o da pensieri incessanti.</p>
        
        <h3>4. Magnesio</h3>
        <p><strong>La Scienza:</strong> Il magnesio è coinvolto in centinaia di reazioni biochimiche nel corpo e aiuta a regolare i neurotrasmettitori che sono direttamente correlati al sonno.</p>
        <p><strong>Evidenza di Ricerca:</strong> Gli studi dimostrano che l'integrazione di magnesio può aumentare il tempo di sonno, l'efficienza del sonno e la concentrazione di melatonina, riducendo al contempo i livelli di cortisolo. È particolarmente efficace negli adulti più anziani.</p>
        <p><strong>Dosaggio Efficace:</strong> 225-500mg al giorno, con magnesio glicinato o citrato che sono le forme più biodisponibili.</p>
        <p><strong>Considerazioni:</strong> Dosi elevate possono causare problemi digestivi. Coloro che soffrono di malattie renali dovrebbero consultare un medico prima dell'integrazione.</p>
        
        <h3>5. GABA (Acido Gamma-Aminobutirrico)</h3>
        <p><strong>La Scienza:</strong> GABA è il principale neurotrasmettitore inibitorio nel cervello, riducendo l'eccitabilità neuronale e promuovendo la calma.</p>
        <p><strong>Evidenza di Ricerca:</strong> Mentre il GABA è cruciale per il sonno quando prodotto nel cervello, c'è dibattito sul fatto che il GABA supplementare possa attraversare la barriera emato-encefalica. Alcuni studi mostrano benefici per la latenza del sonno e la qualità del sonno, ma è necessaria più ricerca.</p>
        <p><strong>Dosaggio Efficace:</strong> Gli studi in genere utilizzano 100-300mg.</p>
        <p><strong>Considerazioni:</strong> Il GABA può essere più efficace quando combinato con altri composti che ne aumentano gli effetti o l'assorbimento.</p>
        
        <h3>6. 5-HTP (5-Idrossitriptofano)</h3>
        <p><strong>La Scienza:</strong> Il 5-HTP è un precursore della serotonina, che è essa stessa un precursore della melatonina. Aumentando la produzione di serotonina, il 5-HTP può indirettamente supportare la sintesi di melatonina.</p>
        <p><strong>Evidenza di Ricerca:</strong> Studi limitati suggeriscono che il 5-HTP possa migliorare la qualità del sonno aumentando il sonno REM e riducendo i terrori notturni, in particolare in coloro che hanno disturbi dell'umore.</p>
        <p><strong>Dosaggio Efficace:</strong> 50-200mg prima di andare a dormire.</p>
        <p><strong>Considerazioni:</strong> Non dovrebbe essere assunto con SSRI o altri farmaci serotoninergici a causa del rischio di sindrome serotoninergica.</p>
        
        <h2>Combinazioni Sinergiche</h2>
        <p>La ricerca suggerisce che certi integratori funzionano meglio insieme grazie a meccanismi complementari:</p>
        <ul>
          <li><strong>Melatonina + L-teanina:</strong> Aiuta a segnalare l'inizio del sonno riducendo contemporaneamente l'ansia</li>
          <li><strong>Magnesio + GABA:</strong> Potenzia gli effetti calmanti del GABA</li>
          <li><strong>Valeriana + Melissa:</strong> Entrambi interagiscono con i sistemi GABA per un maggiore rilassamento</li>
        </ul>
        
        <h2>Scegliere l'Integratore Giusto</h2>
        <p>Gli integratori più efficaci per te dipendono dai tuoi problemi specifici di sonno:</p>
        <ul>
          <li><strong>Difficoltà ad addormentarsi:</strong> Melatonina, L-teanina</li>
          <li><strong>Problemi di sonno legati all'ansia:</strong> L-teanina, GABA, Valeriana</li>
          <li><strong>Svegliarsi durante la notte:</strong> Melatonina a rilascio prolungato, magnesio</li>
          <li><strong>Problemi di qualità del sonno:</strong> Magnesio, Valeriana, 5-HTP</li>
        </ul>
        
        <h2>Considerazioni Importanti</h2>
        <ol>
          <li><strong>La qualità è importante:</strong> Scegli prodotti da produttori rispettabili che si sottopongono a test di terze parti</li>
          <li><strong>Inizia con poco:</strong> Inizia con la dose efficace più bassa e aumenta gradualmente se necessario</li>
          <li><strong>Il timing è fondamentale:</strong> Segui le raccomandazioni su quando assumere ogni integratore rispetto all'ora di andare a dormire</li>
          <li><strong>Costanza:</strong> Gli integratori naturali spesso funzionano meglio quando assunti regolarmente</li>
          <li><strong>Interazioni:</strong> Consulta un operatore sanitario sulle potenziali interazioni con i farmaci</li>
          <li><strong>Uso temporaneo:</strong> Considera gli integratori come uno strumento per aiutare a ripristinare i modelli di sonno, non necessariamente come una soluzione permanente</li>
        </ol>
        
        <h2>Oltre gli Integratori: Un Approccio Olistico</h2>
        <p>Ricorda che gli integratori funzionano meglio come parte di una strategia completa per il sonno che include:</p>
        <ul>
          <li>Programma di sonno costante</li>
          <li>Ambiente di sonno adeguato (buio, fresco, silenzioso)</li>
          <li>Dieta sana e attività fisica regolare</li>
          <li>Tecniche di gestione dello stress</li>
          <li>Tempo limitato davanti agli schermi prima di dormire</li>
        </ul>
        
        <p>Comprendendo la scienza dietro gli integratori per il sonno e adottando un approccio mirato basato sulle tue esigenze specifiche, puoi fare scelte informate che portano a una migliore qualità del sonno e salute generale.</p>`,
        summary: "Una guida completa agli aiuti naturali per il sonno, la loro efficacia e come scegliere l'integratore giusto per le tue esigenze.",
        category: "supplements",
        author: "Dott. Michele Ricci",
        authorTitle: "Farmacologo, PhD",
        imageUrl: "https://images.unsplash.com/photo-1505576633757-0ac1084f63cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        readTime: 10,
        featured: true,
      }
    ];
    
    articles.forEach(article => {
      this.createArticle(article);
    });
  }
  
  private seedTestimonials() {
    const testimonials: InsertTestimonial[] = [
      {
        customerName: "Sara C.",
        rating: 5,
        review: "Ho lottato con l'insonnia per anni. Dopo solo una settimana di utilizzo della Formula Sonno Trim, mi addormento più velocemente e rimango addormentata tutta la notte.",
        imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
        verified: true,
        featured: true,
      },
      {
        customerName: "Michele T.",
        rating: 5,
        review: "Come lavoratore notturno, un sonno di qualità era impossibile da ottenere. Sonno Profondo Trim ha cambiato la mia vita. Finalmente mi sento riposato anche con il mio orario irregolare.",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        verified: true,
        featured: true,
      },
      {
        customerName: "Ginevra R.",
        rating: 4.5,
        review: "All'inizio ero scettica, ma dopo aver provato il Bundle Sonno + Relax, la mia ansia è diminuita e la qualità del mio sonno è migliorata notevolmente. Vale ogni centesimo!",
        imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
        verified: true,
        featured: true,
      }
    ];
    
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
  
  private seedFAQs() {
    const faqs: InsertFAQ[] = [
      {
        question: "Gli integratori Trim Sleep creano dipendenza?",
        answer: "No, i nostri integratori per il sonno sono formulati con ingredienti naturali che lavorano con i meccanismi naturali del sonno del tuo corpo senza causare dipendenza. A differenza di molti farmaci per il sonno su prescrizione, i prodotti Trim Sleep non portano a tolleranza o sintomi di astinenza quando si smette di assumerli.",
        category: "products",
        order: 1,
      },
      {
        question: "Quanto presto noterò i risultati?",
        answer: "La maggior parte dei clienti riporta miglioramenti nella qualità del sonno entro 3-5 giorni di uso costante. Tuttavia, i risultati ottimali si verificano generalmente dopo 2-3 settimane mentre il tuo corpo si adatta agli integratori e stabilisci una routine di sonno costante. I risultati individuali possono variare in base ai tuoi problemi specifici di sonno e alla tua salute generale.",
        category: "products",
        order: 2,
      },
      {
        question: "Posso prendere gli integratori Trim Sleep con altri farmaci?",
        answer: "Sebbene i nostri integratori contengano ingredienti naturali, raccomandiamo di consultare il tuo medico prima di combinare con farmaci da prescrizione, in particolare quelli per depressione, ansia, pressione sanguigna o altri aiuti per il sonno. Il tuo medico può fornire indicazioni specifiche per la tua storia medica e i farmaci attuali.",
        category: "products",
        order: 3,
      },
      {
        question: "Cosa succede se gli integratori non funzionano per me?",
        answer: "Supportiamo i nostri prodotti con una garanzia di soddisfazione di 60 giorni. Se non riscontri un sonno migliorato dopo aver usato costantemente i nostri prodotti come indicato, contatta il nostro team di assistenza clienti per un rimborso completo. Potremmo anche suggerirti di provare una formula diversa che potrebbe affrontare meglio i tuoi problemi specifici di sonno.",
        category: "products",
        order: 4,
      },
      {
        question: "In che modo gli integratori Trim Sleep sono diversi dai sonniferi da banco?",
        answer: "Molti sonniferi da banco si basano su antistaminici che possono causare sonnolenza mattutina, bocca secca e perdere efficacia nel tempo. I prodotti Trim Sleep utilizzano una miscela sinergica di ingredienti naturali che mirano a molteplici aspetti della qualità del sonno senza questi effetti collaterali, aiutandoti sia ad addormentarti più velocemente che a raggiungere cicli di sonno profondo più ristoratori.",
        category: "products",
        order: 5,
      }
    ];
    
    faqs.forEach(faq => {
      this.createFAQ(faq);
    });
  }
}

export const storage = new MemStorage();
