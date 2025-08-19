"use client";
import { DeleteIcon } from '@/app/assets/svgIcons/svgIcon';
import CommonTable from '@/app/components/ui/commonTable/commonTable';
import { useModal } from '@ebay/nice-modal-react';
import { useCallback} from 'react';
export default function TransactionsTable () {
    const AlertModal = useModal("AlertModal");
    const closeAlertModal = useCallback(() => {
      AlertModal.remove();
    }, [AlertModal]);
  
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
        <div className="transactions">
        <CommonTable fields={fields} className="transactions_table" lastColumnWidth="110px">
        {tableData.map((user, index) => (
        <tr key={index}>
          <td>{user.wallet}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.tokens}</td>
          <td>{user.amount}</td>
          <td>{user.bonus}</td>
          <td><button onClick={() => {
                  closeAlertModal(); 
                  AlertModal.show({
                    closeAlertModal,
                    heading: "Are you sure you want to Delete?",
                    subheading: "Are you sure you want to delete.",
                    btntitle: "Yes",
                    secbtntitle: "No",
                    onClickClose: () => {
                      closeAlertModal(); 
                    },
                    onClick: () => {
                      closeAlertModal(); 
                    },
                  });
                }}><DeleteIcon /></button></td>
        </tr>
      ))}
        </CommonTable>
        </div>
    )
}