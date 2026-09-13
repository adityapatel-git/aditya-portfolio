"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Message = {
  id: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
};

export default function MessagesEditor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const supabase = createSupabaseBrowserClient();

  async function loadMessages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setStatus("Failed to load messages.");
    } else {
      setMessages(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function toggleRead(message: Message) {
    setUpdatingId(message.id);
    setStatus("");

    const nextReadState = !message.is_read;

    const { error } = await supabase
      .from("contact_messages")
      .update({
        is_read: nextReadState,
      })
      .eq("id", message.id);

    if (error) {
      console.error(error);
      setStatus("Failed to update message.");
      setUpdatingId(null);
      return;
    }

    setMessages((current) =>
      current.map((item) =>
        item.id === message.id
          ? { ...item, is_read: nextReadState }
          : item,
      ),
    );

    setUpdatingId(null);
  }

  async function deleteMessage(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) return;

    setDeletingId(id);
    setStatus("");

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setStatus("Failed to delete message.");
      setDeletingId(null);
      return;
    }

    setMessages((current) => current.filter((item) => item.id !== id));
    setDeletingId(null);
  }

  const unreadCount = messages.filter((message) => !message.is_read).length;

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            07 / Messages
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Messages
          </h1>
        </div>

        <div className="text-right font-mono text-xs text-zinc-500">
          <div>{messages.length} total</div>
          <div>{unreadCount} unread</div>
        </div>
      </div>

      {status && (
        <p className="border border-zinc-800 px-4 py-3 text-sm text-zinc-400">
          {status}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-zinc-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="border border-dashed border-zinc-800 px-6 py-12 text-center">
          <p className="text-sm text-zinc-500">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((item) => (
            <article
              key={item.id}
              className={`border p-5 transition ${
                item.is_read
                  ? "border-zinc-800 bg-transparent"
                  : "border-zinc-700 bg-zinc-900/40"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${item.email}`}
                      className="font-medium text-zinc-100 hover:underline"
                    >
                      {item.email}
                    </a>

                    {!item.is_read && (
                      <span className="border border-zinc-600 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                        Unread
                      </span>
                    )}
                  </div>

                  <p className="mt-1 font-mono text-xs text-zinc-600">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleRead(item)}
                    disabled={updatingId === item.id}
                    className="border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                  >
                    {updatingId === item.id
                      ? "Updating..."
                      : item.is_read
                        ? "Mark unread"
                        : "Mark as read"}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteMessage(item.id)}
                    disabled={deletingId === item.id}
                    className="border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>

              <div className="mt-5 border-t border-zinc-800 pt-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-400">
                  {item.message}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}