export const routes = {
  // Public routes
  home: "/",
  login: "/login",
  register: "/register",
  about: "/about",
  
  // Mentor routes
  mentor: {
    dashboard: "/mentor/dashboard",
    profile: "/mentor/profile",
    sessions: "/mentor/sessions",
    resources: "/mentor/resources",
    mentees: "/mentor/mentees",
    earnings: "/mentor/earnings",
  },
  
  // Organization routes
  organization: {
    dashboard: "/organization/dashboard",
    profile: "/organization/profile",
    mentors: "/organization/mentors",
    mentees: "/organization/mentees",
    resources: "/organization/resources",
    communications: "/organization/communications",
    finance: "/organization/finance",
    settings: "/organization/settings",
  },
  
  // Admin routes
  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    organizations: "/admin/organizations",
    mentors: "/admin/mentors",
    settings: "/admin/settings",
  },
} as const;

// Navigation items for each dashboard
export const mentorNavItems = [
  { label: "Overview", path: routes.mentor.dashboard },
  { label: "Profile", path: routes.mentor.profile },
  { label: "Sessions", path: routes.mentor.sessions },
  { label: "Resources", path: routes.mentor.resources },
  { label: "Mentees", path: routes.mentor.mentees },
  { label: "Earnings", path: routes.mentor.earnings },
];

export const organizationNavItems = [
  { label: "Overview", path: routes.organization.dashboard },
  { label: "Profile", path: routes.organization.profile },
  { label: "Mentors", path: routes.organization.mentors },
  { label: "Mentees", path: routes.organization.mentees },
  { label: "Resources", path: routes.organization.resources },
  { label: "Communications", path: routes.organization.communications },
  { label: "Finance", path: routes.organization.finance },
  { label: "Settings", path: routes.organization.settings },
];

export const adminNavItems = [
  { label: "Overview", path: routes.admin.dashboard },
  { label: "Users", path: routes.admin.users },
  { label: "Organizations", path: routes.admin.organizations },
  { label: "Mentors", path: routes.admin.mentors },
  { label: "Settings", path: routes.admin.settings },
]; 