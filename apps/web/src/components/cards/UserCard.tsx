import { Divider } from '@mantine/core';
import { useWorkspaces } from '../../hooks/useWorkspaces';
import { User } from '../../types/primitives/User';
import moment from 'moment';

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const { ws } = useWorkspaces();
  if (!ws) return null;

  return (
    <div className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-zinc-700/80 bg-zinc-800/70 text-center transition hover:bg-zinc-800">
      <div className="flex h-full w-full flex-col">
        <div className="flex h-full flex-col items-center justify-center p-2 text-center">
          <div className="line-clamp-1 font-semibold tracking-wide">
            {user.display_name}
          </div>
          <div className="line-clamp-1 font-semibold text-zinc-400/70">
            {user?.email || 'Chưa có email'}
          </div>
        </div>
      </div>

      <Divider variant="dashed" className="w-full border-zinc-700" />
      <div className="m-2 mb-0 h-full w-full px-2">
        <div className="flex h-full items-center justify-center rounded border border-purple-300/20 bg-purple-300/10 p-2 font-semibold text-purple-300">
          {(user?.handle && `@${user?.handle}`) || 'Chưa có tên đăng nhập'}
        </div>
      </div>
      <div className="m-2 h-full w-full px-2">
        <div className="flex h-full items-center justify-center rounded border border-green-300/20 bg-green-300/10 p-2 font-semibold text-green-300">
          Created at {moment(user?.created_at).format('HH:mm, DD/MM/YYYY')}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
