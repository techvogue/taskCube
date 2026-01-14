// Hamburger Menu Toggle
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navMobile = document.querySelector(".nav-mobile");

if (hamburgerMenu && navMobile) {
  hamburgerMenu.addEventListener("click", () => {
    const isOpen = navMobile.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
    
    // Update ARIA attributes for accessibility
    hamburgerMenu.setAttribute("aria-expanded", isOpen);
    navMobile.setAttribute("aria-hidden", !isOpen);
  });
}

// Product Gallery Functionality
class ProductGallery {
  constructor() {
    this.currentIndex = 0;
    this.images = [
      "assets/product-thumb-1.jpg",
      "assets/product-thumb-2.jpg",
      "assets/product-thumb-3.jpg",
      "assets/product-thumb-4.jpg",

      "assets/product-thumb-1.jpg",
      "assets/product-thumb-2.jpg",
      "assets/product-thumb-3.jpg",
      "assets/product-thumb-4.jpg",
    ];
    this.mainImage = document.getElementById("main-product-image");
    this.dots = document.querySelectorAll(".dot");
    this.thumbnails = document.querySelectorAll(".thumbnail");
    this.prevArrow = document.querySelector(".gallery-arrow-prev");
    this.nextArrow = document.querySelector(".gallery-arrow-next");

    this.init();
  }

  init() {
    // Arrow navigation
    if (this.prevArrow) {
      this.prevArrow.addEventListener("click", () => this.prevImage());
    }
    if (this.nextArrow) {
      this.nextArrow.addEventListener("click", () => this.nextImage());
    }

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToImage(index));
    });

    // Thumbnail navigation
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => this.goToImage(index));
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevImage();
      if (e.key === "ArrowRight") this.nextImage();
    });
  }

  updateGallery() {
    // Update main image
    if (this.mainImage) {
      this.mainImage.style.opacity = "0";
      setTimeout(() => {
        this.mainImage.src = this.images[this.currentIndex];
        this.mainImage.style.opacity = "1";
      }, 150);
    }

    // Update dots
    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Update thumbnails
    this.thumbnails.forEach((thumbnail, index) => {
      if (index === this.currentIndex) {
        thumbnail.classList.add("active");
      } else {
        thumbnail.classList.remove("active");
      }
    });
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateGallery();
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateGallery();
  }

  goToImage(index) {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.updateGallery();
    }
  }
}

// Initialize gallery when DOM is loaded
let productGallery;
document.addEventListener("DOMContentLoaded", () => {
  productGallery = new ProductGallery();
});

// Radio Button Functionality with Add to Cart Link Updates
class AddToCartManager {
  constructor() {
    this.fragranceRadios = document.querySelectorAll(
      'input[name="fragrance"], input[name="double-fragrance-1"]'
    );
    this.purchaseTypeRadios = document.querySelectorAll(
      'input[name="purchase-type"]'
    );
    this.addToCartLink = document.getElementById("add-to-cart-link");
    this.singleSubscription = document.getElementById("single-subscription");
    this.doubleSubscription = document.getElementById("double-subscription");

    // Cart link variations mapping (3 fragrances × 2 purchase types = 6 variations)
    this.cartLinks = {
      "original-single": "https://example.com/cart/add?product=original-single",
      "original-double": "https://example.com/cart/add?product=original-double",
      "lily-single": "https://example.com/cart/add?product=lily-single",
      "lily-double": "https://example.com/cart/add?product=lily-double",
      "rose-single": "https://example.com/cart/add?product=rose-single",
      "rose-double": "https://example.com/cart/add?product=rose-double",
    };

    this.init();
  }

  init() {
    // Add event listeners to all radio buttons
    this.fragranceRadios.forEach((radio) => {
      radio.addEventListener("change", () => this.updateCartLink());
    });

    this.purchaseTypeRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        this.updateCartLink();
        this.updateSubscriptionDisplay();
      });
    });

    // Initial update
    this.updateCartLink();
    this.updateSubscriptionDisplay();
  }

  getSelectedFragrance() {
    const purchaseType = this.getSelectedPurchaseType();
    const selector =
      purchaseType === "double"
        ? 'input[name="double-fragrance-1"]:checked'
        : 'input[name="fragrance"]:checked';
    const selected = document.querySelector(selector);
    return selected ? selected.value : "original";
  }

  getSelectedPurchaseType() {
    const selected = document.querySelector(
      'input[name="purchase-type"]:checked'
    );
    return selected ? selected.value : "single";
  }

  updateCartLink() {
    const fragrance = this.getSelectedFragrance();
    const purchaseType = this.getSelectedPurchaseType();
    const key = `${fragrance}-${purchaseType}`;

    if (this.addToCartLink && this.cartLinks[key]) {
      this.addToCartLink.href = this.cartLinks[key];
    }
  }

  updateSubscriptionDisplay() {
    const purchaseType = this.getSelectedPurchaseType();

    if (purchaseType === "single") {
      this.singleSubscription?.classList.add("active");
      this.doubleSubscription?.classList.remove("active");
    } else if (purchaseType === "double") {
      this.singleSubscription?.classList.remove("active");
      this.doubleSubscription?.classList.add("active");
    } else {
      // Gift subscription - show single subscription details
      this.singleSubscription?.classList.add("active");
      this.doubleSubscription?.classList.remove("active");
    }
  }
}

// Initialize Add to Cart Manager
let addToCartManager;
document.addEventListener("DOMContentLoaded", () => {
  addToCartManager = new AddToCartManager();
});

// Subscription Section Toggle (controlled by radio buttons, but also clickable)
const subscriptionHeaders = document.querySelectorAll(".subscription-header");
subscriptionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const subscriptionOption = header.closest(".subscription-option");

    // If clicking single subscription, select single radio
    if (subscriptionOption.id === "single-subscription") {
      const singleRadio = document.querySelector(
        'input[name="purchase-type"][value="single"]'
      );
      if (singleRadio) {
        singleRadio.checked = true;
        addToCartManager?.updateCartLink();
        addToCartManager?.updateSubscriptionDisplay();
      }
    }
    // If clicking double subscription, select double radio
    else if (subscriptionOption.id === "double-subscription") {
      const doubleRadio = document.querySelector(
        'input[name="purchase-type"][value="double"]'
      );
      if (doubleRadio) {
        doubleRadio.checked = true;
        addToCartManager?.updateCartLink();
        addToCartManager?.updateSubscriptionDisplay();
      }
    }
  });
});

// Collection Accordion Functionality
const collectionToggles = document.querySelectorAll(".collection-toggle");
collectionToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const collectionItem = toggle.closest(".collection-item");
    const isActive = collectionItem.classList.contains("active");

    // Close all other items (optional - remove if you want multiple open)
    // document.querySelectorAll('.collection-item').forEach(item => {
    //     item.classList.remove('active');
    // });

    // Toggle clicked item
    collectionItem.classList.toggle("active");
  });
});

// Counter Animation for Statistics
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll(".stat-bar-number");
    this.hasAnimated = false;
    this.init();
  }

  init() {
    // Use Intersection Observer to trigger animation when section is visible
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.animateCounters();
              this.hasAnimated = true;
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      const statsSection = document.querySelector(".stats-section");
      if (statsSection) {
        observer.observe(statsSection);
      }
    } else {
      // Fallback: animate immediately when the page loads
      this.animateCounters();
    }
  }

  animateCounters() {
    this.counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + "%";
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + "%";
        }
      };

      updateCounter();
    });
  }
}

// Initialize Counter Animation
let counterAnimation;
document.addEventListener("DOMContentLoaded", () => {
  counterAnimation = new CounterAnimation();
});

// Lazy Loading for Images
class LazyImageLoader {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        });
      });

      this.images.forEach((img) => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      this.images.forEach((img) => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.classList.add("loaded");
      });
    }
  }
}

// Initialize Lazy Loading
document.addEventListener("DOMContentLoaded", () => {
  new LazyImageLoader();
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      if (navMobile && navMobile.classList.contains("active")) {
        navMobile.classList.remove("active");
        hamburgerMenu?.classList.remove("active");
      }
    }
  });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    // Here you would typically send the email to a server
    console.log("Newsletter subscription:", email);
    alert("Thank you for subscribing to our newsletter!");
    newsletterForm.reset();
  });
}

// Add smooth transitions for subscription content
document.addEventListener("DOMContentLoaded", () => {
  const subscriptionOptions = document.querySelectorAll(".subscription-option");
  subscriptionOptions.forEach((option) => {
    const content = option.querySelector(".subscription-content");
    if (content) {
      // Set initial max-height based on content
      const observer = new MutationObserver(() => {
        if (option.classList.contains("active")) {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
      observer.observe(content, { childList: true, subtree: true });
    }
  });
});

// Performance optimization: Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener(
  "scroll",
  debounce(() => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "none";
    }

    lastScroll = currentScroll;
  }, 10)
);
