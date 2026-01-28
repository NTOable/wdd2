import './App.css'
import Login from "./pages/Login";

function App() {

    const [handleData, setFormData] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // link backend
        // fetch or axios (3rd)

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    };

    return (
        <>
            <Login>
            
            </Login>
        </>
    );
};

export default App;
