// import './App.css'

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

    return {
    <>
        <h1> Login Page </h1>
        <div>
        <form onSubmit = {handleSubmit}>
        <label for="username"> Username: </label>
        <input type="text" name="username" id="username"></input>
        <label for="password"> Password: </label>
        <input type="password" name="password" id="password"></input>
        <button type="submit"> Login </button>
        </form>
        </div>
    </>
    }
}

export default App