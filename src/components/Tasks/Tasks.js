import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/tasksStyle";
import TableHead from "@material-ui/core/TableHead";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([...props.checkedIndexes]);
    const handleToggle = value => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    const {  tasks, rtlActive } = props;
    const tableCellClasses = classnames(classes.tableCell, {
        [classes.tableCellRTL]: rtlActive
    });
    const { tableHead, tableHeaderColor } = props;
    const [pjs, setPjs] = useState([]);

    useEffect(() => {
        async function getProjects() {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(proxyUrl+"https://bjz5jcmglg.execute-api.eu-west-1.amazonaws.com/Manageez/projet");
            const data = await response.json();
            const tab = data.Projects;
            console.log(tab);
            setPjs(tab);
        }
        getProjects();
    }, []);




    return (
        <Table className={classes.table}>
            {tableHead !== undefined ? (
                <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                    <TableRow className={classes.tableHeadRow}>
                        {tableHead.map((prop, key) => {
                            return (
                                <TableCell
                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                    key={key}
                                >
                                    {prop}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
            ) : null}
            <TableBody>
                {pjs.map((prop, key) => {
                    return (
                        <TableRow key={key} className={classes.tableBodyRow}>
                            <TableCell>
                                {prop.Name}
                            </TableCell>
                            <TableCell>
                                {prop.Description}
                            </TableCell>
                            <TableCell>
                                {prop.Type}
                            </TableCell>
                            <TableCell>
                                {prop.Duration}
                            </TableCell>
                            <TableCell>
                                {prop.Benefit}
                            </TableCell>
                            <TableCell>
                                {prop.Resources}
                            </TableCell>
                            <TableCell>
                                {prop.Cost}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

Tasks.propTypes = {
    tasksIndexes: PropTypes.arrayOf(PropTypes.number),
    tasks: PropTypes.arrayOf(PropTypes.node),
    rtlActive: PropTypes.bool,
    checkedIndexes: PropTypes.array
};
