# EduFree - Educational Platform

A modern, interactive educational platform built with React for students to access courses, track progress, participate in events, and earn certificates.

## Features

- **Landing Page** - Modern landing page with course information
- **Authentication** - Login and password recovery
- **Dashboard** - Personalized student dashboard
- **Courses** - Browse and access educational content by class
- **Video Player** - Watch course videos with progress tracking
- **Progress Tracking** - Monitor learning progress with visual analytics
- **Events** - Discover and register for educational events
- **Certificates** - View and manage earned certificates
- **Quizzes** - Interactive quizzes with instant feedback
- **Profile Management** - Edit and manage user profiles
- **Notifications** - Stay updated with important announcements
- **Settings** - Customize your learning experience

## Tech Stack

- React 18
- Vite
- Pure CSS (no external UI libraries)
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/edufree.git
cd edufree
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
edufree/
├── src/
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md           # Project documentation
```

## Features Overview

### Student Dashboard
- Overview of enrolled courses
- Recent activity
- Quick access to key features
- Progress statistics

### Course Management
- Filter courses by class (6-12)
- Browse by subjects (Science, Math, Social Studies, etc.)
- Track completion status
- Access course materials

### Progress Tracking
- Visual progress rings
- Weekly learning time
- Achievement badges
- Performance analytics

### Events System
- Browse upcoming educational events
- View event details and schedules
- Register for events
- Track registered events

## Role-Based Admin Dashboards

EduFree now includes dedicated admin experiences that match the roles stored in the Supabase `staff` table. When a logged-in user has a non-`student` role, the **Admin Panel** tile on the Profile page opens the correct dashboard automatically.

- **Super Admin (`super_admin`)** – see platform-wide metrics, states, staff, and students. You can also invite new state admins directly from the UI.
- **State Admin (`state_admin`)** – manage districts within the assigned state, create district coordinators, and review teachers/students for that state.
- **District Coordinator (`district_coordinator`)** – recruit teachers, review students inside the district, and build teacher ↔ student assignments.
- **Teacher (`subject_teacher`)** – view assigned students, inspect lesson progress, and upload new lessons (YouTube IDs) for their subject.

### Enabling the dashboards
1. Ensure the desired Supabase user has a matching row in the `staff` table with one of the roles listed above (and `is_active = true`).
2. Apply the provided RLS policies so that each role is allowed to read/write the data it needs.
3. Sign in; the Profile → Admin Panel button will take you to the correct dashboard. Use the Logout button inside the dashboard to sign out when you are done.

For a deeper walkthrough (RLS SQL, role workflows, schema mapping, etc.) see `src/README.md`.

### Staff role matrix

Full details on capabilities and SQL helpers for each staff role (`super_admin`, `state_admin`, `district_coordinator`, `subject_teacher`) are documented in [`docs/STAFF_ROLES.md`](docs/STAFF_ROLES.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.
