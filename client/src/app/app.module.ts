// Angular core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { DataComponent } from './data/data.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { MonitorComponent } from './monitor/monitor.component';

// Routes
import { appRoutes } from './app-routing.module';
import { ListDataComponent } from './data/list-data/list-data.component';
import { DataDetailComponent } from './data/data-detail/data-detail.component';
import { FilterDataComponent } from './data/filter-data/filter-data.component';

// filter
import { UserIdFilterPipe } from './shared/filter/userIdFilterPipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DataComponent,
    AnalysisComponent,
    MonitorComponent,
    ListDataComponent,
    DataDetailComponent,
    FilterDataComponent,
    UserIdFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
