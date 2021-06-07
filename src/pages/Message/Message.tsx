import React, { useState, useEffect, useRef } from "react";
import { Logo } from "pages/Header/Logo";
import { Nav } from "pages/Header/Nav";
import { SearchNNewPost } from "pages/Header/SearchNNewPost";
import { User } from "pages/SideNav/User";
import { Utility } from "pages/Header/Utility";
import { Chat } from "pages/Message/Chat";
import "styles/Message.css";
import avatar from "styles/images/avatar.webp";

import { FriendInformation } from "pages/Message/FriendInformation";

interface friendData {
  friendName: string;
  friendId: string;
  friendAvatar: string;
}
interface messageInitData {
  userName: string;
  friendList: friendData[];
}

interface MessageProps {}

export const Message: React.FC<MessageProps> = ({}) => {
  const Data: messageInitData = {
    userName: "BearBB",
    friendList: [
      {
        friendName: "UnUn",
        friendId: "fr01",
        friendAvatar: avatar,
      },
      {
        friendId: "fr02",
        friendName: "hoa__nt",
        friendAvatar: avatar,
      },
      {
        friendId: "fr03",
        friendName: "hoa__nt1",
        friendAvatar: avatar,
      },
      {
        friendId: "fr04",
        friendName: "hoa__nt2",
        friendAvatar: avatar,
      },
      {
        friendId: "fr05",
        friendName: "hoa__nt3",
        friendAvatar: avatar,
      },
      {
        friendId: "fr06",
        friendName: "hoa__nt4",
        friendAvatar: avatar,
      },
      {
        friendId: "fr07",
        friendName: "hoa__nt5",
        friendAvatar: avatar,
      },
      {
        friendId: "fr08",
        friendName: "hoa__nt6",
        friendAvatar: avatar,
      },
      {
        friendId: "fr09",
        friendName: "hoa__nt7",
        friendAvatar: avatar,
      },
      {
        friendId: "fr10",
        friendName: "hoa__nt8",
        friendAvatar: avatar,
      },
      {
        friendId: "fr12",
        friendName: "hoa__nt9",
        friendAvatar: avatar,
      },
      {
        friendId: "fr13",
        friendName: "hoa__nt10",
        friendAvatar: avatar,
      },
      {
        friendId: "fr14",
        friendName: "hoa__nt11",
        friendAvatar: avatar,
      },
      {
        friendId: "fr15",
        friendName: "hoa__nt12",
        friendAvatar: avatar,
      },
      {
        friendId: "fr16",
        friendName: "hoa__nt13",
        friendAvatar: avatar,
      },
      {
        friendId: "fr17",
        friendName: "hoa__nt14",
        friendAvatar: avatar,
      },
    ],
  };
  interface MessageData {
    message: string;
    sender: {
      username: string;
      // userId: string
    };
    receiver: {
      username: string;
    };
    createdAt: string;
  }
  // type MessageLog
  const MessagesData = [
    {
      message: "high hope",
      sender: {
        username: "bearbb",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "swaggie",
      },
      createdAt: "2021-04-22T05:10:44.195Z",
    },
    {
      message: "high hope 2 asdacasdawnmnmawucaiwlcallwklaksldkascnajsjwuacj",
      sender: {
        username: "swaggie",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "bearbb",
      },
      createdAt: "2021-04-22T05:10:47.195Z",
    },
    {
      message: "high hope 2 asdacasdawnmnmawucaiwlcallwklaksldkascnajsjwuacj",
      sender: {
        username: "swaggie",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "bearbb",
      },
      createdAt: "2021-04-22T05:10:47.195Z",
    },
    {
      message: "high hope 2 asdacasdawnmnmawucaiwlcallwklaksldkascnajsjwuacj",
      sender: {
        username: "swaggie",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "bearbb",
      },
      createdAt: "2021-04-22T05:10:47.195Z",
    },
    {
      message: "high hope 2 asdacasdawnmnmawucaiwlcallwklaksldkascnajsjwuacj",
      sender: {
        username: "swaggie",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "bearbb",
      },
      createdAt: "2021-04-22T05:10:47.195Z",
    },
    {
      message: "high hope 2 asdacasdawnmnmawucaiwlcallwklaksldkascnajsjwuacj",
      sender: {
        username: "swaggie",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "bearbb",
      },
      createdAt: "2021-04-22T05:10:47.195Z",
    },
    {
      message: "high hope 2 asdacasdawnmnmawucaiwlcallwklaksldkascnajsjwuacj",
      sender: {
        username: "swaggie",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "bearbb",
      },
      createdAt: "2021-04-22T05:10:47.195Z",
    },
    {
      message: "high hope 2 asdacasdawnmnmawucaiwlcallwklaksldkascnajsjwuacj",
      sender: {
        username: "swaggie",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "bearbb",
      },
      createdAt: "2021-04-22T05:10:47.195Z",
    },
    {
      message: "high hope 2 asdacasdawnmnmawucaiwlcallwklaksldkascnajsjwuacj",
      sender: {
        username: "swaggie",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "bearbb",
      },
      createdAt: "2021-04-22T05:10:47.195Z",
    },
    {
      message: "high hope 2 asdacasdawnmnmawucaiwlcallwklaksldkascnajsjwuacj",
      sender: {
        username: "swaggie",
        //TODO: change from server to send back userId too
      },
      receiver: {
        username: "bearbb",
      },
      createdAt: "2021-04-22T05:10:47.195Z",
    },
  ];
  const [currentFriend, setCurrentFriend] = useState<friendData>(
    Data.friendList[0]
  );
  const currentFriendHandler = (data: any) => {
    //delete pre active class on pre currentFriend
    let preDoc = document.getElementsByClassName(currentFriend.friendId)[0];
    console.log(preDoc);
    preDoc.classList.remove("currentFriend__container--active");
    console.log(preDoc);
    //set current friend on that friend
    setCurrentFriend(data);
    //add currentFriend__container--active to that html element
    let doc = document.getElementsByClassName(data.friendId)[0];
    doc.classList.add("currentFriend__container--active");
  };
  const nullOnclickHandler = () => {
    console.log(
      `%cDO NOTHING`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
  };
  const [currentUser, setCurrentUser] = useState<string>("bearbb");
  const [currentChatLog, setCurrentChatLog] =
    useState<Array<MessageData>>(MessagesData);
  const [newMessage, setNewMessage] = useState<string>("");
  const [newMessageIsEmpty, setNewMessageIsEmpty] = useState<boolean>(true);
  const ListingFriend = (friendsData: friendData[]): React.ReactElement => {
    let friendList = friendsData.map((friendData) => {
      return (
        <FriendInformation
          friendAvatar={friendData.friendAvatar}
          friendId={friendData.friendId}
          friendName={friendData.friendName}
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
    //TODO: Scroll to last message when submit a message to server
    console.log(
      `%cClicked`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
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
        if (data[i].sender.username === currentUser) {
          ChatLogs.push(
            <li className="outcoming">
              <Chat message={data[i].message} isIncoming={false}></Chat>
            </li>
          );
        } else {
          ChatLogs.push(
            <li className="incoming">
              <Chat message={data[i].message} isIncoming={true}></Chat>
            </li>
          );
        }
      } else {
        if (data[i].sender.username === currentUser) {
          ChatLogs.push(
            <li className="outcoming" ref={lastMessageRef}>
              <Chat message={data[i].message} isIncoming={false}></Chat>
            </li>
          );
        } else {
          ChatLogs.push(
            <li className="incoming" ref={lastMessageRef}>
              <Chat message={data[i].message} isIncoming={true}></Chat>
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
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
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
            <span className="friendList__userName">{Data.userName}</span>
          </div>
          <div className="friendList__listContainer">
            <div className="friendList__descriptionContainer">
              <span className="friendList__description">Messages</span>
            </div>
            <div className="friendList__lists">
              {ListingFriend(Data.friendList)}
            </div>
          </div>
        </div>
        <div className="message__container">
          <div className="receiverIn4__container">
            {currentFriend == null ? null : (
              <FriendInformation
                friendAvatar={currentFriend.friendAvatar}
                friendId={currentFriend.friendId}
                friendName={currentFriend.friendName}
                onClickHandler={nullOnclickHandler}
              />
            )}
          </div>
          {/* Place to render message log */}
          <div className="messageContent__section">
            {renderChatLog(MessagesData)}
          </div>
          <div className="newMessage__section">
            <div className="newMessage__container">
              <textarea
                placeholder="Message..."
                id="newMessage"
                className="newMessage__textarea"
                rows={1}
                onChange={(e) => {
                  newMessageOnChangeHandler(e);
                }}
              ></textarea>
              <span
                // onClick={newMessageSubmitHandler}
                onClick={scrollToLastMessage}
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