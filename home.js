/* ============================================
   HOME PAGE JAVASCRIPT
   ============================================ */

const HOME = {
  config: {
    API_KEY: 'e634257', // OMDb API key
    SEARCH_DELAY: 500,
    POPULAR_SEARCHES: ['Avengers']
  },

  state: {
    allMovies: [],
    selectedGenre: '',
    isLoading: false
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

      if (data.Response === "True") {
        this.state.allMovies = [];
        this.elements.moviesContainer.innerHTML = '';

        // Fetch details for each movie
        for (const movie of data.Search) {
          try {
            const details = await this.getMovieDetails(movie.imdbID);
            if (details && details.Response === "True") {
              this.state.allMovies.push({ ...movie, details });
            }
          } catch (error) {
            console.error(`Error fetching details for ${movie.Title}:`, error);
          }
        }

        this.renderMovies(this.state.allMovies);
      } else {
        this.showNoResults(query);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.showError();
    } finally {
      this.setLoading(false);
    }
  },

  // Get movie details from API
  async getMovieDetails(imdbID) {
    try {
      const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${this.config.API_KEY}`;
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

      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie-card');
      movieDiv.innerHTML = `
        <div class="poster">
          <img 
            src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}" 
            alt="${movie.Title}"
            loading="lazy"
          >
          <div class="rating-badge">★ ${rating}</div>
        </div>
        <div class="movie-info">
          <h3>${this.escapeHtml(movie.Title)}</h3>
          <p class="movie-year">${movie.Year}</p>
          <p class="movie-genre">${genre}</p>
          <button class="book-btn" onclick="HOME.bookMovie('${movie.Title.replace(/'/g, "\\'")}')">Book Now</button>
        </div>
        <div class="details-overlay">
          <h4>${this.escapeHtml(details.Title || movie.Title)}</h4>
          <p><strong>Director:</strong> ${this.escapeHtml(details.Director || 'N/A')}</p>
          <p><strong>Plot:</strong> ${this.escapeHtml(details.Plot || 'N/A')}</p>
          <p><strong>Runtime:</strong> ${this.escapeHtml(details.Runtime || 'N/A')}</p>
        </div>
      `;

      this.elements.moviesContainer.appendChild(movieDiv);
    });
  },

  // Book movie
  bookMovie(title) {
    URLParams.navigate('booking.html', { movie: title });
  },

  // Filter by genre
  filterByGenre(genre) {
    this.state.selectedGenre = genre;

    // Update active filter button
    this.elements.filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

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
        <p>${query ? `for "${query}"` : 'Try searching for your favorite movie'}</p>
      </div>
    `;
  },

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  HOME.init();

  // Make filterByGenre accessible globally
  window.filterByGenre = (genre) => HOME.filterByGenre(genre);
});

// For debugging (remove in production)
window.HOME = HOME;
