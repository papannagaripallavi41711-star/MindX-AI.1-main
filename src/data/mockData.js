// MindX-AI Mock Data — Realistic Indian College Education Platform Data

// ---- Users ----
export const mockUsers = {
  student: {
    id: 1,
    name: 'Arjun Sharma',
    email: 'arjun.sharma@university.edu',
    role: 'student',
    avatar: 'AS',
    semester: '5th Semester',
    branch: 'Computer Science & Engineering',
    enrollmentNo: 'CSE2023045',
    joinedDate: '2023-08-15',
  },
  teacher: {
    id: 2,
    name: 'Dr. Priya Mehta',
    email: 'priya.mehta@university.edu',
    role: 'teacher',
    avatar: 'PM',
    department: 'Computer Science',
    employeeId: 'FAC2019012',
    designation: 'Associate Professor',
    joinedDate: '2019-07-01',
  },
  admin: {
    id: 3,
    name: 'Rajesh Kumar',
    email: 'admin@mindxai.edu',
    role: 'admin',
    avatar: 'RK',
    joinedDate: '2018-01-01',
  },
};

// ---- Courses ----
export const courses = [
  {
    id: 1,
    title: 'Data Structures & Algorithms',
    subject: 'Computer Science',
    code: 'CS301',
    teacher: 'Dr. Priya Mehta',
    teacherId: 2,
    semester: '3rd',
    description: 'Master fundamental data structures including arrays, linked lists, trees, graphs, and sorting algorithms with hands-on coding practice.',
    enrolledStudents: 156,
    totalModules: 12,
    completedModules: 8,
    progress: 67,
    color: 'blue',
    icon: '🧮',
    rating: 4.7,
    duration: '16 weeks',
    isPublished: true,
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    subject: 'Artificial Intelligence',
    code: 'AI401',
    teacher: 'Dr. Vikram Singh',
    teacherId: 4,
    semester: '5th',
    description: 'Introduction to supervised and unsupervised learning, neural networks, regression, classification, and real-world ML applications.',
    enrolledStudents: 132,
    totalModules: 14,
    completedModules: 5,
    progress: 36,
    color: 'purple',
    icon: '🤖',
    rating: 4.8,
    duration: '16 weeks',
    isPublished: true,
  },
  {
    id: 3,
    title: 'Database Management Systems',
    subject: 'Computer Science',
    code: 'CS302',
    teacher: 'Prof. Anita Desai',
    teacherId: 5,
    semester: '3rd',
    description: 'Learn relational database design, SQL, normalization, transaction management, and modern NoSQL databases.',
    enrolledStudents: 178,
    totalModules: 10,
    completedModules: 10,
    progress: 100,
    color: 'green',
    icon: '🗄️',
    rating: 4.5,
    duration: '14 weeks',
    isPublished: true,
  },
  {
    id: 4,
    title: 'Web Development with React',
    subject: 'Software Engineering',
    code: 'SE405',
    teacher: 'Dr. Priya Mehta',
    teacherId: 2,
    semester: '5th',
    description: 'Build modern web applications using React.js, state management, hooks, routing, and RESTful API integration.',
    enrolledStudents: 98,
    totalModules: 11,
    completedModules: 4,
    progress: 36,
    color: 'orange',
    icon: '🌐',
    rating: 4.9,
    duration: '14 weeks',
    isPublished: true,
  },
  {
    id: 5,
    title: 'Computer Networks',
    subject: 'Computer Science',
    code: 'CS304',
    teacher: 'Prof. Ramesh Gupta',
    teacherId: 6,
    semester: '4th',
    description: 'Study TCP/IP protocols, network architecture, routing algorithms, network security, and wireless communications.',
    enrolledStudents: 145,
    totalModules: 12,
    completedModules: 6,
    progress: 50,
    color: 'pink',
    icon: '🔗',
    rating: 4.3,
    duration: '15 weeks',
    isPublished: true,
  },
  {
    id: 6,
    title: 'Operating Systems',
    subject: 'Computer Science',
    code: 'CS303',
    teacher: 'Dr. Suresh Patel',
    teacherId: 7,
    semester: '4th',
    description: 'Process management, memory management, file systems, CPU scheduling, and system calls with Linux kernel examples.',
    enrolledStudents: 167,
    totalModules: 13,
    completedModules: 7,
    progress: 54,
    color: 'indigo',
    icon: '⚙️',
    rating: 4.4,
    duration: '16 weeks',
    isPublished: true,
  },
];

// ---- Enrolled Courses (Student) ----
export const enrolledCourses = courses.slice(0, 4);

// ---- Recommended Courses ----
export const recommendedCourses = [
  {
    id: 7,
    title: 'Cloud Computing & DevOps',
    subject: 'Cloud Technology',
    teacher: 'Dr. Amit Joshi',
    icon: '☁️',
    color: 'blue',
    rating: 4.6,
    enrolledStudents: 89,
    reason: 'Based on your interest in Web Development',
  },
  {
    id: 8,
    title: 'Artificial Intelligence Ethics',
    subject: 'AI & Society',
    teacher: 'Prof. Neha Kapoor',
    icon: '🧠',
    color: 'pink',
    rating: 4.5,
    enrolledStudents: 67,
    reason: 'Complements your ML Fundamentals course',
  },
  {
    id: 9,
    title: 'Cybersecurity Essentials',
    subject: 'Security',
    teacher: 'Dr. Karan Malhotra',
    icon: '🔒',
    color: 'green',
    rating: 4.7,
    enrolledStudents: 112,
    reason: 'Popular among CSE students',
  },
];

// ---- Quizzes ----
export const upcomingQuizzes = [
  {
    id: 1,
    title: 'Binary Trees & BST',
    course: 'Data Structures & Algorithms',
    courseCode: 'CS301',
    date: '2026-09-15',
    time: '10:00 AM',
    duration: '45 min',
    totalQuestions: 20,
    totalMarks: 40,
    status: 'upcoming',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Linear Regression Models',
    course: 'Machine Learning Fundamentals',
    courseCode: 'AI401',
    date: '2026-09-18',
    time: '2:00 PM',
    duration: '60 min',
    totalQuestions: 25,
    totalMarks: 50,
    status: 'upcoming',
    color: 'purple',
  },
  {
    id: 3,
    title: 'React Hooks & State',
    course: 'Web Development with React',
    courseCode: 'SE405',
    date: '2026-09-22',
    time: '11:00 AM',
    duration: '30 min',
    totalQuestions: 15,
    totalMarks: 30,
    status: 'upcoming',
    color: 'orange',
  },
];

export const completedQuizzes = [
  {
    id: 4,
    title: 'Array & Linked List Operations',
    course: 'Data Structures & Algorithms',
    score: 38,
    totalMarks: 40,
    percentage: 95,
    date: '2026-09-05',
    grade: 'A+',
  },
  {
    id: 5,
    title: 'SQL Joins & Normalization',
    course: 'Database Management Systems',
    score: 42,
    totalMarks: 50,
    percentage: 84,
    date: '2026-09-02',
    grade: 'A',
  },
  {
    id: 6,
    title: 'Python for ML',
    course: 'Machine Learning Fundamentals',
    score: 28,
    totalMarks: 40,
    percentage: 70,
    date: '2026-08-28',
    grade: 'B+',
  },
];

// ---- Assessments ----
export const recentAssessments = [
  {
    id: 1,
    title: 'DSA Assignment 3 — Graph Algorithms',
    course: 'Data Structures & Algorithms',
    submittedDate: '2026-09-08',
    dueDate: '2026-09-10',
    status: 'graded',
    marksObtained: 85,
    totalMarks: 100,
    feedback: 'Excellent implementation of Dijkstra\'s algorithm. Consider optimizing the priority queue.',
  },
  {
    id: 2,
    title: 'ML Project — House Price Prediction',
    course: 'Machine Learning Fundamentals',
    submittedDate: '2026-09-06',
    dueDate: '2026-09-07',
    status: 'graded',
    marksObtained: 78,
    totalMarks: 100,
    feedback: 'Good feature engineering. Try using ensemble methods for better accuracy.',
  },
  {
    id: 3,
    title: 'React Portfolio Website',
    course: 'Web Development with React',
    submittedDate: null,
    dueDate: '2026-09-20',
    status: 'pending',
    marksObtained: null,
    totalMarks: 100,
    feedback: null,
  },
];

// ---- Student Performance Data ----
export const performanceData = {
  monthly: [
    { month: 'Apr', score: 72, average: 68 },
    { month: 'May', score: 76, average: 70 },
    { month: 'Jun', score: 81, average: 72 },
    { month: 'Jul', score: 78, average: 71 },
    { month: 'Aug', score: 85, average: 73 },
    { month: 'Sep', score: 88, average: 75 },
  ],
  subjects: [
    { subject: 'DSA', score: 92 },
    { subject: 'ML', score: 78 },
    { subject: 'DBMS', score: 88 },
    { subject: 'Web Dev', score: 85 },
    { subject: 'Networks', score: 72 },
    { subject: 'OS', score: 80 },
  ],
  overallGPA: 8.6,
  classRank: 12,
  totalStudents: 156,
  attendancePercentage: 91,
  assignmentsCompleted: 18,
  totalAssignments: 22,
};

// ---- Weak Topics (AI Analysis) ----
export const weakTopics = [
  {
    id: 1,
    topic: 'Dynamic Programming',
    course: 'Data Structures & Algorithms',
    proficiency: 45,
    suggestion: 'Practice more DP problems on competitive coding platforms. Focus on memoization techniques.',
    resources: ['GeeksforGeeks DP Series', 'LeetCode DP Problems', 'Abdul Bari YouTube'],
  },
  {
    id: 2,
    topic: 'Neural Network Backpropagation',
    course: 'Machine Learning Fundamentals',
    proficiency: 52,
    suggestion: 'Review calculus chain rule and gradient descent. Try implementing a simple neural network from scratch.',
    resources: ['3Blue1Brown Neural Networks', 'Andrew Ng Coursera', 'StatQuest YouTube'],
  },
  {
    id: 3,
    topic: 'TCP/IP Protocol Stack',
    course: 'Computer Networks',
    proficiency: 58,
    suggestion: 'Use Wireshark to analyze real network packets. Practice subnetting problems.',
    resources: ['Kurose & Ross Textbook Ch.3', 'NetworkChuck YouTube', 'Cisco Networking Academy'],
  },
];

// ---- Notifications ----
export const notifications = [
  {
    id: 1,
    title: 'Quiz Reminder',
    message: 'Binary Trees & BST quiz is scheduled for Sep 15 at 10:00 AM',
    time: '2 hours ago',
    isRead: false,
    type: 'quiz',
  },
  {
    id: 2,
    title: 'Assignment Graded',
    message: 'Your DSA Assignment 3 has been graded. Score: 85/100',
    time: '5 hours ago',
    isRead: false,
    type: 'assessment',
  },
  {
    id: 3,
    title: 'New Course Available',
    message: 'Cloud Computing & DevOps is now open for enrollment',
    time: '1 day ago',
    isRead: true,
    type: 'course',
  },
  {
    id: 4,
    title: 'Study Recommendation',
    message: 'AI suggests reviewing Dynamic Programming before your upcoming quiz',
    time: '2 days ago',
    isRead: true,
    type: 'ai',
  },
];

// ---- Teacher Dashboard Data ----
export const teacherStats = {
  totalStudents: 412,
  totalCourses: 4,
  activeQuizzes: 3,
  avgPerformance: 76.5,
  pendingAssessments: 8,
};

export const teacherCourses = [
  {
    id: 1,
    title: 'Data Structures & Algorithms',
    code: 'CS301',
    semester: '3rd',
    enrolledStudents: 156,
    avgScore: 78,
    status: 'active',
    modules: 12,
  },
  {
    id: 4,
    title: 'Web Development with React',
    code: 'SE405',
    semester: '5th',
    enrolledStudents: 98,
    avgScore: 82,
    status: 'active',
    modules: 11,
  },
  {
    id: 10,
    title: 'Python Programming',
    code: 'CS101',
    semester: '1st',
    enrolledStudents: 210,
    avgScore: 74,
    status: 'active',
    modules: 10,
  },
  {
    id: 11,
    title: 'Software Engineering',
    code: 'SE301',
    semester: '5th',
    enrolledStudents: 88,
    avgScore: 79,
    status: 'draft',
    modules: 8,
  },
];

export const teacherQuizzes = [
  {
    id: 1,
    title: 'Binary Trees & BST',
    course: 'Data Structures & Algorithms',
    date: '2026-09-15',
    totalQuestions: 20,
    status: 'scheduled',
    attempts: 0,
  },
  {
    id: 7,
    title: 'Array & Linked List Operations',
    course: 'Data Structures & Algorithms',
    date: '2026-09-05',
    totalQuestions: 20,
    status: 'completed',
    attempts: 148,
    avgScore: 72,
  },
  {
    id: 8,
    title: 'React Component Lifecycle',
    course: 'Web Development with React',
    date: '2026-09-10',
    totalQuestions: 15,
    status: 'active',
    attempts: 45,
    avgScore: 68,
  },
];

export const studentPerformanceList = [
  { id: 1, name: 'Arjun Sharma', enrollNo: 'CSE2023045', avgScore: 88, quizzes: 6, assignments: 5, grade: 'A+', trend: 'up' },
  { id: 2, name: 'Sneha Reddy', enrollNo: 'CSE2023012', avgScore: 82, quizzes: 6, assignments: 5, grade: 'A', trend: 'up' },
  { id: 3, name: 'Rahul Verma', enrollNo: 'CSE2023078', avgScore: 76, quizzes: 5, assignments: 4, grade: 'B+', trend: 'stable' },
  { id: 4, name: 'Priya Nair', enrollNo: 'CSE2023034', avgScore: 91, quizzes: 6, assignments: 5, grade: 'A+', trend: 'up' },
  { id: 5, name: 'Amit Patel', enrollNo: 'CSE2023056', avgScore: 68, quizzes: 4, assignments: 3, grade: 'B', trend: 'down' },
  { id: 6, name: 'Kavya Krishnan', enrollNo: 'CSE2023023', avgScore: 85, quizzes: 6, assignments: 5, grade: 'A', trend: 'up' },
  { id: 7, name: 'Deepak Joshi', enrollNo: 'CSE2023067', avgScore: 72, quizzes: 5, assignments: 4, grade: 'B+', trend: 'stable' },
  { id: 8, name: 'Ananya Gupta', enrollNo: 'CSE2023089', avgScore: 94, quizzes: 6, assignments: 5, grade: 'A+', trend: 'up' },
];

export const teacherPerformanceData = [
  { month: 'Apr', dsa: 72, webdev: 68, python: 65 },
  { month: 'May', dsa: 74, webdev: 72, python: 70 },
  { month: 'Jun', dsa: 78, webdev: 75, python: 73 },
  { month: 'Jul', dsa: 76, webdev: 78, python: 76 },
  { month: 'Aug', dsa: 82, webdev: 80, python: 74 },
  { month: 'Sep', dsa: 85, webdev: 82, python: 78 },
];

export const teacherRecentActivity = [
  { id: 1, text: 'Arjun Sharma submitted DSA Assignment 3', time: '2 hours ago', type: 'blue' },
  { id: 2, text: '148 students completed Array & Linked List quiz', time: '5 hours ago', type: 'green' },
  { id: 3, text: 'New enrollment in Web Development course', time: '1 day ago', type: 'pink' },
  { id: 4, text: 'Sneha Reddy scored 95% on React quiz', time: '1 day ago', type: 'orange' },
  { id: 5, text: '8 assignments pending review', time: '2 days ago', type: 'blue' },
];

// ---- Admin Dashboard Data ----
export const adminStats = {
  totalUsers: 1847,
  totalStudents: 1620,
  totalTeachers: 215,
  totalCourses: 86,
  activeQuizzes: 24,
  totalDepartments: 12,
};

export const userGrowthData = [
  { month: 'Apr', students: 1200, teachers: 180 },
  { month: 'May', students: 1320, teachers: 188 },
  { month: 'Jun', students: 1400, teachers: 195 },
  { month: 'Jul', students: 1480, teachers: 200 },
  { month: 'Aug', students: 1550, teachers: 208 },
  { month: 'Sep', students: 1620, teachers: 215 },
];

export const courseDistribution = [
  { name: 'Computer Science', value: 32, color: '#2563EB' },
  { name: 'Artificial Intelligence', value: 18, color: '#8B5CF6' },
  { name: 'Software Engineering', value: 14, color: '#F59E0B' },
  { name: 'Electronics', value: 12, color: '#10B981' },
  { name: 'Mathematics', value: 10, color: '#EC4899' },
];

export const recentRegistrations = [
  { id: 101, name: 'Vikram Choudhary', email: 'vikram.c@university.edu', role: 'student', department: 'CSE', date: '2026-09-10' },
  { id: 102, name: 'Dr. Sunita Rao', email: 'sunita.r@university.edu', role: 'teacher', department: 'AI/ML', date: '2026-09-09' },
  { id: 103, name: 'Meera Iyer', email: 'meera.i@university.edu', role: 'student', department: 'IT', date: '2026-09-09' },
  { id: 104, name: 'Rohit Malhotra', email: 'rohit.m@university.edu', role: 'student', department: 'CSE', date: '2026-09-08' },
  { id: 105, name: 'Prof. Anil Sharma', email: 'anil.s@university.edu', role: 'teacher', department: 'ECE', date: '2026-09-08' },
];

export const platformStats = {
  dailyActiveUsers: 623,
  weeklyActiveUsers: 1240,
  avgSessionDuration: '34 min',
  totalQuizAttempts: 4567,
  totalAssignmentsSubmitted: 2890,
  serverUptime: '99.9%',
};

// ---- AI Chat Messages ----
export const initialChatMessages = [
  {
    id: 1,
    type: 'bot',
    text: "Hello Arjun! 👋 I'm your AI study assistant. I've analyzed your recent performance and have some suggestions. How can I help you today?",
    time: '10:00 AM',
  },
  {
    id: 2,
    type: 'user',
    text: 'I have a DSA quiz on Binary Trees coming up. Can you help me prepare?',
    time: '10:01 AM',
  },
  {
    id: 3,
    type: 'bot',
    text: "Great question! Based on your quiz history, you're strong in tree traversals (scored 95%) but need more practice with BST operations like deletion and balancing. Here's a study plan:\n\n📌 **Day 1-2**: Review BST insertion & deletion\n📌 **Day 3**: Practice AVL tree rotations\n📌 **Day 4**: Solve 10 LeetCode tree problems\n📌 **Day 5**: Take a practice quiz\n\nWould you like me to suggest specific problems to practice?",
    time: '10:02 AM',
  },
];

// ---- Study Plan ----
export const studyPlan = [
  { day: 'Monday', tasks: ['Review Binary Tree basics (2 hrs)', 'Practice 5 traversal problems'], status: 'completed' },
  { day: 'Tuesday', tasks: ['BST insertion & deletion (2 hrs)', 'Watch Abdul Bari video on BST'], status: 'completed' },
  { day: 'Wednesday', tasks: ['AVL Trees & rotations (2 hrs)', 'Implement AVL tree in C++'], status: 'current' },
  { day: 'Thursday', tasks: ['Heap & Priority Queue (1.5 hrs)', 'Solve 10 LeetCode problems'], status: 'upcoming' },
  { day: 'Friday', tasks: ['Practice quiz simulation', 'Review weak areas'], status: 'upcoming' },
];
