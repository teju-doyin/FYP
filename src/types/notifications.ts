// src/types/notifications.ts
export type NotificationKind = "comment" | "feedback" |"submission";

export interface NotificationItem {
  id: string;
  type: NotificationKind;
  receiverId: string;
  studentId: string;
  chapterId: number;
  feedbackDocId?: string;
  commentId?: string;
  title: string;
  preview: string;
  read: boolean;
  createdAt: Date;
}
