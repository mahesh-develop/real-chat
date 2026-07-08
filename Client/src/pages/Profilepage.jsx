import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

const Profilepage = () => {

    const { authUser, updateProfile } = useContext(AuthContext);

    const [selectedImg, setSelectedImg] = useState(null);
    const [name, setName] = useState(authUser.fullName);
    const [bio, setBio] = useState(authUser.bio);

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!selectedImg) {
            await updateProfile({
                fullName: name,
                bio,
            });

            navigate("/");
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(selectedImg);

        reader.onload = async () => {

            const base64Image = reader.result;

            await updateProfile({
                profilePic: base64Image,
                fullName: name,
                bio,
            });

            navigate("/");
        };
    };

    return (
        <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">

            <div className="w-5/6 max-w-2xl backdrop-blur-2xl border-2 border-gray-600 rounded-lg flex items-center justify-between max-sm:flex-col-reverse text-gray-300">

                <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 p-10 flex-1">

                    <h3 className="text-lg font-semibold">
                        Profile Details
                    </h3>

                    <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">

                        <input
                            type="file"
                            id="avatar"
                            hidden
                            accept=".png,.jpg,.jpeg"
                            onChange={(e) => setSelectedImg(e.target.files[0])}
                        />

                        <img
                            src={
                                selectedImg
                                    ? URL.createObjectURL(selectedImg)
                                    : authUser?.profilePic || assets.avatar_icon
                            }
                            alt=""
                            className="w-14 h-14 rounded-full object-cover"
                        />

                        <span>Upload Profile Image</span>

                    </label>

                    <input
                        type="text"
                        placeholder="Your Name"
                        className="p-3 rounded-md bg-transparent border border-gray-500 outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                        rows="4"
                        placeholder="Write your bio..."
                        className="p-3 rounded-md bg-transparent border border-gray-500 outline-none resize-none"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="py-3 rounded-md bg-gradient-to-r from-purple-400 to-violet-600 text-white cursor-pointer"
                    >
                        Save Profile
                    </button>

                </form>

                <img
                    src={assets.logo_icon}
                    alt=""
                    className="max-w-44 aspect-square mx-10 max-sm:mt-10"
                />

            </div>

        </div>
    );
};

export default Profilepage;