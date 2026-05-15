export interface Prestation {
  need_meeting: boolean;
  from_pns: boolean;
  slug: string;
  code: string;
  need_validation: boolean;
  content_type: number;
}

export interface UniteAdmin {
  libelle: string;
}

export interface Reponse {
  unite_admin: UniteAdmin;
  hasPermission: boolean;
  reason: string;
  observation: string;
  note?: string;
  preview_file?: string;
}

export interface FileItem {
  id: string;
  filename: string;
}

export interface ATN {
  name_structure: string;
  email_structure: string;
  phone_structure: string;
  address_structure: string;
  rccm: string;
  ifu: string;
  name_respo: string;
  quality_respo: string;
  phone_respo: string;
  files: FileItem[];
}

export interface Affectation {
  instruction: string;
  delay: string;
}

export interface SelectedData {
  code: string;
  status: number;
  filename?: string;
  atn: ATN;
  reponses: Reponse[];
  affectation?: Affectation;
}

// ── Workflow ─────────────────────────────────────────────────────────────────

export type EtapeType = 'depot' | 'traitement' | 'commission' | 'delivrance';

export type TransitionCondition =
  | 'auto' | 'validation' | 'rejet' | 'complement'
  | 'signature' | 'cloture' | 'paraphe' | 'prevalidation' | 'choix_sortie' | 'correction' | 'retour_correction';

export interface Etape {
  id: number;
  name: string;
  type: EtapeType;
  unite_admin_id: number | null;
  is_terminal: boolean;
  allow_partial_save: boolean;
  sla_days: number | null;
  produces_document: boolean;
  document_template_key: string | null;
}

export interface WorkflowStatus {
  id: number;
  name: string;
  short_name: string;
}

export interface WorkflowTransition {
  id: number;
  prestation_id: number;
  etape_from_id: number;
  etape_to_id: number | null;
  condition_type: TransitionCondition;
  status_result_id: number;
  notify_requérant: boolean;
  notify_agent: boolean;
  is_active: boolean;
  order: number;
  etape_to?: Etape;
  status_result?: WorkflowStatus;
}

export interface MotifRejet {
  id: number;
  code: string;
  libelle: string;
  description: string | null;
  allow_complement: boolean;
  is_final: boolean;
  prestation_id: number | null;
  etape_id: number | null;
}

export interface SlaInfo {
  sla_days: number;
  deadline: string;
  days_left: number;
  is_overdue: boolean;
}

export interface WorkflowState {
  requete: any;
  current_etape: Etape | null;
  current_status: WorkflowStatus | null;
  transitions: WorkflowTransition[];
  motifs_rejet: MotifRejet[];
  sla_info: SlaInfo | null;
}

export interface RequeteEtapeLog {
  id: number;
  requete_id: number;
  workflow_transition_id: number;
  etape_from_id: number;
  etape_to_id: number | null;
  status_id: number;
  triggered_by: number | null;
  triggered_by_type: string;
  comment: string | null;
  metadata: Record<string, any> | null;
  transitioned_at: string;
  etape_from?: Etape;
  etape_to?: Etape;
  status?: WorkflowStatus;
  triggered_by_user?: { id: number; name: string };
  transition?: WorkflowTransition;
}

export interface ApplyTransitionPayload {
  transition_id: number;
  comment?: string;
  motif_rejet_id?: number;
}

// ── Document Circuit ──────────────────────────────────────────────────────────

export type CircuitActionType = 'edition' | 'paraphe' | 'prevalidation' | 'signature' | 'correction';

export interface DocumentCircuitEtape {
  id: number;
  doc_produit_id: number;
  unite_admin_id: number | null;
  role_name: string;
  action_type: CircuitActionType;
  status_after: string;
  requete_status_after: string | null;
  is_blocking: boolean;
  order: number;
  doc_produit?: { id: number; name: string; slug: string };
  unite_admin?: { id: number; libelle: string };
}