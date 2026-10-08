import express, { NextFunction, Request, Response } from "express";
import { validateToken } from "../tokenManager";
import { insert, invoiceList, retrieval, modify } from "./invoice";

const invoiceController = express.Router();

// /invoice/upload
function validateUploadRequest(req: Request, res: Response, next: NextFunction) {
	const token = req.header("token") as string;
	const { invoicee, invoice } = req.body;
	if (invoicee === undefined || invoice === undefined) {
		return res.status(400).json({ message: "Error: Malformed response." });
	}
	if (!validateToken(token)) {
		return res.status(401).json({ message: "Invalid token" });
	}
	next();
}

invoiceController.post("/upload", validateUploadRequest, async (req: Request, res: Response) => {
	const token = req.header("token") as string;
	const { invoicee, invoice } = req.body;
	const reply = await insert(token, invoicee, invoice);
	res.status(reply.code).json({ message: reply.message });
});

invoiceController.get("/retrieval", /* VerifyToken, */ async (req: Request, res: Response) => {
	const token = req.header("token") as string;
	const { invoiceId } = req.query;
	const reply = await retrieval(token as string, invoiceId as string);
	res.status(reply.code).json({ einvoice: reply.einvoice, invoicer: reply.invoicer, invoicee: reply.invoicee });
});

// /invoice/modify
function validateModifyRequest(req: Request, res: Response, next: NextFunction) {
	const token = req.header("token") as string;
	const { invoiceID, eInvoice, invoicee } = req.body;
	if (!validateToken(token)) {
		return res.status(401).json({ message: "Invalid token" });
	}
	if (invoiceID === undefined || eInvoice === undefined || invoicee === undefined) {
		return res.status(400).json({ message: "Error: Malformed response." });
	}
	next();
}

invoiceController.put("/modify", validateModifyRequest, async (req: Request, res: Response) => {
	const token = req.header("token") as string;
	const { invoiceID, eInvoice, invoicee } = req.body;
	console.log(invoiceID, token, eInvoice, invoicee);
	const reply = await modify(invoiceID, token, eInvoice, invoicee);
	res.status(reply.code).json(reply.message);
});

// /invoice/list
function validateListRequest(req: Request, res: Response, next: NextFunction) {
	const token = req.header("token") as string;
	if (!validateToken(token)) {
		return res.status(401).json({ message: "Invalid token" });
	}
	next();
}

invoiceController.get("/list", validateListRequest, async (req: Request, res: Response) => {
	const token = req.header("token") as string;
	const { filter } = req.query;
	const reply = await invoiceList(token as string, filter as string);
	res.status(reply.code).json(reply.message);
});

export { invoiceController };