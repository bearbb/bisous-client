import React, { useState, useEffect, useRef, useContext } from "react";
import { Logo } from "pages/Header/Logo";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { Utility } from "pages/Header/Utility";
import { Chat } from "pages/Message/Chat";
import "styles/Message.css";
import avatar from "styles/images/avatar.webp";
// import io from "socket.io-client";
import axiosInstance from "Utility/axios";
import { useHistory } from "react-router-dom";

import { FriendInformation } from "pages/Message/FriendInformation";
import { EmptyChatBox } from "pages/Message/EmptyChatBox";
import { useFollowContext } from "Contexts/FollowContext";
import { useUserContext } from "Contexts/UserContext";
import { useSocketContext } from "Contexts/SocketContext";
import { join } from "path";

export interface friendData {
  friendName: string;
  friendId: string;
  friendAvatar: string;
}
interface FriendData {
  username: string;
  avatar: string;
  userId: string;
}
interface messageInitData {
  userName: string;
  friendList: friendData[];
}

interface MessageProps {}

const imgUrlPrefix = "https://application.swanoogie.me/api/images/";
// const socket = io("https://swanoogie.me", { autoConnect: false });
const fetchFriendData = async (
  followingList: string[]
): Promise<FriendData[]> => {
  console.log(followingList);
  if (followingList[0] === "") {
    return [];
  } else {
    let friendsData: FriendData[] = await Promise.all(
      followingList.map(async (followingId) => {
        let data = await axiosInstance.get(`/users/${followingId}`);
        return {
          username: data.data.userDoc.username,
          avatar: data.data.userDoc.avatar,
          userId: followingId,
        };
      })
    );
    return friendsData;
  }
};

export const Message: React.FC<MessageProps> = ({}) => {
  const { followData: userFollowData, setFollowData: setUserFollowData } =
    useFollowContext();
  const { userData, setUserData } = useUserContext();
  const socket = useSocketContext();
  const [currentUser, setCurrentUser] = useState<string>(userData.username);
  const [currentChatLog, setCurrentChatLog] =
    useState<Array<MessageData> | null>([
      {
        sender: { userId: "60f39b3ffddbdd31da2ffe39", username: "bearbb2" },
        receiver: { userId: "60dd3d65784646034844a4e5" },
        message: "b1",
        createdAt: "1628846936805",
      },
    ]);
  const newMessageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();
  const [friendsData, setFriendsData] = useState<FriendData[] | null>(null);

  const updateCurrentChatLog = (newChatData: MessageData) => {
    console.log(
      `%c currentChatLog`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
    console.log(currentChatLog);
    if (currentChatLog === null) {
      setCurrentChatLog([newChatData]);
    } else {
      let temp = [...currentChatLog, newChatData];
      console.log(
        `%cCurrent chat log after changed`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
      console.log(temp);
      setCurrentChatLog(temp);
    }
    // console.log("after chat log: ", currentChatLog);
  };
  useEffect(() => {
    socket.on("incomingMessage", (data) => {
      let temp = { ...data, createdAt: Date.now().toString() };
      console.log(temp);
      updateCurrentChatLog(temp);
    });
    return () => {
      socket.off("incomingMessage");
    };
  }, [socket, currentChatLog]);
  //emit on sending message
  const emitMessage = (receiverId: string, msgContent: string) => {
    let temp: MessageData = {
      sender: {
        userId: userData.userId,
        username: userData.username,
      },
      receiver: { userId: receiverId },
      message: msgContent,
      createdAt: Date.now().toString(),
    };
    socket.emit("privateMessage", temp);
    updateCurrentChatLog(temp);
  };

  useEffect(() => {
    (async () => {
      //check if followList empty
      if (userFollowData.following !== [""]) {
        //fetching all following users
        let temp = await fetchFriendData(userFollowData.following);
        setFriendsData(temp);
      }
    })();
  }, [userFollowData]);
  interface MessageData {
    message: string;
    sender: {
      username: string;
      userId: string;
    };
    receiver: {
      // username: string;
      userId: string;
    };
    createdAt: string;
  }
  const [currentFriend, setCurrentFriend] = useState<FriendData | null>(null);
  const currentFriendHandler = (
    friendId: string,
    friendName: string,
    friendAvatar: string
  ) => {
    //delete pre active class on pre currentFriend
    if (currentFriend !== null) {
      let preDoc = document.getElementsByClassName(currentFriend.userId)[0];
      preDoc.classList.remove("currentFriend__container--active");
    }
    //set current friend on that friend
    setCurrentFriend({
      userId: friendId,
      username: friendName,
      avatar: friendAvatar,
    });
    //add currentFriend__container--active to that html element
    let doc = document.getElementsByClassName(friendId)[0];
    doc.classList.add("currentFriend__container--active");
    history.push(`/direct/t/${friendId}`);
  };
  const nullOnclickHandler = () => {};
  const [newMessage, setNewMessage] = useState<string>("");
  const [newMessageIsEmpty, setNewMessageIsEmpty] = useState<boolean>(true);
  const ListingFriend = (friendsData: FriendData[]): React.ReactElement => {
    let friendList = friendsData.map((friendData) => {
      return (
        <FriendInformation
          key={friendData.userId}
          friendAvatar={`${imgUrlPrefix}${friendData.avatar}`}
          friendId={friendData.userId}
          friendName={friendData.username}
          //TODO: add onClick attribute
          onClickHandler={currentFriendHandler}
          customClass="friendList--realShit"
        />
      );
    });
    return <ul className="friendList__ul">{friendList}</ul>;
  };
  const newMessageOnChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewMessage(event.target.value.toString());
  };
  const newMessageSubmitHandler = () => {
    if (currentFriend !== null) {
      emitMessage(currentFriend.userId, newMessage);
      scrollToLastMessage();
    }
    //clear the new message input
    if (newMessageTextareaRef.current !== null) {
      newMessageTextareaRef.current.value = "";
      setNewMessage("");
    }
  };
  const onEnterPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      newMessageSubmitHandler();
    }
  };
  const lastMessageRef = useRef<HTMLLIElement | null>(null);
  const renderChatLog = (data: MessageData[]): React.ReactElement => {
    let ChatLogs: React.DetailedHTMLProps<
      React.LiHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >[] = [];
    let dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      if (i !== dataLength - 1) {
        if (data[i].sender.userId === userData.userId) {
          ChatLogs.push(
            <li className="outgoing">
              <Chat
                message={data[i].message}
                isIncoming={false}
                key={data[i].createdAt}
              ></Chat>
            </li>
          );
        } else {
          ChatLogs.push(
            <li className="incoming">
              <Chat
                message={data[i].message}
                isIncoming={true}
                key={data[i].createdAt}
              ></Chat>
            </li>
          );
        }
      } else {
        if (data[i].sender.userId === userData.userId) {
          ChatLogs.push(
            <li className="outgoing" ref={lastMessageRef}>
              <Chat
                message={data[i].message}
                isIncoming={false}
                key={data[i].createdAt}
              ></Chat>
            </li>
          );
        } else {
          ChatLogs.push(
            <li className="incoming" ref={lastMessageRef}>
              <Chat
                message={data[i].message}
                isIncoming={true}
                key={data[i].createdAt}
              ></Chat>
            </li>
          );
        }
      }
    }
    return <ul className="messageContent__ul">{ChatLogs}</ul>;
  };
  const scrollToLastMessage = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (newMessage == "") {
      setNewMessageIsEmpty(true);
    } else {
      setNewMessageIsEmpty(false);
    }
  }, [newMessage]);
  //Scroll to the very end message when render out msg
  useEffect(() => {
    scrollToLastMessage();
  }, []);

  return (
    <div className="Message">
      <div className="feedsHeader__container">
        <div className="headerFlex__container">
          <Logo></Logo>
          <SearchNNewPost></SearchNNewPost>
          <Utility></Utility>
        </div>
      </div>
      <div className="messageBody__container">
        <div className="friendList__container">
          <div className="friendList__userNameContainer">
            <span className="friendList__userName">{userData.username}</span>
          </div>
          <div className="friendList__listContainer">
            <div className="friendList__descriptionContainer">
              <span className="friendList__description">Friends</span>
            </div>
            <div className="friendList__lists">
              {friendsData !== null ? ListingFriend(friendsData) : null}
            </div>
          </div>
        </div>
        <div className="message__container">
          <div className="receiverIn4__container">
            {currentFriend == null ? null : (
              <FriendInformation
                key={currentFriend.userId}
                friendAvatar={`${currentFriend.avatar}`}
                friendId={currentFriend.userId}
                friendName={currentFriend.username}
                onClickHandler={nullOnclickHandler}
              />
            )}
          </div>
          {/* Place to render message log */}
          <div className="messageContent__section">
            {currentFriend !== null ? (
              currentChatLog !== null ? (
                renderChatLog(currentChatLog)
              ) : null
            ) : (
              <EmptyChatBox></EmptyChatBox>
            )}
          </div>
          <div
            className={`newMessage__section ${
              currentFriend === null
                ? "newMessage__section--disabled"
                : "newMessage__section--enabled"
            }`}
          >
            <div
              className="newMessage__container"
              onKeyDown={(e) => onEnterPress(e)}
            >
              <textarea
                placeholder="Message..."
                id="newMessage"
                className="newMessage__textarea"
                rows={1}
                onChange={(e) => {
                  newMessageOnChangeHandler(e);
                }}
                ref={newMessageTextareaRef}
              ></textarea>
              <span
                // onClick={newMessageSubmitHandler}
                onClick={() => {
                  scrollToLastMessage();
                  newMessageSubmitHandler();
                }}
                className={`newMessage__submit ${
                  newMessageIsEmpty
                    ? "newMessage__submit--disabled"
                    : "newMessage__submit--enabled"
                }`}
              >
                Send
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
