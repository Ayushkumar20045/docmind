import { useAuth } from "../../context/AuthContext";

function Hero() {
  const { user } = useAuth();

  return (
    <section className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-400">
        AI WORKSPACE
      </p>

      <h1 className="mt-3 text-5xl font-bold tracking-tight text-white">
        Hello,{" "}
        {user?.full_name.split(" ")[0]} 👋
      </h1>

      <p className="mt-3 text-lg text-slate-400">
        Upload a PDF and start chatting with your
        documents instantly.
      </p>
    </section>
  );
}

export default Hero;