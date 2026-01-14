
export const MENU_ADMIN_NATIONAL: any[] = [
  {
    title: 'Menu',
    icon: 'home-outline',
    link: '/admin/dashboard',
    home: true,
    isTitle:true
  },
    {
      title: 'Tableau de bord',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
    },
    {
        title: 'Comptes Admin Sectoriels',
        icon: 'person-outline',
        link: '/admin/users',
      },
  
    {
      title: 'Départements',
      icon: 'options-outline',
      link: '/admin/departments',
    },
    {
        title: 'Type Entité',
        icon: 'options-outline',
        link: '/admin/entity-type',
      },
      {
        title: 'Entités',
        icon: 'options-outline',
        link: '/admin/entities',
      },
      {
        title: 'Type Unité Admin',
        icon: 'options-outline',
        link: '/admin/unity-admin-type',
      },
      {
        title: 'Rôle & Permissions',
        icon: 'options-outline',
        link: '/admin/profiles',
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

  export const MENU_ADMIN_SECTORIEL: any[] = [
    {
      title: 'Menu',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:true
    },
    {
      title: 'Tableau de bord',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
    },
    {
      title: 'Agents',
      icon: 'person-outline',
      link: '/admin/officers',
    },
    {
        title: 'Comptes utilisateurs',
        icon: 'person-outline',
        link: '/admin/users',
      },
      {
        title: 'Prestations',
        icon: 'home-outline',
        link: '',
        home: true,
        isTitle:true
      },
      {
        title: 'Prestations',
        icon: 'award-outline',
        link: '/admin/prestations',
      },
    /*  {
        title: 'Pièce à fournir',
        icon: 'attach-2-outline',
        link: '/admin/files',
      },*/
      {
        title: 'Paramètre',
        icon: 'home-outline',
        link: '',
        home: true,
        isTitle:true
      },
      {
        title: 'Unité Admin',
        icon: 'options-outline',
        link: '/admin/unity-admins',
      },
      {
        title: 'Fonction Agent',
        icon: 'options-outline',
        link: '/admin/posts',
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
      {
        title: 'Support',
        icon: 'settings-2-outline',
        link: '/admin/billings',
      },
      {
        title: 'Sujet de support',
        icon: 'settings-2-outline',
        link: '/admin/type-billings',
      },
  ];

  export const MENU_DECISIONNEL: any[] = [
    {
      title: 'Menu',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
      isTitle:true
    },
    {
      title: 'Tableau de bord ',
      icon: 'home-outline',
      link: '/admin/dashboard',
      home: true,
    },
    {
      title: 'E Service',
      icon: 'award-outline',
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
