
import { Request } from 'express';
import { User } from '../../users/User';


 
interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;