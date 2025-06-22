import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DepartmentService } from 'src/app/core/_services/department.service';

import { MyToastr } from '../../../app.toastr';
import { EntityService } from '../../../core/_services/entity.service';
import { LocalService } from '../../../core/_services/storage_services/local.service';
import { UnityAdminService } from '../../../core/_services/unity_admin.service';
import { UnityAdminTypeService } from '../../../core/_services/unity_admin_type.service';
import { globalName } from '../../../core/_utils/utils';

@Component({
  selector: 'ngx-unity-admin',
  templateUrl: './unity-admin.component.html',
  styleUrls: ['./unity-admin.component.css']
})
export class UnityAdminComponent implements OnInit {
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
  data:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  departments:any[]=[]
  loading=false
  loading2=false
  user:any
  error:any=""
  ua_department=false

permissions=[]
      constructor(
        private unityAdminService:UnityAdminService,
        private unityAdminTypeService:UnityAdminTypeService,
        private entityService:EntityService,  
        private locService:LocalService,
        private departmentService:DepartmentService,        
        config: NgbModalConfig, 
        private modalService: NgbModal

        ){
          config.backdrop = 'static';
          config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.all();
      this.getEntities()
      this.getTypeUnityAdmin()
      this.user=this.locService.getItem(globalName.user);
      this.permissions=this.user.roles[0].permissions;
      this.getDepartments();
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
      this.unityAdminService.getAll().subscribe((res:any)=>{
        this.data=res
        this.loading2=false;
        this.rerender()
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }
    getDepartments() {
      this.loading2=true;
      this.departmentService.getAll().subscribe((res:any)=>{
        this.departments=res
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    getTypeUnityAdmin(){
      this.unityAdminTypeService.getAll().subscribe((res:any)=>{
        this.data2=res
      },
      (error:any)=>{
        
      })
    }

    getEntities(){
      this.entityService.getAll().subscribe((res:any)=>{
        this.data3=res
      },
      (error:any)=>{
        
      })
    }
  
    checked(el:any){
      this.selected_data=el

      if(this.selected_data.department_id != null)this.ua_department=true
    }
  
    
    open(content:any) {
    this.modalService.open(content)
        
    }
  
    store(value:any) {
      this.loading=true;

      delete value.ua_department
        this.unityAdminService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
              this.modalService.dismissAll()
            this.all();
            //MyToastr.make('success',"Gestion des unités administratives ","Modification effectuée avec succès",this.toastrService)

        },
        (err:any)=>{
            this.loading=false;
        })
  }
  update(value:any) {
    this.loading=true;
    delete value.ua_department

      this.unityAdminService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
            this.modalService.dismissAll()
          this.all();
          //MyToastr.make('success',"Gestion des unités administratives ","Enregistrement effectuée avec succès",this.toastrService)

      },
      (err:any)=>{
          this.loading=false;
      })

}

delete() {
  this.loading=true;
  if(confirm('Voulez vous supprimer cet élément')){
    this.unityAdminService.delete(this.selected_data.id).subscribe(
      (res:any)=>{
      this.loading=false;
      this.all();
      //MyToastr.make('success',"Gestion des unités administratives","Suppression de type entité",this.toastrService)
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

  changed(event:any){
    //this.ua_department=!this.ua_department
  }
}
