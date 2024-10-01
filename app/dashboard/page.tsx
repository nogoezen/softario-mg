import { DashboardWrapper } from '../../components/dashboard/DashboardWrapper';
import { ProductList } from '../../components/front/ProductList';

export default function DashboardPage() {
  return (
    <DashboardWrapper>
      <h1 className="text-2xl font-bold mb-4">Tableau de bord administrateur</h1>
      <ProductList />
    </DashboardWrapper>
  );
}