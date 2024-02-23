/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-02-23 14:01:28
 */
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigation = useNavigate();
  return (
    <div>
      user
      <button onClick={() => navigation('/manage')}>manage</button>
    </div>
  );
};

export default User;
