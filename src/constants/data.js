

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
    title: 'Media',
    url: '/dashboard/media',
    icon: 'media',
    shortcut: ['m', 'm'],
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

