import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import AccessTime from "@material-ui/icons/AccessTime";
import Subject from "@material-ui/icons/Subject";
import Autorenew from "@material-ui/icons/Autorenew";
import Done from "@material-ui/icons/Done";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import PropTypes from "prop-types";


import {
    dailySalesChart,
    completedTasksChart
} from "../../variables/charts";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

export default function Dashboard() {

    const classes = useStyles();

    const [pjs, setPjs] = useState([]);
    const [tab_wait, setTab_wait] = useState([]);
    const [tab_progress, setTab_progress] = useState([]);
    const [tab_done, setTab_done] = useState([]);

    useEffect(() => {
        async function getProjects() {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(proxyUrl+"https://bjz5jcmglg.execute-api.eu-west-1.amazonaws.com/Manageez/projet");
            const data = await response.json();
            const tab = data.Projects;
            var pj_wait = [];
            var pj_progress = [];
            var pj_done = [];
            tab.forEach((element) => {
                if(element.State === 0) pj_wait.push(element);
                if(element.State === 1) pj_progress.push(element);
                if(element.State === 2) pj_done.push(element);
            });
            const tab1 = pj_wait;

            setTab_wait(pj_wait);
            setTab_progress(pj_progress);
            setTab_done(pj_done);
            setPjs(tab);
        }
        getProjects();
    }, []);

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Store />
                            </CardIcon>
                            <p className={classes.cardCategory}>Capital</p>
                            <h3 className={classes.cardTitle}>$34,245</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <DateRange />
                                Last 24 Hours
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="danger" stats icon>
                            <CardIcon color="danger">
                                <Done />
                            </CardIcon>
                            <p className={classes.cardCategory}>Projects Finished</p>
                            <h3 className={classes.cardTitle}>75</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <LocalOffer />
                                Tracked from Github
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={dailySalesChart.data}
                                type="Bar"
                                options={dailySalesChart.options}
                                listener={dailySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Evolution of Business Capital</h4>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> updated each month
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card chart>
                        <CardHeader color="danger">
                            <ChartistGraph
                                className="ct-chart"
                                data={completedTasksChart.data}
                                type="Bar"
                                options={completedTasksChart.options}
                                listener={completedTasksChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Evolution of Payroll</h4>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> Updated Each month
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomTabs
                        title="Projects:"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "To Do",
                                tabIcon: Subject,
                                tabContent: (
                                    <Tasks

                                        tableHead={["Name","Description","Type", "Duration", "Benefice", "Resources","Cost"]}
                                        checkedIndexes={[0, 3]}
                                        tasks={tab_wait}
                                    />
                                )
                            },
                            {
                                tabName: "In Progress",
                                tabIcon: Autorenew,
                                tabContent: (
                                    <Tasks

                                        tableHead={["Name","Description","Type", "Duration", "Benefice", "Resources","Cost"]}
                                        checkedIndexes={[0]}
                                        tasks={tab_progress}
                                    />
                                )
                            },
                            {
                                tabName: "Done",
                                tabIcon: Done,
                                tabContent: (
                                    <Tasks

                                        tableHead={["Name","Description","Type", "Duration", "Benefice", "Resources","Cost"]}
                                        checkedIndexes={[1]}
                                        tasks={tab_done}
                                    />
                                )
                            }
                        ]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>Employees</h4>
                            <p className={classes.cardCategoryWhite}>
                                New employees on 15th September, 2016
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="warning"
                                tableHead={["Name","LastName","Anciennete", "Job", "Salary", "Stats"]}

                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
