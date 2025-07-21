import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppSweetAlert } from '../../../core/utils/app-sweet-alert';
import { FormsModule } from '@angular/forms';
import { MENU_ADMIN_NATIONAL, MENU_ADMIN_SECTORIEL, MENU_DECISIONNEL } from '../admin-menu';
import { DashService } from '../../../core/services/dash.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    FormsModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
    animations: [
    trigger('slideDown', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        overflow: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class LayoutComponent {
  menuOpen = true;
  user:any
  role:any
  loading:any
 isMobile: boolean = false;
   menu:any[]=[]
  data:any[]=[]


  constructor(
    private modalService: NgbModal,
    private authService:AuthService,
    private dashService:DashService,
    private router: Router,
    private toastr:ToastrService,
    private lsService:LocalStorageService
  ) { }

  ngOnInit(): void {
  
    this.user=this.lsService.get(GlobalName.userName)
    console.log( this.user)
    this.role=this.user.roles[0].name
    this.getUserMenu()

}

 @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }
    checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }


toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

    openAddModal(content:any) {
    this.loading=false
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" })
  }

  logout(){
    this.authService.logout().subscribe((res:any)=>{
      this.lsService.remove(GlobalName.tokenName)
      this.lsService.remove(GlobalName.refreshTokenName)
      this.lsService.remove(GlobalName.expireIn)
      this.lsService.remove(GlobalName.userName)
      this.lsService.remove(GlobalName.exercice)
      this.router.navigate(['/login'])
      this.toastr.success('Déconnexion réussie', 'Connexion');
    }),
    (err:any)=>{
      console.log(err)
      this.toastr.success('Déconnexion échouée', 'Connexion');

    } ;
  }

     saveUsager(value:any) {
 
      this.authService.update(value).subscribe((res: any) => {
        this.modalService.dismissAll()
        AppSweetAlert.simpleAlert('succes',"Mise à jour", "Profile mis à jour avec succès");
      })
      
      /*if (value.password != value.confirm) {
        AppSweetAlert.simpleAlert("Erreur", "Mot de passe non identique", 'error');
      } else {
       
      }*/
  
    }


      getUserMenu(){
   
    switch (this.role) {
      case "Admin national":
            this.menu=MENU_ADMIN_NATIONAL;
        break;
        case "Admin Sectoriel":
          
            this.menu=MENU_ADMIN_SECTORIEL;
        break;
        case "Decisionnel":
          this.menu=MENU_DECISIONNEL;
      break;
  
      default:

      
      this.menu.push( {
        title: 'Menu',
        icon: 'home-outline',
        link: '/admin/dashboard',
        home: true,
        isTitle:true,
        hasChildren:false,
  
      })
      this.menu.push(  {
        title: 'Tableau de bord ',
        icon: 'home-outline',
        link: '/admin/dashboard',
        home: true,
        isTitle:false,
        hasChildren:false,
  
      })
      this.menu.push(  {
        title: 'Mes e-Services',
        icon: 'home-outline',
        link: '/admin/dashboard',
        home: false,
        isTitle:true,
        hasChildren:false,
      })
    
       
        let prestations = this.user?.user_prestations;
    
          prestations.forEach((element:any) => {
            let newCount;
            let children:any[]=[]

            if (this.user.is_trade) {
              if (!element?.prestation?.is_automatic_delivered) {
            if (
              element?.prestation?.start_point2?.id == this.user.agent.unite_admin.id 
              || 
              element?.prestation?.start_points.findIndex((el:any)=>el.unite_admin_id == this.user.agent.unite_admin.id)!=-1) {
              newCount=this.data.find((el:any) =>el.slug==element.prestation.slug)?.new

              if (element?.prestation?.from_pns){
                children.push( {
                        title: 'Demandes en attente',
                        link: '/admin/eservice/espace-traitement/'+element?.prestation?.slug,
                        
                      })
              }else{
                children.push( {
                  title: 'Demandes en attente',
                  link: '/admin/eservice/espace-traitement/'+element?.prestation?.slug+'/'+element?.prestation?.code,
                  
                })
              }

         
         
           }

             if (element?.prestation?.signer2?.id == this.user.agent.unite_admin.id) {

              if (element?.prestation?.from_pns){

                children.push( {
             
                  title: 'Demandes à signer',
                  link: '/admin/eservice/espace-signature/'+element?.prestation?.slug,
                })
                children.push( {
                
                  title: 'Demandes signées',
                  link: '/admin/eservice/espace-signed/'+element?.prestation?.slug,
                })
                children.push( {
                
                  title: 'Demandes à rejeter',
                  link: '/admin/eservice/espace-reject/'+element?.prestation?.slug,
                })
                children.push( {
                
                  title: 'Demandes rejetées',
                  link: '/admin/eservice/espace-rejected/'+element?.prestation?.slug,
                })
              }else{
                children.push( {
             
                  title: 'Demandes à signer',
                  link: '/admin/eservice/espace-signature/'+element?.prestation?.slug+'/'+element?.prestation?.code,
                })
                children.push( {
                
                  title: 'Demandes signées',
                  link: '/admin/eservice/espace-signed/'+element?.prestation?.slug+'/'+element?.prestation?.code,
                })
                children.push( {
                
                  title: 'Demandes à rejeter',
                  link: '/admin/eservice/espace-reject/'+element?.prestation?.slug+'/'+element?.prestation?.code,
                })
                children.push( {
                
                  title: 'Demandes rejetées',
                  link: '/admin/eservice/espace-rejected/'+element?.prestation?.slug+'/'+element?.prestation?.code,
                })
              }
            
           }

           if (element?.prestation?.from_pns){
            if (this.role=="Chef Division" || this.role=="Collaborateur"  ) {
              children.push( {
                title: 'Demande à traiter',
                link: '/admin/eservice/espace-traitement/'+element?.prestation?.slug,
              })
            }
           }else{
            if (this.role=="Chef Division" || this.role=="Collaborateur"  ) {
              children.push( {
                title: 'Demande à traiter',
                link: '/admin/eservice/espace-traitement/'+element?.prestation?.slug+'/'+element?.prestation?.code,
              })
            }
           }
           
           if (element?.prestation?.signer2?.id != this.user.agent.unite_admin.id) {

            if (element?.prestation?.from_pns) {

               children.push( {
             title: 'Demande à valider',
             link: '/admin/eservice/espace-validation/'+element?.prestation?.slug,
           })
           children.push( {
             title: 'Demandes mise en attente',
             link: '/admin/eservice/correction/'+element?.prestation?.slug,
           })
           children.push( {
             title: 'Demandes corrigées',
             link: '/admin/eservice/espace-traitement-retour-correction/'+element?.prestation?.slug,
           })
           children.push( {
             title: 'Demandes finalisées',
             link: '/admin/eservice/finished/'+element?.prestation?.slug,
           })
            }else{
              

              children.push( {
                title: 'Demande à valider',
                link: '/admin/eservice/espace-validation/'+element?.prestation?.slug+'/'+element?.prestation?.code,
              })
              children.push( {
                title: 'Demandes mise en attente',
                link: '/admin/eservice/correction/'+element?.prestation?.slug+'/'+element?.prestation?.code,
              })
              children.push( {
                title: 'Demandes corrigées',
                link: '/admin/eservice/espace-traitement-retour-correction/'+element?.prestation?.slug+'/'+element?.prestation?.code,
              })
              children.push( {
                title: 'Demandes finalisées',
                link: '/admin/eservice/finished/'+element?.prestation?.slug+'/'+element?.prestation?.code,
              })
            }
          
         }


        if (element?.prestation?.from_pns) {
          if ( element?.prestation?.need_meeting) {
            children.push(
            {
              title: 'Rendez-vous',
              link: '/admin/agenda/'+element?.prestation?.slug,
            }
            )
          }
          if ( element?.prestation?.need_validation) {
            children.push(
            {
              title: 'Demande validée pour visa',
              link: '/admin/eservice/espace-validation-visa/'+element?.prestation?.slug,
            }
            )
          }

          children.push( {
            title: 'Parcours demandes',
            link: '/admin/eservice/historique/'+element?.prestation?.slug,
          })
         } else {
          if ( element?.prestation?.need_meeting) {
            children.push(
            {
              title: 'Rendez-vous',
              link: '/admin/agenda/'+element?.prestation?.slug+'/'+element?.prestation?.code,
            }
            )
          }
          if ( element?.prestation?.need_validation) {
            children.push(
            {
              title: 'Demande validée pour visa',
              link: '/admin/eservice/espace-validation-visa/'+element?.prestation?.slug+'/'+element?.prestation?.code,
            }
            )
          }

          children.push( {
            title: 'Parcours demandes',
            link: '/admin/eservice/historique/'+element?.prestation?.slug+'/'+element?.prestation?.code,
          })
         }

             





              }else{
                if (element?.prestation?.from_pns) {
               children.push( {
                  title: 'Demandes finalisées',
                  link: '/admin/eservice/finished/'+element?.prestation?.slug,
                })
                children.push( {
                  title: 'Parcours demandes',
                  link: '/admin/eservice/historique/'+element?.prestation?.slug,
                })
                }else{
                children.push( {
                  title: 'Demandes finalisées',
                  link: '/admin/eservice/finished/'+element?.prestation?.slug+'/'+element?.prestation?.code,
                })
                children.push( {
                  title: 'Parcours demandes',
                  link: '/admin/eservice/historique/'+element?.prestation?.slug+'/'+element?.prestation?.code,
                })
                }
              

             
              }

         

            }else{
              if (element?.prestation?.from_pns) {
                children.push( {
                  title: 'Demandes à confirmer',
                  link: '/admin/eservice/espace-traitement/'+element?.prestation?.slug,
                })
              }else{
                children.push( {
                  title: 'Demandes à confirmer',
                  link: '/admin/eservice/espace-traitement/'+element?.prestation?.slug+'/'+element?.prestation?.code,
                })
              }
           
            }


          
          

          
          /*  else{
              let isCol= this.user.agent.unite_admin.id==element?.prestation?.start_point2?.ua_parent_code?true:false
            children.push( {
              
              title: element?.prestation?.signer2?.id == this.user.agent.unite_admin.id?'Demande à signer':!isCol?'Demande à traiter':'Demandes à valider',
              link: '/admin/eservice/espace-validation/'+element?.prestation?.slug,
            })
            }*/

        
          
       
           
           /* children.push( {
              title: 'Statistiques e-services',
              link: '/admin/eservice/statistiques/'+element?.prestation?.slug,
            })*/
          
          
           

            this.menu.push({
              title:element.prestation.name,
              icon:"",
              isTitle:false,
            hasChildren:true, 
            collapse:false,
            slug:element.prestation.slug,
            children:children,
            newCount:newCount 
            })

         
          });

          if (this.user.is_trade) {
            this.menu.push(
            {
              title: 'Statistiques Globales',
              isTitle:false,
              hasChildren:false, collapse:false,
              slug:'',
              link: '/admin/eservice/statistiques',
            }
          );
          }

          this.menu.push( {
            title: 'Support',
            icon: 'home-phone',
            link: '/admin/supports',
            isTitle:false,
            hasChildren:false,
      
          })

         
        
          this.dashService.statsForMenu().subscribe((res:any)=>{
            this.data=res.data.stats
          
          })
        break;
    }
  }

  getSlug(link:any){
    
    var splitted=link.split('/')
    
    return splitted[splitted.length-1]
  }
  verifyMenu(name:any){
    
    var check=this.user.user_prestations.find((e:any) => e.prestation.slug==name)
    
    return check==undefined || check==null ?false:true
  }

  toggle(slug:any){
    var check=this.menu.find((e:any) => e.slug == slug)
    if(check){
      check.collapse = !check.collapse
    }
  }


   toggleSubmenu(index: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Fermer tous les autres sous-menus
    this.menu.forEach((item, i) => {
      if (i !== index && item.children) {
        item.expanded = false;
      }
    });
    
    // Basculer le sous-menu actuel
    if (this.menu[index].children) {
      this.menu[index].expanded = !this.menu[index].expanded;
    }
  }

  isMenuActive(menuItem: any): boolean {
    if (!menuItem.children) return false;
    
    return menuItem.children.some((subItem:any) => 
      this.router.url.includes(subItem.link || '')
    );
  }

}
