import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import WelcomeScreen from "./Components/WelcomeScreen";
import MarketsPage from "./Pages/SupermarketPage";
import MarketEmployeesPage from "./Pages/EmployeesMarketPage";
import EmployeeDetailPage from "./Pages/EmployeeShiftDetailPage";
import ShiftsDataGrid from "./Pages/ShiftsPage";
import ContactsPage from "./Pages/ContactsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<WelcomeScreen />} />
          <Route path="markets" element={<MarketsPage />} />
          <Route
            path="market/:id/employees"
            element={<MarketEmployeesPage />}
          />
          <Route path="employee/:employeeId" element={<EmployeeDetailPage />} />
          <Route path="/shifts/:employeeId" element={<ShiftsDataGrid />} />
          <Route path="shifts" element={<ShiftsDataGrid />} />
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
