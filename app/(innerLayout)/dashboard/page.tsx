import Stats from "@/app/components/ui/stats/stats";

export default function Dashboard() {
  const usersData = [
    {
 
      title: "Total Users",
      subtitle: '1,234',
    },
    {
      title:"Total Active Users",
      subtitle: '50',
    },
    {
      title: "Total Token",
      subtitle: '550',
    }, 
  ];
    return (
      <section className="dashboard">
       <Stats statsdata={usersData}  lg={4} xl={4}/>
      </section>
    );
  }
  