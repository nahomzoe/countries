import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeCountries,
  search,
} from "../features/countries/countriesSlice";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Countries() {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);
  console.log(countriesList);

  const searchfunc = (e) => {
    dispatch(search(e.target.value));
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "flag", label: "Flag", minWidth: 40 },
    { id: "name", label: "Name", minWidth: 40 },
    { id: "region", label: "Region", minWidth: 40 },
    {
      id: "population",
      label: "Population",
      minWidth: 40,

      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "languages",
      label: "Languages",
      minWidth: 40,
      //   align: "right",
    },
    {
      id: "detail",
      label: "Detail",
      minWidth: 40,
      //   align: "right",
    },
  ];

  function createData(row) {
    const detail = (
      <Tooltip title="See more">
        <IconButton>
          <Link
          //   onClick={() => handleCustomerPage(row)}
          //   to={`/singleCustomer/${row.field_project_customer_name[1]?.value}`}
          >
            <ChevronRightIcon sx={{ fontSize: 20, color: "black" }} />
          </Link>
        </IconButton>
      </Tooltip>
    );
    const languages = Object.values(row.languages || {}).map((language) => (
      <div key={language}>
        <p>{language} </p>
      </div>
    ));

    return {
      flag: row.flag,
      name: row.name.common,
      region: row.region,
      population: row.population,
      languages,
      detail,
    };
  }

  const rows = [
    // createData("Flag", "India", "IN", 1324171354, 3287263),
    // createData("Flag", "China", "CN", 1403500365, 9596961),
    // createData("Flag", "Italy", "IT", 60483973, 301340),
    // createData("Flag", "United States", "US", 327167434, 9833520),
    // createData("Flag", "Canada", "CA", 37602103, 9984670),
    // createData("Flag", "Australia", "AU", 25475400, 7692024),
    // createData("Flag", "Germany", "DE", 83019200, 357578),
    // createData("Flag", "Ireland", "IE", 4857000, 70273),
    // createData("Flag", "Mexico", "MX", 126577691, 1972550),
    // createData("Flag", "Japan", "JP", 126317000, 377973),
    // createData("Flag", "France", "FR", 67022000, 640679),
    // createData("Flag", "United Kingdom", "GB", 67545757, 242495),
    // createData("Flag", "Russia", "RU", 146793744, 17098246),
    // createData("Flag", "Nigeria", "NG", 200962417, 923768),
    // createData("Flag", "Brazil", "BR", 210147125, 8515767),
  ];
  countriesList &&
    countriesList
      .filter((row) => {
        if (
          row.name.common
            .toLowerCase()
            .includes(searchInput.toLowerCase().trim())
        ) {
          rows.push(createData(row));
        }
      })
      .map((row) => {
        rows.push(createData(row));
      });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
