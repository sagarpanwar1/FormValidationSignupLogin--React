import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Login';
import SignUp from './SignUp';


const Home = () => {
    // const [activeTab, setActiveTab] = useState('login');

    return (

        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="card p-4" style={{ width: '800px' }}>
                    <div className="card-body">
                        <h2 className="card-title text-center">Account</h2>
                        <Tabs defaultActiveKey="login" id="auth-tabs" className="mb-3">
                            <Tab eventKey="login" title="Login">
                                <Login />
                            </Tab>
                            <Tab eventKey="signup" title="Signup">
                                <SignUp />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home