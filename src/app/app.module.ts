import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



import { AppService } from './app.service';
import { OrderByPipe } from './customPipe';
import { appRoutes } from './router';

import { AppComponent } from './app.component';
import { AddCompundComponent } from './AddCompund/add-compund.component';
import { ClinicPKDataComponent } from './ClinicPKData/clinic-pkdata.component';
import { EmptyComponentComponent } from './Empty-component/empty-component.component';
import { EditCtdStudiesComponent } from './Edit-CompletedStudies/edit-ctd-studies.component';
import { EditstdStudiesComponent } from './Edit-StudiesOngoing/editstd-studies.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditNCAandPBKBComponent } from './Edit-ncaand-pbkb/edit-ncaand-pbkb.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCompundComponent,
    ClinicPKDataComponent,
    EmptyComponentComponent,
    EditCtdStudiesComponent,
    EditstdStudiesComponent,
    EditNCAandPBKBComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [AppService, OrderByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
