import { Component, inject, input, output } from '@angular/core';
import { CommentService } from '../../../core/services/commentsService/comment-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './add-comment.html',
  styleUrl: './add-comment.css',
})
export class AddComment {
onCommentCreated=output<string>();
closeMe=output<boolean>();
private fb=inject(FormBuilder);
form=this.fb.group({
  body:['',[Validators.required]]});

submitComment(){
  const body=this.form.controls.body.value;
  if(!body) return;
  this.onCommentCreated.emit(body);
  this.form.reset();
}
 


}
