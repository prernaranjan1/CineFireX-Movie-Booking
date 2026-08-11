/* ============================================
   COMMON UTILITIES & HELPER FUNCTIONS
   ============================================ */

// URL Parameter handling
const URLParams = {
  get: (param) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) ? decodeURIComponent(params.get(param)) : '';
  },

  getAll: () => {
    return new URLSearchParams(window.location.search);
  },

  set: (param, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(param, encodeURIComponent(value));
    return '?' + params.toString();
  },

  navigate: (page, params = {}) => {
    let url = page + '?';
    const queryParams = [];
    for (let key in params) {
      if (params[key] !== null && params[key] !== undefined) {
        queryParams.push(`${key}=${encodeURIComponent(params[key])}`);
      }
    }
    window.location.href = url + queryParams.join('&');
  }
};

// Form Validation
const FormValidator = {
  isValidName: (name) => {
    return name && name.trim().length >= 2;
  },

  isValidPhone: (phone) => {
    return /^[0-9]{10}$/.test(phone);
  },

  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidCardNumber: (cardNumber) => {
    return /^[0-9]{16}$/.test(cardNumber.replace(/\s/g, ''));
  },

  isValidExpiry: (expiry) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  },

  isValidCVV: (cvv) => {
    return /^[0-9]{3}$/.test(cvv);
  },

  validateField: (fieldId, validator, errorMessage = '') => {
    const field = document.getElementById(fieldId);
    if (!field) return false;

    const isValid = validator(field.value);
    const errorElement = field.nextElementSibling;

    if (!isValid) {
      field.classList.add('error');
      if (errorElement && errorElement.classList.contains('error-text')) {
        errorElement.textContent = errorMessage || 'Invalid input';
        errorElement.style.display = 'block';
      }
    } else {
      field.classList.remove('error');
      if (errorElement && errorElement.classList.contains('error-text')) {
        errorElement.style.display = 'none';
      }
    }

    return isValid;
  }
};

// Storage Management (LocalStorage wrapper)
const Storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  }
};

// Alert/Toast Messages
const Alert = {
  show: (message, type = 'info', duration = 3000) => {
    const alertClass = `alert alert-${type}`;
    const alertElement = document.createElement('div');
    alertElement.className = alertClass;
    alertElement.textContent = message;
    alertElement.style.position = 'fixed';
    alertElement.style.top = '20px';
    alertElement.style.right = '20px';
    alertElement.style.zIndex = '1000';
    alertElement.style.maxWidth = '400px';

    document.body.appendChild(alertElement);

    if (duration > 0) {
      setTimeout(() => {
        alertElement.remove();
      }, duration);
    }

    return alertElement;
  },

  success: (message, duration = 3000) => {
    return Alert.show(message, 'success', duration);
  },

  error: (message, duration = 3000) => {
    return Alert.show(message, 'error', duration);
  },

  info: (message, duration = 3000) => {
    return Alert.show(message, 'info', duration);
  },

  warning: (message, duration = 3000) => {
    return Alert.show(message, 'warning', duration);
  }
};

// Utility Functions
const Utils = {
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  },

  formatPrice: (price) => {
    return '₹' + price.toString();
  },

  generateBookingId: () => {
    return 'CB' + Date.now().toString().slice(-8);
  },

  generateTransactionId: () => {
    return 'TXN' + Date.now().toString().slice(-10);
  },

  delay: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  scrollToTop: (smooth = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  },

  scrollToElement: (elementId, smooth = true) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  }
};

// DOM Helpers
const DOM = {
  on: (selector, event, handler) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener(event, handler);
    });
  },

  addClass: (selector, className) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.add(className);
    });
  },

  removeClass: (selector, className) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.remove(className);
    });
  },

  toggleClass: (selector, className) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.toggle(className);
    });
  },

  show: (selector) => {
    DOM.removeClass(selector, 'hidden');
  },

  hide: (selector) => {
    DOM.addClass(selector, 'hidden');
  },

  setText: (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  },

  setHTML: (selector, html) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = html;
  },

  getValue: (selector) => {
    const element = document.querySelector(selector);
    return element ? element.value : '';
  },

  setValue: (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.value = value;
  }
};

// Loading State Management
const Loading = {
  show: (elementId = 'loader') => {
    const loader = document.getElementById(elementId);
    if (loader) {
      loader.classList.add('active');
      loader.style.display = 'block';
    }
  },

  hide: (elementId = 'loader') => {
    const loader = document.getElementById(elementId);
    if (loader) {
      loader.classList.remove('active');
      loader.style.display = 'none';
    }
  },

  setMessage: (message, elementId = 'loader') => {
    const loader = document.getElementById(elementId);
    if (loader) {
      const textElement = loader.querySelector('.loader-text');
      if (textElement) {
        textElement.textContent = message;
      }
    }
  }
};

// API Calls (Future use for backend integration)
const API = {
  BASE_URL: '', // Set this when you have a backend

  async get(endpoint) {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

// Event Listeners Setup
document.addEventListener('DOMContentLoaded', () => {
  // Real-time form validation
  document.querySelectorAll('input[required], select[required]').forEach(field => {
    field.addEventListener('blur', function() {
      FormValidator.validateField(this.id, (value) => value.trim() !== '', 'This field is required');
    });
  });

  // Prevent form submission on Enter in certain inputs
  document.querySelectorAll('input[type="text"], input[type="tel"]').forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  });
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    URLParams,
    FormValidator,
    Storage,
    Alert,
    Utils,
    DOM,
    Loading,
    API
  };
}
