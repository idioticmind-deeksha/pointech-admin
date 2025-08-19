import { SearchIcon } from "@/app/assets/svgIcons/svgIcon";
import './commmonSearch.scss';
export default function CommonSearch() {
    return (
        <div className="common_search">
            <input type="search" placeholder="Search..." />
            <button type="button"><SearchIcon/></button>
        </div>
    )
}