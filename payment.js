/* ============================================
   PAYMENT PAGE JAVASCRIPT
   ============================================ */

const PAYMENT = {
  state: {
    bookingData: {},
    isProcessing: false
  },

  elements: {
    paymentForm: null,
    cardName: null,
    cardNumber: null,
    expiry: null,
    cvv: null,
    payBtn: null,
    loader: null,
    nameDisplay: null,
    movieDisplay: null,
    timeDisplay: null,
    seatsDisplay: null,
    ticketTotalDisplay: null,
    snackTotalDisplay: null,
    grandTotalDisplay: null,
    payAmount: null
  },

  // Initialize
  init() {
    this.cacheElements();
    this.loadBookingData();
    this.displayBookingInfo();
    this.setupValidation();
    this.bindEvents();
  },

  // Cache DOM elements
  cacheElements() {
    this.elements.paymentForm = document.getElementById('paymentForm');
    this.elements.cardName = document.getElementById('cardName');
    this.elements.cardNumber = document.getElementById('cardNumber');
    this.elements.expiry = document.getElementById('expiry');
    this.elements.cvv = document.getElementById('cvv');
    this.elements.payBtn = document.querySelector('.btn-pay');
    this.elements.loader = document.getElementById('loader');
    this.elements.nameDisplay = document.getElementById('nameDisplay');
    this.elements.movieDisplay = document.getElementById('movieDisplay');
    this.elements.timeDisplay = document.getElementById('timeDisplay');
    this.elements.seatsDisplay = document.getElementById('seatsDisplay');
    this.elements.ticketTotalDisplay = document.getElementById('ticketTotalDisplay');
    this.elements.snackTotalDisplay = document.getElementById('snackTotalDisplay');
    this.elements.grandTotalDisplay = document.getElementById('grandTotalDisplay');
    this.elements.payAmount = document.getElementById('payAmount');
  },

  // Load booking data from URL
  loadBookingData() {
    const params = URLParams.getAll();
    this.state.bookingData = {
      name: params.get('name') || '',
      phone: params.get('phone') || '',
      movie: params.get('movie') || '',
      time: params.get('time') || '',
      seats: params.get('seats') || '',
      ticketTotal: parseInt(params.get('ticketTotal')) || 0,
      snackTotal: parseInt(params.get('snackTotal')) || 0,
      snacks: params.get('snacks') || 'None',
      total: parseInt(params.get('total')) || 0
    };
  },

  // Display booking information
  displayBookingInfo() {
    const data = this.state.bookingData;

    this.elements.nameDisplay.textContent = data.name;
    this.elements.movieDisplay.textContent = data.movie;
    this.elements.timeDisplay.textContent = data.time;
    this.elements.seatsDisplay.textContent = data.seats;
    this.elements.ticketTotalDisplay.textContent = data.ticketTotal;
    this.elements.snackTotalDisplay.textContent = data.snackTotal;
    this.elements.grandTotalDisplay.textContent = data.total;
    this.elements.payAmount.textContent = data.total;
  },

  // Setup validation
  setupValidation() {
    // Card number - only digits
    this.elements.cardNumber.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
      if (e.target.value.length === 16) {
        this.clearFieldError(e.target);
      }
    });

    // Expiry - auto format MM/YY
    this.elements.expiry.addEventListener('input', (e) => {
      let value = e.target.value.replace(/[^0-9]/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value;
    });

    // CVV - only digits
    this.elements.cvv.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
      if (e.target.value.length === 3) {
        this.clearFieldError(e.target);
      }
    });
  },

  // Bind events
  bindEvents() {
    this.elements.paymentForm.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  // Validate payment form
  validateForm() {
    let isValid = true;

    // Validate card name
    if (!FormValidator.isValidName(this.elements.cardName.value)) {
      this.setFieldError(this.elements.cardName, 'Please enter a valid name');
      isValid = false;
    } else {
      this.clearFieldError(this.elements.cardName);
    }

    // Validate card number
    if (!FormValidator.isValidCardNumber(this.elements.cardNumber.value)) {
      this.setFieldError(this.elements.cardNumber, 'Please enter a valid 16-digit card number');
      isValid = false;
    } else {
      this.clearFieldError(this.elements.cardNumber);
    }

    // Validate expiry
    if (!FormValidator.isValidExpiry(this.elements.expiry.value)) {
      this.setFieldError(this.elements.expiry, 'Invalid format. Use MM/YY');
      isValid = false;
    } else {
      this.clearFieldError(this.elements.expiry);
    }

    // Validate CVV
    if (!FormValidator.isValidCVV(this.elements.cvv.value)) {
      this.setFieldError(this.elements.cvv, 'CVV must be 3 digits');
      isValid = false;
    } else {
      this.clearFieldError(this.elements.cvv);
    }

    return isValid;
  },

  // Set field error
  setFieldError(field, message) {
    field.classList.add('error');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  },

  // Clear field error
  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.style.display = 'none';
    }
  },

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    if (this.state.isProcessing) return;

    if (!this.validateForm()) {
      alert('Please correct the errors in the form');
      return;
    }

    this.processPayment();
  },

  // Process payment
  async processPayment() {
    this.state.isProcessing = true;
    this.elements.loader.style.display = 'block';
    this.elements.payBtn.disabled = true;

    try {
      // Simulate API call with delay
      await Utils.delay(2500);

      // In production, you would call your backend API here
      // const response = await API.post('/api/payment', {
      //   cardNumber: this.elements.cardNumber.value,
      //   expiry: this.elements.expiry.value,
      //   cvv: this.elements.cvv.value,
      //   amount: this.state.bookingData.total
      // });

      // For demo, just navigate to ticket page
      this.navigateToTicket();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      this.elements.payBtn.disabled = false;
      this.elements.loader.style.display = 'none';
      this.state.isProcessing = false;
    }
  },

  // Navigate to ticket page
  navigateToTicket() {
    const data = this.state.bookingData;
    const ticketData = {
      name: data.name,
      movie: data.movie,
      time: data.time,
      seats: data.seats,
      snacks: data.snacks,
      total: data.total
    };

    URLParams.navigate('ticket.html', ticketData);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  PAYMENT.init();
});

// For debugging (remove in production)
window.PAYMENT = PAYMENT;
