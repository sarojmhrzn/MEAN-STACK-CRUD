import { Routes } from '@angular/router';

// Components
import { AnalysisComponent } from './analysis/analysis.component';
import { MonitorComponent } from './monitor/monitor.component';
import { ListDataComponent } from './data/list-data/list-data.component';

// Routing paths
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'data'},
  { path: 'data', component: ListDataComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'monitor', component: MonitorComponent }
];
