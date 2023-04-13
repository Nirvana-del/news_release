/*
 * @Author: 山上沙锅 2943223781@qq.com
 * @Date: 2023-04-10 10:08:02
 * @LastEditors: 山上沙锅 2943223781@qq.com
 * @LastEditTime: 2023-04-13 18:51:42
 * @FilePath: \news_cms\src\service\NewsService.ts
 * @Description:
 *
 * Copyright (c) 2023 by 山上沙锅, All Rights Reserved.
 */
import { LessThan, LessThanOrEqual, Not } from 'typeorm';
import { NewsRepository } from '../data-source';
import { News } from '../entity/News';
import { AuditState, PublishState } from '../types';

export default class NewsService {
  /**
   * @description: 新闻列表
   * @return {*}
   */
  public static async listNews(): Promise<Array<News>> {
    const newsList = await NewsRepository.find({
      relations: ['category', 'region'],
    });
    return newsList;
  }
  /**
   * @description: 草稿列表
   * @param {string} userId
   * @return {*}
   */
  public static async listDraft(userId: string): Promise<Array<News>> {
    console.log(userId);
    console.log(AuditState.Draft);

    const draftList = await NewsRepository.find({
      where: {
        authorId: userId,
        auditState: AuditState.Draft,
      },
      relations: ['category', 'region'],
    });

    console.log('draftList', draftList);

    return draftList;
  }
  /**
   * @description: 审核列表
   * @param {string} userId
   * @return {*}
   */
  public static async listAudit(userId: string): Promise<Array<News>> {
    const auditList = await NewsRepository.find({
      where: {
        authorId: userId,
        auditState: Not(AuditState.Draft),
        publishState: LessThanOrEqual(1),
      },
      relations: ['category', 'region'],
    });
    return auditList;
  }
  /**
   * @description: 全部审核列表
   * @return {*}
   */
  public static async listAllAudit(): Promise<Array<News>> {
    const auditList = await NewsRepository.find({
      where: {
        auditState: AuditState.UnderReview, // 审核中
      },
      relations: ['category', 'region'],
    });
    console.log('auditList', auditList);

    return auditList;
  }
  /**
   * @description: 全部已下线列表
   * @return {*}
   */
  public static async listAllSunset(): Promise<Array<News>> {
    const newsList = await NewsRepository.find({
      where: {
        publishState: PublishState.Offline,
      },
      relations: ['category', 'region'],
    });
    return newsList;
  }
  /**
   * @description: 全部已发布列表
   * @return {*}
   */
  public static async listAllPublished(): Promise<Array<News>> {
    const newsList = await NewsRepository.find({
      where: {
        publishState: PublishState.Published,
      },
      relations: ['category', 'region'],
    });
    return newsList;
  }
  /**
   * @description: 通过发布状态获取当前用户的新闻列表
   * @param {number} publishState
   * @param {string} authorId
   * @return {*}
   */
  public static async listByPublishState(
    publishState: number,
    authorId: string,
  ): Promise<Array<News>> {
    const newsList = await NewsRepository.find({
      where: {
        publishState,
        authorId,
      },
      relations: ['category', 'region'],
    });
    return newsList;
  }
  /**
   * @description: 新增新闻
   * @param {News} news
   * @return {*}
   */
  public static async addNews(news: News): Promise<void> {
    await NewsRepository.insert(news);
  }
  /**
   * @description: 修改新闻
   * @param {string} newsId
   * @param {News} news
   * @return {*}
   */
  public static async updateNews(newsId: string, news: News): Promise<void> {
    await NewsRepository.update(newsId, news);
  }
  /**
   * @description: 删除新闻
   * @param {string} newsId
   * @return {*}
   */
  public static async deleteNews(newsId: string): Promise<void> {
    await NewsRepository.delete(newsId);
  }
  /**
   * @description: 新闻详情
   * @param {string} newsId
   * @return {*}
   */
  public static async newsDetail(newsId: string): Promise<News> {
    const news = await NewsRepository.findOneBy({
      id: newsId,
    });
    return news;
  }
  /**
   * @description: 获取用户最常浏览的新闻列表
   * @return {*}
   */
  public static async listMostBrowsingNews(): Promise<News[]> {
    const newsList = await NewsRepository.find({
      where: {
        publishState: 2,
      },
      order: {
        views: 'DESC',
      },
      relations: ['category', 'region'],
    });
    console.log('newsList', newsList);

    return newsList;
  }
  /**
   * @description: 获取用户点赞最多的新闻列表
   * @return {*}
   */
  public static async listMostLikesNews(): Promise<News[]> {
    const newsList = await NewsRepository.find({
      where: {
        publishState: 2,
      },
      order: {
        stars: 'DESC',
      },
      relations: ['category', 'region'],
    });
    return newsList;
  }
}
