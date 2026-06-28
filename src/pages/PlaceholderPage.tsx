import { BottomNav } from "../components/BottomNav";
import "./PlaceholderPage.css";

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="placeholder-page">
      <p className="placeholder-page__eyebrow">coming soon</p>
      <h1 className="placeholder-page__title">{title}</h1>
      <BottomNav />
    </div>
  );
}
