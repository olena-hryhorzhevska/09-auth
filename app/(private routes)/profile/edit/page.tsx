"use client";

import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const EditProfileClient = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user?.username || "");
      setUserEmail(user?.email || "");
      setAvatarUrl(user?.avatar || "");
      setIsLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await updateMe({ username: userName });
      router.push("/profile");
    } catch (error) {
      setError(`Failed to update profile. Please try again. ${error}`);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  }


  if (isLoading) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>
          <p>Loading, please wait...</p>
        </div>
      </main>
    );
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatarUrl || "/avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {userName}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={userName}
              onChange={handleChange}
            />
          </div>

          <p>Email: {userEmail}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default EditProfileClient;
