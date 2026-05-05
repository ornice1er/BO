import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../../../core/services/project.service';
import { LocalStorageService } from '../../../../../core/utils/local-stoarge-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../components/loading/loading.component';

@Component({
    selector: 'app-project-detail',
    imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule],
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  search_text: any = '';
  loading2 = false;
  id: any;
  data: any;
  requetes: any[] = [];
  statuses: any[] = [];
  selectedStatus: string = '';

  pg = { pageSize: 10, p: 1, total: 0 };

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private locService: LocalStorageService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.get();
  }

  get filteredRequetes(): any[] {
    if (!this.selectedStatus) return this.requetes;
    return this.requetes.filter(r => r?.current_status?.short_name === this.selectedStatus);
  }

  get() {
    this.loading2 = true;
    this.projectService.show(this.id).subscribe(
      (res: any) => {
        this.data = res.data;
        this.requetes = this.data?.requetes ?? [];
        this.statuses = [...new Map(
          this.requetes
            .filter(r => r?.current_status)
            .map(r => [r.current_status.short_name, r.current_status])
        ).values()];
        this.loading2 = false;
      },
      () => { this.loading2 = false; }
    );
  }

  onStatusChange(): void {
    this.pg.p = 1;
  }

  getPage(event: any): void {
    this.pg.p = event;
  }

  exportList(): void {
    this.loading2 = true;
    const ids = this.filteredRequetes.map((req: any) => req.id);
    this.projectService.exportList(this.id, { ids }).subscribe(
      (res: any) => {
        window.open(res.data, '_blank');
        this.loading2 = false;
      },
      () => { this.loading2 = false; }
    );
  }
}
