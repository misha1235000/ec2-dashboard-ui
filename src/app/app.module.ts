import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { Ec2InstanceComponent } from './dashboard/ec2-instance/ec2-instance.component';
import { SearchComponent } from './dashboard/search/search.component';
import { Ec2InstanceTableComponent } from './dashboard/ec2-instance-table/ec2-instance-table.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { NotFoundComponent } from './dashboard/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DashboardComponent,
    LoginComponent,
    Ec2InstanceComponent,
    SearchComponent,
    Ec2InstanceTableComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
  ],
  providers: [ HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
