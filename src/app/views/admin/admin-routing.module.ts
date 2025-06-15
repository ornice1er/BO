import { AuthGuard } from "../../core/guards/auth.guard";
import { LayoutComponent } from "./layout/layout.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PermissionComponent } from "./pages/permission/permission.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RoleComponent } from "./pages/role/role.component";
import { UserComponent } from "./pages/user/user.component";

export const AdminRoutes: any = [ // ✅ Doit être un tableau
    {
      path: 'admin',
      component: LayoutComponent,
      canActivate:[AuthGuard],
      children: [
        { path: 'dashboard', component: DashboardComponent },

        { path: 'users', component: UserComponent },
        { path: 'roles', component: RoleComponent },
        { path: 'permissions', component: PermissionComponent },
        { path: 'profils', component: ProfileComponent },

      ]
    }
  ]