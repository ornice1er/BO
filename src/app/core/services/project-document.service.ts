import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({ providedIn: 'root' })
export class ProjectDocumentService {

  constructor(private http: HttpClient) {}

  getTemplates() {
    return this.http.get<any>(ConfigService.toApiUrl('document-templates'));
  }

  getDocuments(projectId: any) {
    return this.http.get<any>(`${ConfigService.toApiUrl('projects')}/${projectId}/documents`);
  }

  init(projectId: any, templateId: any) {
    return this.http.get<any>(
      `${ConfigService.toApiUrl('projects')}/${projectId}/documents/init/${templateId}`
    );
  }

  save(docId: any, data: { title: string; html_content: string }) {
    return this.http.post<any>(
      `${ConfigService.toApiUrl('project-documents')}/${docId}/save`,
      data
    );
  }

  generate(docId: any) {
    return this.http.post<any>(
      `${ConfigService.toApiUrl('project-documents')}/${docId}/generate`,
      {}
    );
  }
}
