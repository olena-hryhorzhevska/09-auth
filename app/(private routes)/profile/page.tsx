import Image from 'next/image';
import Link from 'next/link';
import css from './Profile.module.css';
import { Metadata } from 'next';
import { getMeServer } from '@/lib/api/serverApi';


export const metadata: Metadata = {
  title: "Your Profile",
  description: "Your profile page",
  openGraph: {
    title: "My Profile",
    description: "Manage your profile information and settings.",
    url: "https://09-auth-liard.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile Page",
      },
    ],
    type: "website",
  },
};

const Profile = async () => {
  const user = await getMeServer();
  return (
    <div>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user?.avatar || "/avatar.png"}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: { user.username}</p>
            <p>Email: { user.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;