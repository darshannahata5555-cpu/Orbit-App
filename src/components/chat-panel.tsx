"use client";

import { useState } from "react";
import { Hash, Megaphone, MessageCircle, Send, UsersRound } from "lucide-react";
import { channels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const buckets = [
  { label: "Mentions", icon: Hash },
  { label: "Announcements", icon: Megaphone },
  { label: "Groups", icon: UsersRound },
  { label: "Direct messages", icon: MessageCircle },
];

export function ChatPanel() {
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setNewMessage("");
  };

  return (
    <section className="space-y-6">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => setActiveChannel(channel)}
            className={cn(
              "h-20 min-w-[92px] rounded-[8px] px-3 text-left text-sm font-semibold transition sm:h-28 sm:min-w-[132px]",
              activeChannel.id === channel.id ? "bg-[#111111] text-white" : "bg-[#D8D8D6] text-[#111111]",
            )}
          >
            {channel.name}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {buckets.map((bucket) => {
          const Icon = bucket.icon;
          return (
            <div key={bucket.label} className="rounded-[22px] bg-white p-4">
              <div className="flex items-center gap-4">
                <Icon className="h-6 w-6" />
                <h2 className="text-[22px] font-medium">{bucket.label}</h2>
              </div>
              <div className="mt-4 grid gap-2">
                {activeChannel.messages.slice(0, bucket.label === "Direct messages" ? 4 : 2).map((message) => (
                  <div key={`${bucket.label}-${message.id}`} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 h-6 w-6 rounded-md bg-[#D8D8D6]" />
                    <div className="min-w-0">
                      <p className="font-semibold">{message.author}</p>
                      <p className="truncate text-neutral-600">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[24px] bg-[#D8D8D6] p-3">
        <div className="flex items-center gap-2 rounded-[18px] bg-white px-4 py-3">
          <input
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder={`Message ${activeChannel.name}`}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-neutral-500"
          />
          <button onClick={sendMessage} className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111] text-white">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
