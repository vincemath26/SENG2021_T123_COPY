import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createInvoice } from "@/utils/invoiceCreate";
import upload from "./upload";
import { InvoiceSubmission } from "@/utils/invoiceSubmission";
import validation from "./validation";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "@/styles/createModify-page.module.css";
import { sendInvoice } from "@/utils/invoiceSend";
import makeModifyRequest from "@/utils/invoiceModify";
import { useRouter } from "next/router";

const invoiceSubmission = new InvoiceSubmission();
let invoiceFile: File;

export class CreateBackground extends React.Component {
	render() {
		return (
			<div className="createBackground"></div>
		);
	}
}

export class PreviewInvoice extends React.Component {
	render() {
		return (
			<div className="previewInvoice">
				<Image
					id="invoiceImg"
					src="/sample_invoice.png"
					alt="Invoice Contents"
					title="Invoice Contents"
					width={550}
					height={800}
				/>
			</div>
		);
	}
}

export class CreateInterface extends React.Component {
	render() {
		return (
			<div className="createInterface"></div>
		);
	}
}

export class ClosePage extends React.Component {
	render() {
		return (
			<div className="closePage">
				<Link href="/myinvoices" id="closePage">
					<button name="Button" title="Close Page" onClick={() => {
						console.log("closing page");
					}}>
						<Image
							id="cancelImg"
							src="/images/cancel.png"
							alt="Close Page"
							width={40}
							height={40}
						/>
					</button>
				</Link>
			</div>
		);
	}
}

export class ClosePage2 extends React.Component {
	render() {
		return (
			<div className="closePage closePage2">
				<Link href="/create_invoice" id="closePage">
					<button name="Button" title="Close Page" onClick={() => {
						console.log("closing page");
					}}>
						<Image
							id="cancelImg"
							src="/images/cancel.png"
							alt="Close Page"
							width={40}
							height={40}
						/>
					</button>
				</Link>
			</div>
		);
	}
}

export class ClosePage3 extends React.Component {
	render() {
		return (
			<div className="closePage closePage2">
				<Link href="/modify_invoice" id="closePage">
					<button name="Button" title="Close Page" onClick={() => {
						console.log("closing page");
					}}>
						<Image
							id="cancelImg"
							src="/images/cancel.png"
							alt="Close Page"
							width={40}
							height={40}
						/>
					</button>
				</Link>
			</div>
		);
	}
}

export function CreateForm({ page }: { page: string }) {
	let sendToggle = false;
	const router = useRouter();
	const [subject, setSubject] = useState("");
	const [invoicee, setInvoicee] = useState("");
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const input = { subject, invoicee };
		const subjectInput: string = input.subject;
		const invoiceeInput: string = input.invoicee;
		const invoice = invoiceFile;
		console.log("This is the file! This is what was submitted in the file thing", invoice);
		console.log("This is it", subjectInput, invoiceeInput);
		let valid = false;
		if (invoice !== undefined) {
			valid = await validation(invoiceFile);
		}
		console.log("The file is =", valid);
		if (invoice !== undefined && valid === true) {
			// TODO: Add additional fields to upload... and fix upload to actually upload.
			alert("Successfully generated an invoice!");
			const fileToString = await createInvoice(invoiceFile);
			console.log("This is what we are uploading", fileToString, invoiceeInput, subjectInput);
			const selectedInvoice = await upload(fileToString, invoiceeInput, subjectInput);
			if (sendToggle === true && typeof window !== "undefined") {
				console.log("-> ", selectedInvoice);
				if (selectedInvoice !== null) {
					sendInvoice.sendEmailInvoice(await sendInvoice.getDataFromId(selectedInvoice));
				}
			}
			router.push("/myinvoices");
		} else if (invoice === undefined) {
			alert("Please don't forget to submit a file");
		} else if (valid === false) {
			alert("The invoice received was not valid!");
		} else {
			// TODO: Actual error handling - possibly within the upload function itself
			console.log("Error uploading invoice.");
		}
	};
	const handleModify = async (event: any) => {
		event.preventDefault();
		const input = { subject, invoicee };
		const subjectInput: string = input.subject;
		const invoiceeInput: string = input.invoicee;
		const invoice = invoiceFile;
		console.log("This is the file! This is what was submitted in the file thing", invoice);
		console.log("This is it", subjectInput, invoiceeInput);
		let valid = false;
		if (invoice !== undefined) {
			valid = await validation(invoiceFile);
		}
		let invoiceId = "";
		console.log("The file is =", valid);
		if (typeof window !== "undefined") {
			invoiceId = localStorage.getItem("selectedInvoice") || "";
		}
		if (invoiceFile !== undefined && valid === true && invoiceId !== "") {
			alert("Successfully updating invoice!");
			const fileToString = await createInvoice(invoiceFile);
			console.log("This is what we are uploading", invoiceId, fileToString, invoiceeInput, subjectInput);
			makeModifyRequest(invoiceId, fileToString, invoiceeInput, subjectInput);
			if (sendToggle === true) {
				console.log("-> ", invoiceId);
				sendInvoice.sendEmailInvoice(await sendInvoice.getDataFromId(invoiceId));
			}
			router.push("/myinvoices");
		} else if (invoice === undefined) {
			alert("Please don't forget to submit a file");
		} else if (valid === false) {
			alert("The invoice received was not valid!");
		} else if (invoiceId !== "") {
			// be scared if this happens
			alert("The modified invoice no longer exists!");
			router.push("/myinvoices");
		} else {
			// TODO: Actual error handling - possibly within the upload function itself
			console.log("Error uploading invoice.");
		}
	};
	return (
		<div>
			<Form className={styles.createForm} onSubmit = {(event) => {
				event.preventDefault();
				let invoiceFormToggle = "";
				if (typeof window !== "undefined") {
					invoiceFormToggle = localStorage.getItem("invoiceFormToggle") || "";
				}
				if (invoiceFormToggle === "submit") {
					return handleSubmit(event);
				} else if (invoiceFormToggle === "modify") {
					return handleModify(event);
				}
			}}>
				<Form.Control
					type="text"
					id={styles.formSubject}
					name="Button"
					placeholder="Subject:"
					value={subject}
					onChange = {(e) => setSubject(e.target.value)}
				/>
				<Form.Control
					type="text"
					id={styles.formInvoicees}
					name="Button"
					placeholder="Invoicee:"
					value={invoicee}
					onChange = {(e) => setInvoicee(e.target.value)}
				/>
				<Form.Switch
					className={styles.sendCheck}
					title="Email Delivery Once Invoice Updated"
					id={styles.sendCheck}
					label="Send to invoicee email"
					defaultChecked={false}
					onChange={() => { sendToggle = !sendToggle; }}
				/>
				<div className={styles.space}> </div>

				<Link href="/preview_create_invoice">
					<Button name="Button"
						className={styles.previewButton}
						title="Preview Invoice Details"
						variant="secondary"
						onClick={() => {
							console.log("preview invoice");
						}}
					>Preview</Button>
				</Link>

				<Button name="Button"
					className={styles.createButton}
					title="Update Invoice"
					variant="primary"
					type="submit"
					onClick={() => {
						console.log("create invoice");
					}}
				>{page} Invoice</Button>
			</Form>
		</div >
	);
}

export class DragDropArea extends React.Component {
	render() {
		return (
			<div className="dragDropArea">
				<p>Drag and Drop File Here</p>
			</div>
		);
	}
}

export class SelectFile extends React.Component {
	render() {
		return (
			<div className="selectFile">
				<label htmlFor="selectFile">
					<input name="Button" type="file" id="selectFile" onChange={(event) => {
						if (event.target.files && event.target.files[0]) {
							invoiceSubmission.setFile(event.target.files[0]);
							invoiceFile = event.target.files[0];
						}
						console.log(invoiceSubmission.getFile());
					}}
						accept="application/json, text/csv, text/xml, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
				</label>
			</div >
		);
	}
}

export class PreviewInvoiceButton extends React.Component {
	render() {
		return (
			<div className="previewInvoiceButton">
				<Link href="/preview_create_invoice" id="previewCreateInvoice">
					<button name="Button" title="Preview Invoice Details" onClick={() => {
						console.log("previewing file");
					}}>Preview</button>
				</Link>
			</div >
		);
	}
}

export class PreviewInvoiceButton2 extends React.Component {
	render() {
		return (
			<div className="previewInvoiceButton">
				<Link href="/preview_modify_invoice" id="previewModifyInvoice">
					<button title="Preview Invoice Details" name="Button" onClick={() => {
						console.log("previewing file");
					}}>Preview</button>
				</Link>
			</div >
		);
	}
}

export class ConfirmCreate extends React.Component {
	render() {
		return (
			<div className="confirmCreate">
				<Link href="/myinvoices" id="confirmCreate"><button title="Confirm Creation" name="Button" onClick={async () => {
					invoiceSubmission.updateSubmission();

					const file = invoiceSubmission.getFile() as File;
					const subject = invoiceSubmission.getSubject() as string;
					const invoicees = invoiceSubmission.getInvoicees() as string;
					console.log("creating invoice:", file, subject, invoicees);

					const valid = await validation(file);
					console.log("The file is =", valid);
					if (file !== undefined && valid === true) {
						// TODO: Add additional fields to upload... and fix upload to actually upload.
						alert("Successfully generated an invoice!");
						const fileToString = await createInvoice(file);
						console.log("This is what we are uploading", fileToString, invoicees, subject);
						upload(fileToString, invoicees, subject);
					} else if (valid === false) {
						alert("The invoice received was not valid!");
					} else {
						// TODO: Actual error handling - possibly within the upload function itself
						console.log("Error uploading invoice.");
					}
				}}>Create Invoice</button></Link>
			</div >
		);
	}
}

export class ConfirmModify extends React.Component {
	render() {
		return (
			<div className="confirmCreate">
				<Link href="/myinvoices" id="confirmModify"><button title="Confirm Modification" name="Button" onClick={() => {
					console.log("modifying invoice");
				}}>Modify Invoice</button></Link>
			</div >
		);
	}
}
