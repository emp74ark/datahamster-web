import StatsEvent from '@/components/stats-event';

export default async function Page() {
  return (
    <section>
      <StatsEvent scope="dashboard" />
      Dashboard
    </section>
  );
}
