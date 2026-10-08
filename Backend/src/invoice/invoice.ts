import { runQueryV2 } from "../dbInteract";
import { uidFromToken } from "../tokenManager";

/**
 * Insert an invoice into the database
 *
 * @param token - The token of the user creating the invoice
 * @param invoicee - The email of the invoicee
 * @param invoice - The invoice text
 *
 * @returns - An object with a status code and a string message.
 */
async function insert(token: string, invoicee: string, invoice: string) {
	if (token === "" || invoicee === "" || invoice === "") {
		return { code: 400, message: "Empty input" };
	}

	const userId = uidFromToken(token);

	let invoiceeId;
	const getIdQuery = `SELECT id FROM users WHERE email = '${invoicee}'`;
	try {
		const dbresponse = await runQueryV2(getIdQuery);
		if (dbresponse !== undefined && "rowCount" in dbresponse && "rows" in dbresponse && dbresponse.rows instanceof Array) {
			if (dbresponse.rowCount === 0) {
				return { code: 401, message: "Invalid email" };
			}
			invoiceeId = dbresponse.rows[0].id;
		} else {
			return { code: 500, message: "Unknown issues" };
		}
	} catch (err) {
		const code = Number.parseInt(err as string);
		return { code: 500, message: `Unhandled postgres error ${code}` };
	}

	const date = new Date();
	const now = date.toISOString().slice(0, 10); // Gets current date in ISO 8601 format, e.g. 2023-03-05
	const query = `INSERT INTO einvoices (invoicer, invoicee, invoice, created, modified) VALUES (${userId}, ${invoiceeId}, '${invoice}', '${now}', '${now}') RETURNING id`;
	try {
		const dbresponse = await runQueryV2(query);
		if (dbresponse !== undefined && "rowCount" in dbresponse && "rows" in dbresponse && dbresponse.rows instanceof Array) {
			return { code: 200, message: `${JSON.stringify(dbresponse.rows[0].id)}` };
		} else {
			return { code: 500, message: "Unknown issues" };
		}
	} catch (err) {
		const code = Number.parseInt(err as string);
		return { code: 500, message: `Unhandled postgres error ${code}` };
	}
}

/**
 * Insert an invoice into the database
 *
 * @param token - The token of the user creating the invoice
 * @param invoiceId - The id generated for the uploaded invoice
 *
 * @returns - An object with a status code and multiple string messages; einvoice, invoicer, invoicee.
 */
async function retrieval(token: string, invoiceId: string) {
	if (token === "" || invoiceId === "") {
		return { code: 400, message: "Empty input" };
	}

	const userId = uidFromToken(token);
	if (userId === undefined) {
		return { code: 401, message: "Invalid token given" };
	}

	const conversion = parseInt(invoiceId);

	if (isNaN(conversion)) {
		return { code: 401, message: "Invalid invoice given" };
	}

	const findingInvoice = `SELECT invoice FROM einvoices WHERE id = '${conversion}'`;

	let invoiceTaken;
	try {
		const request1 = await runQueryV2(findingInvoice);
		if (request1 === undefined) {
			return { code: 401, message: "Empty invoice given" };
		} else if ("rowCount" in request1 && "rows" in request1 && request1.rows instanceof Array) {
			invoiceTaken = request1.rows[0].invoice;
		}
	} catch (err) {
		const code = Number.parseInt(err as string);
		return { code: 500, message: `Unhandled postgres error ${code}` };
	}

	const findingInvoicer = `SELECT invoicer FROM einvoices WHERE id = '${conversion}'`;
	const findingInvoicee = `SELECT invoicee FROM einvoices WHERE id = '${conversion}'`;

	let invoicerIdTaken;
	let invoiceeIdTaken;
	let emailInvoicee;
	try {
		const request2 = await runQueryV2(findingInvoicer);
		const request3 = await runQueryV2(findingInvoicee);
		if (request2 === undefined || request3 === undefined) {
			return { code: 500, message: "Unexpected error found" };
		}
		if ("rowCount" in request2 && "rows" in request2 && request2.rows instanceof Array) {
			invoicerIdTaken = request2.rows[0].invoicer;
		}
		if ("rowCount" in request3 && "rows" in request3 && request3.rows instanceof Array) {
			invoiceeIdTaken = request3.rows[0].invoicee;
		}
		const findingEmail = `SELECT email FROM users WHERE id = '${invoiceeIdTaken}'`;
		const request4 = await runQueryV2(findingEmail);
		if (request4 === undefined) {
			return { code: 500, message: "Unexpected error found" };
		}
		if ("rowCount" in request4 && "rows" in request4 && request4.rows instanceof Array) {
			emailInvoicee = request4.rows[0].email;
		}
		if (userId === invoicerIdTaken || userId === invoiceeIdTaken) {
			return { code: 200, einvoice: invoiceTaken, invoicer: invoicerIdTaken, invoicee: emailInvoicee };
		} else {
			return { code: 401, message: "Invalid access to given invoice" };
		}
	} catch (err) {
		const code = Number.parseInt(err as string);
		return { code: 500, message: `Unhandled postgres error ${code}` };
	}
}

/*
 * List the ids of the invoices in the database
 *
 * @param token - auth of user
 * @param filter - filter applied on list
 *
 * @returns array of ids
 */
async function invoiceList(token: string, filter?: string) {
	// Responsibility is passed onto the user for correct filter input
	let query = "SELECT id FROM einvoices";
	if (filter !== null && filter !== undefined && filter !== "") {
		query = query + ` WHERE ${filter}`;
	}
	try {
		const dbresponse = await runQueryV2(query);
		if (dbresponse !== undefined && "rowCount" in dbresponse && "rows" in dbresponse && dbresponse.rows instanceof Array) {
			const idArray = [];
			for (let i = 0; i < (dbresponse.rowCount as number); i++) {
				idArray.push(dbresponse.rows[i].id);
			}
			return { code: 200, message: `${idArray}` };
		} else {
			return { code: 500, message: "Unknown issues" };
		}
	} catch (err) {
		const code = Number.parseInt(err as string);
		return { code: 500, message: `Unhandled postgres error ${code}` };
	}
}

/**
 * Insert an invoice into the database
 *
 * @param invoiceID - The id (string) generated for the uploaded invoice
 * @param token - The (encrypted) token containing id of the user
 * @param invoicee - The email of the invicee
 * @param eInvoice - The content inside XML invoice file user wants to replace with
 *
 * @returns - An object containing eInvoice, invoicerID and invoiceeID
 */
async function modify(invoiceID: string, token: string, eInvoice: string, invoicee: string) {
	// error checking
	if (invoiceID === "" || token === "") {
		console.log("--- error: 1");
		return { code: 400, message: "Empty input" };
	}

	// validate token
	const userID = uidFromToken(token);
	if (userID === undefined) {
		console.log("--- error: 2");
		return { code: 401, message: "Invalid token" };
	}

	// parse invoiceID as int and check for valid invoiceID
	const parsedInvoiceID = Number.parseInt(invoiceID);
	if (Number.isNaN(parsedInvoiceID)) {
		console.log("--- error: 3");
		return { code: 400, message: "Invalid invoice ID" };
	}

	// get invoiceeID, check if invoicee is a valid user
	let invoiceeID;
	const getIdQuery2 = `SELECT id FROM users WHERE email = '${invoicee}'`;
	try {
		const dbres = await runQueryV2(getIdQuery2);
		if (dbres !== undefined && "rowCount" in dbres && "rows" in dbres && dbres.rows instanceof Array) {
			if (dbres.rowCount === 0) {
				console.log("--- error: 4a");
				return { code: 401, message: "Invoicee does not exist" };
			}
			invoiceeID = dbres.rows[0].id;
		} else {
			console.log("--- error: 4b");
			return { code: 500, message: "Unknown issues" };
		}
	} catch (err) {
		const code = Number.parseInt(err as string);
		console.log("--- error: 4c");
		return { code: 500, message: `Unhandled postgres error ${code}` };
	}

	// check if user has permission to modify this invoice
	let invoicerID;
	const getIdQuery3 = `SELECT invoicer FROM eInvoices WHERE id = ${parsedInvoiceID}`;
	try {
		const dbres = await runQueryV2(getIdQuery3);
		if (dbres !== undefined && "rowCount" in dbres && "rows" in dbres && dbres.rows instanceof Array) {
			if (dbres.rowCount === 0) {
				console.log("--- error: 5a");
				return { code: 400, message: "Invoice does not exist" };
			}
			invoicerID = dbres.rows[0].invoicer;
			if (invoicerID !== userID) {
				console.log("--- error: 6");
				return { code: 403, message: "Permission to modify invoice denied" };
			}
		} else {
			console.log("--- error: 5b");
			return { code: 500, message: "Unknown issues" };
		}
	} catch (err) {
		console.log("--- error: 5c");
		const code = Number.parseInt(err as string);
		return { code: 500, message: `Unhandled postgres error ${code}` };
	}

	// modify the invoice, changing contents and date last modified
	const date = new Date();
	const now = date.toISOString().slice(0, 10); // Gets current date in ISO 8601 format, e.g. 2023-03-05
	const query = `UPDATE eInvoices SET invoice = '${eInvoice}', invoicee = ${invoiceeID}, modified = '${now}' WHERE id = ${parsedInvoiceID}`;
	try {
		await runQueryV2(query);
		return { code: 200, message: "Success!" };
	} catch (err) {
		console.log("--- error: 7");
		const code = Number.parseInt(err as string);
		return { code: 500, message: `Unhandled postgres error ${code}` };
	}
}

export { insert, invoiceList, retrieval, modify };
