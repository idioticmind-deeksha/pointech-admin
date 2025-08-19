import './commonBgcard.scss';
export default function CommonBgCard({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="common_bg">
            <div className="common_shadow"></div>
            <div className="common_shadow right"></div>
            {children}
        </div>
    )
}