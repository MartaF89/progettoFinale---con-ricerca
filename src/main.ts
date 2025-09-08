import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import it from '@angular/common/locales/it';
registerLocaleData(it);
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { registerLocaleData } from '@angular/common';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
