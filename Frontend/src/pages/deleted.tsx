import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/home-page.module.css";
import { SearchBar } from "../components/home";
import { DeletedSideMenu } from "@/components/homeSideMenu";
import HomeTopMenu from "@/components/homeTopMenu";
import InvoiceListComponent from "@/components/listInvoices";
import InvoiceRender from "@/components/invoiceRender";
import { invoiceData } from "../types/generalTypes";
import { BorderHandler } from "@/utils/borderHandler";

export default function Deleted() {
	BorderHandler.autoSetBorders(BorderHandler.getBorderState());
	const [invoideData, setInvoiceData] = useState<invoiceData>({ invoiceId: "", invoicerName: "", invoiceeName: "", invoicerEmail: "", invoiceeEmail: "", invoiceText: "", created: "", modified: "", subject: "" });
	return (
		<>
			<Head>
				<title>Recently Deleted</title>
				<meta name="description" content="Official eiei page to view deleted invoices" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/teapot.png" />
			</Head>
			<main>
				<div className={styles.homeBackground}>
				</div>
				<div className={styles.homeTopMenu}>
					<HomeTopMenu />
				</div>
				<div className={`${styles.homeSideMenu} ${styles.deletedSideMenu} ${styles.createPopup}`}>
					<DeletedSideMenu />
				</div>
				<div className={styles.homePageTitle}>
					<h1>Delete Invoices</h1>
				</div>
				<div className={styles.searchBar}>
					<SearchBar />
				</div>
				<div className={styles.listInvoices} id={styles.deletedList}>
					<InvoiceListComponent updateInvoice={setInvoiceData} invoiceFilter={"outgoing-deleted"} />
				</div>
				<InvoiceRender invoiceData={invoideData} invoiceFilter={"incoming"} page={"deleted"} />
			</main>
		</>
	);
}