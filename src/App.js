import './App.css';
import MaintenanceViewer from './components/maintenance/MaintenanceViewer';
import { UseContextI18nProvider } from './contexts/ContextI18n';


function App({urlApi}) {
  return (
    <div className="App">
      <UseContextI18nProvider>
        <MaintenanceViewer
          urlApi = {urlApi}
        />
      </UseContextI18nProvider>
    </div>
  );
}




export default App;
