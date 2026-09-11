import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: 'M4 6h16M4 12h16M4 18h7',
  },
  {
    to: '/visitors',
    label: 'Visitors',
    icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-3.999-4A4 4 0 0015 11z',
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 flex-col border-r border-ink-800 bg-ink-900 px-4 py-6 md:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brass-500 text-sm font-bold text-ink-950">
          G
        </div>
        <span className="text-base font-semibold tracking-tight text-slate-100">Gatekeeper</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brass-500/15 text-brass-400'
                  : 'text-slate-400 hover:bg-ink-800 hover:text-slate-100'
              }`
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d={item.icon}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-lg border border-ink-700 bg-ink-800/60 p-3">
        <p className="text-xs text-slate-500">Gate access, without the front-desk clipboard.</p>
      </div>
    </aside>
  );
}
