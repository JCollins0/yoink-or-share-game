import { AdminState } from '../admin/store/reducers';
import { ApplicationState } from '../application/store/reducers';
import { SharedState } from '../shared/store/reducers';

export interface RootState {
  shared: SharedState;
  admin?: AdminState;
  application: ApplicationState;
}
