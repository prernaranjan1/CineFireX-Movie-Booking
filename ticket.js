/* ============================================
   TICKET PAGE JAVASCRIPT
   ============================================ */

const TICKET = {
  state: {
    bookingData: {},
    bookingId: ''
  },

  elements: {
    nameDisplay: null,
    movieDisplay: null,
    timeDisplay: null,
    seatsDisplay: null,
    snacksDisplay: null,
    totalDisplay: null,
    bookingIdDisplay: null
  },

  // Initialize
  init() {
    this.cacheElements();
    this.loadBookingData();
    this.displayTicketInfo();
    this.generateBookingId();
    this.saveBookingToStorage();
  },

  // Cache DOM elements
  cacheElements() {
    this.elements.nameDisplay = document.getElementById('nameDisplay');
    this.elements.movieDisplay = document.getElementById('movieDisplay');
    this.elements.timeDisplay = document.getElementById('timeDisplay');
    this.elements.seatsDisplay = document.getElementById('seatsDisplay');
    this.elements.snacksDisplay = document.getElementById('snacksDisplay');
    this.elements.totalDisplay = document.getElementById('totalDisplay');
    this.elements.bookingIdDisplay = document.getElementById('bookingId');
  },

  // Load booking data from URL
  loadBookingData() {
    const params = URLParams.getAll();
    this.state.bookingData = {
      name: params.get('name') || 'Guest',
      movie: params.get('movie') || 'Not Selected',
      time: params.get('time') || 'Not Selected',
      seats: params.get('seats') || 'Not Selected',
      snacks: params.get('snacks') || 'None',
      total: params.get('total') || '0'
    };
  },

  // Display ticket information
  displayTicketInfo() {
    const data = this.state.bookingData;

    this.elements.nameDisplay.textContent = data.name;
    this.elements.movieDisplay.textContent = data.movie;
    this.elements.timeDisplay.textContent = data.time;
    this.elements.seatsDisplay.textContent = data.seats;
    this.elements.snacksDisplay.textContent = data.snacks;
    this.elements.totalDisplay.textContent = '₹' + data.total;
  },

  // Generate booking ID
  generateBookingId() {
    this.state.bookingId = Utils.generateBookingId();
    this.elements.bookingIdDisplay.textContent = this.state.bookingId;
  },

  // Save booking to local storage
  saveBookingToStorage() {
    const booking = {
      bookingId: this.state.bookingId,
      ...this.state.bookingData,
      bookingDate: new Date().toLocaleString(),
      status: 'Confirmed'
    };

    Storage.set('lastBooking', booking);

    // Also save to bookings history
    const bookings = Storage.get('bookingHistory') || [];
    bookings.push(booking);
    Storage.set('bookingHistory', bookings);
  },

  // Print ticket
  printTicket() {
    window.print();
  },

  // Go home
  goHome() {
    window.location.href = 'index.html';
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  TICKET.init();

  // Make functions accessible globally
  window.goHome = () => TICKET.goHome();
  window.printTicket = () => TICKET.printTicket();
});

// For debugging (remove in production)
window.TICKET = TICKET;
