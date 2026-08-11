# 📋 File Manifest & Directory Structure

Complete overview of all files in the CineBook project with descriptions, sizes, and purposes.

---

## 📁 Directory Tree

```
cinebook/
│
├── 📄 HTML Files (5 files)
│   ├── index.html              Home page - Movie listing
│   ├── booking.html            Seat selection page
│   ├── snacks.html             Snack selection page
│   ├── payment.html            Payment form page
│   └── ticket.html             Booking confirmation page
│
├── 📁 css/                     Stylesheets (6 files)
│   ├── style.css               Global styles & variables
│   ├── home.css                Home page specific styles
│   ├── booking.css             Booking page styles
│   ├── snacks.css              Snacks page styles
│   ├── payment.css             Payment page styles
│   └── ticket.css              Ticket page styles
│
├── 📁 js/                      JavaScript Files (6 files)
│   ├── common.js               Shared utilities & helpers
│   ├── home.js                 Home page logic
│   ├── booking.js              Booking page logic
│   ├── snacks.js               Snacks page logic
│   ├── payment.js              Payment page logic
│   └── ticket.js               Ticket page logic
│
└── 📄 Documentation Files (7 files)
    ├── README.md               Comprehensive documentation
    ├── SETUP.md                Installation & setup guide
    ├── QUICKSTART.md           Quick start guide
    ├── IMPROVEMENTS.md         What's new & improved
    ├── DEVELOPER.md            Customization guide
    ├── FILE_MANIFEST.md        This file
    └── LICENSE.md              Project license
```

---

## 📊 File Statistics

### Overview
- **Total Files:** 23
- **HTML Files:** 5
- **CSS Files:** 6
- **JavaScript Files:** 6
- **Documentation Files:** 6
- **Total Size:** ~150 KB

### By Type

| Type | Count | Size |
|------|-------|------|
| HTML | 5 | ~14 KB |
| CSS | 6 | ~22 KB |
| JavaScript | 6 | ~18 KB |
| Documentation | 6 | ~96 KB |
| **Total** | **23** | **~150 KB** |

---

## 📄 HTML Files Detailed

### 1. `index.html` (Home Page)
**Purpose:** Movie discovery and search interface  
**Size:** ~2.5 KB  
**Lines:** ~80  
**Dependencies:** css/style.css, css/home.css, js/common.js, js/home.js

**Contains:**
- Header with navigation
- Movie search bar
- Genre filters
- Movie grid (dynamic)
- Footer

**Key Features:**
- OMDb API integration
- Real-time movie search
- Genre filtering
- Movie details on hover
- Responsive design

**Connected Elements:**
```
CSS: style.css, home.css
JS: common.js, home.js
```

---

### 2. `booking.html` (Seat Selection)
**Purpose:** Seat booking and customer details  
**Size:** ~4 KB  
**Lines:** ~140  
**Dependencies:** css/style.css, css/booking.css, js/common.js, js/booking.js

**Contains:**
- Customer details form
- Movie selection (read-only)
- Show time selection
- Seat layout (3 categories)
- Seat legend
- Price summary
- Confirm button

**Key Features:**
- Interactive seat selection
- Real-time price calculation
- Form validation
- Category-based pricing
- Bestseller highlights

**Connected Elements:**
```
CSS: style.css, booking.css
JS: common.js, booking.js
```

---

### 3. `snacks.html` (Add-ons)
**Purpose:** Snacks and beverages selection  
**Size:** ~3 KB  
**Lines:** ~110  
**Dependencies:** css/style.css, css/snacks.css, js/common.js, js/snacks.js

**Contains:**
- Booking details summary
- Snack selection grid (6 items)
- Order summary
- Skip button
- Proceed button

**Key Features:**
- 6 snack options with emojis
- Quick-add functionality
- Live order summary
- Skip snacks option
- Total calculation

**Connected Elements:**
```
CSS: style.css, snacks.css
JS: common.js, snacks.js
```

---

### 4. `payment.html` (Payment)
**Purpose:** Payment form and processing  
**Size:** ~3.5 KB  
**Lines:** ~120  
**Dependencies:** css/style.css, css/payment.css, js/common.js, js/payment.js

**Contains:**
- Order summary
- Card holder name input
- Card number input (16 digits)
- Expiry date input (MM/YY)
- CVV input (3 digits)
- Cancel and Pay buttons
- Loading indicator

**Key Features:**
- Real-time validation
- Auto-formatting
- Security information
- Complete summary
- Error messages

**Connected Elements:**
```
CSS: style.css, payment.css
JS: common.js, payment.js
```

---

### 5. `ticket.html` (Confirmation)
**Purpose:** Booking confirmation display  
**Size:** ~2.5 KB  
**Lines:** ~90  
**Dependencies:** css/style.css, css/ticket.css, js/common.js, js/ticket.js

**Contains:**
- Success banner
- Ticket design
- Booking details
- Barcode section
- Booking ID
- Instructions
- Print and Home buttons

**Key Features:**
- Success animation
- Printable format
- Booking ID generation
- LocalStorage integration
- Print-friendly CSS

**Connected Elements:**
```
CSS: style.css, ticket.css
JS: common.js, ticket.js
```

---

## 🎨 CSS Files Detailed

### 1. `css/style.css` (Global Styles)
**Purpose:** Global styles and utilities  
**Size:** ~2 KB  
**Lines:** ~200  

**Contains:**
- CSS variables (colors, fonts, spacing)
- Global typography
- Form elements
- Buttons
- Utility classes
- Animations
- Responsive breakpoints
- Print styles

**Key Variables:**
```css
--primary-color: #667eea;
--secondary-color: #764ba2;
--text-primary: #333;
--border-color: #e0e0e0;
```

**Usage:** Imported by all pages

---

### 2. `css/home.css` (Home Page)
**Purpose:** Home page specific styles  
**Size:** ~1.5 KB  
**Lines:** ~180  

**Contains:**
- Header styling
- Navigation styling
- Banner styling
- Search bar styling
- Filter buttons
- Movie grid layout
- Movie card styling
- Hover effects
- Responsive layout

**Classes:**
- `.movies-grid`
- `.movie-card`
- `.poster`
- `.rating-badge`
- `.search-container`
- `.filter-btn`

**Used By:** index.html

---

### 3. `css/booking.css` (Booking Page)
**Purpose:** Booking page specific styles  
**Size:** ~2 KB  
**Lines:** ~250  

**Contains:**
- Form layout
- Form group styling
- Seat layout and styles
- Seat states (available, selected, sold)
- Seat animations
- Legend styling
- Summary box
- Button styling

**Classes:**
- `.form-section`
- `.form-group`
- `.seats-block`
- `.seat`
- `.seat.selected`
- `.seat.sold`
- `.legend`
- `.summary-box`

**Used By:** booking.html

---

### 4. `css/snacks.css` (Snacks Page)
**Purpose:** Snacks page specific styles  
**Size:** ~1.2 KB  
**Lines:** ~160  

**Contains:**
- Snack card styling
- Selection indicators
- Quantity input styling
- Order summary styling
- Button styling
- Responsive layout

**Classes:**
- `.snacks-grid`
- `.snack-card`
- `.snack-card.selected`
- `.quantity-input`
- `.order-summary`

**Used By:** snacks.html

---

### 5. `css/payment.css` (Payment Page)
**Purpose:** Payment page specific styles  
**Size:** ~1.3 KB  
**Lines:** ~180  

**Contains:**
- Payment container styling
- Summary section
- Form styling
- Card row layout
- Security info
- Button styling
- Loader animation

**Classes:**
- `.payment-container`
- `.summary-section`
- `.card-row`
- `.security-info`
- `.loader`

**Used By:** payment.html

---

### 6. `css/ticket.css` (Ticket Page)
**Purpose:** Ticket page specific styles  
**Size:** ~1.2 KB  
**Lines:** ~200  

**Contains:**
- Success banner
- Ticket design
- Ticket sections
- Barcode section
- Print styling
- Animation
- Responsive layout

**Classes:**
- `.success-banner`
- `.ticket`
- `.barcode-section`
- `.ticket-row`
- `.instructions`

**Used By:** ticket.html

---

## 🔧 JavaScript Files Detailed

### 1. `js/common.js` (Utilities)
**Purpose:** Shared utilities and helpers  
**Size:** ~2.5 KB  
**Lines:** ~280  

**Exports:**
```javascript
URLParams    // URL parameter handling
FormValidator // Form validation
Storage       // LocalStorage wrapper
Alert         // Message display
Utils         // Utility functions
DOM           // DOM manipulation
Loading       // Loading states
API           // API calls (future)
```

**Key Functions:**
- `URLParams.get(param)`
- `URLParams.navigate(page, data)`
- `FormValidator.isValidEmail(email)`
- `Storage.set(key, value)`
- `Utils.formatCurrency(amount)`
- `DOM.addClass(selector, className)`
- `Loading.show(elementId)`

**Used By:** All other JS files

---

### 2. `js/home.js` (Home Page)
**Purpose:** Home page logic  
**Size:** ~1.2 KB  
**Lines:** ~180  

**Main Object:** `HOME`

**Properties:**
- `config` - API key, search settings
- `state` - Movies, filters, loading state
- `elements` - DOM references
- `init()` - Initialize page
- `displayMovies(query)` - Fetch and display
- `getMovieDetails(imdbID)` - Get full details
- `renderMovies(movies)` - Render on page
- `filterByGenre(genre)` - Filter movies
- `bookMovie(title)` - Navigate to booking

**Dependencies:** common.js, OMDb API

**Used By:** index.html

---

### 3. `js/booking.js` (Booking Page)
**Purpose:** Booking logic  
**Size:** ~1.1 KB  
**Lines:** ~200  

**Main Object:** `BOOKING`

**Properties:**
- `config` - Seat prices
- `state` - Selected seats, total, form data
- `elements` - DOM references
- `init()` - Initialize
- `toggleSeat(seat)` - Toggle seat selection
- `updateSummary()` - Update display
- `validateForm()` - Validate inputs
- `handleSubmit(e)` - Submit booking

**Key Methods:**
- `setFieldError(field, message)`
- `clearFieldError(field)`

**Used By:** booking.html

---

### 4. `js/snacks.js` (Snacks Page)
**Purpose:** Snacks selection logic  
**Size:** ~0.8 KB  
**Lines:** ~150  

**Main Object:** `SNACKS`

**Properties:**
- `state` - Booking data, snacks selected
- `elements` - DOM references
- `init()` - Initialize
- `setupSnackSelection()` - Set up clicks
- `updateSummary()` - Update display
- `skipSnacks()` - Skip and navigate
- `proceedToPayment()` - Proceed with snacks

**Used By:** snacks.html

---

### 5. `js/payment.js` (Payment Page)
**Purpose:** Payment logic  
**Size:** ~1 KB  
**Lines:** ~180  

**Main Object:** `PAYMENT`

**Properties:**
- `state` - Booking data, processing state
- `elements` - DOM references
- `init()` - Initialize
- `setupValidation()` - Input validation
- `validateForm()` - Validate all
- `processPayment()` - Process payment
- `navigateToTicket()` - Go to ticket

**Key Methods:**
- `setFieldError(field, message)`
- `clearFieldError(field)`

**Used By:** payment.html

---

### 6. `js/ticket.js` (Ticket Page)
**Purpose:** Ticket display logic  
**Size:** ~0.6 KB  
**Lines:** ~100  

**Main Object:** `TICKET`

**Properties:**
- `state` - Booking data, booking ID
- `elements` - DOM references
- `init()` - Initialize
- `displayTicketInfo()` - Show details
- `generateBookingId()` - Create ID
- `saveBookingToStorage()` - Save data
- `printTicket()` - Print
- `goHome()` - Return home

**Used By:** ticket.html

---

## 📚 Documentation Files

### 1. `README.md` (Main Documentation)
**Purpose:** Comprehensive project documentation  
**Size:** ~35 KB  

**Sections:**
- Features overview
- Project structure
- Installation
- File descriptions
- API integration
- Configuration
- Browser support
- Security notes
- Future enhancements
- Troubleshooting
- Contributing guide

**Audience:** Developers, users, contributors

---

### 2. `SETUP.md` (Installation Guide)
**Purpose:** Step-by-step installation  
**Size:** ~20 KB  

**Sections:**
- Quick start (5 minutes)
- Local server setup (Windows, Mac, Linux)
- Testing setup
- File structure
- Basic customization
- Troubleshooting
- Next steps

**Audience:** New users, developers

---

### 3. `QUICKSTART.md` (Quick Reference)
**Purpose:** Quick feature overview  
**Size:** ~8 KB  

**Sections:**
- Setup instructions
- Flow overview
- Feature highlights
- Customization tips
- Sample test flow
- FAQs

**Audience:** Quick reference for all users

---

### 4. `IMPROVEMENTS.md` (What's New)
**Purpose:** Document improvements made  
**Size:** ~15 KB  

**Sections:**
- Major improvements per page
- Bug fixes
- New features
- Design changes
- Technical improvements
- Feature summary table

**Audience:** Users checking updates

---

### 5. `DEVELOPER.md` (Developer Guide)
**Purpose:** Customization and extension  
**Size:** ~25 KB  

**Sections:**
- Code organization
- CSS customization
- JavaScript customization
- Adding features
- API integration
- Best practices
- Debugging
- Performance optimization

**Audience:** Developers extending the app

---

### 6. `FILE_MANIFEST.md` (This File)
**Purpose:** Complete file overview  
**Size:** ~18 KB  

**Sections:**
- Directory tree
- File statistics
- Detailed file descriptions
- File purposes and dependencies
- Quick reference

**Audience:** Developers understanding structure

---

## 🔄 File Dependencies

### index.html
```
Requires:
├── css/style.css
├── css/home.css
├── js/common.js
└── js/home.js

Calls:
└── booking.html
```

### booking.html
```
Requires:
├── css/style.css
├── css/booking.css
├── js/common.js
└── js/booking.js

Requires Data From:
└── index.html (movie name via URL)

Calls:
└── snacks.html
```

### snacks.html
```
Requires:
├── css/style.css
├── css/snacks.css
├── js/common.js
└── js/snacks.js

Requires Data From:
└── booking.html (via URL params)

Calls:
└── payment.html
```

### payment.html
```
Requires:
├── css/style.css
├── css/payment.css
├── js/common.js
└── js/payment.js

Requires Data From:
└── snacks.html (via URL params)

Calls:
└── ticket.html
```

### ticket.html
```
Requires:
├── css/style.css
├── css/ticket.css
├── js/common.js
└── js/ticket.js

Requires Data From:
└── payment.html (via URL params)

Links To:
└── index.html (home button)
```

---

## 🔌 External Dependencies

### APIs
- **OMDb API** - Movie data
  - Endpoint: https://www.omdbapi.com/
  - Key: e634257
  - Used By: js/home.js

### Libraries
- None (Vanilla JavaScript)
- All utilities built from scratch
- No external dependencies

### Fonts
- System fonts (no web font imports)
- Fallbacks: -apple-system, BlinkMacSystemFont, Segoe UI

---

## 📋 Quick Reference

### Find a file?
- Home page code → `index.html`, `css/home.css`, `js/home.js`
- Seat booking → `booking.html`, `css/booking.css`, `js/booking.js`
- Snack selection → `snacks.html`, `css/snacks.css`, `js/snacks.js`
- Payment → `payment.html`, `css/payment.css`, `js/payment.js`
- Confirmation → `ticket.html`, `css/ticket.css`, `js/ticket.js`
- Shared utilities → `js/common.js`, `css/style.css`

### Want to customize?
- Colors → Edit `css/style.css`
- Specific page styling → Edit `css/[page].css`
- Page logic → Edit `js/[page].js`
- Shared utilities → Edit `js/common.js`

### Need documentation?
- Installation → `SETUP.md`
- Quick start → `QUICKSTART.md`
- Full reference → `README.md`
- Developer guide → `DEVELOPER.md`
- This reference → `FILE_MANIFEST.md`

---

## ✅ Checklist for Setup

- [ ] All 5 HTML files present
- [ ] All 6 CSS files present
- [ ] All 6 JavaScript files present
- [ ] Folder structure correct
- [ ] Can open index.html
- [ ] Can load movies
- [ ] Can complete booking flow
- [ ] All documentation files present
- [ ] No missing dependencies

---

## 📞 File Support

### Questions about specific file?
- Check file headers and comments
- See FILE_MANIFEST.md section above
- Review dependencies
- Check README.md or DEVELOPER.md

### File not working?
- Verify file is in correct location
- Check file name spelling
- Check browser console (F12)
- Verify all dependencies present
- Try refreshing page

---

**Total Project Size:** ~150 KB (Very lightweight!)  
**Version:** 2.0 - Professional Edition  
**Last Updated:** 2025

---

All files are production-ready and thoroughly documented. Happy coding! 🚀
