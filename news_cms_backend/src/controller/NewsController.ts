/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-10 10:08:02
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 18:47:01
 * @FilePath: \news_cms\src\controller\NewsController.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
import { Context } from 'koa';
import NewsService from '../service/NewsService';
import { News } from '../entity/News';
import querystring from 'querystring';
export default class NewsController {
  /**
   * @description: 获取所有新闻列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listNews(ctx: Context) {
    try {
      const newsList = await NewsService.listNews();
      const returnList = newsList.map((news: News) => ({
        ...news,
        content: querystring.unescape(news.content),
      }));
      ctx.success(returnList);
    } catch (error) {
      ctx.fail('查询失败');
    }
  }
  /**
   * @description: 获取当前用户草稿列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listDraft(ctx: Context) {
    try {
      const payload = ctx.state.user;
      console.log('payload', payload);
      const userId = payload.userId;
      const newsList = await NewsService.listDraft(userId);
      ctx.success(
        newsList.map((news: News) => ({ ...news, content: querystring.unescape(news.content) })),
      );
    } catch (error) {
      ctx.fail('查询失败');
    }
  }
  /**
   * @description: 获取当前用户审核列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listAudit(ctx: Context) {
    try {
      const payload = ctx.state.user;
      console.log('payload', payload);
      const userId = payload.userId;
      const newsList = await NewsService.listAudit(userId);
      ctx.success(
        newsList.map((news: News) => ({ ...news, content: querystring.unescape(news.content) })),
      );
    } catch (error) {
      ctx.fail('查询失败');
    }
  }

  /**
   * @description: 添加新闻
   * @param {Context} ctx
   * @return {*}
   */
  public static async addNews(ctx: Context) {
    try {
      const payload = ctx.state.user;
      const { label, categoryId, content } = ctx.request.body;
      console.log(label, categoryId, content);

      console.log('payload', payload);
      const { userId, regionId } = payload;
      const serializeContent = querystring.escape(content);

      const news = {
        label,
        content: serializeContent,
        categoryId,
        regionId,
        authorId: userId,
      } as News;
      await NewsService.addNews(news);
      ctx.success('新增成功');
    } catch (error) {
      console.log(error);

      ctx.fail('新增失败');
    }
  }
  /**
   * @description: 更新新闻
   * @param {Context} ctx
   * @return {*}
   */
  public static async updateNews(ctx: Context) {
    try {
      const payload = ctx.state.user;
      const newsId = ctx.params.id;
      console.log(ctx.request.body);
      
      console.log('payload', payload);
      const { userId, regionId } = payload;

      const news = { ...ctx.request.body, authorId: userId } as News;
      if (news.content) {
        news.content = querystring.escape(news.content);
      }
      await NewsService.updateNews(newsId, news);
      ctx.success('修改成功');
    } catch (error) {
      console.log(error);
      
      ctx.fail('修改失败');
    }
  }
  /**
   * @description: 删除新闻
   * @param {Context} ctx
   * @return {*}
   */
  public static async deleteNews(ctx: Context) {
    try {
      const newsId = ctx.params.id;
      await NewsService.deleteNews(newsId);
      ctx.success('删除成功');
    } catch (error) {
      ctx.fail('删除失败');
    }
  }
  /**
   * @description: 获取新闻详情
   * @param {Context} ctx
   * @return {*}
   */
  public static async newsDetail(ctx: Context) {
    try {
      const newsId = ctx.params.id;
      console.log('newsId', newsId);

      const news = await NewsService.newsDetail(newsId);
      console.log(news);
      news.content = querystring.unescape(news.content);
      ctx.success(news);
    } catch (error) {
      ctx.fail('获取失败');
    }
  }
  /**
   * @description: 获取所有审核列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listAllAudit(ctx: Context) {
    try {
      const newsList = await NewsService.listAllAudit();
      ctx.success(
        newsList.map((news: News) => ({ ...news, content: querystring.unescape(news.content) })),
      );
    } catch (error) {
      ctx.fail('查询失败');
    }
  }
  /**
   * @description: 获取所有已下线的新闻列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listAllSunset(ctx: Context) {
    try {
      const newsList = await NewsService.listAllSunset();
      ctx.success(
        newsList.map((news: News) => ({ ...news, content: querystring.unescape(news.content) })),
      );
    } catch (error) {
      ctx.fail('查询失败');
    }
  }
  /**
   * @description: 获取所有已发布的新闻列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listAllPublished(ctx: Context) {
    try {
      const newsList = await NewsService.listAllPublished();
      ctx.success(
        newsList.map((news: News) => ({ ...news, content: querystring.unescape(news.content) })),
      );
    } catch (error) {
      ctx.fail('查询失败');
    }
  }
  /**
   * @description: 通过发布状态获取当前用户的新闻列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listByPublishState(ctx: Context) {
    try {
      const payload = ctx.state.user;
      console.log('payload', payload);
      const userId = payload.userId;
      const publishState = ctx.query.publishState;
      const newsList = await NewsService.listByPublishState(publishState, userId);
      ctx.success(
        newsList.map((news: News) => ({ ...news, content: querystring.unescape(news.content) })),
      );
    } catch (error) {
      ctx.fail('查询失败');
    }
  }
  /**
   * @description: 获取用户最常浏览的新闻列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listMostBrowsingNews(ctx: Context) {
    try {
      console.log('获取用户最常浏览的新闻列表');

      const newsList = await NewsService.listMostBrowsingNews();
      console.log('最常浏览', newsList);

      ctx.success(
        newsList.map((news: News) => ({ ...news, content: querystring.unescape(news.content) })),
      );
    } catch (error) {
      ctx.fail('获取失败');
    }
  }
  /**
   * @description: 获取用户点赞最多的新闻列表
   * @param {Context} ctx
   * @return {*}
   */
  public static async listMostLikesNews(ctx: Context) {
    try {
      const newsList = await NewsService.listMostLikesNews();

      ctx.success(
        newsList.map((news: News) => ({ ...news, content: querystring.unescape(news.content) })),
      );
    } catch (error) {
      ctx.fail('获取失败');
    }
  }
}
