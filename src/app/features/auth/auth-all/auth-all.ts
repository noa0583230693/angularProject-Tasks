import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-all',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './auth-all.html',
  styleUrl: './auth-all.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthAll {}
