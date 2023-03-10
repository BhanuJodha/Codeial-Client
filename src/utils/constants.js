export const API_ROOT = 'http://localhost:8000/api/v1';
export const API_ORIGIN = 'http://localhost:8000';

export const API_URLS = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  createPost: () => `${API_ROOT}/posts/create`,
  deletePost: (post_id) => `${API_ROOT}/posts?post_id=${post_id}`,
  addFollow: (userId) =>
    `${API_ROOT}/followship/create_following?user_id=${userId}`,
  following: () => `${API_ROOT}/followship/fetch_user_following`,
  friends: () => `${API_ROOT}/followship/fetch_user_friends`,
  removeFollow: (userId) =>
    `${API_ROOT}/followship/remove_following?user_id=${userId}`,
  toggleLike: (itemId, itemType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${itemId}&onModel=${itemType}`, // itemType is 'Post'/'Comment'
  getLikes: (itemId, itemType) =>
    `${API_ROOT}/likes?likeable_id=${itemId}&likeable_type=${itemType}`,
  comment: () => `${API_ROOT}/comments`, // POST - create, GET - list of comments
  deleteComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`,
  editUser: () => `${API_ROOT}/users/edit`,
  userInfo: (userId) => `${API_ROOT}/users/${userId}`,
  searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
  getChat: (userId) => `${API_ROOT}/chats/getchat/${userId}`,
  checkGoogleAuth: () => `${API_ROOT}/users/checkGoogleAuth`
};

export const LOCAL_KEY = "__codial_key__"; 