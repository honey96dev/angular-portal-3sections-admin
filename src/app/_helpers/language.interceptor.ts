import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {TranslationService} from '@app/_services';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
    constructor(private translationService: TranslationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let language = this.translationService.getSelectedLanguage();
        if (language) {
            request = request.clone({
                setHeaders: {
                  language
                }
            });
        }

        return next.handle(request);
    }
}
