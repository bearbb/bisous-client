import React, { useRef, useState, useEffect } from "react";
import { useUserContext } from "Contexts/UserContext";
// import { faFileImage } from "@fortawesome/fontawesome-free-solid";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Logo } from "pages/Header/Logo";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { Utility } from "pages/Header/Utility";
import axiosInstance from "Utility/axios";
import "./EditProfile.css";
import { LoadingCube } from "pages/LoadingScreen/LoadingCube";
// const FileImageIcon = faFileImage as IconProp;

interface EditProfileProps {}

export const EditProfile: React.FC<EditProfileProps> = ({}) => {
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const [initBio, setInitBio] = useState<string | null>(null);
  const addImageRef = useRef<HTMLInputElement>(null);
  const { setUserData, userData } = useUserContext();
  const [bio, setBio] = useState<string | null>(null);
  const [urlData, setUrlData] = useState<any>();
  const [imageData, setImageData] = useState<any>();
  const [isExceedSizeLimit, setIsExceedSizeLimit] = useState<boolean>(false);
  const getUserBio = async (userId: string) => {
    let res = await axiosInstance.get(`/users/${userId}`);
    setBio(res.data.userDoc.bio);
    setInitBio(res.data.userDoc.bio);
  };
  useEffect(() => {
    setUrlData(
      `https://application.swanoogie.me/api/images/${userData.avatar}`
    );
    getUserBio(userData.userId);
  }, []);
  useEffect(() => {
    // console.log(imageData);
    return () => {};
  }, [imageData]);
  const avatarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size <= 1000000) {
        setUrlData(URL.createObjectURL(e.target.files[0]));
        setImageData(e.target.files[0]);
      } else {
        setIsExceedSizeLimit(true);
      }
    }
  };
  const bioOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value.toString());
  };
  const addImgHandler = () => {
    if (addImageRef !== null) {
      addImageRef.current?.click();
    }
  };
  const updateBio = async (bio: string) => {
    let res = await axiosInstance.post(`/users/bio`, { bio });
    // console.log(res);
    getUserBio(userData.userId);
  };
  const updateAvatar = async () => {
    try {
      //upload img first
      let imgData = new FormData();
      // console.log(imgData);
      if (imageData) {
        imgData.append("imageFile", imageData);
      }
      // console.log(imgData);
      let resp = await axiosInstance.post("/images", imgData);
      let imgId = resp.data.imageId;
      //update avatar by new image id
      let updateAvaRes = await axiosInstance.post("/users/avatar", {
        imageId: imgId,
      });
      // console.log(updateAvaRes);
    } catch (err) {
      // console.error(err);
    }
  };
  const submitHandler = async () => {
    //check if bio have change
    if (bio !== null && initBio !== null) {
      if (bio === initBio) {
        // console.log("nothing have changed");
      }
      //bio changed
      else {
        await updateBio(bio);
      }
    }
    if (imageData) {
      await updateAvatar();
    } else {
      // console.log("image not change");
    }
  };
  useEffect(() => {
    if (isExceedSizeLimit) {
      alert(
        "Image file need to me smaller than 1 MB\nSorry for this inconvenience"
      );
    }
    return () => {};
  }, [isExceedSizeLimit]);
  if (bio === null) {
    return <LoadingCube></LoadingCube>;
  }
  return (
    <div className="EditProfile">
      <div className="feedsHeader__container">
        <div className="headerFlex__container">
          <Logo></Logo>
          <SearchNNewPost></SearchNNewPost>
          <Utility></Utility>
        </div>
      </div>
      <div className="EP__bodyContainer">
        <div className="EP__body--upper">
          <div className="EP__editAvatarContainer">
            <div className="ep__avatarContainer">
              <img
                src={urlData}
                alt=""
                className="ep__avatar avatar"
                onClick={() => {
                  addImgHandler();
                }}
              />
            </div>
            <div className="ep__avatarChangerContainer">
              <span className="ep__userName">{userData.username}</span>
              <span className="ep__editButton" onClick={() => addImgHandler()}>
                Change Avatar
              </span>
              <input
                ref={addImageRef}
                id="epUploadImg"
                type="file"
                accept="image/png, image/jpeg"
                className="ep__avatarUpload--hidden"
                onChange={(e) => {
                  avatarOnChange(e);
                }}
              />
            </div>
          </div>
          <div className="EP__editBioContainer">
            <div className="ep__bioLabelContainer">
              <span className="ep__bioLabel">Bio</span>
            </div>
            <div className="ep__bioEditContainer">
              {bio !== null ? (
                <textarea
                  className="ep__bioTextarea"
                  ref={bioRef}
                  name=""
                  onChange={(e) => {
                    bioOnChange(e);
                  }}
                  value={bio}
                ></textarea>
              ) : (
                "Loading"
              )}
            </div>
          </div>
        </div>
        <div className="EP__body--lower">
          <div className="EP__submitContainer">
            <div
              className="ep__submitButton"
              onClick={() => {
                submitHandler();
              }}
            >
              <span className="ep__submitSpan">Submit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
