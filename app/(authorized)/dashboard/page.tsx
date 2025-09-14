import StatsEvent from '@/components/widgets/stats-event';

export default async function Page() {
  return (
    <section>
      <StatsEvent scope="dashboard" />
      Dashboard
    </section>
  );
}
