import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpBackend, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
function loggingInterceptors(request: HttpRequest<unknown>, next:HttpHandlerFn) {
    const req = request.clone(
        {
            headers: request.headers.set('X-DEBUG:', 'Testing')
        }
    )
    console.log('[outgoing request]')
    console.log(request);
    return next(request);
}

bootstrapApplication(AppComponent, {providers: [provideHttpClient(withInterceptors([loggingInterceptors
]))]}
).catch((err) => console.error(err));
