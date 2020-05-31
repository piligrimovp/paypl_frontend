import React from "react";
import {Alert, Breadcrumb, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import ProfileMenu from "../../../components/profileMenu/profileMenu";
import {CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import Orders from "../../../components/Orders/Orders";
import {createAuthProvider} from "../../../Entity/AuthProvider";

export const {getUser, updateUser, authFetch} = createAuthProvider();

export default class ProfileSellerPage extends React.Component {
   constructor() {
      super();
      this.state = {
         chart: [],
      };
   }

   CustomTooltip({payload, label, active}) {
      if(active)
         return (
            <div className="custom-tooltip">
               <p className="label"><b>Дата: </b>{`${label}`}</p>
               <p className="intro"><b>Прибыль: </b>{`${payload && payload[0].value} руб.`}</p>
            </div>
         );
      return null;
   }

   componentDidMount() {
      authFetch(window.HOST + '/users/chart', {method: 'POST'})
         .then(response => response.json())
         .then(data => {
            let chart = []
            for (let [key, value] of Object.entries(data.data)) {
               chart.push({name: key, "Прибыль": parseFloat(value)})
            }
            this.setState({chart: chart});
         });
   }

   render() {
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
                     data={this.state.chart}
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
                  <Orders/>
               </div>
            </div>
            <ProfileMenu/>
         </div>
      </section>;
   }
}