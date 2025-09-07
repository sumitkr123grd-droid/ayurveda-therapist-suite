import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  UserPlus, 
  Calendar, 
  Users, 
  ClipboardList, 
  Settings,
  Activity
} from "lucide-react";

const navigationItems = [
  { name: "Registration", href: "/registration", icon: UserPlus },
  { name: "Today's Schedule", href: "/", icon: Calendar },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Requests", href: "/requests", icon: ClipboardList },
  { name: "Profile", href: "/profile", icon: Settings },
  { name: "Analytics", href: "/analytics", icon: Activity },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                AyurTherapy
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}