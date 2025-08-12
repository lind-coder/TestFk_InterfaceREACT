import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import WelcomeScreen from "./Components/WelcomeScreen";
import MarketsPage from "./Pages/SupermarketPage";
import MarketEmployeesPage from "./Pages/EmployeesMarketPage";

import EmployeeDetailPage from "./Pages/EmployeeShiftDetailPage";
import ShiftsPage from "./Pages/ShiftsPage";
import ContactsPage from "./Pages/ContactsPage";
import AllEmployeesPage from "./Pages/AllEmployeePage";
import ShiftsDataGrid from "./Pages/ShiftsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<WelcomeScreen />} />
          <Route path="markets" element={<MarketsPage />} />
          <Route
            path="/market/:id/employees"
            element={<MarketEmployeesPage />}
          />
          <Route
            path="/employee/:employeeId"
            element={<EmployeeDetailPage />}
          />
          <Route path="employees" element={<AllEmployeesPage />} />
          <Route path="shifts" element={<ShiftsDataGrid />} />
          //Implementare ancora qui
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
