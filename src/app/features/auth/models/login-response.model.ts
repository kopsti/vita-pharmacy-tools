import {CommonResponse} from '@utils/models/common-response.model';

export class LoginResponse extends CommonResponse<any> {

  username: string;
  role: string;

}
