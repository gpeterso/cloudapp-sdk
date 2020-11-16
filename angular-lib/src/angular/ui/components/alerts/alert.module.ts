/*
  Based on sample provided by https://jasonwatmore.com/post/2019/07/05/angular-8-alert-toaster-notifications
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AlertComponent],
  exports: [AlertComponent]
})
export class AlertModule { }