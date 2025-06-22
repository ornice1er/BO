import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
//import { Select2OptionData } from 'ng-select2';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Options } from 'select2';

import { MyToastr } from '../../../app.toastr';
import { EntityService } from '../../../core/_services/entity.service';
import { PrestationService } from '../../../core/_services/prestation.service';
import { LocalService } from '../../../core/_services/storage_services/local.service';
import { UnityAdminService } from '../../../core/_services/unity_admin.service';
import { globalName } from '../../../core/_utils/utils';

@Component({
  selector: 'ngx-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit {
  @ViewChild(DataTableDirective , {static: false})dtElement!: DataTableDirective;
  isDtInitialized:boolean = false
  dtOptions: DataTables.Settings = {
    language: {
      processing:     "Traitement en cours...",
      search:         "Rechercher&nbsp;:",
      lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
      info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      infoPostFix:    "",
      loadingRecords: "Chargement en cours...",
      zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
      emptyTable:     "Aucune donnée disponible dans le tableau",
      paginate: {
          first:      "Premier",
          previous:   "Pr&eacute;c&eacute;dent",
          next:       "Suivant",
          last:       "Dernier"
      },
      aria: {
          sortAscending:  ": activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
      }
  }
  };
  dtTrigger: Subject<any> = new Subject<any>();
  selected_data:any
  user:any
  roles:any
  data:any[]=[]
  permissions:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  data4:any[]=[]
  loading=false
  loading2=false
  error:any=""

  public exampleData:any[]=[];
  public options: any;
  public value: any[]=[];
  
      constructor(
        private unityAdminService:UnityAdminService,
        private prestationService:PrestationService,
        
        private locService:LocalService,
        
        private entityService:EntityService,
        config: NgbModalConfig, private modalService: NgbModal,
        private toastrService:ToastrService
        ){
          config.backdrop = 'static';
          config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.roles=this.locService.getItem(globalName.role);
      this.all();
      this.getUnityAdmins()
      this.getEntities()
      this.getUnityAdminsAll()
      this.user=this.locService.getItem(globalName.user);
      this.permissions=this.user.roles[0].permissions;

      this.options = {
        width: '500',
        multiple: true,
        tags: true
      };
    }
      
    rerender(){
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
     }
  
    all() {
      this.loading2=true;
      this.prestationService.getAll().subscribe((res:any)=>{
        this.data=res
        this.loading2=false;
        this.rerender()

      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    getUnityAdmins(){
      this.unityAdminService.getPrincipal().subscribe((res:any)=>{
        this.data2=res

       
      },
      (error:any)=>{
        
      })
    }
    getUnityAdminsAll(){
      this.unityAdminService.getAll().subscribe((res:any)=>{
        this.data4=res
        this.data4.forEach((el:any)=>{
          this.exampleData.push(  {
            id: el.id,
            text: el.libelle
          })
        });
      },
      (error:any)=>{
        
      })
    }
  
  
    checked(el:any){
      this.selected_data=el
    }
    getEntities(){
      this.entityService.getAll().subscribe((res:any)=>{
        this.data3=res
      },
      (error:any)=>{
        
      })
    }
    
    open(content:any) {
  
      this.modalService.open(
        content);
        
    }
  
    store(value:any) {
      this.loading=true;
        this.prestationService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
           this.modalService.dismissAll()
            this.all();
            this.toastrService.success("Enregistrement effectuée avec succès")

        },
        (err:any)=>{
            this.loading=false;
        })
  
  }

  update(value:any) {
    this.loading=true;
    console.log(value)
      this.prestationService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.modalService.dismissAll()
          this.all();
          this.toastrService.success("Modification effectuée avec succès")
  
      },
      (err:any)=>{
          this.loading=false;
      })
  
  }
  
  
  delete() {
      this.loading=true;
      if(confirm('Voulez vous supprimer cet élément')){
        this.prestationService.delete(this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.all();
          this.toastrService.success("Suppression effectuée avec succès")

      },
      (err:any)=>{
          this.loading=false;
      })
      }
  
  }
  
  hasPermission(permission:any){
    var check= this.permissions.find((e:any)=>e.name ==permission)
    if(check) return true;
    return false
  }

  getContentType(type:any){

    switch (type) {
      case 0:
          return "A éditer";
        break;
        case 1:
          return "A Charger";
        break;
        case 2:
          return "Pas de contenu";
        break;
    
      default:
          return "A éditer";
        break;
    }
  }

  addSP(value:any){
    this.loading=true
    this.prestationService.saveStartPoint(value).subscribe((res:any)=>{
      this.modalService.dismissAll()
      this.all()
      this.loading=false

    },
    (error:any)=>{
      this.loading=false

    })
  }
}
