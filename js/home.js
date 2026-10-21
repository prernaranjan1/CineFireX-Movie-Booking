/* ============================================
   HOME PAGE JAVASCRIPT
   ============================================ */

const HOME = {
  config: {
    API_KEY: "OMDb_API_key", // OMDb API key
    SEARCH_DELAY: 500,
    POPULAR_SEARCHES: ['Avengers'],
    NO_POSTER: 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400">' +
      '<rect width="100%" height="100%" fill="#222"/>' +
      '<text x="50%" y="50%" fill="#888" font-family="sans-serif" font-size="20" ' +
      'text-anchor="middle">No Image</text></svg>'
    )
  },

  state: {
    allMovies: [],
    selectedGenre: '',
    isLoading: false,
    searchId: 0
  },

  // DOM Elements
  elements: {
    moviesContainer: null,
    searchInput: null,
    searchBtn: null,
    filterBtns: null
  },

  // Initialize
  init() {
    this.cacheElements();
    this.bindEvents();
    this.loadPopularMovies();
  },

  // Cache DOM elements
  cacheElements() {
    this.elements.moviesContainer = document.querySelector('.movies-grid');
    this.elements.searchInput = document.getElementById('searchInput');
    this.elements.searchBtn = document.getElementById('searchBtn');
    this.elements.filterBtns = document.querySelectorAll('.filter-btn');
  },

  // Bind events
  bindEvents() {
    this.elements.searchBtn.addEventListener('click', () => this.handleSearch());
    this.elements.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSearch();
    });
  },

  // Load popular movies on page load
  loadPopularMovies() {
    if (this.config.POPULAR_SEARCHES.length > 0) {
      this.displayMovies(this.config.POPULAR_SEARCHES[0]);
    }
  },

  // Handle search
  handleSearch() {
    const query = this.elements.searchInput.value.trim();
    if (query) {
      this.displayMovies(query);
      this.resetFilters();
    }
  },

  // Display movies from API
  async displayMovies(query) {
    if (!query) return;

    // Ignore results from an older search that finishes late
    const searchId = ++this.state.searchId;

    this.setLoading(true);
    this.elements.moviesContainer.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        Loading movies...
      </div>
    `;

    try {
      const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${this.config.API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (searchId !== this.state.searchId) return;

      if (data.Response === "True") {
        // Fetch details for all movies in parallel
        const detailsList = await Promise.all(
          data.Search.map(movie => this.getMovieDetails(movie.imdbID))
        );
        if (searchId !== this.state.searchId) return;

        this.state.allMovies = data.Search
          .map((movie, i) => ({ ...movie, details: detailsList[i] }))
          .filter(movie => movie.details && movie.details.Response === "True");

        this.renderMovies(this.state.allMovies);
      } else {
        this.showNoResults(query);
      }
    } catch (error) {
      if (searchId !== this.state.searchId) return;
      console.error('Error fetching movies:', error);
      this.showError();
    } finally {
      if (searchId === this.state.searchId) this.setLoading(false);
    }
  },

  // Get movie details from API
  async getMovieDetails(imdbID) {
    try {
      const url = `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${this.config.API_KEY}`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  },

  // Render movies on page
  renderMovies(moviesToRender) {
    if (moviesToRender.length === 0) {
      this.showNoResults('');
      return;
    }

    this.elements.moviesContainer.innerHTML = '';

    moviesToRender.forEach(movie => {
      const details = movie.details || {};
      const rating = details.imdbRating ? parseFloat(details.imdbRating).toFixed(1) : 'N/A';
      const genre = details.Genre ? details.Genre.split(',')[0].trim() : 'Unknown';

      const esc = Utils.escapeHtml;
      const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : this.config.NO_POSTER;

      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-card');
      movieDiv.innerHTML = `
        <div class="poster">
          <img src="${esc(poster)}" alt="${esc(movie.Title)}" loading="lazy">
          <div class="rating-badge">★ ${esc(rating)}</div>
        </div>
        <div class="movie-info">
          <h3>${esc(movie.Title)}</h3>
          <p class="movie-year">${esc(movie.Year)}</p>
          <p class="movie-genre">${esc(genre)}</p>
          <button class="book-btn" type="button">Book Now</button>
        </div>
        <div class="details-overlay">
          <h4>${esc(details.Title || movie.Title)}</h4>
          <p><strong>Director:</strong> ${esc(details.Director || 'N/A')}</p>
          <p><strong>Plot:</strong> ${esc(details.Plot || 'N/A')}</p>
          <p><strong>Runtime:</strong> ${esc(details.Runtime || 'N/A')}</p>
        </div>
      `;

      const img = movieDiv.querySelector('img');
      img.addEventListener('error', () => {
        img.src = this.config.NO_POSTER;
      }, { once: true });

      movieDiv.querySelector('.book-btn')
        .addEventListener('click', () => this.bookMovie(movie.Title));

      this.elements.moviesContainer.appendChild(movieDiv);
    });
  },

  // Book movie
  bookMovie(title) {
    URLParams.navigate('booking.html', { movie: title });
  },

  // Filter by genre
  filterByGenre(genre, button) {
    this.state.selectedGenre = genre;

    // Update active filter button
    this.elements.filterBtns.forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');

    // Filter and render
    if (genre === '') {
      this.renderMovies(this.state.allMovies);
    } else {
      const filtered = this.state.allMovies.filter(movie => {
        return movie.details?.Genre && movie.details.Genre.includes(genre);
      });
      this.renderMovies(filtered);
    }
  },

  // Reset filters
  resetFilters() {
    this.state.selectedGenre = '';
    this.elements.filterBtns.forEach(btn => btn.classList.remove('active'));
    this.elements.filterBtns[0].classList.add('active');
  },

  // Show loading state
  setLoading(loading) {
    this.state.isLoading = loading;
  },

  // Show error message
  showError() {
    this.elements.moviesContainer.innerHTML = `
      <div class="error-message" style="grid-column: 1/-1;">
        ⚠️ Error loading movies. Please try again later.
      </div>
    `;
  },

  // Show no results message
  showNoResults(query) {
    this.elements.moviesContainer.innerHTML = `
      <div class="no-results" style="grid-column: 1/-1; background: none; color: white; padding: 60px 20px; text-align: center;">
        <h2>No movies found</h2>
        <p>${query ? `for "${Utils.escapeHtml(query)}"` : 'Try searching for your favorite movie'}</p>
      </div>
    `;
  },

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    return Utils.escapeHtml(text);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  HOME.init();

  // Make filterByGenre accessible globally
  window.filterByGenre = (genre, button) => HOME.filterByGenre(genre, button);
});

// For debugging (remove in production)
window.HOME = HOME;
