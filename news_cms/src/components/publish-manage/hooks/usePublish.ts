import {useEffect, useState} from 'react'
import {reqGetNewsListByPublishState, reqUpdateNews, reqDeleteNews, reqGetOfflineNewsList} from '@/api/news';
import {notification} from 'antd'
import {User} from "@/views/user-manage/types";
import {News} from "@/views/news-manage/types";
import {useAuthContext} from "@/components/Auth/hooks/useAuthContext";
import {getNowDate} from "@/utils/dateFormate";

const usePublish = (publishState: number) => {
    const {user} = useAuthContext()
    console.log(user)
    const {username, region, roleId} = user
    const [dataSource, setDataSource] = useState<News[]>([])
    const getNewsListByPublishState = () => {
        // 获取已下线的新闻
        if (publishState === 3) {
            console.log(roleId, region);
            reqGetOfflineNewsList().then(res => {
                // console.log('已下线',res.data);
                let list = res.data as News[]
                console.log(list);
                setDataSource(list)
            })
        } else reqGetNewsListByPublishState(publishState, username!).then(res => {
            // console.log('根据状态获取新闻列表',res.data);
            setDataSource(res.data)
        })

    }
    useEffect(() => {
        getNewsListByPublishState()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlePublish = (id: string) => {
        console.log(id);
        reqUpdateNews(id, {
            publishState: 2,
            publishTime: getNowDate()
        }).then((res: any) => {
            if (res.code === 20000) {
                notification.info({
                    message: `通知`,
                    description:
                        `您可以到【发布管理/已发布】中查看您的新闻`,
                    placement: 'bottomRight',
                });
                getNewsListByPublishState()
            }

        })

    }
    const handleSunset = (id: string) => {
        console.log(id);
        reqUpdateNews(id, {
            publishState: 3
        }).then((res: any) => {
            if (res.code === 20000) {
                notification.info({
                    message: `通知`,
                    description:
                        `您可以到【发布管理/已下线】中查看您的新闻`,
                    placement: 'bottomRight',
                });
                getNewsListByPublishState()
            }

        })
    }
    const handleDelete = (id: string) => {
        console.log(id);
        reqDeleteNews(id).then((res: any) => {
            if (res.code === 20000) {
                notification.info({
                    message: `通知`,
                    description:
                        `您已经删除该新闻`,
                    placement: 'bottomRight',
                });
                getNewsListByPublishState()
            }

        })
    }

    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete
    }
}
export default usePublish
