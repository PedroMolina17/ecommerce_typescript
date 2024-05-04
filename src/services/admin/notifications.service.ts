import { PrismaClient } from "@prisma/client";
export class NotificationsService {
  constructor(private readonly prisma: PrismaClient) {}

  async createNotification(data: {
    message: string;
    userId: number;
    typeNotification: string;
  }) {
    const existingNotification = await this.prisma.notification.findFirst({
      where: {
        typeNotification: data.typeNotification,
        userId: data.userId,
        read: false,
        message: data.message,
      },
    });
    if (!existingNotification) {
      const notification = await this.prisma.notification.create({ data });
      return notification;
    }

    return existingNotification;
  }
  async getNotifications() {
    const notifications = await this.prisma.notification.findMany();
    return { notifications };
  }
  async markNotificationReadById(id: number) {
    const notification = await this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
    return notification;
  }
  async markAllNotificationRead() {
    const notifications = await this.prisma.notification.updateMany({
      where: { read: false },
      data: { read: true },
    });
    return notifications;
  }
  sendNotification() {}
}
