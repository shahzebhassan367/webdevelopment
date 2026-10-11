// Demo data used the first time the app runs (or after "Reset demo data").
// There is no backend for this assignment, so everything lives in localStorage.

function createSeedData() {
  const now = Date.now();
  const minsAgo = (n) => now - n * 60 * 1000;

  const users = [
    {
      id: 1, username: 'ali', password: 'ali123', name: 'Ali Raza',
      email: 'ali.raza@connecfriend.com', city: 'Islamabad', gender: 'Male',
      dob: '2004-03-14', work: 'BSCS Student, Air University',
      bio: 'Learning full stack development one bug at a time. Cricket and chai on weekends.',
      joined: '2024-09-02', color: '#0f766e', avatar: null,
      friends: [2, 3, 4, 5, 6], ignored: [], lastLogin: minsAgo(1)
    },
    {
      id: 2, username: 'sara', password: 'sara123', name: 'Sara Khan',
      email: 'sara.khan@connecfriend.com', city: 'Rawalpindi', gender: 'Female',
      dob: '2004-07-22', work: 'Frontend Intern, Systems Ltd',
      bio: 'Designing things that people actually enjoy using.',
      joined: '2024-10-11', color: '#b45309', avatar: null,
      friends: [1, 3, 7], ignored: [], lastLogin: minsAgo(4)
    },
    {
      id: 3, username: 'hamza', password: 'hamza123', name: 'Hamza Sheikh',
      email: 'hamza.sheikh@connecfriend.com', city: 'Lahore', gender: 'Male',
      dob: '2003-12-01', work: 'BSSE Student, FAST',
      bio: 'Competitive programmer. Will argue about tabs vs spaces.',
      joined: '2024-11-20', color: '#7c3aed', avatar: null,
      friends: [1, 2], ignored: [], lastLogin: minsAgo(35)
    },
    {
      id: 4, username: 'ayesha', password: 'ayesha123', name: 'Ayesha Malik',
      email: 'ayesha.malik@connecfriend.com', city: 'Islamabad', gender: 'Female',
      dob: '2004-05-09', work: 'BSCS Student, Air University',
      bio: 'Notes, coffee and deadlines.',
      joined: '2025-01-05', color: '#be123c', avatar: null,
      friends: [1], ignored: [], lastLogin: minsAgo(180)
    },
    {
      id: 5, username: 'bilal', password: 'bilal123', name: 'Bilal Ahmed',
      email: 'bilal.ahmed@connecfriend.com', city: 'Karachi', gender: 'Male',
      dob: '2003-08-30', work: 'Data Analyst, Careem',
      bio: 'Numbers by day, cricket stats by night.',
      joined: '2024-08-15', color: '#0369a1', avatar: null,
      friends: [1], ignored: [], lastLogin: minsAgo(60 * 26)
    },
    {
      id: 6, username: 'fatima', password: 'fatima123', name: 'Fatima Noor',
      email: 'fatima.noor@connecfriend.com', city: 'Islamabad', gender: 'Female',
      dob: '2004-02-17', work: 'BBA Student, NUST',
      bio: 'Hiking, photography and long walks in Margalla Hills.',
      joined: '2025-02-28', color: '#15803d', avatar: null,
      friends: [1], ignored: [], lastLogin: minsAgo(12)
    },
    {
      id: 7, username: 'usman', password: 'usman123', name: 'Usman Tariq',
      email: 'usman.tariq@connecfriend.com', city: 'Peshawar', gender: 'Male',
      dob: '2003-10-03', work: 'Backend Developer, Arbisoft',
      bio: 'Node, Postgres and too many side projects.',
      joined: '2024-12-12', color: '#4d7c0f', avatar: null,
      friends: [2], ignored: [], lastLogin: minsAgo(90)
    },
    {
      id: 8, username: 'zainab', password: 'zainab123', name: 'Zainab Abbasi',
      email: 'zainab.abbasi@connecfriend.com', city: 'Murree', gender: 'Female',
      dob: '2004-09-25', work: 'Architecture Student, COMSATS',
      bio: 'Sketching buildings that do not exist yet.',
      joined: '2025-03-14', color: '#a21caf', avatar: null,
      friends: [], ignored: [1], lastLogin: minsAgo(300)
    },
    {
      id: 9, username: 'hira', password: 'hira123', name: 'Hira Javed',
      email: 'hira.javed@connecfriend.com', city: 'Islamabad', gender: 'Female',
      dob: '2004-11-11', work: 'BSAI Student, Air University',
      bio: 'Machine learning enthusiast.',
      joined: '2025-04-01', color: '#c2410c', avatar: null,
      friends: [], ignored: [], lastLogin: minsAgo(20)
    },
    {
      id: 10, username: 'omar', password: 'omar123', name: 'Omar Farooq',
      email: 'omar.farooq@connecfriend.com', city: 'Multan', gender: 'Male',
      dob: '2003-06-06', work: 'Graphic Designer, Freelance',
      bio: 'Posters, logos and the occasional meme.',
      joined: '2024-07-19', color: '#334155', avatar: null,
      friends: [], ignored: [], lastLogin: minsAgo(60 * 72)
    }
  ];

  const posts = [
    {
      id: 1, authorId: 2, audience: 'all', createdAt: minsAgo(10), sharedFrom: null,
      text: 'Finally wrapped up the DB project. Normalising those tables took longer than writing the whole frontend 😅',
      likes: [3, 1], dislikes: []
    },
    {
      id: 2, authorId: 6, audience: [1], createdAt: minsAgo(25), sharedFrom: null,
      text: 'Planning a hike to Daman-e-Koh this Saturday morning. You in? Only asking you for now, will open it up later.',
      likes: [], dislikes: []
    },
    {
      id: 3, authorId: 3, audience: 'all', createdAt: minsAgo(50), sharedFrom: null,
      text: 'Unpopular opinion: tabs are better than spaces. Fight me.',
      likes: [2], dislikes: [1]
    },
    {
      id: 4, authorId: 2, audience: [3, 7], createdAt: minsAgo(70), sharedFrom: null,
      text: 'Surprise party for Ali next week, keep it quiet!',
      likes: [3], dislikes: []
    },
    {
      id: 5, authorId: 4, audience: 'all', createdAt: minsAgo(200), sharedFrom: null,
      text: 'Uploaded my Full Stack notes for week 3 (Bootstrap grid + utilities) to the class drive. Hope it helps before the quiz.',
      likes: [1, 6, 5], dislikes: []
    },
    {
      id: 6, authorId: 1, audience: 'all', createdAt: minsAgo(60 * 5), sharedFrom: null,
      text: 'Started playing around with Tailwind today. Utility classes feel weird at first but they grow on you.',
      likes: [2, 6], dislikes: [3]
    },
    {
      id: 7, authorId: 5, audience: 'all', createdAt: minsAgo(60 * 20), sharedFrom: null,
      text: 'Pakistan vs Australia tonight. Prediction: we chase 280 with 2 overs to spare.',
      likes: [1, 4], dislikes: []
    },
    {
      id: 8, authorId: 7, audience: 'all', createdAt: minsAgo(40), sharedFrom: null,
      text: 'Deployed my first Express API on a VPS. Nginx config was a journey.',
      likes: [2], dislikes: []
    }
  ];

  const messages = [
    { id: 1, from: 2, to: 1, text: 'Did you submit the OS assignment?', sentAt: minsAgo(30), read: true },
    { id: 2, from: 1, to: 2, text: 'Yes, last night. The scheduling part was tricky.', sentAt: minsAgo(28), read: true },
    { id: 3, from: 2, to: 1, text: 'Can you share the link to the lecture slides?', sentAt: minsAgo(6), read: false },
    { id: 4, from: 7, to: 1, text: 'Hey Ali, Sara told me you are good with JavaScript. Mind if I ask something about promises?', sentAt: minsAgo(45), read: false },
    { id: 5, from: 1, to: 3, text: 'Practice match on Sunday?', sentAt: minsAgo(60 * 24), read: true },
    { id: 6, from: 3, to: 1, text: 'Count me in 🏏', sentAt: minsAgo(60 * 23), read: true }
  ];

  const requests = [
    { from: 9, to: 1, sentAt: minsAgo(15) },
    { from: 1, to: 10, sentAt: minsAgo(60 * 30) }
  ];

  // key = "raterId-friendId", value 1 (Stupid) / 2 (Cool) / 3 (Trustworthy)
  const ratings = { '1-2': 3, '1-3': 2 };

  return { users, posts, messages, requests, ratings };
}
