import React from "react";
import Head from "next/head";
import styles from "@/styles/createModify-page.module.css";
import {
	CreateBackground, CreateInterface, ClosePage, DragDropArea,
	CreateForm, SelectFile, PreviewInvoiceButton2, ConfirmModify
} from "../components/createModify";
import { BorderHandler } from "@/utils/borderHandler";

export default function ModifyInvoice() {
	BorderHandler.autoSetBorders(BorderHandler.getBorderState());
	if (typeof window !== "undefined") {
		localStorage.setItem("invoiceFormToggle", "modify");
	}
	return (
		<>
			<Head>
				<title>Modify Invoice</title>
				<meta name="description" content="Official eiei page to modify invoices" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/teapot.png" />
			</Head>
			<main>
				<div className={styles.createBackground}>
					<CreateBackground />
				</div>
				<div className={styles.createInterface}>
					<CreateInterface />
				</div>
				<div className={styles.closePage}>
					<ClosePage />
				</div>
				<div className={styles.createPageTitle}>
					<h1>Modify Invoice</h1>
				</div>
				<div className={styles.dragDropArea}>
					<DragDropArea />
				</div>
				<div className={styles.textFields}>
					<CreateForm page={"Modify"} />
				</div>
				<div className={styles.selectFile}>
					<SelectFile />
				</div>
				<div className={styles.previewInvoiceButton}>
					<PreviewInvoiceButton2 />
				</div>
				<div className={styles.confirmCreate}>
					<ConfirmModify />
				</div>
			</main>
		</>
	);
}
