import { LOGGER } from "@repo/logger";
import { Link } from "@repo/ui/link";
import { CounterButton } from "@repo/ui/counter-button";
import "./styles.css";

export const metadata = {
  title: "Store | Kitchen Sink",
};

export default function Store(): JSX.Element {
  LOGGER("Hey! This is the Store page.");

  return (
    <div className="container">
      <h1 className="title">
        안녕하세요 <br />
        <span>열심히 만들고 있습니다</span>
        <br />
        <p className="bg-gradient-to-r from-blue-400 via-mint-500 to-emerald-500 bg-clip-text text-transparent">
          LIBERNEX를 만들어요
        </p>
      </h1>
      <CounterButton />
      <button className="bg-gradient-to-r from-blue-400 via-mint-500 to-emerald-500 text-white font-bold py-2 px-4 rounded">
        <Link href="/chat" newTab>
          Go to Chat
        </Link>
      </button>
      <p className="description">
        Built With{" "}
        <Link href="https://turbo.build/repo" newTab>
          Turborepo
        </Link>
        {" & "}
        <Link href="https://nextjs.org/" newTab>
          Next.js
        </Link>
      </p>
    </div>
  );
}
