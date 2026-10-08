import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/home-page.module.css";
import { SearchBar } from "../components/home";
import { ReceivedSideMenu } from "@/components/homeSideMenu";
import HomeTopMenu from "@/components/homeTopMenu";
import InvoiceListComponent from "@/components/listInvoices";
import InvoiceRender from "@/components/invoiceRender";
import { invoiceData } from "../types/generalTypes";

export default function Received() {
	const [invoideData, setInvoiceData] = useState<invoiceData>({ invoiceId: "", invoicerName: "", invoiceeName: "", invoicerEmail: "", invoiceeEmail: "", invoiceText: "", created: "", modified: "", subject: "" });
	return (
		<>
			<Head>
				<title>All Received</title>
				<meta name="description" content="Official eiei page to view received invoices" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/teapot.png" />
			</Head>
			<main>
				<div className={styles.homeBackground} />
				<div className={styles.homeTopMenu}>
					<HomeTopMenu />
				</div>
				<div className={`${styles.homeSideMenu} ${styles.receivedSideMenu} ${styles.createPopup}`}>
					<ReceivedSideMenu />
				</div>
				<div className={styles.homePageTitle}>
					<h1>Received Invoices</h1>
				</div>
				<div className={styles.searchBar}>
					<SearchBar />
				</div>
				<div className={styles.listInvoices} id={styles.receivedList}>
					<InvoiceListComponent updateInvoice={setInvoiceData} invoiceFilter={"incoming"} />
				</div>
				<InvoiceRender invoiceData={invoideData} invoiceFilter={"incoming"} page={"received"} />
			</main>
		</>
	);
}