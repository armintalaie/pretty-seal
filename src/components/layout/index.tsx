import "./index.scss";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <div className="layout">
      <main>{children}</main>
    </div>
  );
}
