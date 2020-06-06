import React from "react";
import {Alert, Breadcrumb, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import ProfileMenu from "../../../components/profileMenu/profileMenu";
import {CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import Orders from "../../../components/Orders/Orders";
import {createAuthProvider} from "../../../Entity/AuthProvider";
import Alerts from "../../../components/Alerts/Alerts";

export const {getUser, updateUser, authFetch} = createAuthProvider();

const chart = [
    {name: '01.05.2020', 'Прибыль': 3033},
    {name:'02.05.2020','Прибыль': 1101},
    {name:'03.05.2020', 'Прибыль': 2056},
    {name: '04.05.2020', 'Прибыль': 206},
    {name: '10.05.2020','Прибыль': 828},
    {name:'15.05.2020','Прибыль': 2742},
    {name:'20.05.2020','Прибыль': 2607},
    {name:'21.05.2020','Прибыль': 0},
    {name:'26.05.2020','Прибыль': 0},
    {name:'28.05.2020','Прибыль': 0},
    {name:'29.05.2020','Прибыль': 3514},
    {name:'30.05.2020','Прибыль': 2400},
    {name:'31.05.2020','Прибыль': 4097},
    {name:'01.06.2020','Прибыль': 4216},
    {name:'02.06.2020','Прибыль': 473},
    {name:'03.06.2020','Прибыль': 2713},
    {name:'04.06.2020','Прибыль': 757}
]

export default class ProfileSellerPage extends React.Component {
    constructor() {
        super();
        this.state = {
            chart: [],
            orders: [],
            user: {},
            alerts: []
        }
    }

        CustomTooltip({payload, label, active})
        {
            if (active)
                return (
                    <div className="custom-tooltip">
                        <p className="label"><b>Дата: </b>{`${label}`}</p>
                        <p className="intro"><b>Прибыль: </b>{`${payload && payload[0].value} руб.`}</p>
                    </div>
                );
            return null;
        }

        componentDidMount()
        {
            authFetch(window.HOST + '/profile/detail', {method: 'POST'})
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        this.setState({user: data.data})
                    }
                    if (data.status === 'error') {
                        this.setState({
                            alerts: [
                                ...this.state.alerts,
                                {
                                    text: 'Не удалось загрузить подробную информацию',
                                    close: true,
                                    status: 'error'
                                }
                            ]
                        })
                    }
                });
            authFetch(window.HOST + '/users/chart', {method: 'POST'})
                .then(response => response.json())
                .then(data => {
                    let chart = []
                    for (let [key, value] of Object.entries(data.data)) {
                        chart.push({name: key, "Прибыль": parseFloat(value)})
                    }
                    this.setState({chart: chart});
                });
            authFetch(window.HOST + '/orders/owner', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: getUser().id,
                })
            }).then(response => response.json())
                .then(data => {
                    this.setState({
                        orders: data
                    })
                }).catch(error => {
                    this.setState({
                        alerts: [
                            ...this.state.alerts,
                            {
                                text: 'Ошибка при загрузке заказов',
                                close: true,
                                status: 'error'
                            }
                        ]
                    })
                }
            );
        }

        render()
        {
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
                <Alerts alerts={this.state.alerts}/>
                <div className={'row m-0 justify-content-between'}>
                    <div className={'col-10 p-0'}>
                        <div className={'row m-0'}>
                            <Alert className={'w-50 m-auto'} show={true} variant="success">
                                <Alert.Heading>
                                    Баланс: {this.state.user.balance} руб.
                                </Alert.Heading>
                                <hr/>
                                Доступно для вывода: <b>{this.state.user.withdraw_balance} руб.</b>
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
                                data={chart}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <Label/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip content={this.CustomTooltip}/>
                                <Line type="monotone" dataKey="Прибыль" stroke="#8884d8" activeDot={{r: 8}}/>
                            </LineChart>
                        </div>
                        <div className={'row m-0'}>
                            {this.state.orders.length > 0 && <Orders orders={this.state.orders} />}
                        </div>
                    </div>
                    <ProfileMenu/>
                </div>
            </section>;
        }
    }