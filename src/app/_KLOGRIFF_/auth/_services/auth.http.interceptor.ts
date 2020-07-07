import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
	private excludedUrls:RegExp[] = [
		new RegExp('assets')
	];
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!this.isExcluded(req)) {
			
		}
		
		return next.handle(req);
	}
	
	private isExcluded(req: HttpRequest<any>):boolean {
		for (let i = 0, len = this.excludedUrls.length; i < len; i++) {
			if (this.excludedUrls[i].test(req.url)) {
				return true;
			}
		}
		return false;
	}
}