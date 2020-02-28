import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechToTextComponent } from './component/speech-to-text/speech-to-text.component';
import { TextToSpeechComponent } from './component/text-to-speech/text-to-speech.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechToTextComponent,
    TextToSpeechComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
