import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../../environments/environments';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Project, ProjectRequest } from '../../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http=inject(HttpClient);
  private readonly baseUrl=`${API_URL}/projects`;
  private projectsSubject=new BehaviorSubject<Project[]>([]);
  projects$=this.projectsSubject.asObservable();

  getProjects()
  {
    return this.http.get<Project[]>(this.baseUrl).pipe(tap(projects=>{
      this.projectsSubject.next(projects);
    }));
  }
  createProject(project:ProjectRequest):Observable<Project>
  {
    return this.http.post<Project>(this.baseUrl,project).pipe(tap(createdProject=>{
      this.projectsSubject.next([...this.projectsSubject.value,createdProject]);
    }));
  }
}