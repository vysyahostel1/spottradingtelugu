const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMessage = typeof data === 'string' ? data : (data.message || 'API request failed');
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateUser(userData) {
    return this.request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // User management endpoints
  async getAllUsers() {
    return this.request('/users');
  }

  async getRecentUsers(limit = 10) {
    return this.request(`/users/recent?limit=${limit}`);
  }

  async updateUserRole(userId, role) {
    return this.request(`/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async deleteUser(userId) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async getTotalUsers() {
    return this.request('/users/stats/total');
  }

  // Course endpoints
  async getCourses() {
    return this.request('/courses');
  }

  async getCourse(id) {
    return this.request(`/courses/${id}`);
  }

  async createCourse(courseData) {
    return this.request('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(id, courseData) {
    return this.request(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(id) {
    return this.request(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  // Enrollment endpoints
  async getMyEnrollments() {
    return this.request('/enrollments/my');
  }

  async getAllEnrollments() {
    return this.request('/enrollments');
  }

  async getRecentEnrollments(limit = 5) {
    return this.request(`/enrollments/recent?limit=${limit}`);
  }

  async enrollInCourse(enrollmentData) {
    return this.request('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    });
  }

  async updateEnrollmentStatus(id, status) {
    return this.request(`/enrollments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getTotalEnrollments() {
    return this.request('/enrollments/stats/total');
  }

  // Review endpoints
  async getReviews() {
    return this.request('/reviews');
  }

  async getAllReviews() {
    return this.request('/reviews/admin/all');
  }

  async createReview(reviewData) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async approveReview(id) {
    return this.request(`/reviews/${id}/approve`, {
      method: 'PUT',
    });
  }

  async deleteReview(id) {
    return this.request(`/reviews/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact endpoints
  async sendContactMessage(messageData) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async getContactMessages() {
    return this.request('/contacts');
  }

  async markMessageAsRead(id) {
    return this.request(`/contacts/${id}/read`, {
      method: 'PUT',
    });
  }

  async markMessageAsReplied(id) {
    return this.request(`/contacts/${id}/replied`, {
      method: 'PUT',
    });
  }

  async deleteContactMessage(id) {
    return this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Settings endpoints
  async getSettings() {
    return this.request('/settings');
  }

  async updateSettings(settingsData) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  }

  // Logout helper
  logout() {
    localStorage.removeItem('token');
  }
}

export const apiService = new ApiService();
