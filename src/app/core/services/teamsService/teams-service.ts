import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {  Team } from '../../../models/team.model';
import { API_URL } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private teamsSubject=new BehaviorSubject<Team[]>([]);
  teams$=this.teamsSubject.asObservable();
  private readonly baseUrl = `${API_URL}/teams`;
  private http = inject(HttpClient);

  getTeams():Observable<Team[]>{
    return this.http.get<Team[]>(this.baseUrl).pipe(tap(teams=>{
      this.teamsSubject.next(teams);
    }));
  }
  createTeam(teamName: string): Observable<Team> {
    const teamData = { name: teamName };
    return this.http.post<Team>(this.baseUrl, teamData).pipe(tap(newTeam => {
      const currentTeams = this.teamsSubject.getValue();
      this.teamsSubject.next([...currentTeams, { ...newTeam, members_count: 1 }]);
    }));
  }
  addMemberToTeam(teamId: number, userId: number): Observable<any> {
    const url = `${this.baseUrl}/${teamId}/members`;
    const body = { userId };
    return this.http.post(url, body).pipe(tap(() => {
      
      // עדכן את מספר החברים בצוות
      const currentTeams = this.teamsSubject.getValue();
      const updatedTeams = currentTeams.map(team =>
        team.id === teamId
          ? { ...team, members_count: (team.members_count ?? 0) + 1 }
          : team
      );
      this.teamsSubject.next(updatedTeams);
    }));
  }
}
