import { Component, effect, inject, input, output, signal } from '@angular/core';
import { CommentService } from '../../../core/services/commentsService/comment-service';
import { CommentRequest } from '../../../models/comment.model';
import { AsyncPipe } from '@angular/common';
import { sign } from 'node:crypto';
import { AddComment } from '../add-comment/add-comment';

@Component({
  selector: 'app-list-comments',
  imports: [AsyncPipe,AddComment],
  templateUrl: './list-comments.html',
  styleUrl: './list-comments.css',
})
export class ListComments {
 closeMeComments=output<boolean>();
 showAddComment=signal<boolean>(false);
  private commentsService = inject(CommentService);

  comments$ = this.commentsService.comments$
  
  taskId=input<number>(0);
  constructor() {
    effect(() => {
      const id:number= this.taskId();
      if (!id) return;

      this.commentsService.getCommentsByTaskId(id).subscribe();
    });
}

toggleAddComment()
{
this.showAddComment.update(value=>!value);
}

onAddComment(body: string) {
    const id = this.taskId();
    if (!id) return;

    this.commentsService.addComment({taskId:id,body: body}).subscribe();
  }
}


