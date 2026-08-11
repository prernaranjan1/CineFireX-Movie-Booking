# 🎬 Quick Start Guide

## Setup Instructions

1. **Download all 5 files:**
   - `index.html` - Home page
   - `booking.html` - Seat selection
   - `snacks.html` - Snack selection
   - `payment.html` - Payment page
   - `ticket.html` - Ticket confirmation

2. **Place all files in the same folder**

3. **Open `index.html` in your web browser**

4. **Start booking your movies!**

---

## 🎯 Flow Overview

```
Home Page (index.html)
         ↓
    Search/Select Movie
         ↓
Booking Page (booking.html)
         ↓
    Select Seats & Details
         ↓
Snacks Page (snacks.html)
         ↓
    Choose Snacks (Optional)
         ↓
Payment Page (payment.html)
         ↓
    Enter Card Details
         ↓
Ticket Page (ticket.html)
         ↓
    Print or Save Ticket
```

---

## ✨ Key Features to Try

### 1. Home Page
- 🔍 Search for any movie (try "Avengers", "Inception", "Interstellar")
- 🏷️ Filter movies by genre (Action, Drama, Comedy)
- ⭐ See IMDb ratings for each movie
- 📖 Hover on cards to see movie details
- 🎯 Click "Book Now" to start booking

### 2. Booking Page
- 👤 Enter your name and phone number
- 🎭 Select show time (10:00 AM to 10:00 PM)
- 🎫 Click on seats to select them
- 💰 See live price updates
- 🎨 Different seat categories with different prices:
  - 🟪 Platinum: ₹250
  - 🟨 Gold: ₹200
  - 🟩 Silver: ₹150

### 3. Snacks Page
- 🍿 Add popcorn, drinks, nachos, candy, or hot dogs
- 🎬 Combo pack with special pricing
- 🧮 Live order summary
- ⏭️ Skip snacks if you want
- 📝 See booking details at top

### 4. Payment Page
- 💳 Enter card details
- 🔐 Real-time validation
- 🛡️ Security information
- 📋 Full order summary
- ⚙️ Auto-formatting of card number and expiry

### 5. Ticket Page
- ✅ Success confirmation
- 🎟️ Professional ticket display
- 🖨️ Print your ticket
- 🔖 Booking ID for reference
- 🏠 Return to home page

---

## 📱 Mobile Usage

The app works perfectly on mobile devices:
- Responsive design adapts to all screen sizes
- Touch-friendly buttons and inputs
- Easy navigation on small screens

---

## 🎬 Sample Test Flow

1. **Search:** "Avengers"
2. **Select:** Any movie from results
3. **Enter Details:**
   - Name: Sakshi Singh
   - Phone: 9876543210
   - Show Time: 7:00 PM
4. **Select Seats:** Choose P1, P2, G5, G6 (mix of categories)
5. **Add Snacks:** Popcorn x2, Cold Drink x1
6. **Payment:**
   - Name: Sakshi Singh
   - Card: 1234567890123456
   - Expiry: 12/26
   - CVV: 123
7. **Print Ticket:** Click the print button

---

## 🔍 Troubleshooting

### Movies won't load?
- Check your internet connection
- The app uses OMDb API - might need internet
- Wait a few seconds for API to respond

### Can't select seats?
- Click only on seats that are white (available)
- Gray seats are sold
- Orange seats are bestsellers

### Validation errors?
- Follow the error messages shown
- Phone must be 10 digits
- Card number must be 16 digits
- CVV must be 3 digits
- Expiry format: MM/YY

### Payment won't process?
- Check all fields are filled correctly
- Ensure card number is 16 digits
- Expiry must be in MM/YY format

---


## 📝 Data Flow

The app passes data through URL parameters between pages:

```
Home → Booking (movie name)
     ↓
Booking → Snacks (name, phone, movie, time, seats, price)
     ↓
Snacks → Payment (all above + snacks, snack price)
     ↓
Payment → Ticket (all above + total)
     ↓
Ticket → Home (user clicks home link)
```

---

## 🔐 Security Notes

⚠️ **For Personal Use Only**

For production/real booking system:
1. **Move API key to backend** - Don't expose in frontend
2. **Use real payment gateway** - Stripe, PayPal, etc.
3. **Add database** - Store bookings permanently
4. **Add authentication** - User login system
5. **Use HTTPS** - Secure connections only
6. **Validate on backend** - Don't trust client validation
7. **Encrypt sensitive data** - Payment details, personal info

---

## 💡 Customization Tips

### Change Colors
In each file's CSS, find:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: #667eea;
```
Replace with your brand colors.

### Add More Snacks
In `snacks.html`, duplicate a snack card:
```html
<div class="snack-card" data-name="Your Snack" data-price="100">
  <div class="snack-icon">🎯</div>
  <h3>Your Snack Name</h3>
  <p>Description</p>
  <div class="price">₹100</div>
  <input type="number" class="quantity-input" min="0" value="0">
</div>
```

### Add More Seats
In `booking.html`, add more `<div class="seat">XX</div>` elements

### Change Show Times
In `booking.html`, modify the select options:
```html
<option>Your Time</option>
```

---

## 🚀 Next Steps

1. ✅ Test the app thoroughly
2. ✅ Try all features and flows
3. ✅ Check mobile responsiveness
4. ✅ Share feedback or improvements
5. ✅ For production: implement backend & database

---

## 📞 Questions?

If something doesn't work:
1. Check the browser console (F12) for errors
2. Make sure all files are in the same folder
3. Check internet connection for API calls
4. Try refreshing the page
5. Clear browser cache if needed

---

## 🎉 Ready to Book?

Open `index.html` and start exploring!

Enjoy your improved movie booking system! 🎬🍿

---

**Version:** 2.0 - Improved Edition  
**Last Updated:** 2025
