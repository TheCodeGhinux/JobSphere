import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SanitizeUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // If data is an array, iterate through each item
        if (Array.isArray(data)) {
          return data.map(item => this.removePassword(item));
        }
        // If data is an object, just sanitize it
        return this.removePassword(data);
      })
    );
  }

  private removePassword(user: any): any {
    if (user && user.password) {
      const { password, ...sanitizedUser } = user;
      return sanitizedUser;
    }
    return user;
  }
}
