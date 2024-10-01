import { DashboardWrapper } from '../../../components/dashboard/DashboardWrapper';
import { CommentModeration } from '@/components/CommentModeration';

export default function CommentModerationPage() {
  return (
    <DashboardWrapper>
      <h1 className="text-2xl font-bold mb-4">Modération des commentaires</h1>
      <CommentModeration />
    </DashboardWrapper>
  );
}