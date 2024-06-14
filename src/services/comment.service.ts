import { PrismaClient } from "@prisma/client";

export class CommentService {
  constructor(private readonly prisma: PrismaClient) {}
  async createComment(data: {
    userId: number;
    productId: number;
    comment: string;
  }) {
    const newComment = await this.prisma.comment.create({
      data: {
        ...data,
      },
    })

    return {message: "comment created"}
  }

  async getCommentsByProductId(productId: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        productId
      }
    })
    return {message: "comments found", comments}
  }

  async getCommentsByUserId(userId: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        userId
      }
    })
    return {message: "comments found", comments}
  }

  async deleteComment(id: number) {
      const comment = await this.prisma.comment.delete({
        where: {
          id
        }
      })

      return {message: "comment deleted"}
  }

  async updateComment(data: { commentId: number; comment: string }) {
    const { commentId, comment } = data;
    const commentUpdated = await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        comment,
      },
    });
    return { message: "comment updated", data: commentUpdated };
  }
}
