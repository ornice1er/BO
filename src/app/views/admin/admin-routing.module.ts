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
import { EtapeComponent } from "./pages/etape/etape.component";
import { EtapeDocumentProduitComponent } from "./pages/etape-document-produit/etape-document-produit.component";
import { DocumentCircuitEtapeComponent } from "./pages/document-circuit-etape/document-circuit-etape.component";
import { EtapeDocumentComponent } from "./pages/etape-document/etape-document.component";
import { MotifRejetComponent } from "./pages/motif-rejet/motif-rejet.component";
import { EtapeVisibiliteComponent } from "./pages/etape-visibilite/etape-visibilite.component";
import { FilesComponent } from "./pages/files/files.component";
import { HistoriqueComponent } from "./pages/historique/historique.component";
import { OfficerComponent } from "./pages/officer/officer.component";
import { PermissionComponent } from "./pages/permission/permission.component";
import { PostComponent } from "./pages/post/post.component";
import { PrestationStatusComponent } from "./pages/prestation-status/prestation-status.component";
import { PrestationComponent } from "./pages/prestation/prestation.component";
import { PaymentAccountComponent } from "./pages/payment-account/payment-account.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ProjectDetailComponent } from "./pages/project/project-detail/project-detail.component";
import { ProjectComponent } from "./pages/project/project.component";
import { RoleComponent } from "./pages/role/role.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { StatiistiqueComponent } from "./pages/statiistique/statiistique.component";
import { StatusComponent } from "./pages/status/status.component";
import { SupportDetailsComponent } from "./pages/support-details/support-details.component";
import { SupportComponent } from "./pages/support/support.component";
import { TypeBillingComponent } from "./pages/type-billing/type-billing.component";
import { UnityAdminTypeComponent } from "./pages/unity-admin-type/unity-admin-type.component";
import { UnityAdminComponent } from "./pages/unity-admin/unity-admin.component";
import { UserComponent } from "./pages/user/user.component";
import { WorkflowComponent } from "./pages/workflow/workflow.component";
import { WorkflowStateComponent } from "./pages/workflow-state/workflow-state.component";
import { PlanningSlotComponent } from "./pages/planning-slot/planning-slot.component";
import { MunicipalityComponent } from "./pages/municipality/municipality.component";
import { DistrictComponent } from "./pages/district/district.component";
import { VillageComponent } from "./pages/village/village.component";
import { DocumentTemplateComponent } from "./pages/document-template/document-template.component";

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
                path: 'municipalities',
                component: MunicipalityComponent,
            },
            {
                path: 'districts',
                component: DistrictComponent,
            },
            {
                path: 'villages',
                component: VillageComponent,
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
                path: 'agenda/:code',
                component: AgendaComponent,
            },
            {
                path: 'agenda/:code/:requete',
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
                path: 'payment-accounts',
                component: PaymentAccountComponent,
            },
            {
                path: 'projects',
                component: ProjectComponent,
            },
             {
                path: 'projects/:id',
                component: ProjectDetailComponent,
            },

             {
                path: 'eservice/configurations/status',
                component: StatusComponent,
            },
             {
                path: 'eservice/configurations/etapes',
                component: EtapeComponent,
            },
             {
                path: 'eservice/configurations/prestation-status',
                component: PrestationStatusComponent,
            },
             {
                path: 'eservice/configurations/etape-documents-produits',
                component: EtapeDocumentProduitComponent,
            },
             {
                path: 'eservice/configurations/document-circuit-etapes',
                component: DocumentCircuitEtapeComponent,
            },
             {
                path: 'eservice/configurations/etape-documents',
                component: EtapeDocumentComponent,
            },
             {
                path: 'eservice/configurations/motifs-rejet',
                component: MotifRejetComponent,
            },
             {
                path: 'eservice/configurations/workflows',
                component: WorkflowComponent,
            },
            {
                path: 'eservice/configurations/workflows/:slug',
                component: WorkflowComponent,
            },
             {
                path: 'eservice/workflow-state/:id',
                component: WorkflowStateComponent,
            },
             {
                path: 'eservice/workflow-state/:id/:slug',
                component: WorkflowStateComponent,
            },
             {
                path: 'eservice/configurations/etape-visibilites',
                component: EtapeVisibiliteComponent,
            },
            {
                path: 'eservice/configurations/planning-slots',
                component: PlanningSlotComponent,
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
        { path: 'document-templates', component: DocumentTemplateComponent },

      ]
    }
  ]