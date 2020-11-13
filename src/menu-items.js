export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            role: ["OWNER", "ADMIN"],
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                    role: ["OWNER", "ADMIN"],
                }
            ]
        },
        {
            id: 'Profile',
            title: 'Profile Data',
            type: 'group',
            icon: 'icon-ui',
            role: ["OWNER", "ADMIN", "NotActive"],
            children: [
                {
                    id: 'Conf',
                    title: 'Configuration',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    role: ["OWNER", "ADMIN", "NotActive"],
                    children: [
                        {
                            id: 'CompanyProfile',
                            title: 'Company Profile',
                            type: 'item',
                            url: '/CompanyProfile',
                            role: ["OWNER", "ADMIN", "NotActive"],
                            icon: 'fas fa-user-circle'
                        },
                        {
                            id: 'Branches',
                            title: 'Branches',
                            type: 'item',
                            url: '/Branches',
                            role: ["OWNER", "ADMIN"],
                            icon: 'fas fa-code-branch'
                        },
                    ]

                },
            ]
        },

        {
            id: 'settings',
            title: 'Settings',
            type: 'group',
            icon: 'fas fa-cogs',
            role: ["OWNER", "ADMIN"],
            children: [
                {
                    id: 'Admins',
                    title: 'Admins',
                    type: 'item',
                    url: '/admins',
                    icon: 'fas fa-user',
                    role: ["OWNER"],
                },
                {
                    id: 'Reports',
                    title: 'Reports',
                    type: 'item',
                    url: '/Reports',
                    icon: 'fas fa-file',
                    role: ["OWNER", "ADMIN"],
                },
                {
                    id: 'Analytics',
                    title: 'Analytics',
                    type: 'item',
                    url: '/Analytics',
                    icon: 'fas fa-chart-bar',
                    role: ["OWNER", "ADMIN"],
                },
                {
                    id: 'Contacts',
                    title: 'Contacts',
                    type: 'item',
                    url: '/Contacts',
                    icon: 'fas fa-address-book',
                    role: ["OWNER", "ADMIN"],
                },
                {
                    id: 'InvoicesPayments',
                    title: 'InvoicesPayments',
                    type: 'item',
                    url: '/InvoicesPayments',
                    icon: 'fas fa-database',
                    role: ["OWNER", "ADMIN"],
                },
                {
                    id: 'InternetManagement',
                    title: 'InternetManagement',
                    type: 'item',
                    url: '/InternetMangment',
                    icon: 'fas fa-wifi',
                    role: ["OWNER", "ADMIN"],
                },
                {
                    id: 'Integration',
                    title: 'Integration',
                    type: 'item',
                    url: '/Integration',
                    icon: 'fas fa-code',
                    role: ["OWNER", "ADMIN"],
                }
            ]
        },
    ]
}
// items: [
//     {
//         id: 'navigation',
//         title: 'Navigation',
//         type: 'group',
//         icon: 'icon-navigation',
//         children: [
//             {
//                 id: 'dashboard',
//                 title: 'Dashboard',
//                 type: 'item',
//                 url: '/dashboard/default',
//                 icon: 'feather icon-home',
//             }
//         ]
//     },
//     {
//         id: 'ui-element',
//         title: 'UI ELEMENT',
//         type: 'group',
//         icon: 'icon-ui',
//         children: [
//             {
//                 id: 'basic',
//                 title: 'Component',
//                 type: 'collapse',
//                 icon: 'feather icon-box',
//                 children: [
//                     {
//                         id: 'button',
//                         title: 'Button',
//                         type: 'item',
//                         url: '/basic/button'
//                     },
//                     {
//                         id: 'badges',
//                         title: 'Badges',
//                         type: 'item',
//                         url: '/basic/badges'
//                     },
//                     {
//                         id: 'breadcrumb-pagination',
//                         title: 'Breadcrumb & Pagination',
//                         type: 'item',
//                         url: '/basic/breadcrumb-paging'
//                     },
//                     {
//                         id: 'collapse',
//                         title: 'Collapse',
//                         type: 'item',
//                         url: '/basic/collapse'
//                     },
//                     {
//                         id: 'tabs-pills',
//                         title: 'Tabs & Pills',
//                         type: 'item',
//                         url: '/basic/tabs-pills'
//                     },
//                     {
//                         id: 'typography',
//                         title: 'Typography',
//                         type: 'item',
//                         url: '/basic/typography'
//                     }
//                 ]
//             }
//         ]
//     },


//     {
//         id: 'pages',
//         title: 'Pages',
//         type: 'group',
//         icon: 'icon-pages',
//         children: [
//             {
//                 id: 'auth',
//                 title: 'Authentication',
//                 type: 'collapse',
//                 icon: 'feather icon-lock',
//                 badge: {
//                     title: 'New',
//                     type: 'label-danger'
//                 },
//                 children: [
//                     {
//                         id: 'signup-1',
//                         title: 'Sign up',
//                         type: 'item',
//                         url: '/auth/signup-1',
//                         target: true,
//                         breadcrumbs: false
//                     },
//                     {
//                         id: 'signin-1',
//                         title: 'Sign in',
//                         type: 'item',
//                         url: '/auth/signin-1',
//                         target: true,
//                         breadcrumbs: false
//                     }
//                 ]
//             },

//             {
//                 id: 'sample-page',
//                 title: 'Sample Page',
//                 type: 'item',
//                 url: '/sample-page',
//                 classes: 'nav-item',
//                 icon: 'feather icon-sidebar'
//             },
//             {
//                 id: 'docs',
//                 title: 'Documentation',
//                 type: 'item',
//                 url: '/docs',
//                 classes: 'nav-item',
//                 icon: 'feather icon-help-circle'
//             },
//             {
//                 id: 'Tables',
//                 title: 'Tables',
//                 type: 'item',
//                 url: '/Tables',
//                 classes: 'nav-item',
//                 icon: 'feather icon-help-circle'
//             },




//         ]
//     }
// ]
