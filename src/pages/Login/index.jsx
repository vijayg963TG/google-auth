// import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { BASE_URL } from "../../constant";
import styles from "./styles.module.css";
import queryString from "query-string";
import { dataContext } from "../../context/dataContext";

function Login() {
const {token,setToken} = useContext(dataContext)
	const googleAuth = () => {
		window.open(
			`${BASE_URL}auth/google`,
			"_self"
		);
	};

useEffect(() => {
		const { token } = queryString.parse(window.location.search);
		localStorage.setItem("token",token)
		setToken(token)
}, [token])

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<div className={styles.form_container}>
				<div className={styles.right}>
				 <h2 className={styles.from_heading}> Log in</h2>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing in with Google</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
