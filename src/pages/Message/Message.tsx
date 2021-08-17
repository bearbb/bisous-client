import React, { useState, useEffect, useRef, useContext } from "react";
import { Logo } from "pages/Header/Logo";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { Utility } from "pages/Header/Utility";
import { Chat } from "pages/Message/Chat";
import "styles/Message.css";
// import io from "socket.io-client";
import axiosInstance from "Utility/axios";
import { useHistory } from "react-router-dom";

import { FriendInformation } from "pages/Message/FriendInformation";
import { EmptyChatBox } from "pages/Message/EmptyChatBox";
import { useFollowContext } from "Contexts/FollowContext";
import { useUserContext } from "Contexts/UserContext";
import { useSocketContext } from "Contexts/SocketContext";

import { faSpinner } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const LoadingIcon = faSpinner as IconProp;

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
  // console.log(followingList);
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
    useState<Array<MessageData> | null>([]);
  const newMessageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const history = useHistory();
  const [friendsData, setFriendsData] = useState<FriendData[] | null>(null);

  const updateCurrentChatLog = (newChatData: MessageData) => {
    // console.log(
    //   `%c currentChatLog`,
    //   "background: #292d3e; color: #f07178; font-weight: bold"
    // );
    // console.log(currentChatLog);
    if (currentChatLog === null) {
      setCurrentChatLog([newChatData]);
    } else {
      let temp = [...currentChatLog, newChatData];
      // console.log(
      //   `%cCurrent chat log after changed`,
      //   "background: #292d3e; color: #f07178; font-weight: bold"
      // );
      // console.log(temp);
      setCurrentChatLog(temp);
      setTimeout(() => {
        scrollToLastMessage();
      }, 200);
    }
    // console.log("after chat log: ", currentChatLog);
  };
  useEffect(() => {
    socket.on("incomingMessage", (data) => {
      updateCurrentChatLog(data);
    });
    return () => {
      socket.off("incomingMessage");
    };
  }, [socket, currentChatLog]);
  //emit on sending message
  //TODO: filter out enter key on submit
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
  // interface MessageData extends PreMessageData {
  //   _id: string
  // }
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
    if (isAlreadyLoadedAllChat) {
      setIsAlreadyLoadedAllChat(false);
    }
    //add currentFriend__container--active to that html element
    let doc = document.getElementsByClassName(friendId)[0];
    doc.classList.add("currentFriend__container--active");
    // history.push(`/direct/t/${friendId}`);
  };
  //fetch for messages on load
  const fetchMessages = async (
    filterDate: string,
    receiverId: string
  ): Promise<MessageData[]> => {
    try {
      let res = await axiosInstance.get(
        `/messages/t/${receiverId}/${filterDate}`
      );
      //messages arr from server is res.data.messages
      let messagesData: MessageData[] = res.data.messages.map(
        (data: {
          sender: { _id: string; username: string };
          receiver: { _id: string; username: string };
          message: string;
          createdAt: string;
        }) => {
          let temp: MessageData = {
            sender: { userId: data.sender._id, username: data.sender.username },
            receiver: { userId: data.receiver._id },
            message: data.message,
            createdAt: data.createdAt,
          };
          return temp;
        }
      );
      return messagesData;
    } catch (err) {
      let r: MessageData[] = [];
      // console.error(err);
      return r;
    }
  };
  //fetch on change current friend
  useEffect(() => {
    (async () => {
      //TODO: check if current friend have changed or not
      if (currentFriend !== null) {
        let currentTime = new Date();
        let messagesData = await fetchMessages(
          currentTime.toISOString(),
          currentFriend.userId
        );
        messagesData = messagesData.reverse();
        setCurrentChatLog(messagesData);
        scrollToLastMessage();
      }
    })();
  }, [currentFriend]);
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
    }
    //clear the new message input
    if (newMessageTextareaRef.current !== null) {
      newMessageTextareaRef.current.value = "";
      setNewMessage("");
    }
    // scrollToLastMessage();
  };
  const onEnterPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      newMessageSubmitHandler();
    }
  };
  const [prePosition, setPrePosition] = useState<number | null>(null);
  const messageContentUlRef = useRef<HTMLUListElement | null>(null);
  const messageContentSectionRef = useRef<HTMLDivElement | null>(null);
  const [isLoadMoreChat, setIsLoadMoreChat] = useState<boolean>(false);
  const [isAlreadyLoadedAllChat, setIsAlreadyLoadedAllChat] =
    useState<boolean>(false);

  const loadMoreChat = async () => {
    //get chat before the date of the first element of current chat log
    if (currentChatLog !== null) {
      // console.log(firstMessageRef.current?.getBoundingClientRect());
      // console.log(messageContentUlRef.current?.firstElementChild);
      // setPrePosition()
      setIsLoadMoreChat(true);
      let filterDate = currentChatLog[0].createdAt;
      let receiverId = currentChatLog[0].receiver.userId;
      //Fetch message data
      let moreChatLogs = await fetchMessages(filterDate, receiverId);
      setIsLoadMoreChat(false);
      if (moreChatLogs.length === 0) {
        setIsAlreadyLoadedAllChat(true);
      } else {
        moreChatLogs = moreChatLogs.reverse();
        //update current chat log
        setCurrentChatLog([...moreChatLogs, ...currentChatLog]);
      }
    }
  };
  // useEffect(() => {
  //   if (prePosition !== null) {
  //     setTimeout(() => {
  //       scrollToPrePosition(-prePosition);
  //     }, 500);
  //   }
  //   return () => {};
  // }, [prePosition]);
  const onScrollToLoadMoreChat = () => {
    const firstMessage = messageContentUlRef.current?.firstElementChild;
    let firstMessageYPosition = firstMessage?.getBoundingClientRect();
    if (firstMessageYPosition !== undefined) {
      let temp = Math.round(firstMessageYPosition.y);
      if (temp == 154 && !isAlreadyLoadedAllChat) {
        // console.log(
        //   `%c Load more chat now`,
        //   "background: #292d3e; color: #f07178; font-weight: bold"
        // );
        //get the pre y position of container
        // console.log(messageContentSectionRef.current?.getBoundingClientRect());
        //assign the height of pre element
        setPrePosition(
          messageContentSectionRef!.current!.getBoundingClientRect().height
        );
        loadMoreChat();
      }
    }
  };

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
            <li className="outgoing" key={i}>
              <Chat
                message={data[i].message}
                isIncoming={false}
                key={data[i].createdAt}
              ></Chat>
            </li>
          );
        } else {
          ChatLogs.push(
            <li className="incoming" key={i}>
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
            <li className="outgoing" key={i}>
              <Chat
                message={data[i].message}
                isIncoming={false}
                key={data[i].createdAt}
              ></Chat>
            </li>
          );
        } else {
          ChatLogs.push(
            <li className="incoming" key={i}>
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
    return (
      <ul className="messageContent__ul" ref={messageContentUlRef}>
        {isLoadMoreChat && (
          <span className="loadingMoreChat__icon">
            <FontAwesomeIcon icon={LoadingIcon} spin={true}></FontAwesomeIcon>
          </span>
        )}
        {ChatLogs}
      </ul>
    );
  };
  const scrollToLastMessage = () => {
    //scroll into end of ul that contain messages
    messageContentUlRef.current?.scrollIntoView({
      block: "end",
    });
  };
  const scrollToPrePosition = (prePosition: number) => {
    messageContentUlRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
    // console.log(
    //   `%cPP: ${prePosition}`,
    //   "background: #292d3e; color: #f07178; font-weight: bold"
    // );
    setTimeout(() => {
      messageContentSectionRef.current?.scrollTo({
        top: prePosition,
      });
    }, 500);
  };
  useEffect(() => {
    if (newMessage == "") {
      setNewMessageIsEmpty(true);
    } else {
      setNewMessageIsEmpty(false);
    }
  }, [newMessage]);
  //Scroll to the very end message when render out msg

  const topSignalRef = useRef<HTMLDivElement>(null);
  //listener to messageContentUl scroll to top
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
          <div className="receiverIn4__container" ref={topSignalRef}>
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
          <div
            ref={messageContentSectionRef}
            className="messageContent__section"
            onScroll={() => {
              onScrollToLoadMoreChat();
            }}
          >
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
                  // scrollToLastMessage();
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
