export default async function upload(invoiceText: string, invoicee: string, subject?: string) {
	// Store the given invoiceText by the user into a formData value.
	const formData = new FormData();
	formData.append("einvoice", invoiceText);
	formData.append("invoicee", invoicee);
	formData.append("subject", subject as string);
	const data = {
		einvoice: invoiceText,
		invoicee: invoicee,
		subject: subject
	};

	// Next, call our API and give it the formData which contains the invoice text.
	const upload = "http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/invoice/upload";
	const response = await fetch(upload, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			token: localStorage.getItem("token") || ""
		},
		body: JSON.stringify({ einvoice: data.einvoice, invoicee: data.invoicee, subject: data.subject })
	});

	// Wait for the response and hopefully get the invoice id.
	const uploadData = await response.json();
	console.log("This is what we got", uploadData);
	const invoiceId = (uploadData.invoiceId).toString();
	return invoiceId;
}