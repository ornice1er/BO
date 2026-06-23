import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class RequeteService {

  url = ConfigService.toApiUrl('requetes');

  constructor(private http: HttpClient) { }

  // ─────────────────────────────────────────────────────────────────────────
  // LECTURE
  // ─────────────────────────────────────────────────────────────────────────

  getAll(): any {
    return this.http.get<any>(this.url);
  }

  /** Détail complet d'une demande par code */
  getOne(code: any, slug?: any): any {
    return this.http.get<any>(`${this.url}/one/${code}`);
  }

  /** Ancien alias — conservé pour rétrocompatibilité */
  get(code: any, slug: any, prestation_code?: any): any {
    return this.http.get<any>(`${this.url}/one/${code}`);
  }

  /** Banette de l'agent connecté selon son rôle */
  getBanette(prestationCode: string, nature: string='auto', status: string='all'): any {
    return this.http.get<any>(`${this.url}/banette/${prestationCode}?nature=${nature}&status=${status}`);
  }

  /** Suivi public par le requérant */
  getSuivi(code: string): any {
    return this.http.get<any>(`${this.url}/suivi/${code}`);
  }

  /** Toutes les demandes d'une prestation (admin) */
  getByPrestationAll(code: any): any {
    return this.http.get<any>(`${this.url}/byPrestation/${code}/all`);
  }

  /** Vérifier si l'agent connecté peut agir sur une demande */
  peutAgir(id: any): any {
    return this.http.get<any>(`${this.url}/${id}/peut-agir`);
  }

  /** Vérifier la complétude du dossier */
  verifierCompletude(id: any): any {
    return this.http.get<any>(`${this.url}/${id}/completude`);
  }

  /** Étapes précédentes disponibles pour régression (admin) */
  getEtapesPrecedentes(id: any): any {
    return this.http.get<any>(`${this.url}/${id}/etapes-precedentes`);
  }

  /** Régresser vers une étape précédente (admin) */
  regresser(id: any, etapeId: number, comment: string): any {
    return this.http.post<any>(`${this.url}/${id}/regresser`, { etape_id: etapeId, comment });
  }




  /**
   * Transitions disponibles depuis l'étape courante d'une demande.
   * Remplace workflowService.getAll() qui utilisait eps?.etape?.id
   */
getTransitionsDisponibles(prestationId: any, etapeId: any): any {
  return this.http.get<any>(
    `${ConfigService.toApiUrl('workflows')}-transitions?prestation_id=${prestationId}&etape_from_id=${etapeId}`
  );
}

  /** Charger les motifs de rejet pour une prestation + étape */
  getMotifsRejet(prestationId: any, etapeId: any): any {
    return this.http.get<any>(
      `${ConfigService.toApiUrl('motifs-rejet')}?prestation_id=${prestationId}&etape_id=${etapeId}`
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ACTIONS WORKFLOW
  // ─────────────────────────────────────────────────────────────────────────

  /** Prise en charge par l'agent */
  prendreEnCharge(id: any): any {
    return this.http.post<any>(`${this.url}/${id}/prendre-en-charge`, {});
  }

     associateToProject(id: any,project_id:any): any {
    return this.http.post<any>(`${ConfigService.toApiUrl('requete-associate-to-project')}/${id}`, { project_id: project_id });
  }



  /**
   * Traiter une demande : valider, rejeter, signer, parapher, prévalider, clôturer
   *
   * @param id      ID de la requête
   * @param payload { decision, comment, motif_id, metadata }
   */
  traiter(id: any, payload: {
    decision: string;
    comment?: string | null;
    motif_id?: number | null;
    metadata?: any;
    link?: string | null;
    note_file_path?: string | null;
    transition_id?: number | null;
  }): any {
    return this.http.post<any>(`${this.url}/${id}/traiter`, payload);
  }

  uploadNoteFile(id: any, file: File): any {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<any>(`${this.url}/${id}/upload-note-file`, form);
  }

  getNoteFileUrl(path: string): any {
    return this.http.get<any>(`${this.url}/note-file-url?path=${encodeURIComponent(path)}`);
  }

  downloadFile(path: string, name: string) {
    const params = `path=${encodeURIComponent(path)}&name=${encodeURIComponent(name)}`;
    return this.http.get(`${this.url}/download-file?${params}`, {
      responseType: 'blob',
      headers: { 'Accept': 'application/octet-stream' },
    });
  }

  /**
   * Action sur le circuit documentaire (paraphe, signature, prévalidation)
   *
   * @param acteId  ID du document_acte
   * @param payload { action, comment, file_path, metadata }
   */
  traiterDocument(acteId: any, payload: {
    action: string;
    comment?: string | null;
    file_path?: string | null;
    metadata?: any;
  }): any {
    return this.http.post<any>(`${this.url}/documents/${acteId}/traiter`, payload);
  }

  /**
   * Correction d'une demande rejetée par le requérant
   *
   * @param id      ID de la requête
   * @param payload { step_contents, step_data }
   */
  corriger(id: any, payload: any): any {
    return this.http.post<any>(`${this.url}/${id}/corriger`, payload);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CRUD STANDARD
  // ─────────────────────────────────────────────────────────────────────────

  store(ressource: any): any {
    return this.http.post<any>(this.url, ressource);
  }

  update(id: number, ressource: any): any {
    return this.http.patch<any>(`${this.url}/${id}`, ressource);
  }

  delete(id: number): any {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  show(id: any): any {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  state(id: number): any {
    return this.http.get<any>(`${this.url}/${id}/status`);
  }

  setStatus(id: any, status: any): any {
    return this.http.get<any>(`${this.url}/${id}/state/${status}`);
  }

  search(resource: any): any {
    return this.http.post<any>(`${this.url}-search`, resource);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MÉTHODES CONSERVÉES POUR RÉTROCOMPATIBILITÉ
  // ─────────────────────────────────────────────────────────────────────────

  getForAgenda(code: any): any {
    return this.http.get<any>(`${this.url}/byPrestation/${code}/agenda`);
  }

  relance(id: any): any {
    return this.http.get<any>(`${this.url}/relance/${id}`);
  }

  confirm(ressource: any, slug: any, code?: any): any {
    return this.http.post<any>(`${this.url}/confirm/byPrestation/${slug}?code=${code}`, ressource);
  }

  getForTreatment(id: any, slug: any, code?: any): any {
    return this.http.get<any>(`${this.url}/treatment/${id}/${slug}?code=${code}`);
  }

  geeratePDF(id: number, ressource: any, slug: string, code?: any): any {
    return this.http.post<any>(`${this.url}/generate/${id}/${slug}?code=${code}`, ressource);
  }

  verifyFile(code: any, npi: any, index: any): any {
    return this.http.get<any>(`${ConfigService.toApiUrl('requete-verify')}/${code}/${npi}/${index}`);
  }

  requestProof(resource: any): any {
    return this.http.post<any>(`${ConfigService.toApiUrl('requete-file-proof-send')}`, resource);
  }

  addContratFile(resource: any): any {
    return this.http.post<any>(`${ConfigService.toApiUrl('requete-add-contract-file')}`, resource);
  }

  concat(ressource: any): any {
    return this.http.post<any>(`${this.url}/concat`, ressource);
  }
}