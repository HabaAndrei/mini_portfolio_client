import React, {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages.js/Home';
import AddTask from './Pages.js/AddTask';

const App = () => {

  const [arAlert, setArAlert] = useState([
    // {type: 'succes', mes: 'OKOKOK'}, {type: 'danger'}, {type: 'warning'},
  ]);


  return (
    
    <Router>
      <Routes>
        <Route 
          path="/"
          element={<Home
            setArAlert={setArAlert} arAlert={arAlert}
          />}
        />

        <Route 
          path="addTask"
          element={<AddTask
            setArAlert={setArAlert} arAlert={arAlert}
          />}
        />

        
      </Routes>
    </Router>
    
  )
}

export default App;



// Portofoliu de lucrari artist digital 
// cand sterg sa sterg si pozele din fisier !!
//scris frumos in nest js 
// Documentație: 
// Include instrucțiuni clare pentru rularea aplicației și orice alte detalii relevante pentru evaluare. 
