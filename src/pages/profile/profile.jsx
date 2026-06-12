import React from "react";
import { useState } from "react";
import { useAuthStore } from "../../store/authstore.js";
import { Link } from "react-router-dom";
import imageCompression from "browser-image-compression";

export default function Profile() {
  const { authUser, updateProfile } = useAuthStore();

  // local editable states
  const [fullname, setFullname] = useState(
    authUser?.fullname || "Amit Yadav"
  );
  const [avatarPreview, setAvatarPreview] = useState(
    authUser?.profilePicture || "https://i.pravatar.cc/150?img=12"
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 👇 handle avatar change
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // optional: block very large images early
    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large (max 5MB)");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // 👇 save profile (compress + base64)
  const handleSave = async () => {
    try {
      setLoading(true);

      let base64Image = null;

      if (avatarFile) {
        const options = {
          maxSizeMB: 0.1,          // ~100 KB
          maxWidthOrHeight: 600,   // resize
          useWebWorker: true,
        };

        // compress image
        const compressedFile = await imageCompression(
          avatarFile,
          options
        );

        // convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);

        base64Image = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
        });
      }

      await updateProfile({
        fullname,
        ...(base64Image && { profilePicture: base64Image }),
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center gap-4">

          {/* Avatar */}
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatarPreview} alt="profile" />
            </div>
          </div>

          {/* Change avatar */}
          <label className="btn btn-sm btn-outline cursor-pointer">
            Change Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </label>

          {/* Editable full name */}
          <div className="w-full mt-4 text-left">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          {/* Email (read-only) */}
          <div className="w-full text-left">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={authUser?.email || "amit@example.com"}
              disabled
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3 w-full">
            <button
              className="btn btn-primary flex-1"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <Link to="/chat" className="btn btn-outline flex-1">
              Cancel
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
