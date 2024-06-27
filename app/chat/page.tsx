"use client";
import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IoIosSend, IoMdExit, IoMdPerson, IoMdRefresh } from "react-icons/io";
import { Message, useChatStore } from "../store/chatStore";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { throttle } from "lodash";
import { client } from "../lib/io";
import ThemeProviderWrapper from "../lib/themeProvider";
import { GradientCircularProgress } from "../lib/landing-page/components/Hero";

const MAX_CALLS = 5;
const TIME_FRAME = 2000; // 2 seconds
const DISABLE_TIME = 10000; // 10 seconds

export default function Page() {
  const {
    inputText,
    isLoading,
    messages,
    roomInfo,
    isPartnerLeft,
    isInputDisabled,
    updateInputText,
    updateIsLoading,
    updateMessages,
    updateRoomInfo,
    updateIsPartnerLeft,
    updateIsInputDisabled,
    reset,
  } = useChatStore((state) => state);

  const [callCount, setCallCount] = useState(0);
  const [lastReset, setLastReset] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCallCount(0);
      setLastReset(Date.now());
    }, TIME_FRAME);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (inputText.trim().length > 0) {
      const newMessage: Message = {
        sender: client.id ?? "",
        message: inputText,
        createdAt: new Date(),
        roomInfo: roomInfo,
      };

      client.emit("chat", newMessage);

      updateInputText("");
    } else {
      alert("Type a Message");
    }
  }, [inputText, roomInfo, updateInputText]);

  const resetInputDisabled = () => {
    updateIsInputDisabled(false);
  };

  const throttledSendMessage = useCallback(
    throttle(
      () => {
        if (isInputDisabled) {
          alert(
            "You have reached the maximum number of messages. Please wait 10sec."
          );
          return;
        }

        if (callCount < MAX_CALLS) {
          handleSendMessage();
          setCallCount((prev) => prev + 1);
        } else {
          alert(
            "You have reached the maximum number of messages. Please wait."
          );
          updateIsInputDisabled(true);
          setTimeout(resetInputDisabled, DISABLE_TIME);
        }
      },
      10000,
      { trailing: false }
    ),
    [handleSendMessage, callCount]
  );

  const handleSendMessage1 = () => {
    const now = Date.now();
    if (now - lastReset >= TIME_FRAME) {
      setCallCount(0);
      setLastReset(now);
    }
    throttledSendMessage();
  };

  const hadleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage1();
    }
  };

  const handleFindUser = () => {
    updateIsLoading(true);
    if (client.disconnected && !client.active) {
      client.connect();
    }

    client.emit("findroom");

    client.on("matched", (data) => {
      updateIsLoading(false);
      updateRoomInfo(data);
    });

    client.on("chat", (data) => {
      updateMessages(data);
    });

    client.on("partnerDisconnected", (data) => {
      updateIsPartnerLeft(true);
    });
  };

  const getPartnerNickName = () =>
    roomInfo.users.find((item) => item !== client.id)?.slice(0, 4);

  const handleOnPressOut = () => {
    client.off();
    client.disconnect();
    reset();
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({
        behavior: "instant",
      });
    }
  }, [messages]);

  return isLoading ? (
    <div className="flex flex-1 justify-center items-center mb-32">
      <CircularProgress />
    </div>
  ) : (
    <>
      {/* 상대 유저 정보 */}
      {client.active && (
        <div className="flex flex-col min-h-20 max-w-screen-lg bg-primary border-b justify-center px-4">
          <div className="flex justify-between items-center min-h-16">
            <div className="flex">
              <div className="bg-blue-200  h-16 rounded-full justify-center items-center flex text-5xl font-bold">
                <IoMdPerson className="text-primary bg-secondary10 rounded-full p-1" />
              </div>

              <div className="ml-2 flex flex-col min-h-full justify-center">
                <p>{getPartnerNickName()}</p>
                {/* <div className="flex gap-1">
                  <p>@ENTP</p>
                  <p>@22</p>
                  <p>@Korean</p>
                </div> */}
              </div>
            </div>
            <div>
              {/* <button className="mr-6">
                <IoMdRefresh size={30} className="text-blue" />
              </button> */}

              <button type="button" onClick={handleOnPressOut}>
                <IoMdExit size={30} className="text-darkGray" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!client.active && (
        <div className="flex flex-1 justify-center items-center">
          <div className="self-center">
            <ThemeProviderWrapper>
              <GradientCircularProgress
                title="Touch"
                subTitle="to find"
                onPress={handleFindUser}
              />
            </ThemeProviderWrapper>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-auto p-4">
        {client.active && (
          <div className="self-center">
            <p className="text-black font-bold">Matched!</p>
          </div>
        )}

        <div className="flex-1"></div>
        {messages.map((item, index) =>
          item.sender === client.id ? (
            <div
              key={item.createdAt + index.toString()}
              className="self-end ml-5"
            >
              {/* 나의 메시지 */}

              <div className="text-right text-xs p-1 font-bold">
                {item.sender.slice(0, 4)}
              </div>
              <div className="bg-blue p-2 rounded-lg rounded-tr-none self-start break-all sm:max-w-screen-sm text-primary font-light text-base">
                {item.message}
              </div>
            </div>
          ) : (
            <div
              key={item.createdAt + index.toString()}
              className="self-start mr-5 "
            >
              {/* 상대 메시지 */}
              <div className="self-start text-xs p-1 font-bold">
                {item.sender.slice(0, 4)}
              </div>
              <div className="bg-secondary10 p-2 rounded-lg self-start break-all sm:max-w-screen-sm rounded-tl-none">
                {item.message}
              </div>
            </div>
          )
        )}
        {isPartnerLeft && (
          <div className="self-center text-center">
            <p className="text-black font-bold">
              {getPartnerNickName()} left the room...
            </p>
            <p className="text-black font-bold">find new </p>
          </div>
        )}

        <div ref={scrollRef} className="min-h-0"></div>
      </div>
      {client.active && (
        <div className="flex justify-between items-center w-full min-h-14 px-4">
          <input
            autoFocus={true}
            disabled={isPartnerLeft}
            maxLength={200}
            value={inputText}
            onChange={(e) => updateInputText(e.target.value)}
            onKeyDown={(e) => hadleEnterPress(e)}
            className="w-full h-10 rounded-full outline-none text-black border-2 px-4 font-light text-sm"
            placeholder="Type a message..."
          />
          <button
            disabled={isPartnerLeft}
            type="button"
            onClick={handleSendMessage}
            className="w-8 h-8 flex justify-center items-center bg-blue rounded-full ml-2"
          >
            <IoIosSend className="text-primary rounded-full" size={20} />
          </button>
        </div>
      )}
    </>
  );
}
