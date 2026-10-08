import { clear } from "../helper";
import request from "sync-request";
import config from "../config.json";

// If server sets up as localhost
const url = process.env.IP || "localhost";
const port = config.port;

let token1: string;
let token2: string;
let invoiceID: string;

beforeEach(async () => {
	const temp = await clear();
	request(
		"POST",
		`http://${url}:${port}` + "/auth/register",
		{ json: { email: "whosinmy@gmail.com", name: "Michael Soft", password: "amazonapple" } }
	);

	const r1 = request(
		"POST",
		`http://${url}:${port}` + "/auth/login",
		{ json: { email: "whosinmy@gmail.com", password: "amazonapple" } }
	);

	const data1 = JSON.parse(r1.getBody() as string);
	token1 = data1.message;

	request(
		"POST",
		`http://${url}:${port}` + "/auth/register",
		{ json: { email: "thisismy@gmail.com", name: "Sam Sung", password: "intelgoogle" } }
	);

	const r2 = request(
		"POST",
		`http://${url}:${port}` + "/auth/login",
		{ json: { email: "thisismy@gmail.com", password: "intelgoogle" } }
	);

	const data2 = JSON.parse(r2.getBody() as string);
	token2 = data2.message;

	const r3 = request(
		"POST",
		`http://${url}:${port}` + "/invoice/upload",
		{ json: { invoicee: "thisismy@gmail.com", invoice: "hua way" }, headers: { token: token1 } }
	);

	const data3 = JSON.parse(r3.getBody() as string);
	invoiceID = data3.message;

	return temp;
});

describe("Incorrectly using endpoint /modify", () => {
	describe("Empty inputs", () => {
		test("all empty", () => {
			console.log("all empty");
			const res = request(
				"PUT",
				`http://${url}:${port}` + "/invoice/modify",
				{
					json: {
						invoiceID: "",
						eInvoice: "",
						invoicee: ""
					},
					headers: { token: "" }
				}
			);
			expect(res.statusCode).toBe(401);
		});
		test("invoiceID missing", () => {
			console.log("invoiceID missing");
			const res = request(
				"PUT",
				`http://${url}:${port}` + "/invoice/modify",
				{
					json: {
						invoiceID: "",
						eInvoice: "lynne icks",
						invoicee: "thisismy@gmail.com"
					},
					headers: { token: token1 }
				}
			);
			expect(res.statusCode).toBe(400);
		});
		test("token missing", () => {
			console.log("token missing");
			const res = request(
				"PUT",
				`http://${url}:${port}` + "/invoice/modify",
				{
					json: {
						invoiceID: invoiceID,
						eInvoice: "lynne icks",
						invoicee: "thisismy@gmail.com"
					},
					headers: { token: "" }
				}
			);
			expect(res.statusCode).toBe(401);
		});
	});

	describe("Inputs do not match constraints", () => {
		test("invalid invoice: invoice does not exist", () => {
			console.log("invoice does not exist");
			const res = request(
				"PUT",
				`http://${url}:${port}` + "/invoice/modify",
				{
					json: {
						invoiceID: "2",
						eInvoice: "lynne icks",
						invoicee: "thisismy@gmail.com"
					},
					headers: { token: token1 }
				}
			);
			expect(res.statusCode).toBe(400);
		});
		test("invalid token", () => {
			console.log("invalid token");
			const res = request(
				"PUT",
				`http://${url}:${port}` + "/invoice/modify",
				{
					json: {
						invoiceID: invoiceID,
						eInvoice: "lynne icks",
						invoicee: "thisismy@gmail.com"
					},
					headers: { token: "confluence is bad" }
				}
			);
			expect(res.statusCode).toBe(401);
		});
	});

	test("requester is not the invoicer", () => {
		console.log("permission denied");
		const res = request(
			"PUT",
			`http://${url}:${port}` + "/invoice/modify",
			{
				json: {
					invoiceID: invoiceID,
					eInvoice: "lynne icks",
					invoicee: "thisismy@gmail.com"
				},
				headers: { token: token2 }
			}
		);
		expect(res.statusCode).toBe(403);
	});
});

describe("Correctly using endpoint /modify", () => {
	test("modify an invoice with new content", () => {
		console.log("success: modify");
		const res = request(
			"PUT",
			`http://${url}:${port}` + "/invoice/modify",
			{
				json: {
					invoiceID: invoiceID,
					eInvoice: "lynne icks",
					invoicee: "thisismy@gmail.com"
				},
				headers: { token: token1 }
			}
		);
		expect(res.statusCode).toBe(200);
	});

	test("modify an invoice but same content", () => {
		console.log("success: modify same content");
		const res = request(
			"PUT",
			`http://${url}:${port}` + "/invoice/modify",
			{
				json: {
					invoiceID: invoiceID,
					eInvoice: "hua way",
					invoicee: "thisismy@gmail.com"
				},
				headers: { token: token1 }
			}
		);
		expect(res.statusCode).toBe(200);
	});

	test("modify an invoice but no content", () => {
		console.log("success: modify no content");
		const res = request(
			"PUT",
			`http://${url}:${port}` + "/invoice/modify",
			{
				json: {
					invoiceID: invoiceID,
					eInvoice: "",
					invoicee: "thisismy@gmail.com"
				},
				headers: { token: token1 }
			}
		);
		expect(res.statusCode).toBe(200);
	});
});
