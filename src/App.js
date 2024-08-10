import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages.js/Home';
import AddTask from './Pages.js/AddTask';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route 
          path="/"
          element={<Home/>}
        />

        <Route 
          path="addTask"
          element={<AddTask/>}
        />

        
      </Routes>
    </Router>
    
  )
}

export default App;



// Cerințe pentru Proiect: 
// Dezvoltă o aplicație web simplă care să gestioneze un portofoliu de lucrări pentru un artist digital. 
// Aplicația trebuie să includă următoarele funcționalități: 
 
// 1. Design UI/UX 
// Creează o interfață atractivă și ușor de utilizat, care să ofere o experiență plăcută utilizatorului. 
// 2. Modelarea Datelor 
// Definește structura și relațiile datelor pentru fiecare lucrare din portofoliu. Fiecare lucrare ar trebui să includă detalii precum 
// titlul, descrierea, imaginea, link-ul către site-ul clientului și statusul (ascuns/afișat). 
// 3. Funcționalități CRUD 
// Implementează funcționalități pentru Creare, Citire, Actualizare și Ștergere (CRUD) pentru gestionarea lucrărilor din portofoliu. 
// 4. Afișarea Portofoliului 
// Dezvoltă funcționalitatea de afișare a lucrărilor într-o listă sau grid, cu opțiunea de a ascunde sau afișa anumite lucrări. 
// 5. Încărcare Imagini 
// Permite utilizatorului să încarce imagini pentru fiecare lucrare din portofoliu. 
// 6. Link către Site-ul Clientului 
// Implementează un câmp pentru a adăuga un link către site-ul clientului pentru fiecare lucrare. 
// 7. Responsivitate 
// Asigură-te că aplicația este complet responsive și arată bine pe toate tipurile de dispozitive și dimensiuni de ecran. 
// 8. Testare 
// Efectuează o testare detaliată a aplicației pentru a garanta funcționalitatea corectă și fără erori. 
 
// Cerințe Tehnice 
// Frontend: 
// Dezvoltă interfața utilizând React. Poți folosi alte framework-uri de frontend (Angular/Vue), dar React este preferat. 
 
// Backend: 
// Utilizează NestJS pentru a dezvolta partea de server. 
 
// Structura Proiectului: 
// Organizează proiectul într-o structură standard, ușor de înțeles și gestionat. 
// Scrie cod curat și optimizat, respectând cele mai bune practici din industrie. 
 
// Documentație: 
// Include instrucțiuni clare pentru rularea aplicației și orice alte detalii relevante pentru evaluare. 
