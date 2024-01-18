import { Routes } from '@angular/router';
import { InputComponent } from './pages/input/input.component';
import { FormComponent } from './pages/form/form.component';
import { StatsComponent } from './pages/stats/stats.component';
import { OutputComponent } from './pages/output/output.component';
import { ResponsesComponent } from './pages/responses/responses.component';

export const routes: Routes = [
    { path: '', component: InputComponent, },
    { path: 'input', component: InputComponent, },
    { path: 'stats', component: StatsComponent, },
    { path: 'output', component: OutputComponent, },
    { path: 'responses', component: ResponsesComponent, },
    { path: 'form', component: FormComponent, },
    { path: '**', redirectTo: '', pathMatch: 'full', },
];
