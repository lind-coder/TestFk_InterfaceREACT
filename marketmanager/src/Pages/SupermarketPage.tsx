import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import axios from "axios";
import { Typography } from "@mui/material";
import { Market } from "../Types/Market";

const columns: GridColDef[] = [
  { field: "supermarket_ID", headerName: "ID", width: 300 },
  { field: "name", headerName: "Nome Supermercato", width: 300 },
  { field: "address", headerName: "Indirizzo", width: 300 },
];

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Market[]>("https://localhost:7226/getAllMarket")
      .then((res) => setMarkets(res.data))
      .catch(() => setMarkets([]));
  }, []);

  return (
    <>
      <Typography color="white" fontSize={22}>
        Lista Supermercati
      </Typography>
      <div style={{ height: 450, width: 900 }}>
        <DataGrid
          rows={markets}
          columns={columns}
          getRowId={(row) => row.supermarket_ID}
          pageSizeOptions={[5, 10]}
          pagination
          onRowClick={(params: GridRowParams<Market>) =>
            navigate(`/market/${params.row.supermarket_ID}/employees`)
          }
        />
      </div>
    </>
  );
}
