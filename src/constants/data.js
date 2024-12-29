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
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Employee',
    url: '/dashboard/employee',
    icon: 'user',
    shortcut: ['e', 'e'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
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
        title: 'Login',
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
