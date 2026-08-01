import NavigationSidebar from "../../components/layout/NavigationSidebar";
import ProfileCard from "../../components/settings/ProfileCard";

function SettingsPage() {
  return (
    <div className="flex h-screen bg-slate-950">
      <NavigationSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl px-8 py-10">
          <h1 className="mb-10 text-4xl font-bold tracking-tight text-white">
            Settings
          </h1>

          <ProfileCard />
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;