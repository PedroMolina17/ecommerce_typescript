import { PrismaClient } from "@prisma/client";
import { NotificationsService } from "../../services/admin/notifications.service";
export class InventoryCheckerService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly notificationService: NotificationsService,
  ) {}

  async checkStockProducts() {
    const products = await this.prisma.products.findMany({
      where: {
        stock: {
          lt: 5,
        },
      },
    });

    return products;
  }

  async sendNotification(products: { id: number; name: string }[]) {
    const notification = {
      message: `Hay ${products.length} productos con stock bajo`,
      userId: 1,
      typeNotification: "stock",
    };

    return await this.notificationService.createNotification(notification);
  }
}
