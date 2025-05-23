import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import Homepage from './pages/Homepage';
import ErrorPage from './pages/ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryComp from './components/ErrorBoundaryComp';
import Header from './components/Header';
import AboutUs from './pages/AboutUs';
import Charts from './pages/Charts';
function App() {
  return (
    <ErrorBoundary fallbackRender={ErrorBoundaryComp}>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/charts/:chart' element={<Charts />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
