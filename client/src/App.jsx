
import { Route, Routes } from 'react-router-dom'
import IndexPage from './Components/IndexPage'
import LoginPage from './Components/LoginPage'
import Layout from './Layout'
import RegisterPage from './Components/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './Components/AccountPage'
import PlacesFormPage from './Components/PlacesFormPage'
import PlacesPage from './Components/PlacesPage'
import PlacePage from './Components/PlacePage'
import BookingsPage from './Components/BookingsPage'
import BookingPage from './Components/BookingPage.jsx'

axios.defaults.baseURL = 'http://localhost:4050'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={< LoginPage />} />
        <Route path='/register' element={< RegisterPage />} />
        <Route path='/account' element={<AccountPage/>}/>
        <Route path="/account/places" element={<PlacesPage />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App