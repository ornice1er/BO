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