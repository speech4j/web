import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SttComponent } from './components/stt/stt.component';
import { TtsComponent } from './components/tts/tts.component';

@NgModule({
  declarations: [
    AppComponent,
    SttComponent,
    TtsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
