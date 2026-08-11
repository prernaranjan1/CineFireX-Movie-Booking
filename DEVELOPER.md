# 👨‍💻 Developer Guide - Customization & Extension

This guide helps developers customize, extend, and enhance the CineBook application.

---

## 📚 Table of Contents

- [Code Organization](#code-organization)
- [CSS Customization](#css-customization)
- [JavaScript Customization](#javascript-customization)
- [Adding Features](#adding-features)
- [API Integration](#api-integration)
- [Best Practices](#best-practices)
- [Debugging](#debugging)
- [Performance Optimization](#performance-optimization)

---

## 🏗️ Code Organization

### Architecture Overview

```
CINEFIREX/
├── Presentation Layer (HTML)
├── Styling Layer (CSS)
└── Logic Layer (JavaScript)
    ├── Common Utilities (common.js)
    └── Page-Specific Logic (home.js, booking.js, etc.)
```

### Data Flow

```
User Input (HTML Form)
        ↓
JavaScript (Validation & Processing)
        ↓
LocalStorage (Data Persistence)
        ↓
URL Parameters (Inter-page Communication)
        ↓
Next Page (Rendered with New Data)
```

### Variable Naming Convention

```javascript
// Constants
const API_KEY = 'e634257';
const MAX_SEATS = 36;

// Objects/Classes (PascalCase for public, camelCase for private)
const BOOKING = { ... };
const payment = { ... };

// Functions
function validateForm() { ... }
const isValidEmail = (email) => { ... };

// Booleans (is/has prefix)
let isLoading = false;
let hasError = false;

// Arrays (plural)
let selectedSeats = [];
let allMovies = [];
```

---

## 🎨 CSS Customization

### CSS Variables System

**Location:** `css/style.css`

```css
:root {
  /* Colors */
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-primary: #333;
  --text-secondary: #666;
  --text-light: #999;
  --bg-light: #f5f5f5;
  --border-color: #e0e0e0;
  
  /* Semantic Colors */
  --error-color: #c62828;
  --success-color: #2e7d32;
  --warning-color: #f57c00;
  --info-color: #1976d2;
}
```

### How to Change Colors

**Method 1: CSS Variables (Recommended)**
```css
/* Before */
:root {
  --primary-color: #667eea;
}

/* After */
:root {
  --primary-color: #2196F3;  /* Your color */
}
```

**Method 2: Direct CSS Update**
```css
.btn-primary {
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
}
```

### Color Palette Templates

**Dark Blue Theme**
```css
--primary-color: #1a237e;
--secondary-color: #283593;
```

**Vibrant Red**
```css
--primary-color: #f44336;
--secondary-color: #d32f2f;
```

**Modern Teal**
```css
--primary-color: #00897b;
--secondary-color: #00695c;
```

**Professional Purple**
```css
--primary-color: #5e35b1;
--secondary-color: #4527a0;
```

### Responsive Design

```css
/* Desktop (default) */
.movie-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

/* Tablet */
@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

/* Mobile */
@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Adding Custom Fonts

**Step 1: Add to HTML head**
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap" rel="stylesheet">
```

**Step 2: Update CSS**
```css
:root {
  --font-sans: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
}
```

---

## 🔧 JavaScript Customization

### Common.js - Extending Utilities

**Add new validation function:**
```javascript
// In FormValidator object
isValidUsername: (username) => {
  return username && username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
}

// Usage in other files
FormValidator.isValidUsername('john_doe');
```

**Add new storage function:**
```javascript
// In Storage object
getAllBookings: () => {
  return Storage.get('bookingHistory') || [];
},

getBookingById: (id) => {
  const bookings = Storage.getAllBookings();
  return bookings.find(b => b.id === id);
}
```

**Add new utility function:**
```javascript
// In Utils object
calculateDiscount: (price, discountPercent) => {
  return price - (price * discountPercent / 100);
},

applyTax: (price, taxPercent = 18) => {
  return price + (price * taxPercent / 100);
}
```

### Home.js - Customizing Movie Display

**Add new filter:**
```javascript
// In HOME object
filterByYear: (year) => {
  const filtered = HOME.state.allMovies.filter(movie => {
    return movie.Year === year.toString();
  });
  HOME.renderMovies(filtered);
}

// In HTML, add button
<button onclick="HOME.filterByYear(2023)">2023 Movies</button>
```

**Add sorting:**
```javascript
// In HOME object
sortMovies: (sortBy) => {
  const sorted = [...HOME.state.allMovies].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.details.imdbRating - a.details.imdbRating;
    } else if (sortBy === 'year') {
      return b.Year - a.Year;
    }
    return 0;
  });
  HOME.renderMovies(sorted);
}
```

**Add pagination:**
```javascript
// In HOME object
renderPagedMovies: (page = 1, itemsPerPage = 12) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageMovies = HOME.state.allMovies.slice(start, end);
  HOME.renderMovies(pageMovies);
}
```

### Booking.js - Customizing Seat Selection

**Add more seat categories:**
```javascript
// In BOOKING config
SEAT_PRICES: {
  'P': 250,  // Platinum
  'G': 200,  // Gold
  'S': 150,  // Silver
  'D': 100   // Diamond/Budget (new)
}
```

**Add seat recommendations:**
```javascript
// New function in BOOKING
recommendSeats: () => {
  // Find middle seats (usually best view)
  const middleSeats = BOOKING.elements.seats.filter(seat => {
    const number = parseInt(seat.innerText.substring(1));
    return number >= 4 && number <= 8; // Middle seats
  });
  
  // Highlight recommendations
  middleSeats.forEach(seat => {
    seat.style.border = '3px solid #ffc107';
  });
}
```

**Add seat capacity limit:**
```javascript
// In BOOKING.toggleSeat()
if (BOOKING.state.selectedSeats.length >= 5) {
  alert('Maximum 5 seats allowed per booking');
  return;
}
```

### Snacks.js - Custom Offers

**Add combo deals:**
```javascript
// New function
calculateComboDiscount: () => {
  if (SNACKS.state.snackTotal > 300) {
    // 10% discount for orders above ₹300
    return SNACKS.state.snackTotal * 0.10;
  }
  return 0;
}

// Update total display
const discount = SNACKS.calculateComboDiscount();
const finalTotal = SNACKS.state.snackTotal - discount;
```

**Add loyalty points:**
```javascript
// Calculate and display points
calculateLoyaltyPoints: () => {
  // 1 point per rupee spent
  return Math.floor(SNACKS.state.snackTotal);
},

// In HTML
Earn <span id="pointsDisplay">0</span> Loyalty Points
```

### Payment.js - Custom Validation

**Add Luhn algorithm for card validation:**
```javascript
validateCardWithLuhn: (cardNumber) => {
  let sum = 0;
  let isEven = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}
```

---

## ✨ Adding Features

### Feature 1: User Accounts

**Add login page (login.html):**
```html
<input type="email" id="email" placeholder="Email">
<input type="password" id="password" placeholder="Password">
<button onclick="LOGIN.authenticate()">Login</button>
```

**Add authentication (js/login.js):**
```javascript
const LOGIN = {
  authenticate: () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (FormValidator.isValidEmail(email)) {
      Storage.set('currentUser', { email, loginTime: new Date() });
      window.location.href = 'index.html';
    }
  }
}
```

### Feature 2: Promotional Codes

**Add coupon input to payment page:**
```html
<input type="text" id="couponCode" placeholder="Enter coupon code">
<button onclick="PAYMENT.applyCoupon()">Apply</button>
```

**Add coupon logic:**
```javascript
// In PAYMENT object
state: {
  coupons: {
    'SUMMER50': 50,     // ₹50 discount
    'HALF': 0.5,        // 50% discount
    'GET10': 0.10       // 10% discount
  }
},

applyCoupon: () => {
  const code = document.getElementById('couponCode').value.toUpperCase();
  
  if (PAYMENT.state.coupons[code]) {
    const discount = PAYMENT.state.coupons[code];
    const finalTotal = discount > 1 
      ? PAYMENT.state.bookingData.total - discount 
      : PAYMENT.state.bookingData.total * (1 - discount);
    
    console.log('Discount applied! New total: ₹' + finalTotal);
  }
}
```

### Feature 3: Booking History

**Add history page (history.html):**
```html
<div id="bookingHistory" class="history-grid">
  <!-- Will be populated by JavaScript -->
</div>
```

**Add history logic (js/history.js):**
```javascript
const HISTORY = {
  init: () => {
    const bookings = Storage.get('bookingHistory') || [];
    HISTORY.displayBookings(bookings);
  },
  
  displayBookings: (bookings) => {
    const container = document.getElementById('bookingHistory');
    container.innerHTML = bookings.map(booking => `
      <div class="booking-card">
        <h3>${booking.movie}</h3>
        <p>Seats: ${booking.seats}</p>
        <p>Total: ₹${booking.total}</p>
        <p>Date: ${booking.bookingDate}</p>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => HISTORY.init());
```

### Feature 4: Multiple Theaters

**Extend movie search to include theater:**
```javascript
// In HOME state
state: {
  selectedTheater: 'Cinema Paradise',
  theaters: ['Cinema Paradise', 'INOX', 'PVR'],
  // ...
}

// Add filter for theaters
filterByTheater: (theater) => {
  HOME.state.selectedTheater = theater;
  // Re-fetch movies from selected theater
}
```

---

## 🔌 API Integration

### Current API (OMDb)

```javascript
// Search movies
fetch(`https://www.omdbapi.com/?s=Avengers&apikey=e634257`)
  .then(res => res.json())
  .then(data => console.log(data.Search));

// Get movie details
fetch(`https://www.omdbapi.com/?i=tt0848228&apikey=e634257`)
  .then(res => res.json())
  .then(data => console.log(data));
```

### Creating Backend API

**Example Node.js/Express endpoints:**

```javascript
// GET /api/movies/search?q=Avengers
app.get('/api/movies/search', (req, res) => {
  const query = req.query.q;
  // Call OMDb API with backend key
  // Return results
});

// POST /api/bookings
app.post('/api/bookings', (req, res) => {
  const booking = req.body;
  // Validate
  // Save to database
  // Return confirmation
});

// GET /api/bookings/:id
app.get('/api/bookings/:id', (req, res) => {
  // Retrieve booking from database
  // Return booking details
});
```

**Update frontend to use backend:**

```javascript
// In common.js API object
async post(endpoint, data) {
  try {
    const response = await fetch(`/api${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Usage in booking.js
const booking = {
  name: customerName,
  movie: movieName,
  seats: selectedSeats,
  total: totalPrice
};

API.post('/bookings', booking)
  .then(response => {
    // Handle response
  })
  .catch(error => {
    // Handle error
  });
```

---

## ✅ Best Practices

### 1. Code Organization

**Do:**
```javascript
const MODULE = {
  state: { /* data */ },
  elements: { /* DOM refs */ },
  init() { /* setup */ },
  bindEvents() { /* listeners */ },
  handleEvent() { /* handlers */ }
};
```

**Don't:**
```javascript
// Avoid global variables
window.someVar = value;
// Avoid deeply nested functions
if (a) { if (b) { if (c) { /* code */ } } }
```

### 2. Error Handling

**Do:**
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
} catch (error) {
  console.error('Error:', error);
  Alert.error('Something went wrong. Please try again.');
  return null;
}
```

**Don't:**
```javascript
// Avoid silent failures
fetch(url).then(res => res.json()).then(data => process(data));
```

### 3. Performance

**Do:**
```javascript
// Cache DOM elements
const element = document.getElementById('myId');
// Reuse cached element
element.addEventListener('click', handler);

// Debounce frequent events
const debouncedSearch = Utils.debounce(searchMovies, 300);
input.addEventListener('input', debouncedSearch);
```

**Don't:**
```javascript
// Avoid repeated DOM queries
document.getElementById('id').style.color = 'red';
document.getElementById('id').style.fontSize = '16px';
document.getElementById('id').textContent = 'text';

// Avoid unnecessary API calls
input.addEventListener('input', searchMovies); // Calls for every keystroke
```

### 4. Security

**Do:**
```javascript
// Escape HTML to prevent XSS
const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Validate input
if (!FormValidator.isValidEmail(email)) return false;
```

**Don't:**
```javascript
// Avoid innerHTML with user input
element.innerHTML = userInput; // XSS vulnerability

// Avoid trusting client-side validation alone
if (clientValidation) processPayment(); // Server validation needed
```

---

## 🐛 Debugging

### Using Browser DevTools

**Open DevTools:**
```
Windows/Linux: F12 or Ctrl+Shift+I
Mac: Cmd+Option+I
```

### Console Logging

```javascript
// Basic logging
console.log('Value:', myVar);

// Warning
console.warn('This might be a problem');

// Error
console.error('An error occurred:', error);

// Table display
console.table(arrayOfObjects);

// Timing
console.time('myTimer');
// ... code to measure ...
console.timeEnd('myTimer');
```

### Breakpoints

1. Open DevTools → Sources tab
2. Click line number to set breakpoint
3. Reload page
4. Code execution pauses at breakpoint
5. Step through code (F10) or continue (F8)

### Common Issues to Debug

```javascript
// Check if element exists
if (element) {
  console.log('Element found');
} else {
  console.error('Element not found!');
}

// Check localStorage
console.log('Stored data:', Storage.get('key'));

// Check URL parameters
console.log('URL params:', URLParams.getAll());

// Check state
console.log('Current state:', BOOKING.state);
```

---

## ⚡ Performance Optimization

### 1. Lazy Loading Images

```html
<!-- Add loading="lazy" attribute -->
<img src="poster.jpg" alt="Movie" loading="lazy">
```

### 2. CSS Optimization

```css
/* Remove unused styles */
/* Use CSS variables for repetition */
/* Group media queries */
@media (max-width: 768px) {
  /* All tablet styles here */
}
```

### 3. JavaScript Optimization

```javascript
// Use const/let instead of var
const value = 'preferred';

// Use arrow functions
const handleClick = () => { /* ... */ };

// Cache DOM queries
const element = document.getElementById('id');
element.addEventListener('click', handleClick);

// Use event delegation
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    handleButtonClick(e.target);
  }
});
```

### 4. Minification

**For production, minify CSS and JS:**

```bash
# Install minifier
npm install -g terser clean-css-cli

# Minify JavaScript
terser js/common.js -o js/common.min.js

# Minify CSS
cleancss css/style.css -o css/style.min.css
```

Then update HTML to use minified versions:
```html
<link rel="stylesheet" href="css/style.min.css">
<script src="js/common.min.js"></script>
```

---

## 📊 Testing Checklist

Before deploying, test:

- [ ] All pages load without errors
- [ ] Search functionality works
- [ ] Form validation works
- [ ] Seat selection works
- [ ] Data passes between pages
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] No console errors
- [ ] No console warnings
- [ ] Buttons are clickable
- [ ] Forms are submittable
- [ ] Print functionality works
- [ ] LocalStorage works
- [ ] No performance issues

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Remove debug code
- [ ] Minify CSS/JS
- [ ] Optimize images
- [ ] Add error tracking
- [ ] Set up backend API
- [ ] Use real payment gateway
- [ ] Enable HTTPS
- [ ] Add database
- [ ] Set up authentication
- [ ] Add monitoring
- [ ] Create backup plan
- [ ] Test on real devices

---

## 📚 Helpful Resources

- **MDN Web Docs:** https://developer.mozilla.org/
- **JavaScript.info:** https://javascript.info/
- **CSS Tricks:** https://css-tricks.com/
- **Web.dev:** https://web.dev/

---

**Happy Coding! 👨‍💻**
