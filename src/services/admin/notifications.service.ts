import { PrismaClient } from "@prisma/client";
export class NotificationsService {
  constructor(private readonly prisma: PrismaClient) {}

  async createNotification(data: { message: string; userId: number }) {
    const notification = await this.prisma.notification.create({ data });

    return notification;
  }

  sendNotification() {}
}
