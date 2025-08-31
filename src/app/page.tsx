export default function HomePage() {
  return (
    <>
      {/* The HTML content will be rendered by the static files */}
      <div dangerouslySetInnerHTML={{
        __html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>LUMIÈRE - Luxury Perfume Collection</title>
              <meta name="description" content="Discover LUMIÈRE's exquisite collection of luxury perfumes. Crafted with the finest ingredients for the most sophisticated fragrance experience.">
              
              <!-- Google Fonts -->
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
              
              <!-- Stylesheets -->
              <link rel="stylesheet" href="/styles/style.css">
              <link rel="stylesheet" href="/styles/chatbot.css">
              <link rel="stylesheet" href="/styles/responsive.css">
          </head>
          <body>
              <!-- Header -->
              <header class="header">
                  <nav class="nav">
                      <div class="nav-brand">
                          <h1 class="brand-name">LUMIÈRE</h1>
                          <p class="brand-tagline">Luxury Perfumes</p>
                      </div>
                      <ul class="nav-menu">
                          <li><a href="#home" class="nav-link">Home</a></li>
                          <li><a href="#products" class="nav-link">Collection</a></li>
                          <li><a href="#about" class="nav-link">Heritage</a></li>
                          <li><a href="#contact" class="nav-link">Contact</a></li>
                      </ul>
                      <div class="nav-toggle">
                          <span></span>
                          <span></span>
                          <span></span>
                      </div>
                  </nav>
              </header>

              <!-- Main Content -->
              <main class="main">
                  <!-- Hero Section -->
                  <section id="home" class="hero">
                      <div class="hero-content">
                          <h2 class="hero-title">The Art of Luxury Fragrance</h2>
                          <p class="hero-subtitle">Discover our exclusive collection of handcrafted perfumes, where each bottle tells a story of elegance, sophistication, and timeless beauty.</p>
                          <div class="hero-actions">
                              <button class="btn-primary" onclick="scrollToSection('products')">Explore Collection</button>
                              <button class="btn-secondary" onclick="scrollToSection('about')">Our Story</button>
                          </div>
                      </div>
                      <div class="hero-image">
                          <img src="https://images.replicate.delivery/pbxt/K4i8fFLzJM3cTDFxrLCvQIKLnNcFhfNqsBGAx8XlLl6EQZGMA/output" alt="Elegant luxury perfume bottle with golden accents on marble surface" class="hero-img">
                      </div>
                  </section>

                  <!-- Products Section -->
                  <section id="products" class="products">
                      <div class="container">
                          <div class="section-header">
                              <h2 class="section-title">Our Signature Collection</h2>
                              <p class="section-subtitle">Each fragrance is a masterpiece, carefully crafted to capture the essence of luxury and sophistication</p>
                          </div>

                          <!-- Product Filters -->
                          <div class="product-filters">
                              <button class="filter-btn active" data-category="all">All Fragrances</button>
                              <button class="filter-btn" data-category="floral">Floral</button>
                              <button class="filter-btn" data-category="woody">Woody</button>
                              <button class="filter-btn" data-category="oriental">Oriental</button>
                              <button class="filter-btn" data-category="fresh">Fresh</button>
                          </div>

                          <!-- Product Grid -->
                          <div class="product-grid" id="productGrid">
                              <!-- Products will be dynamically loaded here -->
                          </div>
                      </div>
                  </section>

                  <!-- About Section -->
                  <section id="about" class="about">
                      <div class="container">
                          <div class="about-content">
                              <div class="about-text">
                                  <h2 class="section-title">Our Heritage</h2>
                                  <p class="about-description">
                                      LUMIÈRE represents the pinnacle of perfumery artistry. Founded on the principles of excellence and innovation, 
                                      we create fragrances that transcend time and capture the very essence of luxury.
                                  </p>
                                  <p class="about-description">
                                      Each bottle in our collection is a testament to our master perfumers' dedication to sourcing the finest 
                                      ingredients from around the world, blending traditional techniques with modern artistry.
                                  </p>
                                  <div class="about-features">
                                      <div class="feature">
                                          <h3 class="feature-title">Master Craftsmanship</h3>
                                          <p class="feature-text">Every fragrance is meticulously crafted by our expert perfumers</p>
                                      </div>
                                      <div class="feature">
                                          <h3 class="feature-title">Premium Ingredients</h3>
                                          <p class="feature-text">We source only the finest raw materials from around the globe</p>
                                      </div>
                                      <div class="feature">
                                          <h3 class="feature-title">Timeless Elegance</h3>
                                          <p class="feature-text">Our designs embody sophistication and luxury in every detail</p>
                                      </div>
                                  </div>
                              </div>
                              <div class="about-image">
                                  <img src="https://images.replicate.delivery/pbxt/K4i8fFLzJM3cTDFxrLCvQIKLnNcFhfNqsBGAx8XlLl6EQZGMA/output" alt="Master perfumer crafting luxury fragrances in elegant laboratory" class="about-img">
                              </div>
                          </div>
                      </div>
                  </section>

                  <!-- Contact Section -->
                  <section id="contact" class="contact">
                      <div class="container">
                          <div class="contact-content">
                              <div class="contact-info">
                                  <h2 class="section-title">Visit Our Boutique</h2>
                                  <div class="contact-details">
                                      <div class="contact-item">
                                          <h3 class="contact-label">Address</h3>
                                          <p class="contact-text">123 Luxury Boulevard<br>Fashion District, NY 10001</p>
                                      </div>
                                      <div class="contact-item">
                                          <h3 class="contact-label">Hours</h3>
                                          <p class="contact-text">Monday - Saturday: 10AM - 8PM<br>Sunday: 12PM - 6PM</p>
                                      </div>
                                      <div class="contact-item">
                                          <h3 class="contact-label">Contact</h3>
                                          <p class="contact-text">Phone: (555) 123-4567<br>Email: info@lumiereperfumes.com</p>
                                      </div>
                                      <div class="contact-item">
                                          <h3 class="contact-label">Follow Us</h3>
                                          <div class="social-links">
                                              <a href="https://facebook.com/lumiereperfumes" class="social-link">Facebook</a>
                                              <a href="https://instagram.com/lumiereperfumes" class="social-link">Instagram</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="contact-form-container">
                                  <h3 class="form-title">Book a Consultation</h3>
                                  <form class="contact-form" id="contactForm">
                                      <div class="form-group">
                                          <input type="text" id="name" name="name" placeholder="Your Name" required>
                                      </div>
                                      <div class="form-group">
                                          <input type="email" id="email" name="email" placeholder="Your Email" required>
                                      </div>
                                      <div class="form-group">
                                          <input type="tel" id="phone" name="phone" placeholder="Phone Number">
                                      </div>
                                      <div class="form-group">
                                          <select id="service" name="service" required>
                                              <option value="">Select Service</option>
                                              <option value="consultation">Fragrance Consultation</option>
                                              <option value="custom">Custom Perfume Creation</option>
                                              <option value="gift">Gift Selection</option>
                                          </select>
                                      </div>
                                      <div class="form-group">
                                          <textarea id="message" name="message" placeholder="Tell us about your preferences..." rows="4"></textarea>
                                      </div>
                                      <button type="submit" class="btn-primary">Book Consultation</button>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </section>
              </main>

              <!-- Footer -->
              <footer class="footer">
                  <div class="container">
                      <div class="footer-content">
                          <div class="footer-brand">
                              <h3 class="brand-name">LUMIÈRE</h3>
                              <p class="brand-description">Where luxury meets artistry in every drop</p>
                          </div>
                          <div class="footer-links">
                              <div class="footer-section">
                                  <h4 class="footer-title">Collection</h4>
                                  <ul class="footer-list">
                                      <li><a href="#products" class="footer-link">All Fragrances</a></li>
                                      <li><a href="#products" class="footer-link">New Arrivals</a></li>
                                      <li><a href="#products" class="footer-link">Limited Edition</a></li>
                                  </ul>
                              </div>
                              <div class="footer-section">
                                  <h4 class="footer-title">Services</h4>
                                  <ul class="footer-list">
                                      <li><a href="#contact" class="footer-link">Consultation</a></li>
                                      <li><a href="#contact" class="footer-link">Custom Perfume</a></li>
                                      <li><a href="#contact" class="footer-link">Gift Service</a></li>
                                  </ul>
                              </div>
                              <div class="footer-section">
                                  <h4 class="footer-title">Connect</h4>
                                  <ul class="footer-list">
                                      <li><a href="tel:555-123-4567" class="footer-link">(555) 123-4567</a></li>
                                      <li><a href="mailto:info@lumiereperfumes.com" class="footer-link">info@lumiereperfumes.com</a></li>
                                      <li><a href="https://facebook.com/lumiereperfumes" class="footer-link">Facebook</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="footer-bottom">
                          <p class="copyright">&copy; 2024 LUMIÈRE Perfumes. All rights reserved.</p>
                      </div>
                  </div>
              </footer>

              <!-- Product Modal -->
              <div class="modal" id="productModal">
                  <div class="modal-content">
                      <span class="modal-close" id="modalClose">&times;</span>
                      <div class="modal-body">
                          <div class="modal-image">
                              <img id="modalImage" src="" alt="">
                          </div>
                          <div class="modal-info">
                              <h3 id="modalTitle"></h3>
                              <p id="modalCategory"></p>
                              <p id="modalPrice"></p>
                              <div id="modalNotes"></div>
                              <p id="modalDescription"></p>
                              <div class="modal-actions">
                                  <button class="btn-primary">Add to Wishlist</button>
                                  <button class="btn-secondary" onclick="startChat()">Ask About This Fragrance</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- AI Chatbot -->
              <div class="chatbot-container">
                  <div class="chatbot-widget" id="chatWidget">
                      <div class="chat-header">
                          <h4 class="chat-title">LUMIÈRE Assistant</h4>
                          <button class="chat-minimize" id="chatMinimize">&minus;</button>
                          <button class="chat-close" id="chatClose">&times;</button>
                      </div>
                      <div class="chat-messages" id="chatMessages">
                          <div class="message bot-message">
                              <div class="message-content">
                                  <p>Welcome to LUMIÈRE! I'm here to help you discover the perfect fragrance. Ask me about our collection, store information, or how to contact us.</p>
                              </div>
                              <span class="message-time">Just now</span>
                          </div>
                      </div>
                      <div class="chat-input-container">
                          <div class="chat-typing" id="typingIndicator" style="display: none;">
                              <span class="typing-dots">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                              </span>
                              <span class="typing-text">Assistant is typing...</span>
                          </div>
                          <div class="chat-input-wrapper">
                              <input type="text" class="chat-input" id="chatInput" placeholder="Ask about our perfumes, store info, or contact details...">
                              <button class="chat-send" id="chatSend">Send</button>
                          </div>
                      </div>
                  </div>
                  <button class="chatbot-toggle" id="chatToggle">
                      <span class="chat-icon">💬</span>
                      <span class="chat-text">Chat with us</span>
                  </button>
              </div>

              <!-- Scripts -->
              <script src="/scripts/products.js"></script>
              <script src="/scripts/chatbot.js"></script>
              <script src="/scripts/animations.js"></script>
              <script src="/scripts/main.js"></script>
          </body>
          </html>
        `
      }} />
    </>
  )
}