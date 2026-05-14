
export const MENU_ADMIN_NATIONAL: any[] = [
  { title: 'Principal', isTitle: true },
  { title: 'Tableau de bord',         icon: 'fas fa-home',          link: '/admin/dashboard' },
  { title: 'Comptes Admin Sectoriels', icon: 'fas fa-users',         link: '/admin/users' },
  { title: 'Référentiels', isTitle: true },
  {
    title: 'Découpage territorial', icon: 'fas fa-map-marked-alt',
    isTitle: false, hasChildren: true, collapse: false,
    children: [
      { title: 'Départements',  link: '/admin/departments' },
      { title: 'Municipalités', link: '/admin/municipalities' },
      { title: 'Districts',     link: '/admin/districts' },
      { title: 'Villages',      link: '/admin/villages' },
    ]
  },
  { title: 'Type Entité',      icon: 'fas fa-tag',        link: '/admin/entity-type' },
  { title: 'Entités',          icon: 'fas fa-building',   link: '/admin/entities' },
  { title: 'Type Unité Admin', icon: 'fas fa-sitemap',    link: '/admin/unity-admin-type' },
  { title: 'Rôles & Permissions', icon: 'fas fa-shield-alt', link: '/admin/profiles' },
  { title: 'Analyses', isTitle: true },
  { title: 'Statistiques',     icon: 'fas fa-chart-bar',  link: '/admin/eservice/statistiques' },
  { title: 'Système', isTitle: true },
  { title: 'Paramètres',       icon: 'fas fa-cog',        link: '/admin/settings' },
];

  export const MENU_ADMIN_SECTORIEL: any[] = [
    { title: 'Principal', isTitle: true },
    { title: 'Tableau de bord',      icon: 'fas fa-home',             link: '/admin/dashboard' },
    { title: 'Agents',               icon: 'fas fa-id-badge',         link: '/admin/officers' },
    { title: 'Comptes utilisateurs', icon: 'fas fa-users',            link: '/admin/users' },
    { title: 'e-Services', isTitle: true },
    { title: 'Prestations',          icon: 'fas fa-award',            link: '/admin/prestations' },
    { title: 'Déclaration périodique', icon: 'fas fa-file-signature', link: '/admin/projects' },
    {
      title: 'Configuration eServices', icon: 'fas fa-tools',
      isTitle: false, hasChildren: true, collapse: false,
      children: [
        { title: 'Statuts',                 link: '/admin/eservice/configurations/status' },
        { title: 'Étapes',                  link: '/admin/eservice/configurations/etapes' },
        { title: 'Statuts par prestation',  link: '/admin/eservice/configurations/prestation-status' },
        { title: 'Workflow',                link: '/admin/eservice/configurations/workflows' },
        { title: 'Documents produits',      link: '/admin/eservice/configurations/etape-documents-produits' },
        { title: 'Circuit de signature',    link: '/admin/eservice/configurations/document-circuit-etapes' },
        { title: 'Pièces justificatives',   link: '/admin/eservice/configurations/etape-documents' },
        { title: 'Motifs de rejet',         link: '/admin/eservice/configurations/motifs-rejet' },
        { title: 'Règles de visibilité',    link: '/admin/eservice/configurations/etape-visibilites' },
        { title: 'Créneaux RDV',            link: '/admin/eservice/configurations/planning-slots' },
      ]
    },
    { title: 'Référentiels', isTitle: true },
    { title: 'Unité Admin',    icon: 'fas fa-sitemap',        link: '/admin/unity-admins' },
    { title: 'Fonction Agent', icon: 'fas fa-briefcase',      link: '/admin/posts' },
    {
      title: 'Découpage territorial', icon: 'fas fa-map-marked-alt',
      isTitle: false, hasChildren: true, collapse: false,
      children: [
        { title: 'Départements',  link: '/admin/departments' },
        { title: 'Municipalités', link: '/admin/municipalities' },
        { title: 'Districts',     link: '/admin/districts' },
        { title: 'Villages',      link: '/admin/villages' },
      ]
    },
    { title: 'Analyses', isTitle: true },
    { title: 'RDV général',    icon: 'fas fa-calendar-alt', link: '/admin/agenda' },
    { title: 'Statistiques',   icon: 'fas fa-chart-bar',    link: '/admin/eservice/statistiques' },
    { title: 'Système', isTitle: true },
    { title: 'Paramètres',     icon: 'fas fa-cog',          link: '/admin/settings' },
    { title: 'Support',        icon: 'fas fa-headset',       link: '/admin/billings' },
    { title: 'Sujet de support', icon: 'fas fa-question-circle', link: '/admin/type-billings' },
  ];

  export const MENU_DECISIONNEL: any[] = [
    { title: 'Principal', isTitle: true },
    { title: 'Tableau de bord', icon: 'fas fa-home',  link: '/admin/dashboard' },
    {
      title: 'e-Services', icon: 'fas fa-layer-group',
      hasChildren: true, collapse: false,
      children: [
      /*  {
          title: 'Attestation de non litige',
          link: '/admin/eservice/espace-decision/service/attestation-de-non-litige',
        },
        {
          title: 'Déclaration d\'établissement',
          link: '/admin/eservice/espace-decision/service/declaration-etablissement',
        },*/
        {
          title: 'Attestation de service fait',
          link: '/admin/eservice/espace-decision/service/attestation-de-service-fait',
        },
        {
          title: 'Autorisation de stage',
          link: '/admin/eservice/espace-decision/service/autorisation-de-stage',
        },
        {
          title: 'Attestation de stage',
          link: '/admin/eservice/espace-decision/service/attestation-de-stage',
        },
        {
          title: 'Règlement Intérieur',
          link: '/admin/eservice/espace-decision/service/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Autorisation Licenciement',
          link: '/admin/eservice/espace-decision/service/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Contrat d\'apprentissage',
          link: '/admin/eservice/espace-decision/service/visa-contrat-apprentisage',
        },
        {
          title: 'Agrément Médécin',
          link: '/admin/eservice/espace-decision/service/decision-agrement-exercice-medecin',
        },
        // {
        //   title: 'Attestation d\'existence',
        //   link: '/admin/eservice/espace-decision/service/attestation-existence',
        // },
      ],
    },
    { title: 'Analyses', isTitle: true },
    { title: 'Statistiques', icon: 'fas fa-chart-bar', link: '/admin/eservice/statistiques' },
    { title: 'Système', isTitle: true },
    { title: 'Paramètres', icon: 'fas fa-cog', link: '/admin/settings' },
  ];

  export const MENU_DIRECTION: any[] = [
    {
      title: 'Menu',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:true,
      hasChildren:false,

    },
    {
      title: 'Tableau de bord ',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:false,
      hasChildren:false,

    },
    {
      title: 'Mes e-Services',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:false,
      hasChildren:false,
    },
    {
      title: 'RDV général',
      icon: 'fas fa-calendar-alt',
      link: '/admin/agenda',
      isTitle: false,
      hasChildren: false,
    },
    {
      title: 'Attestation de non litige',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'attestation-de-non-litige',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-non-litige',
        },
        {
          title: 'Demandes à signer',
          link: '/admin/eservice/espace-validation/attestation-de-non-litige',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-non-litige',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-non-litige',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-non-litige',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-non-litige',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-non-litige',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-non-litige',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-non-litige',
        }
      ],
    },
    {
      title: 'Déclaration d\'établissement',
      icon: 'briefcase-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'declaration-etablissement',
      children: [
      
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/declaration-etablissement',
        },
        {
          title: 'Demandes à signer',
          link: '/admin/eservice/espace-validation/declaration-etablissement',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/declaration-etablissement',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/declaration-etablissement',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/declaration-etablissement',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/declaration-etablissement',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/declaration-etablissement',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/declaration-etablissement',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/declaration-etablissement',
        }
      ],
    },
    {
      title: 'Attestation de service fait',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'attestation-de-service-fait',
      children: [

        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-service-fait',
        },
        {
          title: 'Demandes à signer',
          link: '/admin/eservice/espace-validation/attestation-de-service-fait',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-service-fait',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-service-fait',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-service-fait',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-service-fait',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-service-fait',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-service-fait',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-service-fait',
        }
      ],
    },
    {
      title: 'Autorisation de stage',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'autorisation-de-stage',
      children: [
        {
          title: 'Demandes à traiter',
          link: '/admin/eservice/espace-traitement/autorisation-de-stage',
        },
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/autorisation-de-stage',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/autorisation-de-stage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/autorisation-de-stage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/autorisation-de-stage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/autorisation-de-stage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/autorisation-de-stage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/autorisation-de-stage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/autorisation-de-stage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/autorisation-de-stage',
        }
      ],
    },
    {
      title: 'Attestation de stage',
      icon: 'award-outline',
      hasChildren:true, collapse:false,
      slug:"attestation-de-stage",
      children: [
       
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-stage',
        },
        {
          title: 'Demandes à signer',
          link: '/admin/eservice/espace-validation/attestation-de-stage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-stage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-stage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-stage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-stage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-stage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-stage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-stage',
        }
      ],
    },
    {
      title: 'Attestation de présence au poste',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'attestation-de-presence-au-poste',
      children: [
     
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-presence-au-poste',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-presence-au-poste',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-presence-au-poste',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-presence-au-poste',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-presence-au-poste',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-presence-au-poste',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-presence-au-poste',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-presence-au-poste',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-presence-au-poste',
        }
      ],
    },
    /*****************************************************************************************/
    {
      title: 'Règlement Intérieur ',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'visa-reglement-interieur-entreprise',
      children: [

        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Demandes à signer',
          link: '/admin/eservice/espace-validation/visa-reglement-interieur-entreprise',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/visa-reglement-interieur-entreprise',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/visa-reglement-interieur-entreprise',
        }, {
          title: 'Demandes validées pour visa',
          link: '/admin/eservice/espace-validation-visa/visa-reglement-interieur-entreprise',
        },
     
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/visa-reglement-interieur-entreprise',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/visa-reglement-interieur-entreprise',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/visa-reglement-interieur-entreprise',
        }
      ],
    },
    {
      title: 'Autorisation Licenciement',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
      children: [

        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes à signer',
          link: '/admin/eservice/espace-validation/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes en étude d\'accord à l\'amiable',
          link: '/admin/eservice/correction/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        }
      ],
    },
    {
      title: 'Contrat d\'apprentissage',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'visa-contrat-apprentisage',
      children: [

        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/visa-contrat-apprentisage',
        },
        {
          title: 'Demandes à signer',
          link: '/admin/eservice/espace-validation/visa-contrat-apprentisage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/visa-contrat-apprentisage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/visa-contrat-apprentisage',
        }, {
          title: 'Demandes validées pour visa',
          link: '/admin/eservice/espace-validation-visa/visa-contrat-apprentisage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/visa-contrat-apprentisage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/visa-contrat-apprentisage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/visa-contrat-apprentisage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/visa-contrat-apprentisage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/visa-contrat-apprentisage',
        }
      ],
    },
    {
      title: 'Agrément Médécin',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'decision-agrement-exercice-medecin',
      children: [
        {
          title: 'Demandes à traiter',
          link: '/admin/eservice/espace-traitement/decision-agrement-exercice-medecin',
        },
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/decision-agrement-exercice-medecin',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/decision-agrement-exercice-medecin',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/decision-agrement-exercice-medecin',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/decision-agrement-exercice-medecin',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/decision-agrement-exercice-medecin',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/decision-agrement-exercice-medecin',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/decision-agrement-exercice-medecin',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/decision-agrement-exercice-medecin',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/decision-agrement-exercice-medecin',
        }
      ],
    },

    {
      title: 'Certification de non radiation',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'certificat-de-non-radiation',
      children: [
   
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/certificat-de-non-radiation',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/certificat-de-non-radiatione',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/certificat-de-non-radiation',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/certificat-de-non-radiation',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/certificat-de-non-radiation',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/certificat-de-non-radiation',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/certificat-de-non-radiation',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/certificat-de-non-radiation',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/certificat-de-non-radiation',
        }
      ],
    },
    {
      title: 'Attestation de validité des services',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'attestation-de-validite-des-services',
      children: [
      
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-validite-des-services',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-validite-des-services',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-validite-des-services',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-validite-des-services',
        },
      
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-validite-des-services',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-validite-des-services',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-validite-des-services',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-validite-des-services',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-validite-des-services',
        }
      ],
    },
    {
      title: 'Statistiques',
      isTitle:false,
      hasChildren:false, collapse:false,
      slug:'',
      link: '/admin/eservice/statistiques',
    },
    {
      title: 'Paramètre',
      icon: 'settings-2-outline',
      link: '/admin/settings',
    },
  ];

  export const MENU_DIRECTION_TECHNIQUE: any[] = [
    {
      title: 'Menu',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:true,
      hasChildren:false,

    },
    {
      title: 'Tableau de bord ',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:false,
      hasChildren:false,

    },
    {
      title: 'Mes e-Services',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:true,
      hasChildren:false,
    },
    {
      title: 'Attestation de non litige',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'attestation-de-non-litige',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-non-litige',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-non-litige',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-non-litige',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-non-litige',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-non-litige',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-non-litige',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-non-litige',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-non-litige',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-non-litige',
        }
      ],
    },
    {
      title: 'Déclaration d\'établissement',
      icon: 'briefcase-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'declaration-etablissement',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/declaration-etablissement',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/declaration-etablissement',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/declaration-etablissement',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/declaration-etablissement',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/declaration-etablissement',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/declaration-etablissement',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/declaration-etablissement',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/declaration-etablissement',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/declaration-etablissement',
        }
      ],
    },
    {
      title: 'Attestation de service fait',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'attestation-de-service-fait',
      children: [

        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-service-fait',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-service-fait',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-service-fait',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-service-fait',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-service-fait',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-service-fait',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-non-litige',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-non-litige',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-non-litige',
        }
      ],
    },
    {
      title: 'Autorisation de stage',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'autorisation-de-stage',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/autorisation-de-stage',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/autorisation-de-stage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/autorisation-de-stage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/autorisation-de-stage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/autorisation-de-stage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/autorisation-de-stage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/autorisation-de-stage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/autorisation-de-stage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/autorisation-de-stage',
        }
      ]
      
    },
    {
      title: 'Attestation de stage',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'attestation-de-stage',
      children: [
 
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-stage',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-stage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-stage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-stage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-stage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-stage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-stage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-stage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-stage',
        }
      ],
    },
    {
      title: 'Attestation de présence au poste',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'attestation-de-presence-au-poste',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-presence-au-poste',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-presence-au-poste',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-presence-au-poste',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-presence-au-poste',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-presence-au-poste',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-presence-au-poste',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-presence-au-poste',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-presence-au-poste',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-presence-au-poste',
        }
      ],
    },
    
    {
      title: 'Règlement Intérieur ',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'visa-reglement-interieur-entreprise',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/visa-reglement-interieur-entreprise',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/visa-reglement-interieur-entreprise',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/visa-reglement-interieur-entreprise',
        }, {
          title: 'Demandes validées pour visa',
          link: '/admin/eservice/espace-validation-visa/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/visa-reglement-interieur-entreprise',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/visa-reglement-interieur-entreprise',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/visa-reglement-interieur-entreprise',
        }
      ],
    },
    {
      title: 'Autorisation Licenciement',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        }
      ],
    },
    {
      title: 'Contrat d\'apprentissage',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'visa-contrat-apprentisage',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/visa-contrat-apprentisage',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/visa-contrat-apprentisage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/visa-contrat-apprentisage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/visa-contrat-apprentisage',
        }, {
          title: 'Demandes validées pour visa',
          link: '/admin/eservice/espace-validation-visa/visa-contrat-apprentisage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/visa-contrat-apprentisage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/visa-contrat-apprentisage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/visa-contrat-apprentisage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/visa-contrat-apprentisage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/visa-contrat-apprentisage',
        }
      ],
    },
    {
      title: 'Agrément Médécin',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'decision-agrement-exercice-medecin',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/decision-agrement-exercice-medecin',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/decision-agrement-exercice-medecin',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/decision-agrement-exercice-medecin',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/decision-agrement-exercice-medecin',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/decision-agrement-exercice-medecin',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/decision-agrement-exercice-medecin',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/decision-agrement-exercice-medecin',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/decision-agrement-exercice-medecin',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/decision-agrement-exercice-medecin',
        }
      ],
    },

   
    {
      title: 'Certification de non radiation',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'certificat-de-non-radiation',

      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/certificat-de-non-radiation',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/certificat-de-non-radiation',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/certificat-de-non-radiation',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/certificat-de-non-radiation',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/certificat-de-non-radiation',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/certificat-de-non-radiation',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/certificat-de-non-radiation',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/certificat-de-non-radiation',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/certificat-de-non-radiation',
        }
      ],
    },
    {
      title: 'Attestation de validité des services',
      icon: 'award-outline',
      isTitle:false,
      hasChildren:true, collapse:false,
      slug:'attestation-de-validite-des-services',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-validite-des-services',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-validite-des-services',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-validite-des-services',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-validite-des-services',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-validite-des-services',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-validite-des-services',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-validite-des-services',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-validite-des-services',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-validite-des-services',
        }
      ],
    },
    {
      title: 'Paramètre',
      icon: 'settings-2-outline',
      link: '/admin/settings',
      isTitle:true,
      hasChildren:false,
    },
  ];

  export const MENU_SERVICE: any[] = [
    {
      title: 'Menu',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:true,
      hasChildren:false,

    },
    {
      title: 'Tableau de bord ',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:false,
      hasChildren:false,

    },
    {
      title: 'Mes e-Services',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:true,
      hasChildren:false,
    },
    {
      title: 'Attestation de non litige',
      hasChildren:true, collapse:false,
      slug:'attestation-de-non-litige',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-non-litige',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-non-litige',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-non-litige',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-non-litige',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-non-litige',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-non-litige',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-non-litige',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-non-litige',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-non-litige',
        }
      ],
    },
    {
      title: 'Déclaration d\'établissement',
      hasChildren:true, collapse:false,
      slug:'declaration-etablissement',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/declaration-etablissement',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/declaration-etablissement',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/declaration-etablissement',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/declaration-etablissement',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/declaration-etablissement',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/declaration-etablissement',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/declaration-etablissement',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/declaration-etablissement',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/declaration-etablissement',
        }
      ],
    },
    {
      title: 'Attestation de service fait',
      hasChildren:true, collapse:false,
      slug:'attestation-de-service-fait',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-service-fait',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-service-fait',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-service-fait',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-service-fait',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-service-fait',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-service-fait',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-service-fait',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-service-fait',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-service-fait',
        }
      ],
    },
    {
      title: 'Autorisation de stage',
      hasChildren:true, collapse:false,
      slug:'autorisation-de-stage',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/autorisation-de-stage',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/autorisation-de-stage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/autorisation-de-stage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/autorisation-de-stage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/autorisation-de-stage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/autorisation-de-stage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/autorisation-de-stage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/autorisation-de-stage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/autorisation-de-stage',
        }
      ],
    },
    {
      title: 'Attestation de stage',
      icon: 'award-outline',
      hasChildren:true, collapse:false,
      slug:"attestation-de-stage",
      children: [
       
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-stage',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-stage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-stage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-stage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-stage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-stage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-stage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-stage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-stage',
        }
      ],
    },
    {
      title: 'Attestation de présence au poste',
      hasChildren:true, collapse:false,
      slug:'attestation-de-presence-au-poste',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-presence-au-poste',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-presence-au-poste',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-presence-au-poste',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-presence-au-poste',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-presence-au-poste',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-presence-au-poste',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-presence-au-poste',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-presence-au-poste',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-presence-au-poste',
        }
      ],
    },
    {
      title: 'Règlement Intérieur ',
      hasChildren:true, collapse:false,
      slug:'visa-reglement-interieur-entreprise',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/visa-reglement-interieur-entreprise',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/visa-reglement-interieur-entreprise',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/visa-reglement-interieur-entreprise',
        }, {
          title: 'Demandes validées pour visa',
          link: '/admin/eservice/espace-validation-visa/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/visa-reglement-interieur-entreprise',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/visa-reglement-interieur-entreprise',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/visa-reglement-interieur-entreprise',
        }
      ],
    },
    {
      title: 'Autorisation Licenciement',
      hasChildren:true, collapse:false,
      slug:'autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        }
      ],
    },
    {
      title: 'Contrat d\'apprentissage',
      hasChildren:true, collapse:false,
      slug:'visa-contrat-apprentisage',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/visa-contrat-apprentisage',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/visa-contrat-apprentisage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/visa-contrat-apprentisage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/visa-contrat-apprentisage',
        }, {
          title: 'Demandes validées pour visa',
          link: '/admin/eservice/espace-validation-visa/visa-contrat-apprentisage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/visa-contrat-apprentisage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/visa-contrat-apprentisage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/visa-contrat-apprentisage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/visa-contrat-apprentisage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/visa-contrat-apprentisage',
        }
      ],
    },
    {
      title: 'Agrément Médécin',
      hasChildren:true, collapse:false,
      slug:'decision-agrement-exercice-medecin',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/decision-agrement-exercice-medecin',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/decision-agrement-exercice-medecin',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/decision-agrement-exercice-medecin',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/decision-agrement-exercice-medecin',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/decision-agrement-exercice-medecin',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/decision-agrement-exercice-medecin',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/decision-agrement-exercice-medecin',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/decision-agrement-exercice-medecin',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/decision-agrement-exercice-medecin',
        }
      ],
    },

    {
      title: 'Certification de non radiation',
      hasChildren:true, collapse:false,
      slug:'certificat-de-non-radiation',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/certificat-de-non-radiation',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/certificat-de-non-radiation',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/certificat-de-non-radiation',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/certificat-de-non-radiation',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/certificat-de-non-radiation',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/certificat-de-non-radiation',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/certificat-de-non-radiation',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/certificat-de-non-radiation',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/certificat-de-non-radiation',
        }
      ],
    },
    {
      title: 'Attestation de validité des services',
      hasChildren:true, collapse:false,
      slug:'attestation-de-validite-des-services',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-validite-des-services',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-validite-des-services',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-validite-des-services',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-validite-des-services',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-validite-des-services',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-validite-des-services',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-validite-des-services',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-validite-des-services',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-validite-des-services',
        }
      ],
    },
       {
      title: 'Statistiques',
      isTitle:false,
      hasChildren:false, collapse:false,
      slug:'',
      link: '/admin/eservice/statistiques',
    },
    {
      title: 'Paramètre',
      icon: 'settings-2-outline',
      link: '/admin/settings',
    },
  ];


  export const MENU_DIVISION: any[] = [
    {
      title: 'Menu',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:true,
      hasChildren:false,

    },
    {
      title: 'Tableau de bord ',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:false,
      hasChildren:false,

    },
    {
      title: 'Mes e-Services',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:true,
      hasChildren:false,
    },
    {
      title: 'Attestation de non litige',
      hasChildren:true, collapse:false,
      slug:'attestation-de-non-litige',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-non-litige',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-non-litige',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-non-litige',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-non-litige',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-non-litige',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-non-litige',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-non-litige',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-non-litige',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-non-litige',
        }
      ],
    },
    {
      title: 'Déclaration d\'établissement',
      hasChildren:true, collapse:false,
      slug:'declaration-etablissement',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/declaration-etablissement',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/declaration-etablissement',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/declaration-etablissement',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/declaration-etablissement',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/declaration-etablissement',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/declaration-etablissement',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/declaration-etablissement',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/declaration-etablissement',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/declaration-etablissement',
        }
      ],
    },
    {
      title: 'Attestation de service fait',
      hasChildren:true, collapse:false,
      slug:'attestation-de-service-fait',
      children: [
    
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-service-fait',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-service-fait',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-service-fait',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-service-fait',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-service-fait',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-service-fait',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-service-fait',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-service-fait',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-service-fait',
        }
      ],
    },
    {
      title: 'Autorisation de stage',
      hasChildren:true, collapse:false,
      slug:'autorisation-de-stage',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/autorisation-de-stage',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/autorisation-de-stage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/autorisation-de-stage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/autorisation-de-stage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/autorisation-de-stage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/autorisation-de-stage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/autorisation-de-stage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/autorisation-de-stage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/autorisation-de-stage',
        }
      ],
    },
    {
      title: 'Attestation de stage',
      icon: 'award-outline',
      hasChildren:true, collapse:false,
      slug:"attestation-de-stage",
      children: [
      
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-stage',
        },
      
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-stage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-stage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-stage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-stage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-stage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-stage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-stage',
        }
      ],
    },
    {
      title: 'Attestation de présence au poste',
      hasChildren:true, collapse:false,
      slug:'attestation-de-presence-au-poste',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-presence-au-poste',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-presence-au-poste',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-presence-au-poste',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-presence-au-poste',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-presence-au-poste',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-presence-au-poste',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-presence-au-poste',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-presence-au-poste',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-presence-au-poste',
        }
      ],
    },
    {
      title: 'Règlement Intérieur ',
      hasChildren:true, collapse:false,
      slug:'visa-reglement-interieur-entreprise',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/visa-reglement-interieur-entreprise',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/visa-reglement-interieur-entreprise',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/visa-reglement-interieur-entreprise',
        }, {
          title: 'Demandes validées pour visa',
          link: '/admin/eservice/espace-validation-visa/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/visa-reglement-interieur-entreprise',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/visa-reglement-interieur-entreprise',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/visa-reglement-interieur-entreprise',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/visa-reglement-interieur-entreprise',
        }
      ],
    },
    {
      title: 'Autorisation Licenciement',
      hasChildren:true, collapse:false,
      slug:'autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel',
        }
      ],
    },
    {
      title: 'Contrat d\'apprentissage',
      hasChildren:true, collapse:false,
      slug:'visa-contrat-apprentisage',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/visa-contrat-apprentisage',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/visa-contrat-apprentisage',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/visa-contrat-apprentisage',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/visa-contrat-apprentisage',
        }, {
          title: 'Demandes validées pour visa',
          link: '/admin/eservice/espace-validation-visa/visa-contrat-apprentisage',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/visa-contrat-apprentisage',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/visa-contrat-apprentisage',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/visa-contrat-apprentisage',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/visa-contrat-apprentisage',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/visa-contrat-apprentisage',
        }
      ],
    },
    {
      title: 'Agrément Médécin',
      hasChildren:true, collapse:false,
      slug:'decision-agrement-exercice-medecin',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/decision-agrement-exercice-medecin',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/decision-agrement-exercice-medecin',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/decision-agrement-exercice-medecin',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/decision-agrement-exercice-medecin',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/decision-agrement-exercice-medecin',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/decision-agrement-exercice-medecin',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/decision-agrement-exercice-medecin',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/decision-agrement-exercice-medecin',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/decision-agrement-exercice-medecin',
        }
      ],
    },
 
    {
      title: 'Certification de non radiation',
      hasChildren:true, collapse:false,
      slug:'certificat-de-non-radiation',
      children: [
        
          {
            title: 'Nouvelles demandes',
            link: '/admin/eservice/espace-traitement/certificat-de-non-radiation',
          },
          {
            title: 'Demandes à valider',
            link: '/admin/eservice/espace-validation/certificat-de-non-radiation',
          },
          {
            title: 'Demandes mise en attente',
            link: '/admin/eservice/correction/certificat-de-non-radiation',
          },
          {
            title: 'Rendez-vous',
            link: '/admin/agenda/certificat-de-non-radiation',
          },
          {
            title: 'Demandes finalisées',
            link: '/admin/eservice/finished/certificat-de-non-radiation',
          },
          {
            title: 'Parcours demandes',
            link: '/admin/eservice/historique/certificat-de-non-radiation',
          },
          {

            title: 'Transitions workflow',

            link: '/admin/eservice/configurations/workflows/certificat-de-non-radiation',

          },
          {
            title: 'Statistiques e-services ',
            link: '/admin/eservice/statistiques/certificat-de-non-radiation',
          }
      ],
    },
    {
      title: 'Attestation de validité des services',
      hasChildren:true, collapse:false,
      slug:'attestation-de-non-litige',
      children: [
        {
          title: 'Nouvelles demandes',
          link: '/admin/eservice/espace-traitement/attestation-de-validite-des-services',
        },
        {
          title: 'Demandes à valider',
          link: '/admin/eservice/espace-validation/attestation-de-validite-des-services',
        },
             {
          title: 'Demandes mise en attente',
          link: '/admin/eservice/correction/attestation-de-validite-des-services',
        }, {
          title: 'Demandes corrigées',
          link: '/admin/eservice/espace-traitement-retour-correction/attestation-de-validite-des-services',
        },
        {
          title: 'Rendez-vous',
          link: '/admin/agenda/attestation-de-validite-des-services',
        },
        {
          title: 'Demandes finalisées',
          link: '/admin/eservice/finished/attestation-de-validite-des-services',
        },
        {
          title: 'Parcours demandes',
          link: '/admin/eservice/historique/attestation-de-validite-des-services',
        },
        {

          title: 'Transitions workflow',

          link: '/admin/eservice/configurations/workflows/attestation-de-validite-des-services',

        },
        {
          title: 'Statistiques e-services ',
          link: '/admin/eservice/statistiques/attestation-de-validite-des-services',
        }
      ],
    },
    {
      title: 'Statistiques',
      isTitle:false,
      hasChildren:false, collapse:false,
      slug:'',
      link: '/admin/eservice/statistiques',
    },
    {
      title: 'Paramètre',
      icon: 'settings-2-outline',
      link: '/admin/settings',
    },
  ];
