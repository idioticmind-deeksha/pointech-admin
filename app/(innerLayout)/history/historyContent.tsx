"use client";
import TransactionsTable from "./transactionsTable";
import "./history.scss";
import CommonButton from "@/app/components/ui/commonButton/CommonButton";

export default function HistoryTabs() {
  return (
    <div className="history_container">
      <div className="history_container_head">
        <h5 className="mb-md-0">Transactions</h5>
        <CommonButton title="Export CVS" className="history_export_btn"/>
      </div>
      <div className="history_container_table">
        <TransactionsTable />
      </div>
    </div>
  );
}
