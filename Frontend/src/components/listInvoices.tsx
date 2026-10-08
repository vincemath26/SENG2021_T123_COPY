import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { invoiceData } from "@/types/generalTypes";
import { isSearchTarget } from "@/utils/invoicesSearch";

async function handleClick(id: string, filter: string, updateInvoice: React.Dispatch<React.SetStateAction<invoiceData>>) {
	let token = "";
	if (typeof window !== "undefined") {
		token = localStorage.getItem("token") || "";
	}
	const invoiceIdsList = `http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/invoices/retrieve?filter=specific-${filter}&ids[0]=${id}`;
	const url = invoiceIdsList;
	const result = await fetch(url, {
		method: "GET",
		headers: {
			token: token
		}
	});
	const rText = await result.json();
	const data = rText.invoices[0];
	console.log(data);
	const invoiceData: invoiceData = {
		invoiceId: data.invoiceId,
		invoicerName: data.invoicerName,
		invoicerEmail: data.invoicerEmail,
		invoiceeName: data.invoiceeName,
		invoiceeEmail: data.invoiceeEmail,
		created: data.created,
		modified: data.created,
		invoiceText: data.invoice,
		subject: data.subject
	};
	localStorage.setItem("selectedInvoice", data.invoiceId?.toString());
	updateInvoice(invoiceData);
}

function CreateRow({ id, updateInvoice, filter }: { id: string, updateInvoice: React.Dispatch<React.SetStateAction<invoiceData>>, filter: string }) {
	const [buttonData, setButtonData] = useState({ name: "Loading", subject: "", date: "" });

	useEffect(() => {
		let token = "";
		if (typeof window !== "undefined") {
			token = localStorage.getItem("token") || "";
		}
		const url = `http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/invoices/retrieve?filter=specific-${filter}&ids[0]=${id}`;
		fetch(url, {
			method: "GET",
			headers: {
				token: token
			}
		}).then(result => {
			result.json().then(dataRes => {
				const data = dataRes.invoices[0];
				const date = format(new Date(data.modified), "dd/MM/yyyy");
				let name = "";
				if (filter === "incoming") {
					name = data.invoicerName;
				} else {
					name = data.invoiceeName;
				}
				setButtonData({ name: name, subject: "Subject not implemented", date: date });
			});
		});
	}, [filter, id]);

	return (
		<tr>
			<td>
				<button name="Button" onClick={() => handleClick(id, filter, updateInvoice)}>
					<b>{buttonData.name}</b> <br />
					{buttonData.subject} <br />
					{buttonData.date} <br />
				</button>
			</td>
		</tr>
	);
}

async function generateRows(updateInvoice: React.Dispatch<React.SetStateAction<invoiceData>>, invoiceFilter: string) {
	let data = [];
	let token = "";
	let searchQuery = "";
	if (typeof window !== "undefined") {
		token = localStorage.getItem("token") || "";
		searchQuery = localStorage.getItem("searchQuery")?.toLocaleLowerCase() || "";
	}
	if (token === "") {
		return (
			<tr>
				<td>
					<p>Your login has expired</p>
				</td>
			</tr>
		);
	}

	if (invoiceFilter === undefined) {
		invoiceFilter = "outgoing";
	}

	const invoicesList = `http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/invoices/retrieve?filter=${invoiceFilter}`;
	const url = invoicesList;

	const result = await fetch(url, {
		method: "GET",
		headers: {
			token: token
		}
	});

	const rowData = await result.json();
	data = rowData.invoices;

	if (data === undefined) {
		return (
			<tr>
				<td>
					<p>Your login has expired</p>
				</td>
			</tr>
		);
	}

	if (data.length === 0) {
		return (
			<tr>
				<td>
					<p>You have no {invoiceFilter} invoices.</p>
				</td>
			</tr>
		);
	}

	const rows: React.ReactElement[] = [];
	data.forEach((row: invoiceData) => {
		if (isSearchTarget(searchQuery, row)) {
			rows.push(
				<CreateRow id={row.invoiceId} updateInvoice={updateInvoice} filter={invoiceFilter} />
			);
		}
	});

	return rows;
}

export default function InvoiceListComponent({ updateInvoice, invoiceFilter }: { updateInvoice: React.Dispatch<React.SetStateAction<invoiceData>>, invoiceFilter: string }) {
	const [rows, setRows] = useState(null);
	useEffect(() => {
		generateRows(updateInvoice, invoiceFilter).then((res) => { setRows(res as React.SetStateAction<any>); });
	}, [updateInvoice, invoiceFilter]);

	if (rows === null) {
		return (
			<table>
				<tbody>
					<tr>
						<td>
							Loading...
						</td>
					</tr>
				</tbody>
			</table>);
	}

	// reset search query to avoid confusion when switching to other pages - we can add some ui if we want to make this more persistent
	if (typeof window !== "undefined") {
		localStorage.setItem("searchQuery", "");
	}

	return (
		<table>
			<tbody>
				{rows}
			</tbody>
		</table>
	);
}
