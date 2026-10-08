/**
 * Creates an invoice given a .json, .csv, .xml or .xlsx file in either string or file form.
 * @param invoice 	The invoice to be created - string (binary)
 * @param fileType 	The extension of the file - json, csv, xml or xlsx
 * @returns 				The new invoice - string (when successful)
 */
export async function createInvoice(invoice: File) {
	console.log("Time to showcase creation", invoice);
	let convertedString = "Blank";
	const reader = new FileReader();

	console.log(await reader.readAsText(invoice));
	return new Promise<string>((resolve, reject) => {
		reader.onload = function() {
			convertedString = reader.result as string;
			console.log("The converted string is,", convertedString);
			resolve(convertedString);
		};
	});
}

/**
 * Parses the file type and returns it as a MIME type (string) inside of an object.
 * @param fileType 	Type of the file being put in.
 * @returns 				Object with string inside.
 */
// function getFileType(fileType: string) {
// 	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
// 	let type = { type: "application/octet-stream" };

// 	switch (fileType.toLowerCase()) {
// 		case "json":
// 			type = { type: "application/json" };
// 			break;
// 		case "csv":
// 			type = { type: "text/csv" };
// 			break;
// 		case "xml":
// 			// If there's some weird bug here, prefer "application/xml"
// 			type = { type: "text/xml" };
// 			break;
// 		case "xlsx":
// 			type = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
// 			break;
// 		default:
// 			console.log("Error: Create invoice function did not recieve a file type!");
// 			break;
// 	}
// 	return type;
// }