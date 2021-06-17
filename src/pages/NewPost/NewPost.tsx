import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import "pages/NewPost/NewPost.css";
import { faTimesCircle as CloseFAR } from "@fortawesome/fontawesome-free-regular";
import {
  faPlusCircle,
  faTimesCircle,
} from "@fortawesome/fontawesome-free-solid";
// import { faTimesCircle } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import avatar from "styles/images/avatar.webp";

const AddIcon = faPlusCircle as IconProp;
const ClearIcon = faTimesCircle as IconProp;
const CloseIcon = CloseFAR as IconProp;

const axiosInstance = axios.create({
  baseURL: "https://application.swanoogie.me/api",
  withCredentials: true,
});
interface NewPostProps {
  toggleNewPost: () => void;
  fetchNewPostData: () => void;
}

export const NewPost: React.FC<NewPostProps> = ({
  toggleNewPost,
  fetchNewPostData,
}) => {
  const captionInputRef = useRef<HTMLTextAreaElement>(null);
  const [caption, setCaption] = useState<string>("");
  const addImageRef = useRef<HTMLInputElement>(null);
  const [urlData, setUrlData] = useState<any>();
  const [data, setData] = useState<any>();
  const [imgIsAvail, setImgIsAvail] = useState<boolean>(false);
  const [clearToPost, setClearToPost] = useState<boolean>(false);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isExceedSizeLimit, setIsExceedSizeLimit] = useState<boolean>(false);
  const captionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };
  const newPostOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size <= 1000000) {
        setUrlData(URL.createObjectURL(e.target.files[0]));
        setData(e.target.files[0]);
      } else {
        setIsExceedSizeLimit(true);
      }
    } else {
    }
  };
  const addImgHandler = () => {
    if (addImageRef !== null) {
      addImageRef.current?.click();
    }
  };
  const clearImgBlob = () => {
    setUrlData(undefined);
    setData(undefined);
  };

  useEffect(() => {
    if (isExceedSizeLimit) {
      alert(
        "Image file need to me smaller than 1 MB\nSorry for this inconvenience"
      );
      setIsExceedSizeLimit(false);
    }
  }, [isExceedSizeLimit]);
  useEffect(() => {
    if (urlData !== undefined) {
      setImgIsAvail(true);
    } else {
      setImgIsAvail(false);
    }
    return () => {};
  }, [urlData]);
  useEffect(() => {
    if (caption !== "" && imgIsAvail) {
      setClearToPost(true);
    } else {
      setClearToPost(false);
    }
    return () => {};
  }, [imgIsAvail, caption]);
  interface PostData {
    pictures: any;
    hashtags: string[];
    caption: string;
  }
  const submitUploadImage = async () => {
    try {
      //Upload img first then upload post
      let imageData = new FormData();
      if (data) {
        imageData.append("imageFile", data);
      }
      // console.log(imageData);
      let resp = await axiosInstance.post("/images", imageData);
      let imgId = resp.data.imageId;
      if (clearToPost) {
        let postData: PostData = {
          pictures: [imgId],
          caption: caption,
          hashtags: ["hashtag-not-available-for-now"],
        };
        let postResp = await axiosInstance.post("/posts", postData);
        // console.log(postResp);
        captionInputRef.current!.value = "";
        clearImgBlob();
        toggleNewPost();
        fetchNewPostData();
      }
    } catch (error) {
      console.error(error.response);
    }
  };
  return (
    <div className="NewPost">
      <div className="NP__container">
        <div className="npAvatarNCaption__container">
          <div className="npAvatar__container">
            <img src={avatar} alt="" className="npAvatar__img" />
          </div>
          <div className="npCaption__container">
            <textarea
              name="What's happening"
              className="npCaption__textarea"
              placeholder="What's happening..."
              onChange={(e) => {
                captionHandler(e);
              }}
              ref={captionInputRef}
            ></textarea>
          </div>
        </div>
        <div className="npPreviewImage__container">
          {imgIsAvail ? (
            <FontAwesomeIcon
              icon={ClearIcon}
              size="2x"
              className="npPreviewImage__clearIcon"
              onClick={() => {
                clearImgBlob();
              }}
            />
          ) : null}
          <img src={urlData} alt="" className="npPreview__img" />
        </div>
        <div className="npUploadNSubmit__container">
          <div className="npUploadImage__container">
            <div className="npUploadImage__button">
              <span
                className="npUploadImage__icon"
                onClick={() => addImgHandler()}
              >
                <FontAwesomeIcon icon={AddIcon} size="2x" />
              </span>
            </div>
            <input
              ref={addImageRef}
              id="npUploadImg"
              type="file"
              accept="image/png, image/jpeg"
              className="npUploadImage__input"
              onChange={(e) => {
                newPostOnChangeHandler(e);
              }}
            />
            <label htmlFor="npUploadImg">Add image</label>
          </div>
          <div
            className={`npSubmit__container ${
              clearToPost ? "npSubmit--enabled" : "npSubmit--disabled"
            }`}
          >
            <div className="npSubmit__button">
              <span
                className={`npSubmit__description `}
                onClick={() => submitUploadImage()}
              >
                Upload
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
