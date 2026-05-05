import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { DashService } from '../../../../core/services/dash.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any;
  role: any;
  user_prestations: any[] = [];
  data: any;
  loading = false;
  currentPrestation: any;

  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { usePointStyle: true, padding: 20, font: { size: 12 } }
      },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { grid: { display: false }, border: { display: false } },
      y: { grid: { color: '#f0f2f5' }, border: { display: false }, beginAtZero: true }
    },
    elements: {
      line: { tension: 0.4, borderWidth: 2 },
      point: { radius: 4, hoverRadius: 7 }
    }
  };

  get isAdmin(): boolean {
    return this.role === 'Admin Sectoriel' || this.role === 'Admin national';
  }

  get isDirecteur(): boolean {
    return this.role === 'Directeur';
  }

  get userName(): string {
    const a = this.user?.agent;
    if (a?.lastname || a?.firstname) {
      return `${a?.lastname ?? ''} ${a?.firstname ?? ''}`.trim();
    }
    return this.user?.email ?? 'Administrateur';
  }

  get today(): Date {
    return new Date();
  }

  constructor(
    private locService: LocalStorageService,
    private dashService: DashService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.locService.get(GlobalName.userName);
    this.role = this.user.roles[0].name;
    this.user_prestations = this.user.user_prestations ?? [];

    if (this.isAdmin) {
      this._loadAdmin();
    } else if (this.user_prestations.length > 0) {
      this.currentPrestation = this.user_prestations[0].prestation;
      this._loadPrestation(
        this.user_prestations[0].prestation.code,
        this.user_prestations[0].prestation.name
      );
    }
  }

  private _loadAdmin(): void {
    this.loading = true;
    this.dashService.get('admin').subscribe({
      next: (res: any) => {
        this.data = res.data.stats;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  private _loadPrestation(code: string, name: string): void {
    this.loading = true;
    this.dashService.get(code).subscribe({
      next: (res: any) => {
        this.data = res.data.stats;
        this.chartData = [{
          label: name,
          data: res.data.stats_by_month,
          borderColor: '#0A3764',
          backgroundColor: 'rgba(10,55,100,0.08)',
          fill: true,
          pointBackgroundColor: '#0A3764',
          pointHitRadius: 15,
          pointHoverRadius: 7,
        }];
        this.chartLabels = res.data.months;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getNewStat(event: any): void {
    const code = event.target.value;
    const found = this.user_prestations.find((el: any) => el.prestation.code === code);
    if (!found) return;
    this.currentPrestation = found.prestation;
    this._loadPrestation(code, found.prestation.name);
  }

  get treatmentRate(): number {
    if (!this.data?.total || this.data.total === 0) return 0;
    const done = (this.data.finished ?? 0) + (this.data.signed ?? 0);
    return Math.round((done / this.data.total) * 100);
  }

  navigate(route: string): void {
    const slug = this.currentPrestation?.code;
    const routes: Record<string, string> = {
      // Agent / Directeur
      total:     `/admin/eservice/espace-traitement/${slug}`,
      news:      `/admin/eservice/espace-traitement/${slug}`,
      treated:   `/admin/eservice/espace-traitement/${slug}`,
      pending:   `/admin/eservice/espace-traitement/${slug}`,
      rejected:  `/admin/eservice/espace-reject/${slug}`,
      validated: `/admin/eservice/espace-validation/${slug}`,
      signed:    `/admin/eservice/espace-signed/${slug}`,
      finished:  `/admin/eservice/finished/${slug}`,
      leaved:    `/admin/eservice/espace-rejected/${slug}`,
      // Admin
      users:        '/admin/users',
      prestations:  '/admin/prestations',
      ua:           '/admin/unity-admins',
      departments:  '/admin/departments',
      agents:       '/admin/officers',
      stats:        '/admin/eservice/statistiques',
    };
    const path = routes[route];
    if (path) this.router.navigate([path]);
  }
}
