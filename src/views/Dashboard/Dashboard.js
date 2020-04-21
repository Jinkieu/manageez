import React, {useState, useEffect} from "react";
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
import Button from "@material-ui/core/Button";


import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

export default function Dashboard() {

    const classes = useStyles();

    const [tab_wait, setTab_wait] = useState([]);
    const [tab_progress, setTab_progress] = useState([]);
    const [tab_done, setTab_done] = useState([]);
    const [stats, setStats] = useState([]);

    const [count, setCount] = useState(3);

    const [capitalChart, setCapital] = useState([]);
    const [payrollChart, setPayroll] = useState([]);

    const [currentTime, setCurrentTime] = useState([]);


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

            setTab_wait(pj_wait);
            setTab_progress(pj_progress);
            setTab_done(pj_done);
        }
        getProjects();
    }, []);

    useEffect(() => {
        async function getStatsCompany() {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(proxyUrl+"https://bjz5jcmglg.execute-api.eu-west-1.amazonaws.com/Manageez/statsentreprise");
            const data = await response.json();
            const res = data.Employees;
            console.log(res);

            setStats(res);
        }
        getStatsCompany();
    }, []);

    useEffect(() => {
        async function getCharts() {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(proxyUrl+"https://bjz5jcmglg.execute-api.eu-west-1.amazonaws.com/Manageez/capital");
            const data = await response.json();
            const res = data.finance;

            res.sort(function(a,b) {return a.Nbr - b.Nbr});
            console.log(res);
            var capital = [];
            var payroll = [];
            var month = [];
            res.forEach((element) => {
                month.push(element.Nbr);
                capital.push(element.Capital);
                payroll.push(element.Payroll);
            });
            var delays = 80,
                durations = 500;
            var Chartist = require("chartist");
            const dailySalesChart = {
                data: {
                    labels: month,
                    series: [capital]
                },
                options: {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 50000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                },
                // for animation
                animation: {
                    draw: function(data) {
                        if (data.type === "line" || data.type === "area") {
                            data.element.animate({
                                d: {
                                    begin: 600,
                                    dur: 700,
                                    from: data.path
                                        .clone()
                                        .scale(1, 0)
                                        .translate(0, data.chartRect.height())
                                        .stringify(),
                                    to: data.path.clone().stringify(),
                                    easing: Chartist.Svg.Easing.easeOutQuint
                                }
                            });
                        } else if (data.type === "point") {
                            data.element.animate({
                                opacity: {
                                    begin: (data.index + 1) * delays,
                                    dur: durations,
                                    from: 0,
                                    to: 1,
                                    easing: "ease"
                                }
                            });
                        }
                    }
                }
            };
            setCapital(dailySalesChart);
            const completedTasksChart = {
                data: {
                    labels: month,
                    series: [payroll]
                },
                options: {
                    lineSmooth: Chartist.Interpolation.cardinal({
                        tension: 0
                    }),
                    low: 0,
                    high: 12000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                },
                animation: {
                    draw: function(data) {
                        if (data.type === "line" || data.type === "area") {
                            data.element.animate({
                                d: {
                                    begin: 600,
                                    dur: 700,
                                    from: data.path
                                        .clone()
                                        .scale(1, 0)
                                        .translate(0, data.chartRect.height())
                                        .stringify(),
                                    to: data.path.clone().stringify(),
                                    easing: Chartist.Svg.Easing.easeOutQuint
                                }
                            });
                        } else if (data.type === "point") {
                            data.element.animate({
                                opacity: {
                                    begin: (data.index + 1) * delays,
                                    dur: durations,
                                    from: 0,
                                    to: 1,
                                    easing: "ease"
                                }
                            });
                        }
                    }
                }
            };
            setPayroll(completedTasksChart);
        }
        getCharts();
    }, []);


    useEffect( () => {
        async function fetchTime() {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(proxyUrl+"https://bjz5jcmglg.execute-api.eu-west-1.amazonaws.com/Manageez/time");
            const data = await response.json();
            const res = data.finance;
            var tab = [];
            res.forEach((e) => {
                tab.push(e.Current);
            });
            setCurrentTime(tab[0])
        }
        fetchTime();
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
                            <h3 className={classes.cardTitle}>
                                {stats.map((prop, key) => {
                                return (
                                    <div key={key} className={classes.tableBodyRow}>
                                        <p> Name : {prop.Name} &emsp; Effectif : {prop.Effectif} &emsp; ${prop.Capital}</p>
                                    </div>
                                );
                            })}
                            </h3>
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
                            <p className={classes.cardCategory}>Current Time</p>
                            <h3 className={classes.cardTitle}>{currentTime}</h3>
                            <Button> RUN </Button>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <LocalOffer />
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
                                data={capitalChart.data}
                                type="Line"
                                options={capitalChart.options}
                                listener={capitalChart.animation}
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
                                data={payrollChart.data}
                                type="Line"
                                options={payrollChart.options}
                                listener={payrollChart.animation}
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
                <GridItem xs={12} sm={12} md={12}>
                    <CustomTabs
                        title="Projects:"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "To Do",
                                tabIcon: Subject,
                                tabContent: (
                                    <Tasks

                                        tableHead={["Choice","Name","Description","Type", "Duration", "Benefice", "Resources","Cost"]}
                                        tasks={tab_wait}
                                    />
                                )
                            },
                            {
                                tabName: "In Progress",
                                tabIcon: Autorenew,
                                tabContent: (
                                    <Tasks

                                        tableHead={["Choice","Name","Description","Type", "Duration", "Benefice", "Resources","Cost"]}
                                        tasks={tab_progress}
                                    />
                                )
                            },
                            {
                                tabName: "Done",
                                tabIcon: Done,
                                tabContent: (
                                    <Tasks

                                        tableHead={["Choice","Name","Description","Type", "Duration", "Benefice", "Resources","Cost"]}
                                        tasks={tab_done}
                                    />
                                )
                            }
                        ]}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
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
