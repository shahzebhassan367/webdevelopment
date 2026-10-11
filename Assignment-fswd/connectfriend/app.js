/**
 * ConnecFriend - Social Connectivity Network
 * Production Light-Mode Front-End Architecture
 * Pure JavaScript + Tailwind CSS (Zero Plain CSS)
 */

(function () {
  'use strict';

  // =========================================================================
  // CORE SIMULATED DATA REPOSITORY
  // =========================================================================
  const NOW = Date.now();
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const DEFAULT_USERS = [
    {
      id: 'usr_alex',
      username: 'alex',
      password: 'password123',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      headline: 'Creative Technologist & Interface Architect',
      bio: 'Exploring interactive network graphs, generative user interfaces, and real-time collaborative digital spaces.',
      location: 'San Francisco, California',
      lastLogin: NOW - (3 * MINUTE),
      friends: ['usr_sarah', 'usr_marcus', 'usr_elena'],
      friendRatings: {
        usr_sarah: 3, // Trustworthy
        usr_marcus: 2, // Cool
        usr_elena: 2   // Cool
      },
      ignoreList: ['usr_tanya']
    },
    {
      id: 'usr_sarah',
      username: 'sarah',
      password: 'password123',
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      headline: 'Computational Neuroscientist & Research Fellow',
      bio: 'Investigating synaptogenesis and neural coding. Speculative fiction reader and ambient acoustic curator.',
      location: 'Boston, Massachusetts',
      lastLogin: NOW - (12 * MINUTE),
      friends: ['usr_alex', 'usr_marcus', 'usr_liam'],
      friendRatings: {
        usr_alex: 3,
        usr_marcus: 1, // Stupid
        usr_liam: 2
      },
      ignoreList: []
    },
    {
      id: 'usr_marcus',
      username: 'marcus',
      password: 'password123',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      headline: 'Sound Engineer & Acoustic Hardware Designer',
      bio: 'Assembling discrete analog synthesizer circuits. Community electronic audio workshop facilitator.',
      location: 'Austin, Texas',
      lastLogin: NOW - (38 * MINUTE),
      friends: ['usr_alex', 'usr_sarah'],
      friendRatings: {
        usr_alex: 2,
        usr_sarah: 3
      },
      ignoreList: []
    },
    {
      id: 'usr_elena',
      username: 'elena',
      password: 'password123',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      headline: 'Architectural Photographer & Urbanist',
      bio: 'Documenting structural geometry, concrete textures, and daylight interactions across Europe.',
      location: 'Berlin, Germany',
      lastLogin: NOW - (2 * HOUR),
      friends: ['usr_alex', 'usr_tanya'],
      friendRatings: {
        usr_alex: 3,
        usr_tanya: 2
      },
      ignoreList: []
    },
    {
      id: 'usr_liam',
      username: 'liam',
      password: 'password123',
      name: 'Liam Miller',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      headline: 'Ecological Systems Designer',
      bio: 'Designing sustainable urban canopies and regenerative closed-loop food systems.',
      location: 'Portland, Oregon',
      lastLogin: NOW - (5 * HOUR),
      friends: ['usr_sarah'],
      friendRatings: {
        usr_sarah: 3
      },
      ignoreList: ['usr_alex'] // Liam explicitly ignores Alex
    },
    {
      id: 'usr_tanya',
      username: 'tanya',
      password: 'password123',
      name: 'Tanya Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      headline: 'Renewable Microgrid Strategist',
      bio: 'Developing decentralized solar power storage topologies and distributed battery management.',
      location: 'Boulder, Colorado',
      lastLogin: NOW - (1 * DAY),
      friends: ['usr_elena'],
      friendRatings: {
        usr_elena: 3
      },
      ignoreList: []
    }
  ];

  const DEFAULT_POSTS = [
    {
      id: 'post_1',
      authorId: 'usr_sarah',
      content: 'Excited to announce our team\'s paper exploring sensory synchronization across distributed cortical networks is officially live! Heartfelt gratitude to our research cohort for making these computations possible.',
      timestamp: NOW - (15 * MINUTE),
      audience: 'all',
      allowedFriends: [],
      likes: ['usr_alex', 'usr_marcus'],
      dislikes: []
    },
    {
      id: 'post_2',
      authorId: 'usr_marcus',
      content: 'Bench-tested the new stereo ladder filter revision this morning. The analog harmonic warmth in the lower midrange is clean without losing transient punch. Audio samples releasing soon.',
      timestamp: NOW - (50 * MINUTE),
      audience: 'all',
      allowedFriends: [],
      likes: ['usr_alex'],
      dislikes: []
    },
    {
      id: 'post_3',
      authorId: 'usr_elena',
      content: 'Early morning light striking the raw concrete curves at the cultural museum. Architecture continues to be the most patient artistic medium.',
      timestamp: NOW - (3 * HOUR),
      audience: 'all',
      allowedFriends: [],
      likes: ['usr_alex', 'usr_tanya'],
      dislikes: []
    },
    {
      id: 'post_4',
      authorId: 'usr_alex',
      content: 'Welcome to the updated ConnecFriend design! Notice the clean light palette, highly visible pill-shaped message buttons, and refined activity metrics.',
      timestamp: NOW - (6 * MINUTE),
      audience: 'all',
      allowedFriends: [],
      likes: ['usr_sarah', 'usr_marcus'],
      dislikes: []
    }
  ];

  const DEFAULT_MESSAGES = [
    {
      id: 'msg_1',
      fromId: 'usr_sarah',
      toId: 'usr_alex',
      text: 'Hi Alex, I reviewed the interface notes you shared. The new light layout is significantly clearer and much more inviting!',
      timestamp: NOW - (25 * MINUTE)
    },
    {
      id: 'msg_2',
      fromId: 'usr_alex',
      toId: 'usr_sarah',
      text: 'Thanks Sarah! We made sure the messaging view has a solid two-pane structure so conversations never overlap.',
      timestamp: NOW - (20 * MINUTE)
    },
    {
      id: 'msg_3',
      fromId: 'usr_liam',
      toId: 'usr_alex',
      text: 'Hello Alex, checking in regarding the neighborhood community greenhouse workshop notes.',
      timestamp: NOW - (2 * HOUR)
    }
  ];

  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  const State = {
    users: [],
    posts: [],
    messages: [],
    currentUserId: null,
    activeTab: 'feed', // 'feed' | 'profile' | 'friends' | 'messages'
    selectedChatUserId: null,

    init() {
      const storedUsers = localStorage.getItem('cf_light_users');
      const storedPosts = localStorage.getItem('cf_light_posts');
      const storedMessages = localStorage.getItem('cf_light_messages');
      const storedCurrentUser = localStorage.getItem('cf_light_curr_user');

      this.users = storedUsers ? JSON.parse(storedUsers) : JSON.parse(JSON.stringify(DEFAULT_USERS));
      this.posts = storedPosts ? JSON.parse(storedPosts) : JSON.parse(JSON.stringify(DEFAULT_POSTS));
      this.messages = storedMessages ? JSON.parse(storedMessages) : JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
      this.currentUserId = storedCurrentUser || null;

      if (this.currentUserId && !this.users.some(u => u.id === this.currentUserId)) {
        this.currentUserId = null;
      }
    },

    save() {
      localStorage.setItem('cf_light_users', JSON.stringify(this.users));
      localStorage.setItem('cf_light_posts', JSON.stringify(this.posts));
      localStorage.setItem('cf_light_messages', JSON.stringify(this.messages));
      if (this.currentUserId) {
        localStorage.setItem('cf_light_curr_user', this.currentUserId);
      } else {
        localStorage.removeItem('cf_light_curr_user');
      }
    },

    getCurrentUser() {
      return this.users.find(u => u.id === this.currentUserId) || null;
    },

    getUserById(id) {
      return this.users.find(u => u.id === id) || null;
    }
  };

  // =========================================================================
  // UTILITIES & HELPERS
  // =========================================================================
  function formatRelativeTime(timestamp) {
    const diff = Math.max(0, Date.now() - timestamp);
    const s = Math.floor(diff / 1000);
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  }

  function getRatingMeta(val) {
    switch (Number(val)) {
      case 1:
        return {
          label: 'Stupid',
          icon: 'fa-face-rolling-eyes',
          textColor: 'text-rose-600',
          badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
        };
      case 2:
        return {
          label: 'Cool',
          icon: 'fa-face-smile-beam',
          textColor: 'text-amber-600',
          badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      case 3:
        return {
          label: 'Trustworthy',
          icon: 'fa-shield-halved',
          textColor: 'text-emerald-600',
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      default:
        return {
          label: 'Unrated',
          icon: 'fa-circle-question',
          textColor: 'text-slate-500',
          badgeClass: 'bg-slate-100 text-slate-600 border-slate-200'
        };
    }
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const toastStyles = {
      success: 'border-emerald-200 bg-white text-emerald-900 shadow-emerald-900/10',
      error: 'border-rose-200 bg-white text-rose-900 shadow-rose-900/10',
      warning: 'border-amber-200 bg-white text-amber-900 shadow-amber-900/10',
      info: 'border-blue-200 bg-white text-blue-900 shadow-blue-900/10'
    };

    const icons = {
      success: 'fa-circle-check text-emerald-600',
      error: 'fa-circle-exclamation text-rose-600',
      warning: 'fa-triangle-exclamation text-amber-600',
      info: 'fa-circle-info text-blue-600'
    };

    toast.className = `pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-xl transition-all duration-300 transform translate-y-3 opacity-0 text-sm font-semibold tracking-wide ${toastStyles[type] || toastStyles.info}`;
    toast.innerHTML = `
      <i class="fa-solid ${icons[type] || icons.info} text-lg"></i>
      <span class="flex-1">${message}</span>
      <button class="text-slate-400 hover:text-slate-700 transition ml-2" onclick="this.parentElement.remove()">
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-x-6');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // =========================================================================
  // MAIN ROUTING & RENDER ENGINE
  // =========================================================================
  function renderApp() {
    const root = document.getElementById('app-root');
    if (!root) return;

    if (!State.currentUserId) {
      root.innerHTML = renderLoginView();
      bindLoginEvents();
    } else {
      root.innerHTML = renderDashboardView();
      bindDashboardEvents();
    }
  }

  // -------------------------------------------------------------------------
  // 1. LOGIN VIEW (LIGHT MODE)
  // -------------------------------------------------------------------------
  function renderLoginView() {
    return `
      <div class="flex-1 flex flex-col justify-center items-center px-4 py-12 bg-slate-50 min-h-screen">
        
        <!-- Logo Section with Handshake Icon -->
        <div class="w-full max-w-md text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 shadow-lg shadow-blue-500/25 mb-4 text-white ring-4 ring-blue-100">
            <i class="fa-solid fa-handshake text-3xl"></i>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Connec<span class="text-blue-600">Friend</span>
          </h1>
          <p class="text-slate-500 text-sm mt-1.5 font-medium">Authentic social connectivity and peer relations</p>
        </div>

        <!-- Crisp White Login Card with Soft Shadow -->
        <div class="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-10 shadow-lg">
          <div class="mb-6">
            <h2 class="text-xl font-bold text-slate-900 tracking-tight">Account Sign In</h2>
            <p class="text-xs text-slate-500 mt-1">Enter your registered username and password to proceed</p>
          </div>

          <form id="login-form" class="space-y-5">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Username</label>
              <div class="relative">
                <i class="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input 
                  type="text" 
                  id="login-username" 
                  class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                  placeholder="Enter username"
                  autocomplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
              <div class="relative">
                <i class="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input 
                  type="password" 
                  id="login-password" 
                  class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                  placeholder="••••••••••••"
                  autocomplete="current-password"
                  required
                />
              </div>
            </div>

            <!-- Error Banner -->
            <div id="login-error-box" class="hidden p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
              <i class="fa-solid fa-circle-exclamation text-rose-600 flex-shrink-0"></i>
              <span id="login-error-msg" class="leading-relaxed"></span>
            </div>

            <button 
              type="submit" 
              class="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
            >
              <span>Access Network</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </form>

          <div class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Encrypted Member Portal</span>
            <span class="flex items-center gap-1.5 text-blue-600 font-medium">
              <i class="fa-solid fa-shield"></i> Verified System
            </span>
          </div>
        </div>
      </div>
    `;
  }

  function bindLoginEvents() {
    const form = document.getElementById('login-form');
    const errBox = document.getElementById('login-error-box');
    const errMsg = document.getElementById('login-error-msg');
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();

        if (!username || !password) {
          errMsg.textContent = 'Please provide both your username and password.';
          errBox.classList.remove('hidden');
          return;
        }

        const matched = State.users.find(u => u.username.toLowerCase() === username);

        if (!matched) {
          errMsg.textContent = `No account found for "${username}".`;
          errBox.classList.remove('hidden');
          return;
        }

        if (matched.password !== password) {
          errMsg.textContent = 'Incorrect password. Please verify and try again.';
          errBox.classList.remove('hidden');
          return;
        }

        matched.lastLogin = Date.now();
        State.currentUserId = matched.id;
        State.save();

        showToast(`Welcome back, ${matched.name}!`, 'success');
        renderApp();
      });
    }
  }

  // -------------------------------------------------------------------------
  // 2. MAIN DASHBOARD SHELL (EXPANDED LIGHT NAVIGATION BAR)
  // -------------------------------------------------------------------------
  function renderDashboardView() {
    const currentUser = State.getCurrentUser();
    if (!currentUser) return '';

    return `
      <!-- EXPANDED LIGHT NAVIGATION BAR -->
      <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          <!-- Logo & Brand Mark -->
          <div class="flex items-center gap-3.5 cursor-pointer group" onclick="window.switchTab('feed')">
            <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-100 group-hover:scale-105 transition duration-200">
              <i class="fa-solid fa-handshake text-xl"></i>
            </div>
            <div>
              <div class="text-xl font-extrabold tracking-tight text-slate-900 flex items-center">
                <span>Connec</span><span class="text-blue-600">Friend</span>
              </div>
              <span class="text-[11px] font-bold tracking-wider uppercase text-slate-400">Social Network</span>
            </div>
          </div>

          <!-- Prominent Navigation Center Tabs -->
          <nav class="hidden md:flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button 
              onclick="window.switchTab('feed')" 
              class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2.5 ${State.activeTab === 'feed' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}"
            >
              <i class="fa-solid fa-compass text-sm"></i>
              <span>News Feed</span>
            </button>
            <button 
              onclick="window.switchTab('profile')" 
              class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2.5 ${State.activeTab === 'profile' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}"
            >
              <i class="fa-solid fa-id-card text-sm"></i>
              <span>My Profile</span>
            </button>
            <button 
              onclick="window.switchTab('friends')" 
              class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2.5 ${State.activeTab === 'friends' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}"
            >
              <i class="fa-solid fa-user-group text-sm"></i>
              <span>Friend Hub</span>
            </button>
            <button 
              onclick="window.switchTab('messages')" 
              class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2.5 ${State.activeTab === 'messages' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}"
            >
              <i class="fa-solid fa-paper-plane text-sm"></i>
              <span>Private Messages</span>
            </button>
          </nav>

          <!-- Current User Badge & Logout -->
          <div class="flex items-center gap-4">
            <button 
              onclick="window.switchTab('profile')" 
              class="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition text-left"
            >
              <img src="${currentUser.avatar}" class="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20" alt="${currentUser.name}"/>
              <div class="hidden lg:block">
                <div class="text-xs font-bold text-slate-800 leading-tight">${currentUser.name}</div>
                <div class="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
                </div>
              </div>
            </button>

            <button 
              onclick="window.logoutUser()" 
              title="Sign Out" 
              class="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition flex items-center justify-center text-sm shadow-sm"
            >
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Strip -->
        <div class="md:hidden border-t border-slate-200 bg-white px-4 py-2 flex items-center justify-around">
          <button onclick="window.switchTab('feed')" class="py-2 px-3 text-xs font-bold flex flex-col items-center gap-1 ${State.activeTab === 'feed' ? 'text-blue-600' : 'text-slate-500'}">
            <i class="fa-solid fa-compass"></i><span>Feed</span>
          </button>
          <button onclick="window.switchTab('profile')" class="py-2 px-3 text-xs font-bold flex flex-col items-center gap-1 ${State.activeTab === 'profile' ? 'text-blue-600' : 'text-slate-500'}">
            <i class="fa-solid fa-id-card"></i><span>Profile</span>
          </button>
          <button onclick="window.switchTab('friends')" class="py-2 px-3 text-xs font-bold flex flex-col items-center gap-1 ${State.activeTab === 'friends' ? 'text-blue-600' : 'text-slate-500'}">
            <i class="fa-solid fa-user-group"></i><span>Friends</span>
          </button>
          <button onclick="window.switchTab('messages')" class="py-2 px-3 text-xs font-bold flex flex-col items-center gap-1 ${State.activeTab === 'messages' ? 'text-blue-600' : 'text-slate-500'}">
            <i class="fa-solid fa-paper-plane"></i><span>Messages</span>
          </button>
        </div>
      </header>

      <!-- MAIN LIGHT CONTENT CANVAS -->
      <main class="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-8 lg:p-10">
        ${renderActiveTab()}
      </main>
    `;
  }

  function renderActiveTab() {
    switch (State.activeTab) {
      case 'feed':
        return renderFeedTab();
      case 'profile':
        return renderProfileTab();
      case 'friends':
        return renderFriendHubTab();
      case 'messages':
        return renderMessagesTab();
      default:
        return renderFeedTab();
    }
  }

  // -------------------------------------------------------------------------
  // 3. HOME PAGE (NEWS FEED) - LIGHT MODE & VISIBLE MESSAGE BUTTONS
  // -------------------------------------------------------------------------
  function renderFeedTab() {
    const currentUser = State.getCurrentUser();

    // STRICT CONSTRAINT: Friends list ordered by login time to the site, with most recent first!
    const friendsByLogin = currentUser.friends
      .map(id => State.getUserById(id))
      .filter(Boolean)
      .sort((a, b) => b.lastLogin - a.lastLogin);

    // Visible posts
    const visiblePosts = State.posts.filter(p => {
      if (p.authorId === currentUser.id) return true;
      if (!currentUser.friends.includes(p.authorId)) return false;
      if (p.audience === 'all') return true;
      if (p.audience === 'custom') {
        return Array.isArray(p.allowedFriends) && p.allowedFriends.includes(currentUser.id);
      }
      return false;
    }).sort((a, b) => b.timestamp - a.timestamp);

    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- LEFT COLUMN: FRIENDS ORDERED BY LOGIN TIME (Strict Constraint) -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
            <div class="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
              <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-clock-rotate-left text-blue-600 text-base"></i>
                <h3 class="text-sm font-extrabold text-slate-900 tracking-wide uppercase">Friends Online</h3>
              </div>
              <span class="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                Most Recent First
              </span>
            </div>

            ${friendsByLogin.length === 0 ? `
              <div class="text-center py-10 text-slate-500 text-xs">
                <i class="fa-solid fa-user-plus text-3xl mb-2 text-slate-300 block"></i>
                No friends added yet. Visit Friend Hub to connect!
              </div>
            ` : `
              <div class="space-y-4">
                ${friendsByLogin.map((friend, idx) => {
                  const rating = currentUser.friendRatings[friend.id] || 0;
                  const meta = getRatingMeta(rating);

                  return `
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 transition flex flex-col gap-3">
                      <div class="flex items-center gap-3.5 min-w-0">
                        <div class="relative flex-shrink-0">
                          <img src="${friend.avatar}" class="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-200" alt="${friend.name}"/>
                          <span class="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-white text-[10px] font-bold text-slate-700 flex items-center justify-center border border-slate-300 shadow-sm">
                            #${idx + 1}
                          </span>
                        </div>
                        <div class="min-w-0 flex-1">
                          <h4 class="text-sm font-bold text-slate-900 truncate">${friend.name}</h4>
                          <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-[11px] text-teal-700 font-semibold flex items-center gap-1">
                              <i class="fa-solid fa-circle-dot text-[8px] text-teal-600"></i>
                              Logged in ${formatRelativeTime(friend.lastLogin)}
                            </span>
                          </div>
                          <div class="mt-1">
                            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${meta.badgeClass}">
                              <i class="fa-solid ${meta.icon}"></i> ${meta.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- VISIBLE MESSAGE BUTTON (Strict Requirement) -->
                      <button 
                        onclick="window.openDirectMessage('${friend.id}')" 
                        class="px-4 py-2 w-full bg-blue-600 text-white rounded-full hover:bg-blue-700 font-semibold text-xs transition flex items-center justify-center gap-2 shadow-sm"
                      >
                        <i class="fa-solid fa-paper-plane text-xs"></i>
                        <span>Message</span>
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>
        </div>

        <!-- RIGHT COLUMN: NEWS CREATOR & FEED STREAM -->
        <div class="lg:col-span-8 space-y-6">
          
          <!-- NEWS SHARING / POST COMPOSER (Strict Feature 5) -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-md">
            <div class="flex items-center gap-3.5 mb-5">
              <img src="${currentUser.avatar}" class="w-11 h-11 rounded-2xl object-cover ring-2 ring-blue-500/20" alt="${currentUser.name}"/>
              <div>
                <h3 class="text-sm font-bold text-slate-900">Share News & Updates</h3>
                <p class="text-xs text-slate-500">Post news to all your friends or select specific recipients</p>
              </div>
            </div>

            <form id="create-post-form" class="space-y-4">
              <textarea 
                id="post-content-input" 
                rows="3" 
                class="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition resize-none leading-relaxed"
                placeholder="What's happening in your projects or research?"
                required
              ></textarea>

              <div class="pt-3 border-t border-slate-100">
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <div class="flex items-center gap-4 text-xs font-semibold">
                    <span class="text-slate-500 uppercase tracking-wider text-[11px]">Share With:</span>
                    <label class="inline-flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                      <input type="radio" name="postAudience" value="all" checked onchange="window.toggleAudienceSelector(false)" class="text-blue-600 focus:ring-blue-500 border-slate-300"/>
                      <span>All Friends</span>
                    </label>
                    <label class="inline-flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                      <input type="radio" name="postAudience" value="custom" onchange="window.toggleAudienceSelector(true)" class="text-blue-600 focus:ring-blue-500 border-slate-300"/>
                      <span>Some Friends</span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    class="py-2.5 px-6 rounded-full font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition transform active:scale-95 flex items-center gap-2"
                  >
                    <i class="fa-solid fa-paper-plane"></i>
                    <span>Publish Post</span>
                  </button>
                </div>

                <!-- Selective Friends Checklist (when "some friends" is selected) -->
                <div id="selective-friends-box" class="hidden mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <span class="text-xs font-semibold text-slate-700 block">Select specific friends who can view this post:</span>
                  ${currentUser.friends.length === 0 ? `
                    <p class="text-xs text-slate-500">You don't have any connected friends yet.</p>
                  ` : `
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      ${currentUser.friends.map(fId => {
                        const f = State.getUserById(fId);
                        if (!f) return '';
                        return `
                          <label class="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 cursor-pointer transition">
                            <input type="checkbox" name="customAllowedFriends" value="${f.id}" class="rounded text-blue-600 focus:ring-blue-500 border-slate-300"/>
                            <img src="${f.avatar}" class="w-6 h-6 rounded-lg object-cover" alt="${f.name}"/>
                            <span class="text-xs text-slate-800 truncate font-semibold">${f.name}</span>
                          </label>
                        `;
                      }).join('')}
                    </div>
                  `}
                </div>
              </div>
            </form>
          </div>

          <!-- POSTS STREAM -->
          <div class="space-y-6">
            ${visiblePosts.length === 0 ? `
              <div class="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl p-8">
                <i class="fa-solid fa-newspaper text-4xl text-slate-300 mb-3 block"></i>
                <h4 class="text-base font-bold text-slate-700">No News Available</h4>
                <p class="text-xs text-slate-500 mt-1">Posts shared by your friends will stream here in real-time.</p>
              </div>
            ` : visiblePosts.map(post => {
              const author = State.getUserById(post.authorId);
              if (!author) return '';
              const isLiked = post.likes.includes(currentUser.id);
              const isDisliked = post.dislikes.includes(currentUser.id);

              return `
                <article class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-md hover:border-slate-300 transition">
                  
                  <!-- Post Header: Friend Name, Profile Picture, Time Since Friend's Last Login (Strict Requirement) -->
                  <div class="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                    <div class="flex items-center gap-4">
                      <img src="${author.avatar}" class="w-13 h-13 rounded-2xl object-cover ring-2 ring-blue-500/20" alt="${author.name}"/>
                      <div>
                        <div class="flex items-center gap-2">
                          <h4 class="text-sm font-bold text-slate-900">${author.name}</h4>
                          <span class="text-xs text-slate-500 font-medium">@${author.username}</span>
                          ${post.authorId === currentUser.id ? `
                            <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">You</span>
                          ` : ''}
                        </div>

                        <!-- STRICT REQUIREMENT: Friend's last login time -->
                        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-600 font-medium">
                          <span class="text-teal-700 flex items-center gap-1.5 font-semibold">
                            <i class="fa-solid fa-clock-rotate-left text-[11px] text-teal-600"></i>
                            <span>Last logged in: ${formatRelativeTime(author.lastLogin)}</span>
                          </span>
                          <span class="text-slate-300">&bull;</span>
                          <span class="text-slate-500">
                            Shared ${formatRelativeTime(post.timestamp)}
                          </span>
                          ${post.audience === 'custom' ? `
                            <span class="text-amber-700 flex items-center gap-1 text-[11px] font-semibold">
                              <i class="fa-solid fa-user-lock"></i> Limited Friends
                            </span>
                          ` : ''}
                        </div>
                      </div>
                    </div>

                    <!-- VISIBLE MESSAGE BUTTON (Header Action) -->
                    <button 
                      onclick="window.openDirectMessage('${author.id}')" 
                      class="px-4 py-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-full font-semibold text-xs transition flex items-center gap-2"
                    >
                      <i class="fa-solid fa-paper-plane text-xs"></i>
                      <span>Message</span>
                    </button>
                  </div>

                  <!-- Post Content -->
                  <p class="text-slate-800 text-sm leading-relaxed mb-6 whitespace-pre-line">${post.content}</p>

                  <!-- Like / Dislike Buttons with Interactive Live Counters (Strict Requirement) -->
                  <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div class="flex items-center gap-3">
                      <!-- Like Button -->
                      <button 
                        onclick="window.handleReaction('${post.id}', 'like')" 
                        class="px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 border ${isLiked ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}"
                      >
                        <i class="fa-solid fa-thumbs-up ${isLiked ? 'text-white' : 'text-slate-500'}"></i>
                        <span>Like</span>
                        <span class="ml-1 px-2 py-0.5 rounded-full text-[10px] ${isLiked ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-800 font-bold'}">
                          ${post.likes.length}
                        </span>
                      </button>

                      <!-- Dislike Button -->
                      <button 
                        onclick="window.handleReaction('${post.id}', 'dislike')" 
                        class="px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 border ${isDisliked ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}"
                      >
                        <i class="fa-solid fa-thumbs-down ${isDisliked ? 'text-white' : 'text-slate-500'}"></i>
                        <span>Dislike</span>
                        <span class="ml-1 px-2 py-0.5 rounded-full text-[10px] ${isDisliked ? 'bg-rose-800 text-white' : 'bg-slate-200 text-slate-800 font-bold'}">
                          ${post.dislikes.length}
                        </span>
                      </button>
                    </div>

                    <span class="text-[11px] text-slate-400 font-medium">
                      <i class="fa-solid fa-bullhorn mr-1 text-slate-400"></i>Broadcast
                    </span>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // 4. PROFILE VIEW (LIGHT MODE) - FRIENDS DIRECTORY & 1-3 RATING MATRIX
  // -------------------------------------------------------------------------
  function renderProfileTab() {
    const currentUser = State.getCurrentUser();
    const friends = currentUser.friends.map(id => State.getUserById(id)).filter(Boolean);

    return `
      <div class="space-y-8">
        
        <!-- Profile Showcase Banner (Crisp White Card) -->
        <div class="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-md">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            <img src="${currentUser.avatar}" class="w-32 h-32 rounded-3xl object-cover ring-4 ring-blue-100 shadow-md" alt="${currentUser.name}"/>
            
            <div class="flex-1 space-y-3">
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">${currentUser.name}</h2>
                <span class="text-sm text-blue-600 font-bold">@${currentUser.username}</span>
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Active Member
                </span>
              </div>

              <p class="text-slate-700 text-sm font-semibold">${currentUser.headline}</p>
              <p class="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl">${currentUser.bio}</p>

              <div class="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-3 text-xs text-slate-600 font-medium">
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-location-dot text-blue-600"></i> ${currentUser.location}
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-user-group text-teal-600"></i> ${friends.length} Friends
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-clock text-amber-600"></i> Last Online: ${formatRelativeTime(currentUser.lastLogin)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- FRIENDS DIRECTORY & 1-3 RATING MATRIX (Strict Requirement 3 & 4) -->
        <div class="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 shadow-md">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-7 pb-5 border-b border-slate-100">
            <div>
              <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2.5">
                <i class="fa-solid fa-user-check text-blue-600"></i>
                <span>Friends Directory & Rating Matrix</span>
              </h3>
              <p class="text-xs text-slate-500 mt-1">Rate friends on a 1 to 3 scale (1 = Stupid, 2 = Cool, 3 = Trustworthy)</p>
            </div>
            
            <div class="flex items-center gap-2 text-xs font-semibold">
              <span class="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200"><i class="fa-solid fa-face-rolling-eyes"></i> 1: Stupid</span>
              <span class="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200"><i class="fa-solid fa-face-smile-beam"></i> 2: Cool</span>
              <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"><i class="fa-solid fa-shield-halved"></i> 3: Trustworthy</span>
            </div>
          </div>

          ${friends.length === 0 ? `
            <div class="text-center py-14 text-slate-500 text-sm">
              <p>You have not connected with any friends yet.</p>
              <button onclick="window.switchTab('friends')" class="mt-4 px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition shadow-sm">
                Connect in Friend Hub
              </button>
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${friends.map(friend => {
                const currentRating = currentUser.friendRatings[friend.id] || 0;
                const meta = getRatingMeta(currentRating);

                return `
                  <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition flex flex-col justify-between space-y-4">
                    <div class="flex items-start gap-4">
                      <img src="${friend.avatar}" class="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-200" alt="${friend.name}"/>
                      <div class="min-w-0 flex-1">
                        <h4 class="text-sm font-bold text-slate-900 truncate">${friend.name}</h4>
                        <p class="text-xs text-blue-600 font-semibold truncate">@${friend.username}</p>
                        <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">${friend.headline}</p>
                      </div>
                    </div>

                    <!-- Current Rating Badge -->
                    <div class="flex items-center justify-between text-xs pt-3 border-t border-slate-200">
                      <span class="text-slate-500 font-medium">Assigned Rating:</span>
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${meta.badgeClass}">
                        <i class="fa-solid ${meta.icon}"></i> ${meta.label}
                      </span>
                    </div>

                    <!-- 1-3 Rating Action Buttons -->
                    <div class="bg-white p-3 rounded-xl border border-slate-200">
                      <span class="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2 text-center">Update Rating:</span>
                      <div class="grid grid-cols-3 gap-2">
                        <button 
                          onclick="window.rateFriend('${friend.id}', 1)" 
                          title="Rate 1: Stupid"
                          class="py-2 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 border ${currentRating === 1 ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50'}"
                        >
                          <i class="fa-solid fa-face-rolling-eyes"></i>
                          <span>1</span>
                        </button>

                        <button 
                          onclick="window.rateFriend('${friend.id}', 2)" 
                          title="Rate 2: Cool"
                          class="py-2 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 border ${currentRating === 2 ? 'bg-amber-500 text-white border-amber-500 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-amber-600 hover:bg-amber-50'}"
                        >
                          <i class="fa-solid fa-face-smile-beam"></i>
                          <span>2</span>
                        </button>

                        <button 
                          onclick="window.rateFriend('${friend.id}', 3)" 
                          title="Rate 3: Trustworthy"
                          class="py-2 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 border ${currentRating === 3 ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'}"
                        >
                          <i class="fa-solid fa-shield-halved"></i>
                          <span>3</span>
                        </button>
                      </div>
                    </div>

                    <!-- VISIBLE PILL-SHAPED MESSAGE BUTTON (Strict Requirement) -->
                    <button 
                      onclick="window.openDirectMessage('${friend.id}')" 
                      class="px-4 py-2 w-full bg-blue-600 text-white rounded-full hover:bg-blue-700 font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <i class="fa-solid fa-paper-plane text-xs"></i>
                      <span>Message</span>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // 5. FRIEND HUB & EXPLICIT IGNORE FEATURE (Strict Feature 4)
  // -------------------------------------------------------------------------
  function renderFriendHubTab() {
    const currentUser = State.getCurrentUser();
    const nonFriends = State.users.filter(u => u.id !== currentUser.id && !currentUser.friends.includes(u.id));

    return `
      <div class="space-y-8">
        
        <!-- Discover & Connect Panel -->
        <div class="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 shadow-md">
          <div class="mb-7 pb-5 border-b border-slate-100">
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-3">
              <i class="fa-solid fa-user-plus text-blue-600"></i>
              <span>Friend Invitations & Member Directory</span>
            </h2>
            <p class="text-xs text-slate-500 mt-1">Discover other platform members, send connection invites, or ignore profiles</p>
          </div>

          ${nonFriends.length === 0 ? `
            <div class="text-center py-16 text-slate-500 text-sm">
              <i class="fa-solid fa-circle-check text-4xl text-teal-600 mb-3 block"></i>
              You are currently connected with every registered member on ConnecFriend!
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${nonFriends.map(member => {
                const isIgnoredByMe = currentUser.ignoreList && currentUser.ignoreList.includes(member.id);

                return `
                  <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition flex flex-col justify-between space-y-4">
                    <div class="flex items-start gap-4">
                      <img src="${member.avatar}" class="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-200" alt="${member.name}"/>
                      <div class="min-w-0 flex-1">
                        <h4 class="text-sm font-bold text-slate-900 truncate">${member.name}</h4>
                        <p class="text-xs text-blue-600 font-semibold truncate">@${member.username}</p>
                        <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">${member.headline}</p>
                      </div>
                    </div>

                    <div class="text-xs text-slate-600 space-y-1.5 font-medium pt-3 border-t border-slate-200">
                      <div class="flex justify-between">
                        <span>Location:</span>
                        <span class="text-slate-800 font-semibold">${member.location}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Last Active:</span>
                        <span class="text-teal-700 font-semibold">${formatRelativeTime(member.lastLogin)}</span>
                      </div>
                      ${isIgnoredByMe ? `
                        <div class="flex justify-between text-rose-600 font-bold">
                          <span>Status:</span>
                          <span>On Your Ignore List</span>
                        </div>
                      ` : ''}
                    </div>

                    <!-- ACTION BUTTONS: INVITE & EXPLICIT IGNORE USER BUTTON -->
                    <div class="grid grid-cols-2 gap-2.5 pt-2">
                      <!-- Invite Button (Enforces Mock Ignore List Logic) -->
                      <button 
                        onclick="window.sendFriendInvitation('${member.id}')" 
                        class="py-2.5 px-3 rounded-full font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition flex items-center justify-center gap-1.5"
                      >
                        <i class="fa-solid fa-user-plus text-xs"></i>
                        <span>Invite</span>
                      </button>

                      <!-- EXPLICIT IGNORE/BLOCK BUTTON (Strict Requirement) -->
                      <button 
                        onclick="window.explicitIgnoreUser('${member.id}')" 
                        class="py-2.5 px-3 border border-red-500 text-red-500 hover:bg-red-50 rounded-full font-bold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <i class="fa-solid fa-ban text-xs"></i>
                        <span>Ignore User</span>
                      </button>
                    </div>

                    <!-- VISIBLE PILL-SHAPED MESSAGE BUTTON (Non-Friend Messaging) -->
                    <button 
                      onclick="window.openDirectMessage('${member.id}')" 
                      class="px-4 py-2 w-full bg-slate-200 hover:bg-blue-600 text-slate-800 hover:text-white rounded-full font-semibold text-xs transition flex items-center justify-center gap-2"
                    >
                      <i class="fa-solid fa-paper-plane text-xs"></i>
                      <span>Message</span>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- Privacy & Personal Ignore List Controls -->
        <div class="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 shadow-md">
          <div class="mb-4">
            <h3 class="text-base font-bold text-slate-900 flex items-center gap-2.5">
              <i class="fa-solid fa-shield-halved text-rose-600"></i>
              <span>Your Personal Ignore List</span>
            </h3>
            <p class="text-xs text-slate-500 mt-1">Users on this list cannot send you friend invitations</p>
          </div>

          <div class="flex flex-wrap gap-2.5 items-center pt-2">
            ${currentUser.ignoreList.length === 0 ? `
              <span class="text-xs text-slate-400 italic">No users currently on your ignore list.</span>
            ` : currentUser.ignoreList.map(ignId => {
              const ignUser = State.getUserById(ignId);
              if (!ignUser) return '';
              return `
                <div class="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                  <img src="${ignUser.avatar}" class="w-5 h-5 rounded-full object-cover" alt="${ignUser.name}"/>
                  <span>${ignUser.name}</span>
                  <button onclick="window.removeIgnoredUser('${ignId}')" title="Remove from Ignore List" class="text-rose-500 hover:text-rose-800 ml-1">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // 6. STRUCTURED MESSAGES LAYOUT (STRICT TWO-PANE FLEXBOX LAYOUT)
  // -------------------------------------------------------------------------
  function renderMessagesTab() {
    const currentUser = State.getCurrentUser();
    const allMembers = State.users.filter(u => u.id !== currentUser.id);

    if (!State.selectedChatUserId && allMembers.length > 0) {
      State.selectedChatUserId = allMembers[0].id;
    }

    const selectedChatUser = State.getUserById(State.selectedChatUserId) || allMembers[0];
    const conversation = State.messages.filter(m => 
      (m.fromId === currentUser.id && m.toId === selectedChatUser.id) ||
      (m.fromId === selectedChatUser.id && m.toId === currentUser.id)
    ).sort((a, b) => a.timestamp - b.timestamp);

    const isFriend = currentUser.friends.includes(selectedChatUser.id);

    return `
      <!-- STRICT TWO-PANE FLEXBOX MESSAGES CONTAINER (Prevents Any Overlapping) -->
      <div class="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row h-[720px]">
        
        <!-- LEFT PANE: CONTACT LIST (Fixed width w-80 with independent vertical scrolling) -->
        <div class="w-full md:w-80 flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div class="p-5 border-b border-slate-200 bg-white flex-shrink-0">
            <h3 class="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Direct Messages</span>
              <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                All Members
              </span>
            </h3>
            <p class="text-xs text-slate-500 mt-1">Chat privately with friends & members</p>
          </div>

          <!-- Independent Scrollable Contact List -->
          <div class="flex-1 overflow-y-auto p-3 space-y-2">
            ${allMembers.map(member => {
              const active = member.id === selectedChatUser.id;
              const friendStatus = currentUser.friends.includes(member.id);
              const lastMsg = State.messages.filter(m => 
                (m.fromId === currentUser.id && m.toId === member.id) ||
                (m.fromId === member.id && m.toId === currentUser.id)
              ).sort((a, b) => b.timestamp - a.timestamp)[0];

              return `
                <button 
                  onclick="window.selectChatContact('${member.id}')" 
                  class="w-full p-3.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3.5 ${active ? 'bg-blue-600 text-white shadow-md' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'}"
                >
                  <div class="relative flex-shrink-0">
                    <img src="${member.avatar}" class="w-11 h-11 rounded-xl object-cover ring-2 ring-slate-200" alt="${member.name}"/>
                    <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ${friendStatus ? 'bg-teal-500' : 'bg-slate-400'} border-2 border-white"></span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between">
                      <h4 class="text-xs font-bold truncate ${active ? 'text-white' : 'text-slate-900'}">${member.name}</h4>
                      <span class="text-[9px] px-2 py-0.5 rounded-md font-bold ${active ? 'bg-blue-700 text-white' : (friendStatus ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-slate-100 text-slate-600')}">
                        ${friendStatus ? 'Friend' : 'Member'}
                      </span>
                    </div>
                    <p class="text-[11px] truncate mt-1 ${active ? 'text-blue-100' : 'text-slate-500'}">
                      ${lastMsg ? lastMsg.text : member.headline}
                    </p>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- RIGHT PANE: ACTIVE CHAT WINDOW (flex-1 taking up remaining space) -->
        <div class="flex-1 flex flex-col bg-white min-w-0">
          
          <!-- Chat Window Header -->
          <div class="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
            <div class="flex items-center gap-3.5">
              <img src="${selectedChatUser.avatar}" class="w-11 h-11 rounded-2xl object-cover ring-2 ring-blue-500/20" alt="${selectedChatUser.name}"/>
              <div>
                <h4 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>${selectedChatUser.name}</span>
                  <span class="text-[10px] px-2.5 py-0.5 rounded-full font-bold ${isFriend ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-slate-100 text-slate-600'}">
                    ${isFriend ? 'Friend' : 'Non-Friend Member'}
                  </span>
                </h4>
                <p class="text-[11px] text-slate-500 font-medium">Last active: ${formatRelativeTime(selectedChatUser.lastLogin)}</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              ${!isFriend ? `
                <button 
                  onclick="window.sendFriendInvitation('${selectedChatUser.id}')" 
                  class="py-2 px-4 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <i class="fa-solid fa-user-plus text-xs"></i>
                  <span>Invite to Friends</span>
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Independent Scrollable Message Stream -->
          <div id="messages-stream" class="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
            ${conversation.length === 0 ? `
              <div class="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <i class="fa-solid fa-comments text-4xl mb-3 text-slate-300"></i>
                <p class="text-xs font-semibold text-slate-600">No prior messages with ${selectedChatUser.name}.</p>
                <p class="text-[11px] text-slate-400 mt-1">Send a message below to start chatting.</p>
              </div>
            ` : conversation.map(msg => {
              const isMine = msg.fromId === currentUser.id;
              return `
                <div class="flex flex-col ${isMine ? 'items-end' : 'items-start'}">
                  <div class="max-w-md p-4 rounded-2xl text-xs sm:text-sm ${isMine ? 'bg-blue-600 text-white rounded-br-none shadow-sm' : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm'}">
                    <p class="whitespace-pre-line leading-relaxed">${msg.text}</p>
                  </div>
                  <span class="text-[10px] text-slate-400 font-semibold mt-1 px-1">
                    ${formatRelativeTime(msg.timestamp)}
                  </span>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Message Composition Input Form (Fixed to bottom) -->
          <div class="p-4 sm:p-5 border-t border-slate-200 bg-white flex-shrink-0">
            <form id="send-message-form" class="flex items-center gap-3">
              <input 
                type="text" 
                id="message-text-input" 
                class="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-full text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
                placeholder="Type a message to ${selectedChatUser.name}..."
                autocomplete="off"
                required
              />
              <button 
                type="submit" 
                class="py-3 px-6 rounded-full font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition flex items-center gap-2 flex-shrink-0"
              >
                <i class="fa-solid fa-paper-plane"></i>
                <span class="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // EVENT BINDINGS
  // -------------------------------------------------------------------------
  function bindDashboardEvents() {
    // Post Creation Form
    const postForm = document.getElementById('create-post-form');
    if (postForm) {
      postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const contentInput = document.getElementById('post-content-input');
        const content = contentInput.value.trim();

        if (!content) {
          showToast('Please enter post content.', 'error');
          return;
        }

        const audienceRadio = document.querySelector('input[name="postAudience"]:checked');
        const audience = audienceRadio ? audienceRadio.value : 'all';

        let allowedFriends = [];
        if (audience === 'custom') {
          const checked = document.querySelectorAll('input[name="customAllowedFriends"]:checked');
          allowedFriends = Array.from(checked).map(c => c.value);
          if (allowedFriends.length === 0) {
            showToast('Please select at least one friend to share with.', 'warning');
            return;
          }
        }

        const newPost = {
          id: 'post_' + Date.now(),
          authorId: State.currentUserId,
          content: content,
          timestamp: Date.now(),
          audience: audience,
          allowedFriends: allowedFriends,
          likes: [],
          dislikes: []
        };

        State.posts.unshift(newPost);
        State.save();
        contentInput.value = '';
        showToast('Broadcast published successfully!', 'success');
        renderApp();
      });
    }

    // Message Sending Form
    const msgForm = document.getElementById('send-message-form');
    if (msgForm) {
      msgForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msgInput = document.getElementById('message-text-input');
        const text = msgInput.value.trim();

        if (!text) {
          showToast('Message cannot be empty.', 'error');
          return;
        }

        const targetUser = State.getUserById(State.selectedChatUserId);
        if (!targetUser) return;

        const newMsg = {
          id: 'msg_' + Date.now(),
          fromId: State.currentUserId,
          toId: targetUser.id,
          text: text,
          timestamp: Date.now()
        };

        State.messages.push(newMsg);
        State.save();
        msgInput.value = '';
        renderApp();

        const stream = document.getElementById('messages-stream');
        if (stream) stream.scrollTop = stream.scrollHeight;
      });
    }
  }

  // =========================================================================
  // GLOBAL WINDOW ACTIONS
  // =========================================================================
  window.switchTab = function (tabName) {
    State.activeTab = tabName;
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.logoutUser = function () {
    State.currentUserId = null;
    State.activeTab = 'feed';
    State.save();
    showToast('Signed out of ConnecFriend.', 'info');
    renderApp();
  };

  window.toggleAudienceSelector = function (isCustom) {
    const box = document.getElementById('selective-friends-box');
    if (!box) return;
    if (isCustom) {
      box.classList.remove('hidden');
    } else {
      box.classList.add('hidden');
    }
  };

  // LIKE & DISLIKE TOGGLE WITH COUNTERS (Strict Feature 2)
  window.handleReaction = function (postId, type) {
    const post = State.posts.find(p => p.id === postId);
    if (!post) return;
    const uid = State.currentUserId;

    if (type === 'like') {
      if (post.likes.includes(uid)) {
        post.likes = post.likes.filter(id => id !== uid);
      } else {
        post.likes.push(uid);
        post.dislikes = post.dislikes.filter(id => id !== uid);
      }
    } else if (type === 'dislike') {
      if (post.dislikes.includes(uid)) {
        post.dislikes = post.dislikes.filter(id => id !== uid);
      } else {
        post.dislikes.push(uid);
        post.likes = post.likes.filter(id => id !== uid);
      }
    }

    State.save();
    renderApp();
  };

  // 1-3 FRIEND RATING SYSTEM (1 = Stupid, 2 = Cool, 3 = Trustworthy) (Strict Feature 4)
  window.rateFriend = function (friendId, ratingValue) {
    const currentUser = State.getCurrentUser();
    if (!currentUser) return;

    const friend = State.getUserById(friendId);
    if (!friend) return;

    currentUser.friendRatings[friendId] = Number(ratingValue);
    State.save();

    const meta = getRatingMeta(ratingValue);
    showToast(`Updated rating for ${friend.name} to "${meta.label}"`, 'success');
    renderApp();
  };

  // SEND FRIEND INVITATION (Enforces Mock Ignore List Logic) (Strict Feature 4)
  window.sendFriendInvitation = function (targetUserId) {
    const currentUser = State.getCurrentUser();
    const targetUser = State.getUserById(targetUserId);

    if (!currentUser || !targetUser) return;

    if (currentUser.friends.includes(targetUserId)) {
      showToast(`${targetUser.name} is already your friend.`, 'info');
      return;
    }

    // STRICT REQUIREMENT: Mock logic for ignore list!
    // If target user has sender on their ignore list, request cannot be sent.
    if (targetUser.ignoreList && targetUser.ignoreList.includes(currentUser.id)) {
      showToast(
        `Unable to send invitation: ${targetUser.name} has privacy restrictions preventing new connection requests.`,
        'error'
      );
      return;
    }

    currentUser.friends.push(targetUserId);
    if (!targetUser.friends.includes(currentUser.id)) {
      targetUser.friends.push(currentUser.id);
    }

    if (!currentUser.friendRatings[targetUserId]) {
      currentUser.friendRatings[targetUserId] = 2; // Default rating: Cool
    }

    State.save();
    showToast(`Connected! You and ${targetUser.name} are now friends.`, 'success');
    renderApp();
  };

  // EXPLICIT IGNORE USER ACTION (Strict Requirement)
  window.explicitIgnoreUser = function (targetUserId) {
    const currentUser = State.getCurrentUser();
    if (!currentUser) return;

    if (!currentUser.ignoreList.includes(targetUserId)) {
      currentUser.ignoreList.push(targetUserId);
      State.save();
    }

    // Strict prompt requirement: toast saying "User Added to Ignore List"
    showToast('User Added to Ignore List', 'warning');
    renderApp();
  };

  window.removeIgnoredUser = function (targetUserId) {
    const currentUser = State.getCurrentUser();
    if (!currentUser) return;
    currentUser.ignoreList = currentUser.ignoreList.filter(id => id !== targetUserId);
    State.save();
    showToast('User removed from ignore list.', 'info');
    renderApp();
  };

  window.selectChatContact = function (userId) {
    State.selectedChatUserId = userId;
    renderApp();
  };

  window.openDirectMessage = function (userId) {
    State.selectedChatUserId = userId;
    State.activeTab = 'messages';
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // BOOTSTRAP APPLICATION
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    State.init();
    renderApp();
  });

})();
