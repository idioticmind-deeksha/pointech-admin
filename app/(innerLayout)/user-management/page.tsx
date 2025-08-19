import CommonTable from '@/app/components/ui/commonTable/commonTable';
import './userManagement.scss'
export default function UserManagement () {
    const fields = [
        "User Wallet Address",
        "User Email Id",
        "Phone No",
        "Total Tokens",
        "Buy Amount",
        "Bonus Amount",
        "Whitelisted User"
      ];
      const tableData = [
        {
          wallet: "0xA1b2...3cD4",
          email: "user1@example.com",
          phone: "+1234567890",
          tokens: "1,000",
          amount: "$500",
          bonus: "$50",
          whitelisted: "Yes"
        },
        {
          wallet: "0xF5e6...7gH8",
          email: "user2@example.com",
          phone: "+9876543210",
          tokens: "750",
          amount: "$300",
          bonus: "$30",
          whitelisted: "No"
        },
        {
          wallet: "0x9Zy8...1wX2",
          email: "user3@example.com",
          phone: "+1112223333",
          tokens: "2,500",
          amount: "$1250",
          bonus: "$125",
          whitelisted: "Yes"
        }
      ];
    return (
        <section className="user_management">
        <CommonTable fields={fields} className="user_management_table" >
        {tableData.map((user, index) => (
        <tr key={index}>
          <td>{user.wallet}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.tokens}</td>
          <td>{user.amount}</td>
          <td>{user.bonus}</td>
          <td>{user.whitelisted}</td>
        </tr>
      ))}
        </CommonTable>
        </section>
    )
}