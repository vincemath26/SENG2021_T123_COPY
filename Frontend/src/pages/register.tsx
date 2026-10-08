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

export default function Home() {
	const [formData, setFormData] = useReducer(formReducer, {});
	const router = useRouter();

	const handleSubmit = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		if (formData.password === undefined) {
			alert("Password is blank");
			return;
		} else if (formData.password !== formData.cpassword) {
			alert("Passwords do not match");
			return;
		} else if (formData.password.length < 6) {
			alert("Password needs to be at least 6 characters");
			return;
		}
		fetch("http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: formData.email, name: formData.name, password: formData.password })
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
				<title>Register</title>
				<meta name="description" content="Official eiei register page" />
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
					<h1 id={styles.registerTitle}>Register</h1>
					<form className={styles.form} id={styles.registerForm} onSubmit={handleSubmit}>
						<label className={styles.label} htmlFor="name"></label><br />
						<input
							className={styles.textInput}
							onChange={setFormData}
							type="text"
							id="name"
							name="name"
							placeholder="User/Company Name:"></input><br />
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
						<label className={styles.label} htmlFor="cpassword"></label><br />
						<input
							className={styles.textInput}
							onChange={setFormData}
							type="password"
							id="cpassword"
							name="cpassword"
							placeholder="Confirm Password:"></input><br />
						<div className={styles.switchPageButton} id={styles.gotoLogin}>
							<Link href="/login">
								<button title="Login" onClick={() => {
									console.log("Login Page");
								}}>I already have an account
								</button>
							</Link>
						</div>
						<div className={styles.submitForm} id={styles.registerButton}>
							<button title="Create account" onClick={() => {
								console.log("Registering");
							}}>
								<input type="submit" value="Register" />
							</button>
						</div>
					</form>
				</div>
			</main >
		</>
	);
}
