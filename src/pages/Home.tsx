import { PageShell } from "../components/PageShell";
import { PompompurinSticker } from "../components/PompompurinSticker";
import { ArchedGreeting } from "../components/ArchedGreeting";
import "./Home.css";

export function Home() {
  return (
    <PageShell className="home">
      <div className="home__main">
        <PompompurinSticker />
        <div className="home__greeting">
          <ArchedGreeting />
        </div>
      </div>
    </PageShell>
  );
}
