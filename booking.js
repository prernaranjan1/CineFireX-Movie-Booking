/* ============================================
   BOOKING PAGE JAVASCRIPT
   ============================================ */

const BOOKING = {
  config: {
    SEAT_PRICES: {
      'P': 250,  // Platinum
      'G': 200,  // Gold
      'S': 150   // Silver
    }
  },

  state: {
    selectedSeats: [],
    totalPrice: 0,
    movieName: '',
    bookingData: {}
  },

  elements: {
    customerName: null,
    phone: null,
    movie: null,
    showTime: null,
    seatsDisplay: null,
    seatCount: null,
    totalPrice: null,
    confirmBtn: null,
    bookingForm: null,
    seats: null
  },

  // Initialize
  init() {
    this.cacheElements();
    this.loadMovieFromURL();
    this.setupSeatSelection();
    this.bindEvents();
    this.updateSummary();
  },

  // Cache DOM elements
  cacheElements() {
    this.elements.customerName = document.getElementById('customerName');
    this.elements.phone = document.getElementById('phone');
    this.elements.movie = document.getElementById('movie');
    this.elements.showTime = document.getElementById('showTime');
    this.elements.seatsDisplay = document.getElementById('seatsDisplay');
    this.elements.seatCount = document.getElementById('seatCount');
    this.elements.totalPrice = document.getElementById('totalPrice');
    this.elements.confirmBtn = document.getElementById('confirmBtn');
    this.elements.bookingForm = document.getElementById('bookingForm');
    this.elements.seats = document.querySelectorAll('.seat:not(.sold)');
  },

  // Bind events
  bindEvents() {
    this.elements.bookingForm.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  // Load movie from URL
  loadMovieFromURL() {
    const movieParam = URLParams.get('movie');
    this.state.movieName = movieParam || 'Not Selected';
    this.elements.movie.value = this.state.movieName;
  },

  // Setup seat selection
  setupSeatSelection() {
    this.elements.seats.forEach(seat => {
      seat.addEventListener('click', (e) => this.toggleSeat(e.target));
    });
  },

  // Toggle seat selection
  toggleSeat(seat) {
    const seatText = seat.innerText;
    const seatType = seatText[0];
    const price = this.config.SEAT_PRICES[seatType];

    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
      this.state.totalPrice -= price;
      this.state.selectedSeats = this.state.selectedSeats.filter(s => s !== seatText);
    } else {
      seat.classList.add('selected');
      this.state.totalPrice += price;
      this.state.selectedSeats.push(seatText);
    }

    this.updateSummary();
  },

  // Update summary display
  updateSummary() {
    const seatsText = this.state.selectedSeats.length 
      ? this.state.selectedSeats.join(', ') 
      : 'None';

    this.elements.seatsDisplay.innerText = seatsText;
    this.elements.seatCount.innerText = this.state.selectedSeats.length;
    this.elements.totalPrice.innerText = this.state.totalPrice;

    // Enable/disable confirm button
    this.elements.confirmBtn.disabled = this.state.selectedSeats.length === 0;
  },

  // Validate form
  validateForm() {
    let isValid = true;

    // Validate name
    if (!FormValidator.isValidName(this.elements.customerName.value)) {
      this.setFieldError(this.elements.customerName, 'Please enter a valid name');
      isValid = false;
    } else {
      this.clearFieldError(this.elements.customerName);
    }

    // Validate phone
    if (!FormValidator.isValidPhone(this.elements.phone.value)) {
      this.setFieldError(this.elements.phone, 'Please enter a valid 10-digit number');
      isValid = false;
    } else {
      this.clearFieldError(this.elements.phone);
    }

    // Validate show time
    if (!this.elements.showTime.value) {
      this.setFieldError(this.elements.showTime, 'Please select a show time');
      isValid = false;
    } else {
      this.clearFieldError(this.elements.showTime);
    }

    // Validate seats
    if (this.state.selectedSeats.length === 0) {
      alert('Please select at least one seat');
      isValid = false;
    }

    return isValid;
  },

  // Set field error
  setFieldError(field, message) {
    field.classList.add('error');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-text')) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  },

  // Clear field error
  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-text')) {
      errorElement.style.display = 'none';
    }
  },

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    // Prepare booking data
    const bookingData = {
      name: this.elements.customerName.value.trim(),
      phone: this.elements.phone.value.trim(),
      movie: this.elements.movie.value,
      time: this.elements.showTime.value,
      seats: this.state.selectedSeats.join(','),
      ticketTotal: this.state.totalPrice
    };

    // Navigate to snacks page
    URLParams.navigate('snacks.html', bookingData);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  BOOKING.init();
});

// For debugging (remove in production)
window.BOOKING = BOOKING;
