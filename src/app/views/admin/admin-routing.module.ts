import { AuthGuard } from "../../core/guards/auth.guard";
import { LayoutComponent } from "./layout/layout.component";
import { AgendaComponent } from "./pages/agenda/agenda.component";
import { BillingComponent } from "./pages/billing/billing.component";
import { CorrectionComponent } from "./pages/correction/correction.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DepartmentComponent } from "./pages/department/department.component";
import { EntityTypeComponent } from "./pages/entity-type/entity-type.component";
import { EntityComponent } from "./pages/entity/entity.component";
import { EespaceTraitementComponent } from "./pages/eservice/eespace-traitement/eespace-traitement.component";
import { EserviceTraitementEditComponent } from "./pages/eservice/eespace-traitement/eservice-traitement-edit/eservice-traitement-edit.component";
import { EserviceTraitementGeneratorComponent } from "./pages/eservice/eespace-traitement/eservice-traitement-generator/eservice-traitement-generator.component";
import { EserviceTraitementShowComponent } from "./pages/eservice/eespace-traitement/eservice-traitement-show/eservice-traitement-show.component";
import { EspaceFinishComponent } from "./pages/eservice/espace-finish/espace-finish.component";
import { EspaceRejectComponent } from "./pages/eservice/espace-reject/espace-reject.component";
import { EspaceRejectedComponent } from "./pages/eservice/espace-rejected/espace-rejected.component";
import { EspaceRetourCorrectionComponent } from "./pages/eservice/espace-retour-correction/espace-retour-correction.component";
import { EspaceSignatureShowComponent } from "./pages/eservice/espace-signature/espace-signature-show/espace-signature-show.component";
import { EspaceSignatureComponent } from "./pages/eservice/espace-signature/espace-signature.component";
import { EspaceSignedComponent } from "./pages/eservice/espace-signed/espace-signed.component";
import { EspaceValidationVisaComponent } from "./pages/eservice/espace-validation-visa/espace-validation-visa.component";
import { EspaceValidationComponent } from "./pages/eservice/espace-validation/espace-validation.component";
import { StatistiquesComponent } from "./pages/eservice/statistiques/statistiques.component";
import { FilesComponent } from "./pages/files/files.component";
import { HistoriqueComponent } from "./pages/historique/historique.component";
import { OfficerComponent } from "./pages/officer/officer.component";
import { PermissionComponent } from "./pages/permission/permission.component";
import { PostComponent } from "./pages/post/post.component";
import { PrestationComponent } from "./pages/prestation/prestation.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { RoleComponent } from "./pages/role/role.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { StatiistiqueComponent } from "./pages/statiistique/statiistique.component";
import { SupportDetailsComponent } from "./pages/support-details/support-details.component";
import { SupportComponent } from "./pages/support/support.component";
import { TypeBillingComponent } from "./pages/type-billing/type-billing.component";
import { UnityAdminTypeComponent } from "./pages/unity-admin-type/unity-admin-type.component";
import { UnityAdminComponent } from "./pages/unity-admin/unity-admin.component";
import { UserComponent } from "./pages/user/user.component";

export const AdminRoutes: any = [ // ✅ Doit être un tableau
    {
      path: 'admin',
      component: LayoutComponent,
      canActivate:[AuthGuard],
      children: [
        { path: 'dashboard', component: DashboardComponent },


              {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'settings',
                component: SettingsComponent,
            },
            {
                path: 'departments',
                component: DepartmentComponent,
            },
     
            {
                path: 'settings/:token',
                component: SettingsComponent,
            },
     

            {
                path: 'agenda',
                component: AgendaComponent,
            },
            {
                path: 'agenda/:slug',
                component: AgendaComponent,
            },

            {
                path: 'agenda/:code/:slug',
                component: AgendaComponent,
            },
            {
                path: 'agenda/:code/:slug/:codeP',
                component: AgendaComponent,
            },
         
            {
                path: 'users',
                component: UserComponent,
            },
            {
                path: 'profiles',
                component: ProfileComponent,
            },
           
            {
                path: 'entity-type',
                component: EntityTypeComponent,
            },
            {
                path: 'entities',
                component: EntityComponent,
            },
            {
                path: 'unity-admin-type',
                component: UnityAdminTypeComponent,
            },
            {
                path: 'files',
                component: FilesComponent,
            },
            {
                path: 'type-billings',
                component: TypeBillingComponent,
            },
            {
                path: 'billings',
                component: BillingComponent,
            },
            {
                path: 'supports',
                component: SupportComponent,
            },
            {
                path: 'support/details/:token',
                component: SupportDetailsComponent,
            },
            {
                path: 'officers',
                component: OfficerComponent,
            },
            {
                path: 'posts',
                component: PostComponent,
            },
            {
                path: 'unity-admins',
                component: UnityAdminComponent,
            },
            {
                path: 'prestations',
                component: PrestationComponent,
            },
            {
                path: 'eservice/espace-traitement/:slug',
                component: EespaceTraitementComponent,
            },
            {
                path: 'eservice/espace-traitement/:slug/:code',
                component: EespaceTraitementComponent,
            },
            {
                path: 'eservice/espace-traitement-retour-correction/:slug',
                component: EspaceRetourCorrectionComponent,
            },
            {
                path: 'eservice/espace-traitement-retour-correction/:slug/:code',
                component: EspaceRetourCorrectionComponent,
            },
            {
                path: 'eservice/espace-validation-visa/:slug',
                component: EspaceValidationVisaComponent,
            },
            {
                path: 'eservice/espace-validation-visa/:slug/:code',
                component: EspaceValidationVisaComponent,
            },
            {
                path: 'eservice/espace-signature/:slug',
                component: EspaceSignatureComponent,
            },
            {
                path: 'eservice/espace-signature/:slug/:code',
                component: EspaceSignatureComponent,
            },
            {
                path: 'eservice/espace-signed/:slug',
                component: EspaceSignedComponent,
            },
            {
                path: 'eservice/espace-signed/:slug/:code',
                component: EspaceSignedComponent,
            },
            {
                path: 'eservice/espace-reject/:slug',
                component: EspaceRejectComponent,
            },
            {
                path: 'eservice/espace-reject/:slug/:code',
                component: EspaceRejectComponent,
            },
            {
                path: 'eservice/espace-rejected/:slug',
                component: EspaceRejectedComponent,
            },
            {
                path: 'eservice/espace-rejected/:slug/:code',
                component: EspaceRejectedComponent,
            },
            {
                path: 'eservice/finished/:slug',
                component: EspaceFinishComponent,
            },
            {
                path: 'eservice/finished/:slug/:code',
                component: EspaceFinishComponent,
            },
            {
                path: 'eservice/espace-validation/:slug',
                component: EspaceValidationComponent,
            },
            {
                path: 'eservice/espace-validation/:slug/:code',
                component: EspaceValidationComponent,
            },
            {
                path: 'eservice/espace-traitement-show/:code/:slug',
                component: EserviceTraitementShowComponent,
            },
            {
                path: 'eservice/espace-signature-traitement-show/:code/:slug',
                component: EspaceSignatureShowComponent,
            },
            {
                path: 'eservice/espace-signature-traitement-show/:code/:slug/:codeP',
                component: EspaceSignatureShowComponent,
            },
            
            {
                path: 'eservice/espace-traitement-edit/:code/:slug',
                component: EserviceTraitementEditComponent,
            },
            {
                path: 'eservice/espace-traitement-edit/:code/:slug/:isTreated',
                component: EserviceTraitementEditComponent,
            },
            {
                path: 'eservice/espace-traitement-generation-doc/:code/:slug',
                component: EserviceTraitementGeneratorComponent,
            },
            {
                path: 'eservice/correction/:slug',
                component: CorrectionComponent,
            },
            {
                path: 'eservice/correction/:slug/:code',
                component: CorrectionComponent,
            },
              {
                path: 'eservice/historique/:slug',
                component: HistoriqueComponent,
            },
              {
                path: 'eservice/historique/:slug/:code',
                component: HistoriqueComponent,
            },
            {
                path: 'eservice/statistiques/:slug',
                component: StatistiquesComponent,
            },
            {
                path: 'eservice/statistiques/:slug/:code',
                component: StatistiquesComponent,
            },
            {
                path: 'eservice/statistiques',
                component: StatiistiqueComponent,
            },

        { path: 'users', component: UserComponent },
        { path: 'roles', component: RoleComponent },
        { path: 'permissions', component: PermissionComponent },
        { path: 'profils', component: ProfileComponent },

      ]
    }
  ]