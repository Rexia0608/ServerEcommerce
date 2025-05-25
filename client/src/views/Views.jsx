import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from '../context/UserContext';

const Views = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Login />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default Views;