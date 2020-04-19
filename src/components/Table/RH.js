import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/tasksStyle.js";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
    const classes = useStyles();
    const { tableHead, tableHeaderColor } = props;
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        async function getEmployees() {
            const response = await fetch("https://bjz5jcmglg.execute-api.eu-west-1.amazonaws.com/Manageez/employe");
            const data = await response.json();
            const tab = data.Employees;
            console.log(tab);
            setEmployees(tab);
        }
        getEmployees();
    }, []);

    return (
        <div className={classes.tableResponsive}>
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
                    {employees.map((prop, key) => {
                        return (
                            <TableRow key={key} className={classes.tableBodyRow}>
                                <TableCell>
                                    {prop.Name}
                                </TableCell>
                                <TableCell>
                                    {prop.Lastname}
                                </TableCell>
                                <TableCell>
                                    {prop.Anciennete}
                                </TableCell>
                                <TableCell>
                                    {prop.Job}
                                </TableCell>
                                <TableCell>
                                    {prop.Salary}
                                </TableCell>
                                <TableCell>
                                    {prop.Stats}
                                </TableCell>
                                <TableCell className={classes.tableActions}>
                                    <Tooltip
                                        id="tooltip-top"
                                        title="Edit Task"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                    >
                                        <IconButton
                                            aria-label="Edit"
                                            className={classes.tableActionButton}
                                        >
                                            <Edit
                                                className={
                                                    classes.tableActionButtonIcon + " " + classes.edit
                                                }
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        id="tooltip-top-start"
                                        title="Remove"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                    >
                                        <IconButton
                                            aria-label="Close"
                                            className={classes.tableActionButton}
                                        >
                                            <Close
                                                className={
                                                    classes.tableActionButtonIcon + " " + classes.close
                                                }
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

CustomTable.defaultProps = {
    tableHeaderColor: "gray"
};

CustomTable.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
};
