import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/axios";
import { Icons } from "../utils/icons";
import "../styles/editProfile.css";
import "../styles/globle.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

function EditProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<{
    name: string;
    email: string;
    bio: string;
  }>({
    name: "",
    email: "",
    bio: ""
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // ✅ SINGLE QUERY (removed duplicate)
  const fetchProfile = async (): Promise<User> => {
    const { data } = await API.get("/auth/userProfile");
    return data.user;
  };

  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || ""
      });

      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  // ✅ TYPE FIX
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = useMutation({
    mutationFn: async (formData: FormData) => {
      return await API.put("/auth/editUser", formData);
    },
    onSuccess: () => {
      // ✅ REACT QUERY V5 FIX
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/profile");
    },
    onError: (err) => {
      console.error("Update error:", err);
    }
  });

  // ✅ TYPE FIX
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("bio", form.bio);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    updateProfile.mutate(formData);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        {/* Decorative Elements */}
        <div className="edit-decoration">
          <div className="floating-shape shape1"></div>
          <div className="floating-shape shape2"></div>
          <div className="floating-shape shape3"></div>
        </div>

        <div className="edit-profile-card">
          <div className="edit-header">
            <button className="back-btn" onClick={() => navigate("/profile")}>
              <Icons.ArrowLeft /> Back
            </button>
            <h2>
              <Icons.Edit /> Edit Profile
            </h2>
            <p>Update your personal information</p>
          </div>

          <form onSubmit={handleSubmit} className="edit-form">
            {/* Avatar Upload Section */}
            <div className="avatar-section">
              <div className="avatar-preview">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    <Icons.User />
                  </div>
                )}
                <div className="avatar-overlay">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    id="avatar-upload"
                    hidden
                  />
                  <label htmlFor="avatar-upload" className="avatar-upload-label">
                    <Icons.Camera />
                  </label>
                </div>
              </div>
              <p className="avatar-hint">Click the camera icon to change your photo</p>
            </div>

            {/* Form Fields */}
            <div className="form-fields">
              <div className="input-group">
                <label htmlFor="name">
                  <Icons.User /> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">
                  <Icons.Email /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="bio">
                  <Icons.Info /> Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows={5}   // ✅ FIX (string → number)
                  maxLength={200} // ✅ FIX
                />
                <span className="char-count">
                  {form.bio?.length || 0}/200
                </span>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => navigate("/profile")}
              >
                <Icons.Close /> Cancel
              </button>

              <button 
                type="submit" 
                className="save-btn"
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? (
                  <>
                    <Icons.Refresh className="spinning" /> Updating...
                  </>
                ) : (
                  <>
                    <Icons.Check /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
