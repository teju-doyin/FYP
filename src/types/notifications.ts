export type NotificationType = "comment" | "feedback" | "submission";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  receiverId: string;
  studentId: string;
  chapterId: number;
  feedbackDocId?: string | null;
  commentId?: string | null;
  title: string;
  preview: string;
  read: boolean;
  createdAt: Date;
}
