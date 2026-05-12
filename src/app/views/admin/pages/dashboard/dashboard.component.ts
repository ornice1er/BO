import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { DashService } from '../../../../core/services/dash.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { PermissionUtils } from '../../../../core/utils/permission-utils';

const CHART_COLORS = [
  '#0A3764', '#0d9488', '#ea580c',
  '#9333ea', '#1F883F', '#4f46e5',
  '#e11d48', '#f59e0b', '#06b6d4',
];

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

  // Admin — données par prestation
  prestationsData: { prestation: any; stats: any; rate: number; chartData: number[]; months: string[] }[] = [];
  loadingPrestations = false;

  readonly quickLinks = [
    { icon: 'bi-people-fill',       label: 'Utilisateurs',   route: '/admin/users',                 colorClass: 'blue'   },
    { icon: 'bi-person-badge-fill', label: 'Agents',         route: '/admin/officers',              colorClass: 'teal'   },
    { icon: 'bi-briefcase-fill',    label: 'Prestations',    route: '/admin/prestations',           colorClass: 'orange' },
    { icon: 'bi-building-fill',     label: 'Unités admin.',  route: '/admin/unity-admins',          colorClass: 'purple' },
    { icon: 'bi-graph-up-arrow',    label: 'Statistiques',   route: '/admin/eservice/statistiques', colorClass: 'indigo' },
    { icon: 'bi-shield-lock-fill',  label: 'Rôles',          route: '/admin/roles',                 colorClass: 'green'  },
  ];

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
    return PermissionUtils.isAdmin(this.user);
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

  get today(): Date { return new Date(); }

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
        if (this.user_prestations.length > 0) {
          this._loadAllPrestationsStats();
        }
      },
      error: () => { this.loading = false; }
    });
  }

  private _loadAllPrestationsStats(): void {
    this.loadingPrestations = true;
    const total = this.user_prestations.length;
    let completed = 0;
    const results: any[] = new Array(total);

    this.user_prestations.forEach((up: any, idx: number) => {
      this.dashService.get(up.prestation.code).subscribe({
        next: (res: any) => {
          const stats = res.data?.stats ?? {};
          const done = (stats?.finished ?? 0) + (stats?.signed ?? 0);
          const rate = stats?.total ? Math.round((done / stats.total) * 100) : 0;
          results[idx] = {
            prestation: up.prestation,
            stats,
            rate,
            chartData: res.data?.stats_by_month ?? [],
            months:    res.data?.months ?? [],
          };
          this._finalize(++completed, total, results);
        },
        error: () => this._finalize(++completed, total, results),
      });
    });
  }

  private _finalize(completed: number, total: number, results: any[]): void {
    if (completed < total) return;
    this.prestationsData = results.filter(Boolean);
    this._buildCombinedChart();
    this.loadingPrestations = false;
  }

  private _buildCombinedChart(): void {
    const base = this.prestationsData.find(p => p.months?.length > 0);
    if (!base) return;
    this.chartLabels = base.months;
    this.chartData = this.prestationsData
      .filter(p => p.chartData?.length > 0)
      .map((p, i) => ({
        label: p.prestation.name,
        data: p.chartData,
        borderColor: CHART_COLORS[i % CHART_COLORS.length],
        backgroundColor: CHART_COLORS[i % CHART_COLORS.length] + '18',
        fill: false,
        pointBackgroundColor: CHART_COLORS[i % CHART_COLORS.length],
        pointHitRadius: 15,
        pointHoverRadius: 7,
      }));
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

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  navigate(route: string): void {
    const slug = this.currentPrestation?.code;
    const routes: Record<string, string> = {
      total:     `/admin/eservice/espace-traitement/${slug}`,
      news:      `/admin/eservice/espace-traitement/${slug}`,
      treated:   `/admin/eservice/espace-traitement/${slug}`,
      pending:   `/admin/eservice/espace-traitement/${slug}`,
      rejected:  `/admin/eservice/espace-reject/${slug}`,
      validated: `/admin/eservice/espace-validation/${slug}`,
      signed:    `/admin/eservice/espace-signed/${slug}`,
      finished:  `/admin/eservice/finished/${slug}`,
      leaved:    `/admin/eservice/espace-rejected/${slug}`,
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
