import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/tasksStyle.js";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Accept from '@material-ui/icons/Check';
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
    const classes = useStyles();
    const { tableHead, tableHeaderColor } = props;
    const [events, setEvents] = useState([]);
    useEffect(() => {
        async function getEmployees() {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const response = await fetch(proxyUrl+"https://bjz5jcmglg.execute-api.eu-west-1.amazonaws.com/Manageez/evenement");
            const data = await response.json();
            const tab = data.Event;
            console.log(tab);
            setEvents(tab);
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
                    {events.map((prop, key) => {
                        return (
                            <TableRow key={key} className={classes.tableBodyRow}>
                                <TableCell>
                                    {prop.Name}
                                </TableCell>
                                <TableCell>
                                    {prop.Category}
                                </TableCell>
                                <TableCell>
                                    {prop.Description}
                                </TableCell>
                                <TableCell className={classes.tableActions}>
                                    <Tooltip
                                        id="tooltip-top"
                                        title="You will upgrade your performances (Cost: 10000$)"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                    >
                                        <IconButton
                                            aria-label="Accept"
                                            className={classes.tableActionButton}
                                        >
                                            <Accept
                                                className={
                                                    classes.tableActionButtonIcon + " " + classes.edit
                                                }
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        id="tooltip-top-start"
                                        title="You will lose productivity"
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
