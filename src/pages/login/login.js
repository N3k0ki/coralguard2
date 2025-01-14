
import React, { useState, useEffect } from 'react';
import '../register/register.css';
import logo from '../../assents/logo.svg';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usuario, setUsuario] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            navigate('/terms');
        }
    }, [navigate]);

    return (
        <main className='reg-body'>
            <section className="reg-container_login">
                <div className="reg-container">
                    <div className="reg-logo_container">
                        <img className="reg-src_logo" src={logo} alt="Logo Coral Guard" />
                        <p className="reg-tag_logo">Coral Guard</p>
                    </div>
                </div>
            </section>
            <section className="container_block">
                <div className="welcome_message">
                    <h1 className="welcome_title">Boas-vindas de volta!</h1>
                    <h2 className="welcome_subtitle">Estamos muito animados em te ver novamente!</h2>
                </div>
                <div className="input_section">
                    <label htmlFor="email" style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>e-mail:</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required
                        onChange={(e) => {
                            usuario['email'] = e.target.value
                            setUsuario({ ...usuario, email: e.target.value })
                        }}
                    />
                </div>
                <div className="input_section">
                    <label htmlFor="password" style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>senha</label>
                    <input type="password" id="password" name="password" placeholder="Digite sua senha" required
                        onChange={(e) => {
                            usuario['senha'] = e.target.value
                            setUsuario({ ...usuario, senha: e.target.value })
                        }}
                    />
                </div>
                {/* <div className="forgot_password">
                    <a href="#" className="password_link">Esqueceu sua senha?</a>
                </div> */}
            </section>
            <footer>
                <div className="action_section">
                    <p className="enter_button" onClick={async () => {
                        if (usuario.email && usuario.senha) {
                            const referencia = doc(db, 'Usuarios', usuario.email)
                            const snapshot = await getDoc(referencia)

                            if (!snapshot.exists()) {
                                alert("Usuário inexistente");
                                return;
                            }
                            const usuarioDb = snapshot.data();
                            
                            if (usuarioDb.senha === usuario.senha) {
                                navigate('/inicio');
                            } else {
                                alert("Senha incorreta");
                            }
                        } else {
                            alert("Por favor, preencha todos os campos");
                        }
                    }}>Entrar</p>
                    <p className="register_prompt">
                        Precisando de uma conta?
                        <span onClick={() => { navigate('/register') }} className="register_link"> Registre-se</span>
                    </p>
                </div>
            </footer>
        </main>
    )
}

export default Login;
