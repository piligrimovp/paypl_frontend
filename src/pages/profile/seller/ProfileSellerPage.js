import React from "react";
import {Alert, Breadcrumb, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import ProfileMenu from "../../../components/profileMenu/profileMenu";
import {CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import Orders from "../../../components/Orders/Orders";

export default function ProfileSellerPage() {
    const data = [
        {
            name: 'Page A', pv: 2400, amt: 2400,
        },
        {
            name: 'Page B', pv: 1398, amt: 2210,
        },
        {
            name: 'Page C', pv: 9800, amt: 2290,
        },
        {
            name: 'Page D', pv: 3908, amt: 2000,
        },
        {
            name: 'Page E', pv: 4800, amt: 2181,
        },
        {
            name: 'Page F', pv: 3800, amt: 2500,
        },
        {
            name: 'Page G', pv: 4300, amt: 2100,
        },
    ];
    return <section className={'container pb-5 p-0'}>
        <Breadcrumb className={'mb-4'}>
            <LinkContainer to={'/'} exact={true}>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to={'/profile'} exact={true}>
                <Breadcrumb.Item>Профиль</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Страница продавца</Breadcrumb.Item>
        </Breadcrumb>
        <div className={'row m-0 justify-content-between'}>
            <div className={'col-10 p-0'}>
                <div className={'row m-0'}>
                    <Alert className={'w-50 m-auto'} show={true} variant="success">
                        <Alert.Heading>
                            Баланс: ***руб.
                        </Alert.Heading>
                        <hr/>
                        Доступно для вывода: <b>0 руб.</b>
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => {
                            }} variant="outline-success">
                                Вывести
                            </Button>
                        </div>
                    </Alert>
                </div>
                <div className={'row m-0 mt-5'}>
                    <h4 className={''}>История</h4>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <Label/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                    </LineChart>
                </div>
                <div className={'row m-0'}>
                    <Orders />
                </div>
            </div>
            <ProfileMenu/>
        </div>
    </section>;
}