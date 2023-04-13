import request from '../utils/request.js'
import {Category, News} from "@/views/news-manage/types";

// 获取新闻类别
export const reqGetNewsCategories = () => {
    return request.get(`/category/list`);
}

// 删除新闻类别
export const reqDeleteNewsCategory = (id:number) => {
    return request.delete(`/category/${id}`);
}

// 更新新闻类别信息
export const reqUpdateNewsCategory = (id:number, category:Category) => {
    const { label } = category
    return request.patch(`/category/${id}`,{
        label,
        value:label
    });
}

// 新增新闻类别信息
export const reqAddNewsCategory = (category:Category) => {
    return request.post(`/category`,{
        ...category
    });
}

// 新增新闻
export const reqAddNews = (news:News) => {
    return request.post(`/news`,{
        ...news
    });
}

// 更新新闻内容
export const reqUpdateNews = (id:string, news:Partial<News>) => {
    return request.patch(`/news/${id}`,{
        ...news
    });
}

// 将草稿箱内容上传至审核列表
export const reqSendNews = (id:string) => {
    return request.patch(`/news/${id}`,{
        auditState: 1
    });
}

// 删除新闻
export const reqDeleteNews = (id:string) => {
    return request.delete(`/news/${id}`);
}

// 草稿列表
export const reqGetDraftList = () => {
    return request.get(`/news/draft`)
}

// 当前用户的审核列表
export const reqGetUserAuditList = () => {
    return request.get(`/news/audit`)
}

// 获取处于审核状态的新闻列表
export const reqGetAuditList = () => {
    return request.get(`/news/drafts`)
}

// 通过发布状态获取当前用户的新闻列表
export const reqGetNewsListByPublishState = (publishState:number) => {
    return request.get(`/news?publishState=${publishState}`)
}

// 获取已下线的新闻列表
export const reqGetOfflineNewsList = () => {
    return request.get(`/news/allSunset`)
}

// 新闻详情
export const reqGetNewsDetail = (id:string) => {
    return request.get(`/news/${id}`)
}

// 获取用户最常浏览的新闻列表
export const reqGetMostBrowsingNews = () => {
    return request.get(`/news/mostBrowsing`)
}

// 获取用户点赞最多的新闻列表
export const reqGetMostLikesNews = () => {
    return request.get(`/news/mostLike`)
}

// 获取所有已发布的新闻列表
export const reqGetAllPublishedNews = () => {
    return request.get(`/news/allPublished`)
}
