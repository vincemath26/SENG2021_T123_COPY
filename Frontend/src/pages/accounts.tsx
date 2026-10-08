import React from "react";
import Head from "next/head";
import styles from "@/styles/home-page.module.css";
import { SettingsSideMenu } from "@/components/homeSideMenu";
import { AccountSettings } from "@/components/settings";
import { BorderHandler } from "@/utils/borderHandler";

export default function Accounts() {
	// why doesn't this work? confused
	if (typeof window !== "undefined") {
		window.onload = () => {
			BorderHandler.autoSetBorders(BorderHandler.getBorderState());
		};
	}
	BorderHandler.autoSetBorders(BorderHandler.getBorderState());
	return (
		<>
			<Head>
				<title>myInvoices</title>
				<meta name="description" content="Official eiei page to view created invoices" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/teapot.png" />
			</Head>
			<main>
				<div className={styles.homeBackground} />
				<div className={`${styles.homeSideMenu} ${styles.settingsSideMenu} ${styles.createPopup}`}>
					<SettingsSideMenu />
				</div>
				<div className={styles.homePageTitle}>
					<h1>Account Settings</h1>
				</div>
				<AccountSettings />
			</main>
		</>
	);
}