import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../../environments/environments';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Comment1, CommentRequest } from '../../../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http=inject(HttpClient);
  private  baseUrl=`${API_URL}/comments`;
  private commentsSubject=new BehaviorSubject<Comment1[]>([]);
  comments$=this.commentsSubject.asObservable();

  addComment(commentRequest: CommentRequest) {
    return this.http.post<Comment1>(this.baseUrl, commentRequest).pipe(tap(newComment => {
      const currentComments = this.commentsSubject.getValue();
      this.commentsSubject.next([...currentComments, { ...newComment }]);
    }));
  }
  getCommentsByTaskId(taskId: number): Observable<Comment1[]> {
    const url = `${this.baseUrl}?taskId=${taskId}`;
    return this.http.get<Comment1[]>(url).pipe(tap(comments => {
      this.commentsSubject.next(comments);
    }));
  }
}