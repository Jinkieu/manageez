import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/tasksStyle";
import TableHead from "@material-ui/core/TableHead";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
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
    const {  tasks, rtlActive, tableHead } = props;


    const tableCellClasses = classnames(classes.tableCell, {
        [classes.tableCellRTL]: rtlActive
    });



    return (
        <Table className={classes.table}>
            {tableHead !== undefined ? (
                <TableHead>
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
                {tasks.map((prop, key) => {
                    return (
                        <TableRow key={key} className={classes.tableBodyRow}>
                            <TableCell className={tableCellClasses}>
                                <Checkbox
                                    checked={checked.indexOf(key) !== -1}
                                    tabIndex={-1}
                                    onClick={() => handleToggle(key)}
                                    checkedIcon={<Check className={classes.checkedIcon} />}
                                    icon={<Check className={classes.uncheckedIcon} />}
                                    classes={{
                                        checked: classes.checked,
                                        root: classes.root
                                    }}
                                />
                            </TableCell>
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
    rtlActive: PropTypes.bool,
    checkedIndexes: PropTypes.array
};
