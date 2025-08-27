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
  Alert,
} from "@mui/material";
import moment from "moment";
import { fetchShiftsByEmployeeAndRange } from "../Fetch/FetchShiftsByEmployeeAndRange";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { Market } from "../Types/Market";
import { Employee } from "../Types/Employee";
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

const whiteComponentStyles = {
  backgroundColor: "white",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C62828",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#8E0000",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C62828",
  },
  "& .MuiSvgIcon-root": {
    color: "#C62828",
  },
};

const whiteLabelStyles = {
  color: "#C62828",
  "&.Mui-focused": {
    color: "#8E0000",
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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dateError, setDateError] = useState<string>("");
  const navigate = useNavigate();

  const validateDateRange = (
    start: moment.Moment | null,
    end: moment.Moment | null
  ): boolean => {
    if (!start || !end) return false;

    const diffDays = end.diff(start, "days");
    if (diffDays > 30) {
      setDateError("Il range di date non può superare i 30 giorni");
      return false;
    }

    setDateError("");
    return true;
  };

  const shouldDisableEndDate = (date: moment.Moment) => {
    if (!startDate) return false;
    return date.diff(startDate, "days") > 30;
  };

  const shouldDisableStartDate = (date: moment.Moment) => {
    if (!endDate) return false;
    return endDate.diff(date, "days") > 30;
  };

  useEffect(() => {
    axios
      .get<Market[]>("https://localhost:7226/getAllMarket")
      .then((res) => setMarkets(res.data))
      .catch(() => setMarkets([]));
  }, []);

  useEffect(() => {
    if (marketId) {
      axios
        .get<Employee[]>(
          `https://localhost:7226/api/Employee/GetEmployeesByMarket/${marketId}`
        )
        .then((res) => {
          setEmployees(res.data);
          if (
            urlEmployeeId &&
            !res.data.some((e) => e.employee_ID.toString() === urlEmployeeId)
          ) {
            setEmployeeId("");
          }
        })
        .catch(() => setEmployees([]));
    } else {
      setEmployees([]);
      setEmployeeId("");
    }
  }, [marketId, urlEmployeeId]);

  useEffect(() => {
    if (startDate && endDate) {
      validateDateRange(startDate, endDate);
    } else {
      setDateError("");
    }
  }, [startDate, endDate]);

  const handleFilter = async () => {
    if (!startDate || !endDate || dateError) return;

    setLoading(true);
    try {
      const start = startDate.startOf("day").format("YYYY-MM-DDTHH:mm:ss");
      const end = endDate.endOf("day").format("YYYY-MM-DDTHH:mm:ss");

      let data: any[] = [];

      if (employeeId) {
        data = await fetchShiftsByEmployeeAndRange(
          parseInt(employeeId),
          start,
          end
        );
      } else if (marketId) {
        const res = await axios.get(
          `https://localhost:7226/api/Shifts/GetByMarketAndRange/${marketId}?startDate=${start}&endDate=${end}`
        );
        data = res.data;
      } else {
        const res = await axios.get(
          `https://localhost:7226/GetAllShiftsByRange?startDate=${start}&endDate=${end}`
        );
        data = res.data;
      }

      const formattedData = data.map((shift: any) => ({
        ...shift,
        startDateFormatted: moment(shift.startDate).format("DD/MM/YYYY HH:mm"),
        endDateFormatted: moment(shift.endDate).format("DD/MM/YYYY HH:mm"),
      }));

      setShifts(formattedData);
    } catch (error) {
      console.error("Errore durante il fetch:", error);
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
    setDateError("");
    navigate("/shifts");
  };

  const handleMarketChange = (e: SelectChangeEvent) => {
    setMarketId(e.target.value);
  };

  const handleEmployeeChange = (e: SelectChangeEvent) => {
    setEmployeeId(e.target.value);
  };

  const handleStartDateChange = (date: moment.Moment | null) => {
    setStartDate(date);
    if (date && endDate && endDate.diff(date, "days") > 30) {
      setEndDate(date.clone().add(30, "days"));
    }
  };

  const handleEndDateChange = (date: moment.Moment | null) => {
    setEndDate(date);
    if (date && startDate && date.diff(startDate, "days") > 30) {
      setStartDate(date.clone().subtract(30, "days"));
    }
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
            <InputLabel id="market-select-label" sx={whiteLabelStyles}>
              Supermercato
            </InputLabel>
            <Select
              labelId="market-select-label"
              id="market-select"
              value={marketId}
              onChange={handleMarketChange}
              sx={whiteComponentStyles}
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
            <InputLabel id="employee-select-label" sx={whiteLabelStyles}>
              Dipendente
            </InputLabel>
            <Select
              labelId="employee-select-label"
              id="employee-select"
              value={employeeId}
              onChange={handleEmployeeChange}
              disabled={!marketId}
              sx={whiteComponentStyles}
            >
              {employees.map((emp) => (
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
            onChange={handleStartDateChange}
            shouldDisableDate={shouldDisableStartDate}
            sx={{
              ...whiteComponentStyles,
              "& .MuiInputBase-input": {
                color: "black",
              },
            }}
            slotProps={{
              textField: {
                InputLabelProps: {
                  sx: whiteLabelStyles,
                },
              },
            }}
          />

          <DatePicker
            label="Data Fine"
            value={endDate}
            onChange={handleEndDateChange}
            shouldDisableDate={shouldDisableEndDate}
            sx={{
              ...whiteComponentStyles,
              "& .MuiInputBase-input": {
                color: "black",
              },
            }}
            slotProps={{
              textField: {
                InputLabelProps: {
                  sx: whiteLabelStyles,
                },
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleFilter}
            sx={redTheme.button}
            size="large"
            disabled={!startDate || !endDate || !!dateError}
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

        {dateError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {dateError}
          </Alert>
        )}
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
