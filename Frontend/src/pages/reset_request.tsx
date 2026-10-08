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

export default function PasswordRequest() {
	/* TODO: change the below to account for password reset request
	The following was used for auth/login, needs to be changed.
	*/
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
				router.push("/reset_password");
			});
		});
	};
	// the above should be changed for password reset request

	return (
		<>
			<Head>
				<title>Reset Request</title>
				<meta name="description" content="Official eiei reset request page" />
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
					<div className={styles.switchPageButton} id={styles.backtoLogin}>
						<Link href="/login">
							<button title="Return" onClick={() => {
								console.log("Login Page");
							}}>← Back to Login
							</button>
						</Link>
					</div>
					<h1 id={styles.resetTitle}>Password Reset</h1>
					<form className={styles.form} id={styles.requestForm} onSubmit={handleSubmit}>
						<p id={styles.p}>Enter your <strong>email</strong> below.<br />A verification code must be sent before you can reset your password.</p>
						<label className={styles.label} htmlFor="email"></label><br />
						<input
							className={styles.textInput}
							onChange={setFormData}
							type="text"
							id="email"
							name="email"
							placeholder="Email:"></input><br />
						<label className={styles.label} htmlFor="password"></label><br />
						<div className={styles.submitForm} id={styles.requestButton}>
							<button title="Send Verification Code" onClick={() => {
								console.log("Send Code");
							}}>
								<input type="submit" value="Continue" />
							</button>
						</div>
					</form>
				</div>
			</main >
		</>
	);
}