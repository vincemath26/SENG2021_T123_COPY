import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/authPages.module.css";
import { useReducer } from "react";
import { useRouter } from "next/router";

const formReducer = (state: any, event: { target: { name: any; value: any; }; }) => {
	return {
		...state,
		[event.target.name]: event.target.value
	};
};

export default function Login() {
	const [formData, setFormData] = useReducer(formReducer, {});
	const router = useRouter();

	const handleSubmit = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		fetch("http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: formData.email, password: formData.password })
		}).then(result => {
			result.text().then(resultText => {
				if (result.status !== 200) {
					alert(resultText);
					return;
				}
				if (typeof window !== "undefined") {
					localStorage.setItem("token", JSON.parse(resultText).token);
				}
				router.push("/received");
			});
		});
	};

	return (
		<>
			<Head>
				<title>Login</title>
				<meta name="description" content="Official eiei login page" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/teapot.png" />
			</Head>
			<main className={styles.main}>
				<div className={styles.createBackground}>
					<div className={styles.createInterface}></div>
					<div className={styles.logo}>
						<Image
							id="logoImg"
							src="/images/logo.png"
							alt="eiei logo"
							width={70}
							height={70}
						/>
					</div>
					<h1 id={styles.loginTitle}>Login</h1>
					<form className={styles.form} id={styles.loginForm} onSubmit={handleSubmit}>
						<label className={styles.label} htmlFor="email"></label><br />
						<input
							className={styles.textInput}
							onChange={setFormData}
							type="text"
							id="email"
							name="email"
							placeholder="Email:"></input><br />
						<label className={styles.label} htmlFor="password"></label><br />
						<input
							className={styles.textInput}
							onChange={setFormData}
							type="password"
							id="password"
							name="password"
							placeholder="Password:"></input><br />
						<div className={styles.resetButton}>
							<Link href="/reset_request">
								<button title="Password Reset" onClick={() => {
									console.log("Forgot password");
								}}>Forgot Password</button>
							</Link>
						</div>
						<div className={styles.switchPageButton} id={styles.gotoRegister}>
							<Link href="/register">
								<button title="Sign up with your email" onClick={() => {
									console.log("Register Page");
								}}>I do not have an account
								</button>
							</Link>
						</div>
						<div className={styles.submitForm} id={styles.loginButton}>
							<button title="Login" onClick={() => {
								console.log("Logging In");
							}}>
								<input type="submit" value="Login" />
							</button>
						</div>
					</form>
				</div>
			</main >
		</>
	);
}
