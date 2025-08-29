import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import WelcomeScreen from "./Components/WelcomeScreen";
import MarketsPage from "./Pages/SupermarketPage";
import MarketEmployeesPage from "./Pages/EmployeesMarketPage";
import ShiftsDataGrid from "./Pages/ShiftsPage";
import EmployeeShiftDetailPage from "./Pages/EmployeeShiftDetailPage";
import GestMarketSignInPage from "./Pages/SignInPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<GestMarketSignInPage />}></Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<WelcomeScreen />} />
          <Route path="markets" element={<MarketsPage />} />
          <Route
            path="market/:id/employees"
            element={<MarketEmployeesPage />}
          />
          <Route
            path="employee/:employeeId"
            element={<EmployeeShiftDetailPage />}
          />
          <Route
            path="/shifts/:marketId/:employeeId"
            element={<ShiftsDataGrid />}
          />
          <Route path="shifts" element={<ShiftsDataGrid />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
