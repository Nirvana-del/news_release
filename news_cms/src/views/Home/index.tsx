import {reqGetMostBrowsingNews, reqGetMostLikesNews, reqGetAllPublishedNews} from '@/api/news'
import {NavLink} from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import {Row, Col, Card, List, Drawer, Avatar} from 'antd'
import {UserOutlined} from '@ant-design/icons';
import {groupBy} from 'lodash'
import {News} from "@/views/news-manage/types";
import BarChart from "@/views/Home/BarChart";
import PieChart from "@/views/Home/PieChart";
import {store} from '@/redux'
import {useAuthContext} from "@/components/Auth/hooks/useAuthContext";
import {RoleMap} from "@/views/permission-manage/types/role";

const logo = new URL(`@/assets/images/cat.svg`, import.meta.url).href;
// const logo = `../../assets/images/logo.jpg`
const {Meta} = Card;
const Home: React.FC = () => {
    const {user} = useAuthContext()
    const {username, region, role, id} = user
    const {roleName} = role || {}

    const [mostBrowsingNews, setMostBrowsingNews] = useState<News[]>([])
    const [mostLikesNews, setMostLikesNews] = useState<News[]>([])
    const [publishedList, setPublishedList] = useState<News[]>([])

    const [barData, setBarData] = useState<object>({});
    const [pieData, setPieData] = useState<object>({});
    const [open, setOpen] = useState(false);
    const navItems = ['首页']
    useEffect(() => {
        store.dispatch({
            type: 'CHANGE_PAGE',
            payload: navItems
        })
    }, []);

    // 最常浏览新闻
    useEffect(() => {
        reqGetMostBrowsingNews().then(res => {
            console.log('最常浏览',res.data);
            setMostBrowsingNews(res.data)
        }).catch(res => {
            console.log(res)
        })
    }, [])
    // 最多点赞新闻
    useEffect(() => {
        reqGetMostLikesNews().then(res => {
            console.log('最多点赞',res.data);
            setMostLikesNews(res.data)
        })
    }, [])
    // 所有已发布的新闻
    useEffect(() => {
        reqGetAllPublishedNews().then(res => {
            console.log('所有已发布', res.data);
            const reqList = res.data
            setPublishedList(reqList)
            const groupObj = groupBy(reqList, (item: News) => item.category?.label)
            console.log('groupObj', groupObj);
            setBarData(groupObj)
        })
    }, [])

    const handleOpen = () => {
        const newList = publishedList.filter(item =>  item.authorId === id!)
        setOpen(true)
        let groupObj = groupBy(newList, (item: News) => item.category!.label)
        setPieData(groupObj)
    }
    return (
        <div id="can" style={{height: '500px'}}>
            <Row gutter={16} style={{
                marginBottom: '20px'
            }}>
                <Col span={8}>
                    <Card title="用户最常浏览" bordered
                          style={{
                              height: '320px'
                          }}
                          hoverable>
                        <List
                            dataSource={mostBrowsingNews}
                            renderItem={(item) => (
                                <List.Item>
                                    <NavLink to={`/news-manage/preview/${item.id}`}> {item.label}</NavLink>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多"
                          style={{
                              height: '320px'
                          }}
                          hoverable>
                        <List
                            dataSource={mostLikesNews}
                            renderItem={(item) => (
                                <List.Item>
                                    <NavLink to={`/news-manage/preview/${item.id}`}> {item.label}</NavLink>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        bordered
                        hoverable
                        style={{
                            height: '320px'
                        }}
                        cover={<img height={170}  alt="example" src={logo}/>}
                        actions={[
                            <UserOutlined key="setting" onClick={() => handleOpen()}/>
                        ]}
                    >
                        <Meta title={<div>用户名：{username}</div>}
                              description={
                                  <div>
                                      <b>{role?.roleType !== RoleMap.SUPER_ADMIN ? region?.label : '全球'}</b>
                                      <span style={{paddingLeft: '30px'}}>{roleName}</span>
                                  </div>
                              }/>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <BarChart renderData={barData}></BarChart>
                </Col>
            </Row>
            <Drawer
                width='700px'
                title="个人新闻分类"
                placement="right"
                onClose={() => setOpen(false)}
                open={open}
                closable>
                <PieChart renderData={pieData}></PieChart>
            </Drawer>
        </div>
    )
}
export default Home




