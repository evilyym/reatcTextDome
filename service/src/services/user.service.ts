/**
 * 用户服务类
 */
import db from '../../data-source';
import { User } from '../entities/user.entity';

export class UserService {
  userRepository;
  constructor() {
    this.userRepository = db.getRepository(User);
    console.log(this.userRepository);
  }
  // 查询全部用户
  async queryList() {
    console.log(111);
    return await this.userRepository.findAndCount();
  }
}
