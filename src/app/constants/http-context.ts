import { HttpContextToken } from '@angular/common/http';

export const BYPASS_SPINNER_HTTP_CONTEXT = new HttpContextToken(() => true);
