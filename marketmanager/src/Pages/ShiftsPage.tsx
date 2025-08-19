import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import moment from "moment";
import { fetchShiftsByRange } from "../Fetch/FetchShiftsByRange";
import { fetchShiftsByEmployeeAndRange } from "../Fetch/FetchShiftsByEmployeeAndRange";
import { getEmployeesWithShifts } from "../Fetch/FetchEmployeeWithShifts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { Market } from "../Types/Market";
import { EmployeeWithShifts } from "../Types/EmployeeWithShifts";
import { useNavigate, useParams } from "react-router-dom";

const redTheme = {
  button: {
    backgroundColor: "#C62828",
    color: "white",
    "&:hover": {
      backgroundColor: "#8E0000",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(198, 40, 40, 0.5)",
      color: "white",
    },
  },
};

const columns: GridColDef[] = [
  { field: "shift_ID", headerName: "ID Turno", width: 200 },
  {
    field: "startDateFormatted",
    headerName: "Inizio",
    width: 400,
  },
  {
    field: "endDateFormatted",
    headerName: "Fine",
    width: 400,
  },
  { field: "username", headerName: "Username Dipendente", width: 400 },
  { field: "employee_ID", headerName: "ID Dipendente", width: 200 },
];

const ShiftsDataGrid = () => {
  const { marketId: urlMarketId, employeeId: urlEmployeeId } = useParams<{
    marketId?: string;
    employeeId?: string;
  }>();
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<moment.Moment | null>(
    moment().subtract(30, "days")
  );
  const [endDate, setEndDate] = useState<moment.Moment | null>(moment());
  const [marketId, setMarketId] = useState<string>(urlMarketId || "");
  const [employeeId, setEmployeeId] = useState<string>(urlEmployeeId || "");
  const [markets, setMarkets] = useState<Market[]>([]);
  const [employees, setEmployees] = useState<EmployeeWithShifts[]>([]);
  const navigate = useNavigate();

  // fetch markets + employees
  useEffect(() => {
    axios
      .get<Market[]>("https://localhost:7226/getAllMarket")
      .then((res) => setMarkets(res.data))
      .catch(() => setMarkets([]));

    getEmployeesWithShifts()
      .then((data) => setEmployees(data))
      .catch(() => setEmployees([]));
  }, []);

  // Esegui automaticamente il filtro se abbiamo entrambi gli ID dalla URL
  useEffect(() => {
    if (urlMarketId && urlEmployeeId && startDate && endDate) {
      handleFilter();
    }
  }, [urlMarketId, urlEmployeeId, startDate, endDate]);

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      alert("Seleziona entrambe le date");
      return;
    }

    setLoading(true);
    try {
      const start = startDate.startOf("day").format("YYYY-MM-DDTHH:mm:ss");
      const end = endDate.endOf("day").format("YYYY-MM-DDTHH:mm:ss");

      let data;

      if (employeeId.trim()) {
        const employeeIdNum = parseInt(employeeId);
        if (isNaN(employeeIdNum)) {
          throw new Error("ID dipendente deve essere un numero valido");
        }
        data = await fetchShiftsByEmployeeAndRange(employeeIdNum, start, end);
      } else {
        data = await fetchShiftsByRange(start, end);
      }

      const formattedData = data.map((shift: any) => ({
        ...shift,
        startDateFormatted: moment(shift.startDate).format("DD/MM/YYYY HH:mm"),
        endDateFormatted: moment(shift.endDate).format("DD/MM/YYYY HH:mm"),
      }));

      setShifts(formattedData);
    } catch (error) {
      console.error("Errore durante il fetch:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Errore durante il recupero dei dati"
      );
      setShifts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStartDate(moment().subtract(30, "days"));
    setEndDate(moment());
    setEmployeeId("");
    setMarketId("");
    setShifts([]);
    navigate("/shifts");
  };

  const handleMarketChange = (e: SelectChangeEvent) => {
    setMarketId(e.target.value);
    setEmployeeId("");
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{
          marginBottom: "20px",
          padding: "10px 15px",
          backgroundColor: "#C62828",
          color: "white",
          borderRadius: "12px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#9b2020",
          },
        }}
      >
        ← Torna indietro
      </Button>

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="market-select-label">Supermercato</InputLabel>
            <Select
              labelId="market-select-label"
              id="market-select"
              value={marketId}
              onChange={handleMarketChange}
            >
              {markets.map((market) => (
                <MenuItem
                  key={market.supermarket_ID}
                  value={market.supermarket_ID.toString()}
                >
                  {market.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="employee-select-label">Dipendente</InputLabel>
            <Select
              labelId="employee-select-label"
              id="employee-select"
              value={employeeId}
              onChange={(e: SelectChangeEvent) => setEmployeeId(e.target.value)}
              disabled={!marketId}
            >
              {employees
                .filter((emp) =>
                  marketId
                    ? emp.supermarket?.supermarket_ID === Number(marketId)
                    : true
                )
                .map((emp) => (
                  <MenuItem
                    key={emp.employee_ID}
                    value={emp.employee_ID.toString()}
                  >
                    {emp.name} {emp.surname}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <DatePicker
            label="Data Inizio"
            value={startDate}
            onChange={setStartDate}
          />

          <DatePicker label="Data Fine" value={endDate} onChange={setEndDate} />

          <Button
            variant="contained"
            onClick={handleFilter}
            sx={redTheme.button}
            size="large"
            disabled={!startDate || !endDate}
          >
            Filtra
          </Button>
          <Button
            variant="contained"
            onClick={handleReset}
            sx={redTheme.button}
            size="large"
          >
            Reset
          </Button>
        </Stack>
      </LocalizationProvider>
      <Box sx={{ height: 500, mb: 2 }}>
        <DataGrid
          rows={shifts}
          columns={columns}
          getRowId={(row) => row.shift_ID}
          loading={loading}
          hideFooterPagination
        />
      </Box>
    </Box>
  );
};

export default ShiftsDataGrid;
