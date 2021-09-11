import React,{useState} from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Interventions from '../intervention/Interventions';
import Signalements from '../signalement/Signalements';
const ControlledTables = ()=> {
    const [key, setKey] = useState('interventions');
  
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="interventions" title="Interventions">
          <Interventions />
        </Tab>
        <Tab eventKey="signalements" title="Signalements">
       <Signalements />
        </Tab>
      </Tabs>
    );
  }
 
  export default ControlledTables
