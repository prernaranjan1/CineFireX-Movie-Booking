/* ============================================
   SNACKS PAGE JAVASCRIPT
   ============================================ */

const SNACKS = {
  state: {
    bookingData: {},
    selectedSnacks: {},
    snackTotal: 0
  },

  elements: {
    snackCards: null,
    snacksList: null,
    snackTotalDisplay: null,
    movieDisplay: null,
    timeDisplay: null,
    seatsDisplay: null,
    ticketTotalDisplay: null
  },

  // Initialize
  init() {
    this.cacheElements();
    this.loadBookingData();
    this.displayBookingInfo();
    this.setupSnackSelection();
    this.updateSummary();
  },

  // Cache DOM elements
  cacheElements() {
    this.elements.snackCards = document.querySelectorAll('.snack-card');
    this.elements.snacksList = document.getElementById('snacksList');
    this.elements.snackTotalDisplay = document.getElementById('snackTotal');
    this.elements.movieDisplay = document.getElementById('movieDisplay');
    this.elements.timeDisplay = document.getElementById('timeDisplay');
    this.elements.seatsDisplay = document.getElementById('seatsDisplay');
    this.elements.ticketTotalDisplay = document.getElementById('ticketTotalDisplay');
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
      ticketTotal: parseInt(params.get('ticketTotal')) || 0
    };
  },

  // Display booking information
  displayBookingInfo() {
    this.elements.movieDisplay.textContent = this.state.bookingData.movie;
    this.elements.timeDisplay.textContent = this.state.bookingData.time;
    this.elements.seatsDisplay.textContent = this.state.bookingData.seats;
    this.elements.ticketTotalDisplay.textContent = this.state.bookingData.ticketTotal;
  },

  // Setup snack selection
  setupSnackSelection() {
    this.elements.snackCards.forEach(card => {
      const input = card.querySelector('input');

      // Handle quantity input change
      input.addEventListener('change', () => this.updateSummary());
      input.addEventListener('keyup', () => this.updateSummary());

      // Handle card click (increment quantity)
      card.addEventListener('click', (e) => {
        if (e.target === input) return;
        const currentQty = parseInt(input.value || 0);
        input.value = currentQty + 1;
        this.updateSummary();
      });
    });
  },

  // Update snacks summary
  updateSummary() {
    let totalSnacks = 0;
    this.elements.snacksList.innerHTML = '';
    this.state.selectedSnacks = {};

    this.elements.snackCards.forEach(card => {
      const qty = parseInt(card.querySelector('input').value) || 0;
      const name = card.dataset.name;
      const price = parseInt(card.dataset.price);

      if (qty > 0) {
        card.classList.add('selected');
        const itemTotal = qty * price;
        totalSnacks += itemTotal;

        this.state.selectedSnacks[name] = {
          quantity: qty,
          price: price,
          total: itemTotal
        };

        // Add to summary
        const item = document.createElement('div');
        item.className = 'summary-item';
        item.innerHTML = `
          <span>${this.escapeHtml(name)} x${qty}</span>
          <span>₹${itemTotal}</span>
        `;
        this.elements.snacksList.appendChild(item);
      } else {
        card.classList.remove('selected');
      }
    });

    this.state.snackTotal = totalSnacks;
    this.elements.snackTotalDisplay.textContent = totalSnacks;
  },

  // Skip snacks and go to payment
  skipSnacks() {
    const paymentData = {
      name: this.state.bookingData.name,
      phone: this.state.bookingData.phone,
      movie: this.state.bookingData.movie,
      time: this.state.bookingData.time,
      seats: this.state.bookingData.seats,
      ticketTotal: this.state.bookingData.ticketTotal,
      snackTotal: 0,
      snacks: 'None',
      total: this.state.bookingData.ticketTotal
    };

    URLParams.navigate('payment.html', paymentData);
  },

  // Proceed to payment
  proceedToPayment() {
    const snacksSelected = Object.entries(this.state.selectedSnacks)
      .map(([name, data]) => `${name} x${data.quantity}`)
      .join(', ') || 'None';

    const finalTotal = this.state.bookingData.ticketTotal + this.state.snackTotal;

    const paymentData = {
      name: this.state.bookingData.name,
      phone: this.state.bookingData.phone,
      movie: this.state.bookingData.movie,
      time: this.state.bookingData.time,
      seats: this.state.bookingData.seats,
      ticketTotal: this.state.bookingData.ticketTotal,
      snackTotal: this.state.snackTotal,
      snacks: snacksSelected,
      total: finalTotal
    };

    URLParams.navigate('payment.html', paymentData);
  },

  // Escape HTML
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  SNACKS.init();

  // Make functions accessible globally
  window.skipSnacks = () => SNACKS.skipSnacks();
  window.proceedToPayment = () => SNACKS.proceedToPayment();
});

// For debugging (remove in production)
window.SNACKS = SNACKS;
