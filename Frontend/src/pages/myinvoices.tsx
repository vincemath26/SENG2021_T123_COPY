import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/home-page.module.css";
import { SearchBar } from "../components/home";
import { CreatedSideMenu } from "@/components/homeSideMenu";
import HomeTopMenu from "@/components/homeTopMenu";
import InvoiceRender from "@/components/invoiceRender";
import InvoiceListComponent from "@/components/listInvoices";
import { invoiceData } from "../types/generalTypes";
import { BorderHandler } from "@/utils/borderHandler";

export default function MyInvoices() {
	const [invoideData, setInvoiceData] = useState<invoiceData>({ invoiceId: "", invoicerName: "", invoiceeName: "", invoicerEmail: "", invoiceeEmail: "", invoiceText: "", created: "", modified: "", subject: "" });
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
				<div className={styles.homeBackground}/>
				<div className={styles.homeTopMenu}>
					<HomeTopMenu />
				</div>
				<div className={`${styles.homeSideMenu} ${styles.createdSideMenu} ${styles.createPopup}`}>
					<CreatedSideMenu />
				</div>
				<div className={styles.homePageTitle}>
					<h1>Sent Invoices</h1>
				</div>
				<div className={styles.searchBar}>
					<SearchBar />
				</div>
				<div className={styles.listInvoices} id={styles.createdList}>
					<InvoiceListComponent updateInvoice={setInvoiceData} invoiceFilter={"outgoing"} />
				</div>
				<InvoiceRender invoiceData={invoideData} invoiceFilter={"incoming"} page={"created"} />
			</main>
		</>
	);
}