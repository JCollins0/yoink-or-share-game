import { environment } from 'src/environments/environment';

export class BaseService {
  url_prefix: string;
  constructor() {
    if (environment.production) {
      this.url_prefix = '';
    } else {
      this.url_prefix = 'http://localhost:8080';
    }
  }
}
