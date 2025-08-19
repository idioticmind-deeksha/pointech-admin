import Stats from "@/app/components/ui/stats/stats";
import HistoryTabs from "./historyContent";

export default function History() {
  const statsdata = [
    {
      subHeading: "Staking Rewards",
      heading: "$12,000 Earned",
    },
    {
      subHeading: "Referral Bonus",
      heading: "$3,500 Earned",
    },
    {
      subHeading: "Governance Votes",
      heading: "15 Cast",
    },
  ];
  return (
    <section className="histroy">
      <Stats statsdata={statsdata} lg={4} xl={4} />
      <div className="history_content">
        <HistoryTabs />
      </div>
    </section>
  );
}
