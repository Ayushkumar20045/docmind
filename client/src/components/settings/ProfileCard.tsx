import { useEffect, useState } from "react";
import { User } from "lucide-react";

import {
  getCurrentUser,
  type User as UserType,
} from "../../services/auth.service";

function ProfileCard() {
  const [user, setUser] = useState<UserType | null>(
    null
  );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const currentUser =
          await getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-slate-400">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10">
          <User
            size={28}
            className="text-blue-500"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">
            Profile
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your DocMind account information
          </p>
        </div>
      </div>

      <div className="space-y-6">

        <div>
          <p className="text-sm text-slate-500">
            Full Name
          </p>

          <p className="mt-2 text-lg font-medium text-white">
            {user?.full_name}
          </p>
        </div>

        <div className="border-t border-slate-800" />

        <div>
          <p className="text-sm text-slate-500">
            Email Address
          </p>

          <p className="mt-2 text-lg font-medium text-white">
            {user?.email}
          </p>
        </div>

        <div className="border-t border-slate-800" />

        <p className="text-sm leading-6 text-slate-400">
          Your profile information is linked to
          your DocMind account. Contact the
          administrator if you need to update
          your account details.
        </p>

      </div>
    </div>
  );
}

export default ProfileCard;