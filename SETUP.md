# 🚀 Setup & Installation Guide

This guide will help you get the CineBook application up and running in minutes.

---

## 📋 Prerequisites

Before you begin, make sure you have:

- **Modern Web Browser** (Chrome, Firefox, Safari, or Edge)
- **Internet Connection** (for movie API)
- **Code Editor** (Optional, for customization) - VS Code recommended
- **File Manager** (Default file manager on your computer)

**No server or special software required!**

---

## 🎯 Quick Start (5 Minutes)

### Step 1: Download Files
1. Download all files from the outputs folder
2. Save to a folder on your computer (e.g., `C:\CineFireX\` or `~/CineFireX/`)

### Step 2: Organize Files
Ensure your folder structure matches this:
```
CineBook/
├── index.html
├── booking.html
├── snacks.html
├── payment.html
├── ticket.html
├── css/
│   ├── style.css
│   ├── home.css
│   ├── booking.css
│   ├── snacks.css
│   ├── payment.css
│   └── ticket.css
└── js/
    ├── common.js
    ├── home.js
    ├── booking.js
    ├── snacks.js
    ├── payment.js
    └── ticket.js
```

### Step 3: Open in Browser
**Option A: Using File Manager (Simple)**
1. Navigate to the CineFireX folder
2. Double-click `index.html`
3. App opens in your default browser

**Option B: Using Local Server (Recommended)**
See instructions below for your system.

---

## 🖥️ Setting Up Local Server

### Why Use a Local Server?
- Better performance
- Prevents CORS errors
- More realistic testing
- Required for some features

### Windows (Python)

**Install Python:**
1. Download from https://www.python.org/downloads/
2. Run installer, check "Add Python to PATH"
3. Click "Install Now"

**Start Server:**
1. Open Command Prompt
2. Navigate to your CineBook folder:
   ```bash
   cd C:\Users\YourName\Desktop\CineBook
   ```
3. Run one of these commands:
   ```bash
   # Python 3.x
   python -m http.server 8000
   
   # Python 2.x
   python -m SimpleHTTPServer 8000
   ```
4. Open browser: `http://localhost:8000`

### Windows (Using Node.js)

**Install Node.js:**
1. Download from https://nodejs.org/
2. Run installer with default settings
3. Restart your computer

**Start Server:**
1. Open Command Prompt
2. Navigate to CineBook folder
3. Install http-server:
   ```bash
   npm install -g http-server
   ```
4. Start server:
   ```bash
   http-server -p 8000
   ```
5. Open browser: `http://localhost:8000`

### Mac (Terminal)

**Python 3:**
```bash
# Navigate to folder
cd ~/Desktop/CineBook

# Start server
python3 -m http.server 8000
```

**Using Node.js:**
```bash
# Install Node.js first (from nodejs.org)
npm install -g http-server

# Navigate to folder
cd ~/Desktop/CineBook

# Start server
http-server -p 8000
```

### Linux (Terminal)

**Python:**
```bash
# Navigate to folder
cd ~/CineBook

# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install Node.js (if not already installed)
sudo apt-get install nodejs npm

# Install http-server
npm install -g http-server

# Navigate to folder
cd ~/CineBook

# Start server
http-server -p 8000
```

### Visual Studio Code (Easy Option)

**Install Extension:**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "Live Server"
4. Install by Ritwick Dey

**Start Server:**
1. Open CineBook folder in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically

---

## ✅ Testing the Installation

### Verify Everything Works

1. **Open the app**
   - Navigate to `http://localhost:8000`
   - Should see home page with "CineBook" header

2. **Test Search**
   - Search for "Avengers"
   - Should show movie results
   - Should display ratings

3. **Test Booking Flow**
   - Click "Book Now" on a movie
   - Enter name and phone
   - Select seats
   - Proceed through all pages

4. **Test Responsive Design**
   - Open on mobile device or zoom browser (F12)
   - Should look good on all sizes

5. **Check Console**
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Should show no errors

---

## 🎨 File Structure Breakdown

### HTML Files (5)

**index.html** - Home Page
- Movie search and display
- Genre filtering
- Entry point to application
- Size: ~2 KB

**booking.html** - Seat Selection
- Customer details form
- Interactive seat layout
- Price calculation
- Size: ~4 KB

**snacks.html** - Snack Selection
- Snack options display
- Quantity selection
- Order summary
- Size: ~3 KB

**payment.html** - Payment Form
- Card details input
- Payment validation
- Order confirmation
- Size: ~3 KB

**ticket.html** - Ticket Display
- Booking confirmation
- Barcode display
- Print functionality
- Size: ~2 KB

### CSS Files (6)

**style.css** - Global Styles (1.5 KB)
- Variables and colors
- Common classes
- Form elements
- Utilities

**home.css** - Home Page Styles (1.2 KB)
**booking.css** - Booking Page Styles (1.8 KB)
**snacks.css** - Snacks Page Styles (1.1 KB)
**payment.css** - Payment Page Styles (1.3 KB)
**ticket.css** - Ticket Page Styles (1.2 KB)

### JavaScript Files (6)

**common.js** - Shared Code (2.5 KB)
- Utilities and helpers
- URL parameter handling
- Form validation
- Storage management

**home.js** - Home Page Logic (1.2 KB)
**booking.js** - Booking Logic (1.1 KB)
**snacks.js** - Snacks Logic (0.8 KB)
**payment.js** - Payment Logic (1.0 KB)
**ticket.js** - Ticket Logic (0.6 KB)

---

## 🔧 Basic Customization

### Change App Name

**In index.html:**
```html
<h1>🎬 YourAppName</h1>
```

**In browser tab:**
```html
<title>Your App Name - Movie Booking</title>
```

### Change Colors

**In css/style.css:**
```css
:root {
  --primary-color: #667eea;      /* Change this */
  --secondary-color: #764ba2;    /* Change this */
  --text-primary: #333;
  --bg-light: #f5f5f5;
}
```

**Quick Color Reference:**
```css
/* Popular color schemes */
Purple: #667eea, #764ba2
Blue: #2196F3, #1976D2
Red: #F44336, #D32F2F
Green: #4CAF50, #45A049
Orange: #FF9800, #F57C00
```

### Add More Show Times

**In booking.html:**
```html
<select id="showTime" required>
  <option value="">Select a time</option>
  <option>10:00 AM</option>
  <option>1:00 PM</option>
  <option>4:00 PM</option>
  <option>7:00 PM</option>
  <option>10:00 PM</option>
  <option>12:00 AM</option>  <!-- Add new time -->
</select>
```

### Change Seat Prices

**In js/booking.js:**
```javascript
config: {
  SEAT_PRICES: {
    'P': 500,   // Change from 250 to 500
    'G': 400,   // Change from 200 to 400
    'S': 300    // Change from 150 to 300
  }
}
```

---

## 🌐 Accessing from Other Devices

### On Same Network

1. Find your computer's IP address:
   - **Windows:** Open Command Prompt, type `ipconfig`, look for IPv4 Address
   - **Mac/Linux:** Open Terminal, type `ifconfig`, look for inet

2. On other device, open browser and go to:
   ```
   http://YOUR-IP-ADDRESS:8000
   ```

### Example:
- Your IP: 192.168.1.100
- URL: `http://192.168.1.100:8000`

---

## 📱 Testing on Mobile

### Option 1: Same Network
- Use the IP address method above
- Open on your phone's browser

### Option 2: Using Chrome DevTools
1. Open app in Chrome
2. Press F12
3. Click device icon (top-left)
4. Toggle "Responsive Design Mode"
5. Test different screen sizes

### Mobile Testing Checklist
- [ ] Home page loads correctly
- [ ] Search works on mobile
- [ ] Movie cards display properly
- [ ] Buttons are clickable
- [ ] Forms are usable
- [ ] Seat selection works
- [ ] No horizontal scrolling

---

## 🐛 Common Issues & Solutions

### Issue: "Connection Refused"
**Cause:** Local server not running

**Solution:**
1. Make sure server is started
2. Check port 8000 is available
3. Try different port: `http://localhost:8001`

### Issue: "Cannot GET /index.html"
**Cause:** Server not in correct folder

**Solution:**
1. Stop server (Ctrl+C)
2. Navigate to correct folder
3. Start server again

### Issue: Movies not loading
**Cause:** API error or internet issue

**Solution:**
1. Check internet connection
2. Open F12 console
3. Check for error messages
4. Try searching different movie

### Issue: Styles not loading
**Cause:** CSS files not found

**Solution:**
1. Check folder structure
2. Verify css/ folder exists
3. Check file names match exactly
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: Buttons not working
**Cause:** JavaScript files not loaded

**Solution:**
1. Check browser console (F12)
2. Verify js/ folder exists
3. Check file names match
4. Reload page (Ctrl+R)

---

## 🚀 Next Steps

Once installation is complete:

1. **Explore the App**
   - Try different searches
   - Complete full booking flow
   - Test on different devices

2. **Customize**
   - Change colors to match your brand
   - Adjust prices and show times
   - Add more snacks

3. **Learn the Code**
   - Read through HTML structure
   - Study CSS organization
   - Understand JavaScript flow

4. **Plan Enhancements**
   - Think about new features
   - Plan customizations
   - Consider adding backend

---

## 📚 Helpful Resources

### Learning Resources
- **HTML Basics:** https://developer.mozilla.org/en-US/docs/Web/HTML
- **CSS Guide:** https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript Learning:** https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **OMDb API:** https://www.omdbapi.com/

### Development Tools
- **VS Code:** https://code.visualstudio.com/
- **Chrome DevTools:** Built into Chrome
- **Node.js:** https://nodejs.org/
- **Python:** https://www.python.org/

### Documentation
- See `README.md` for full documentation
- See `QUICKSTART.md` for quick reference
- See `IMPROVEMENTS.md` for what's new

---

## ✨ You're All Set!

Your CineBook application is ready to use! 🎬

Start by opening:
```
http://localhost:8000
```

Or just double-click `index.html`!

**Happy Booking!** 🍿

---

**Need Help?**
1. Check the troubleshooting section above
2. Review README.md for detailed info
3. Check your browser console (F12)
4. Ensure all files are in correct locations
5. Try using a different browser

**Version:** 2.0  
**Last Updated:** 2025
