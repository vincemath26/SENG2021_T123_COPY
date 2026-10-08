import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
	const [token, setToken] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			setToken(localStorage.getItem("token") || "");
		}
		if (token === undefined || token === "") {
			router.push("/login");
		} else {
			router.push("/received");
		}
	}, [token, router]);

	return (
		<>
			<Head>
				<link rel="icon" href="/teapot.png" />
			</Head>
			<main >
				<h1>Redirecting...</h1>
			</main>
		</>
	);
}
