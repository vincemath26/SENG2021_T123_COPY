/**
 * Validates a given invoice using Churros' API.
 * @param invoiceFile 	The invoice to be validated.
 * @returns isValid		A boolean that indicates whether the given invoice is valid or not.
 */

// Main function to call validation to occur.
export default async function validation(invoiceFile: File) {
	// Option two was having validation to receive an actual file instead of a string.
	const formData = new FormData();
	formData.append("file", invoiceFile);
	const data = {
		file: invoiceFile
	};
	console.log(JSON.stringify(data));
	// Then we want to use Churros' upload file function to get the report id.
	const upload = "http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com/invoice/upload_file/v1";
	const response = await fetch(upload, {
		method: "POST",
		body: formData
	});
	const uploadData = await response.json();
	const reportId = (uploadData.report_id).toString();

	// Next I want to use Churros' report check validity function to return boolean.
	const validation = getReport(reportId);

	// End Function
	return validation;
}

async function getReport(reportId: string) {
	const report = `http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com/report/check_validity/v1?report_id=${reportId}`;
	const response = await fetch(report);
	const data = await response.json();
	return data.is_valid;
}
