import { HttpContextToken } from '@angular/common/http';

export const BYPASS_SPINNER_HTTP_CONTEXT = new HttpContextToken(() => false);
export const INJECT_USER_SECRET_TOKEN = new HttpContextToken(() => false);
