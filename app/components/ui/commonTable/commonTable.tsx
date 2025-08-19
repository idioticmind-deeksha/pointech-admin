import { ReactNode } from "react";
import { Table } from "react-bootstrap";
import { ArrowDownSmallIcon, NoRecordIcon } from "../../../assets/svgIcons/svgIcon";
import "./commonTable.scss";
type TProps = {
  children?: ReactNode;
  fields: string[];
  lastColumnWidth?: string;
  className?: string;
  filterBtn?: boolean;
  globalCheckbox?: boolean;
  globalCheckboxClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CommonTable = (props: TProps) => {
  return (
    <>
      <div className={`common_table ${props.className}`}>
        <Table responsive>
          {props.fields && (
            <thead>
              <tr>
                {props.fields?.map((item: string, index: number) => {
                  const isLast = index === props.fields?.length - 1;
                  return (
                    <th
                      key={item}
                      style={
                        isLast
                          ? {
                            width: props.lastColumnWidth,
                            minWidth: props.lastColumnWidth,
                          }
                          : {}
                      }
                    >
                      {item}
                      {props.filterBtn && (
                        <button type="button">
                          <ArrowDownSmallIcon />
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {props.children || (
              <tr>
                <td colSpan={props.fields?.length} className="no_record_box">
                  <NoRecordIcon />
                  <p>No Record Found</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default CommonTable;
