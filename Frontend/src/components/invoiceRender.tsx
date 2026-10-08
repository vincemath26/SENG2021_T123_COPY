import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import styles from "@/styles/einvoice.module.css";
import {
	PencilSquare, Trash, ArrowCounterclockwise, Send
} from "react-bootstrap-icons";

import { invoiceData } from "../types/generalTypes";
import { sendInvoice } from "@/utils/invoiceSend";

async function createMarkup(invoiceText: string) {
	if (invoiceText === undefined || invoiceText === "") {
		return { __html: "<p>Invoice Loading</p>" };
	}

	const responseKey = await fetch("https://macroservices.masterofcubesau.com/api/v2/generatekey");
	const jsonKey = await responseKey.json();
	const key = jsonKey.key;

	const blob = new Blob([invoiceText], { type: "text/xml" });
	const file = new File([blob], "invoice.xml", { type: "text/xml" });

	const formData = new FormData();
	formData.append("style", "0");
	formData.append("language", "en");
	formData.append("file", file);

	const htmlText = await fetch("https://macroservices.masterofcubesau.com/api/v2/invoice/render/html", {
		method: "POST",
		headers: {
			"api-key": key
		},
		body: formData
	});

	const code = htmlText.status;
	if (code !== 200) {
		return { __html: "<p>Invalid invoice supplied</p>" };
	}
	const htmlString = await htmlText.text();

	return { __html: htmlString };
}

function InvoiceMenuBar(page: string, invoiceId: string) {
	if (page === "created") {
		return (
			<div className={styles.invoiceMenu}>
				<Button name="Button"
					className={styles.invoiceButton}
					variant="primary"
					title="Send to invoicee via email"
					onClick={async () => {
						console.log("modal - send email to invoicee");
						const selectedInvoice = localStorage.getItem("selectedInvoice");
						if (selectedInvoice !== null) {
							sendInvoice.sendEmailInvoice(await sendInvoice.getDataFromId(selectedInvoice));
						}
					}}
				>
					<Send size={25} />
				</Button>

				<Link href="/modify_invoice">
					<Button name="Button"
						className={styles.invoiceButton}
						variant="primary"
						title="Modify Invoice"
						onClick={() => {
							console.log("modify");
						}}
					>
						<PencilSquare size={25} />
					</Button>
				</Link>

				<Button name="Button"
					className={styles.invoiceButton}
					variant="primary"
					title="Delete Invoice"
					onClick={() => {
						deleteInvoice(invoiceId);
						console.log("delete");
					}}
				>
					<Trash size={25} />
				</Button>
			</div>
		);
	} else if (page === "deleted") {
		return (
			<div className={styles.invoiceMenu}>
				<Button
					className={styles.invoiceButton}
					variant="primary"
					title="Recover"
					onClick={() => {
						console.log("recover");
						recoverInvoice(invoiceId);
					}}
				>
					<ArrowCounterclockwise size={25} />
				</Button>

				<Button name="Button"
					className={styles.invoiceButton}
					id={styles.deletePermanent}
					variant="primary"
					title="Delete Permanently"
					onClick={() => {
						permanentDeletion(invoiceId);
						// console.log("permanently delete");
					}}
				>
					<Trash size={25} />
				</Button>
			</div>
		);
	} else {
		return <div></div>;
	}
}

async function deleteInvoice(invoiceId: string) {
	let token = "";
	if (typeof window !== "undefined") {
		token = localStorage.getItem("token") || "";
	}

	const invoiceIdsList = `http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/invoice/delete?invoiceId=${invoiceId}`;
	const url = invoiceIdsList;
	const result = await fetch(url, {
		method: "DELETE",
		headers: {
			token: token
		}
	});

	if (result.status === 200) {
		// alert("Succesful delete");
		window.location.reload();
	} else {
		alert("Something went wrong when deleteing ");
	}
}

function DeleteButton({ invoiceFilter, invoiceId }: { invoiceFilter: string, invoiceId: string }) {
	if (invoiceFilter === "outgoing") {
		return <button onClick={() => { deleteInvoice(invoiceId); }}>Delete</button>;
	}
	return <></>;
}

async function recoverInvoice(invoiceId: string) {
	const invoiceIdsList = `http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/invoice/deleteRecover?invoiceId=${invoiceId}`;
	const url = invoiceIdsList;
	const result = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			token: localStorage.getItem("token") || ""
		},
		body: JSON.stringify({ invoiceId: invoiceId })
	});

	const recoverData = await result.json();
	console.log("This is what we got", recoverData);
	const einvoice = (recoverData.einvoice).toString();
	const invoicer = (recoverData.invoicer).toString();
	const invoicee = (recoverData.invoicee).toString();
	if (result.status === 200) {
		window.location.reload();
	} else {
		alert("Something went wrong when deleteing ");
	}
	return { einvoice: einvoice, invoicer: invoicer, invoicee: invoicee };
}

async function permanentDeletion(invoiceId: string) {
	let token = "";
	if (typeof window !== "undefined") {
		token = localStorage.getItem("token") || "";
	}

	const invoiceIdsList = `http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/invoice/delete/permanent?invoiceId=${invoiceId}`;
	const url = invoiceIdsList;
	const result = await fetch(url, {
		method: "DELETE",
		headers: {
			token: token
		}
	});

	if (result.status === 200) {
		window.location.reload();
	} else {
		alert("Something went wrong when deleteing ");
	}
}

export default function InvoiceRender({ invoiceData, invoiceFilter, page }: { invoiceData: invoiceData, invoiceFilter: string, page: string }) {
	const [invoiceHTML, setInvoiceHTML] = useState({ __html: "<p>No invoice selected</p>" });
	useEffect(() => {
		if (invoiceData.invoiceId === undefined || invoiceData.invoiceId === "") {
			setInvoiceHTML({ __html: "<p>Invoice not supplied</p>" });
		} else {
			createMarkup(invoiceData.invoiceText).then(result => setInvoiceHTML(result));
		}
	}, [invoiceFilter, invoiceData]);

	if (invoiceData.modified === undefined || invoiceData.modified === "") {
		return <div>
			<p>
				No invoice selected
			</p>
		</div >;
	} else {
		return <div className={styles.invoiceView}>
			<p className={styles.invoiceSubject}>
				Subject to be implemented
			</p>
			<p className={styles.invoiceDetails}>
				To: {invoiceData.invoiceeName} ({invoiceData.invoiceeEmail}) <br />
				From: {invoiceData.invoicerName} ({invoiceData.invoicerEmail}) <br />
				Last modified: {format(new Date(invoiceData.modified), "dd/MM/yyyy")}
			</p>
			{InvoiceMenuBar(page, invoiceData.invoiceId)}
			<DeleteButton invoiceFilter={invoiceFilter} invoiceId={invoiceData.invoiceId} />
			<div className={styles.invoiceRenderBackground}>
				<div className={styles.invoiceRender} dangerouslySetInnerHTML={invoiceHTML} />
			</div>
		</div >;
	}
}