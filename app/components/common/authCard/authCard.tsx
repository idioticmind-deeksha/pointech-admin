import "./authCard.scss";
export default function AuthCard({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <div className={`auth_card `}>
      <h5 className="auth_card_title">{title}</h5>
      <div className={`auth_card_content`}>{children}</div>
    </div>
  );
}
