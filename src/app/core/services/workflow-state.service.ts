import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplyTransitionPayload, RequeteEtapeLog, WorkflowState } from '../Models/interface.model';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowStateService {

  private base = ConfigService.toApiUrl('requete');

  constructor(private http: HttpClient) {}

  /**
   * Récupère l'étape courante, le statut, les transitions disponibles
   * et les motifs de rejet pour une requête donnée.
   */
  getWorkflowState(requeteId: number): Observable<{ data: WorkflowState }> {
    return this.http.get<{ data: WorkflowState }>(`${this.base}/${requeteId}/workflow-state`);
  }

  /**
   * Applique une transition workflow sur la requête :
   * met à jour l'étape courante, le statut et crée un log.
   */
  applyTransition(requeteId: number, payload: ApplyTransitionPayload): Observable<any> {
    return this.http.post<any>(`${this.base}/${requeteId}/apply-transition`, payload);
  }

  /**
   * Retourne l'historique complet des transitions d'une requête.
   */
  getEtapeLogs(requeteId: number): Observable<{ data: RequeteEtapeLog[] }> {
    return this.http.get<{ data: RequeteEtapeLog[] }>(`${this.base}/${requeteId}/etape-logs`);
  }
}
