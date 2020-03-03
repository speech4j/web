import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SttComponent } from './components/stt/stt.component';
import { TtsComponent } from './components/tts/tts.component';


const routes: Routes = [
  { path: 'stt', component: SttComponent },
  { path: 'tts', component: TtsComponent },
  { path: '', redirectTo: 'stt', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
