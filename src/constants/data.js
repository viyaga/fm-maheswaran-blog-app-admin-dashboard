export const users = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export const navItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Admin',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'admin',
    isActive: true,

    items: [
      {
        title: 'Manage admins',
        url: '/dashboard/admins',
        shortcut: ['m', 'a']
      },
      {
        title: 'Site Settings',
        shortcut: ['s', 's'],
        url: '/dashboard/site-setting',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Authors',
    url: '/dashboard/authors',
    icon: 'author',
    shortcut: ['a', 'a'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: 'user',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Blogs',
    url: '/dashboard/blogs',
    icon: 'product',
    shortcut: ['b', 'b'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Categories',
    url: '/dashboard/categories',
    icon: 'category',
    shortcut: ['c', 'c'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Comments',
    url: '/dashboard/comments',
    icon: 'comment',
    shortcut: ['b', 'c'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Change password',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];

//dummy
export const employees = [
  { "createdAt": "2748", "name": "Miss Kendra Prosacco IV", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/952.jpg", "country": "neatly", "email": "Gasoline", "company": "circuit", "gender": "Bicycle", "id": "1" },
  { "createdAt": "70725", "name": "Abraham Ebert", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/574.jpg", "country": "bluetooth", "email": "Gasoline", "company": "shore", "gender": "joule", "id": "2" },
  { "createdAt": "85426", "name": "Mr. Erik Lang", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/427.jpg", "country": "Cyclocross", "email": "synthesize", "company": "sharply", "gender": "Granite", "id": "3" },
  { "createdAt": "30721", "name": "Dr. Salvador Braun", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/149.jpg", "country": "recontextualize", "email": "United", "company": "revolutionize", "gender": "defect", "id": "4" },
  { "createdAt": "2096", "name": "Joe Thompson", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/296.jpg", "country": "Kids", "email": "dolorem", "company": "Northeast", "gender": "Liaison", "id": "5" },
  { "createdAt": "032", "name": "Joshua Parisian", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/726.jpg", "country": "generating", "email": "officiis", "company": "modulo", "gender": "Angola", "id": "6" },
  { "createdAt": "460", "name": "Brooke Walter", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1195.jpg", "country": "solid", "email": "sky", "company": "Executive", "gender": "distributed", "id": "7" },
  { "createdAt": "80324", "name": "Kellie Durgan", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/292.jpg", "country": "Rock", "email": "Hybrid", "company": "Metal", "gender": "Northeast", "id": "8" },
  { "createdAt": "084", "name": "Bobbie Mitchell", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/752.jpg", "country": "Guinea", "email": "adapter", "company": "supposing", "gender": "Rwanda", "id": "9" },
  { "createdAt": "117", "name": "Leah Reynolds", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg", "country": "blockchains", "email": "Astatine", "company": "hm", "gender": "Volvo", "id": "10" },
  { "createdAt": "21572", "name": "Cindy Bergstrom", "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/304.jpg", "country": "male", "email": "Connecticut", "company": "Fresh", "gender": "Plastic", "id": "11" }
]

export const products = [
  {
    photo_url: "/images/product1.jpg",
    name: "Wireless Earbuds",
    description: "High-quality noise-cancelling wireless earbuds with 20-hour battery life.",
    created_at: "2024-12-01T08:30:00Z",
    price: 49.99,
    id: 101,
    category: "Electronics",
    updated_at: "2024-12-15T10:00:00Z"
  },
  {
    photo_url: "/images/product2.jpg",
    name: "Smart Watch",
    description: "Stylish smartwatch with fitness tracking and heart rate monitoring.",
    created_at: "2024-11-25T12:00:00Z",
    price: 89.99,
    id: 102,
    category: "Wearables",
    updated_at: "2024-12-10T14:00:00Z"
  },
  {
    photo_url: "/images/product3.jpg",
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable RGB lighting and 8 programmable buttons.",
    created_at: "2024-12-05T09:15:00Z",
    price: 29.99,
    id: 103,
    category: "Accessories",
    updated_at: "2024-12-20T16:45:00Z"
  },
  {
    photo_url: "/images/product4.jpg",
    name: "Organic Green Tea",
    description: "Premium organic green tea leaves for a refreshing and healthy drink.",
    created_at: "2024-12-08T11:45:00Z",
    price: 15.99,
    id: 104,
    category: "Beverages",
    updated_at: "2024-12-18T08:30:00Z"
  },
  {
    photo_url: "/images/product5.jpg",
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat for a comfortable workout experience.",
    created_at: "2024-11-30T07:00:00Z",
    price: 25.49,
    id: 105,
    category: "Fitness",
    updated_at: "2024-12-22T10:15:00Z"
  }
];

