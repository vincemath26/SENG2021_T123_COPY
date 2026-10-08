import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { env } from "../../next.config";
import { useState } from "react";	// useEffect
// import { invoiceList } from "../pages/api/invoice_list";
// import ReactDOM from "react-dom";
import styles from "@/styles/home-page.module.css";
import { BorderHandler } from "@/utils/borderHandler";

// think about parent/child components, data flows downwards in tree

// create basic UI components

export class ReceivedSideMenu extends React.Component {
	render() {
		return (
			<div className="homeSideMenu receivedSideMenu">
				<Link href="/create_invoice" id="createInvoice">
					<button title="Create a New Invoice" onClick={() => {
						console.log("create new");
					}}>Create New</button>
				</Link>

				<h2><strong>Navigation</strong></h2>

				<Link href="/received" id="received">All Received</Link>
				<Link href="/myinvoices" id="myInvoices">myInvoices</Link>
				<Link href="/deleted" id="deleted">Recently Deleted</Link>

			</div>
		);
	}
}

export class CreatedSideMenu extends React.Component {
	render() {
		return (
			<div className="homeSideMenu createdSideMenu sidebar">
				<Link href="/create_invoice" id="createInvoice">
					<button title="Create a New Invoice" onClick={() => {
						console.log("create new");
					}}>Create New</button>
				</Link>

				<h2><strong>Folders</strong></h2>

				<Link href="/received" id="received">All Received</Link>
				<Link href="/myinvoices" id="myInvoices">myInvoices</Link>
				<Link href="/deleted" id="deleted">Recently Deleted</Link>

			</div>
		);
	}
}

export class DeletedSideMenu extends React.Component {
	render() {
		return (
			<div className="homeSideMenu deletedSideMenu">
				<Link href="/create_invoice" id="createInvoice">
					<button title="Create a New Invoice" onClick={() => {
						console.log("create new");
					}}>Create New</button>
				</Link>

				<h2><strong>Folders</strong></h2>

				<Link href="/received" id="received">All Received</Link>
				<Link href="/myinvoices" id="myInvoices">myInvoices</Link>
				<Link href="/deleted" id="deleted">Recently Deleted</Link>

			</div>
		);
	}
}

export class SettingsSideMenu extends React.Component {
	render() {
		return (
			<div className="homeSideMenu settingsSideMenu">
				<button title="Back Home" onClick={() => {
					console.log("back home");
				}}>Back Home</button>

				<h2><strong>Settings</strong></h2>

				<a href="" id="accounts">Accounts</a>
				<a href="" id="theme">Theme</a>
				<a href="" id="access">Accessibility</a>

			</div>
		);
	}
}

export class CreatedPageTitle extends React.Component {
	render() {
		return (
			<div className="homePageTitle">
				<h1>myInvoices</h1>
			</div>
		);
	}
}

export class SearchBar extends React.Component {
	render() {
		BorderHandler.autoSetBorders(BorderHandler.getBorderState());
		return (
			<div className="searchBar">
				<label id="searchBar">
					<form onSubmit={() => {
						if (typeof window !== "undefined") {
							localStorage.setItem("searchQuery", (document.getElementById("searchInput") as HTMLInputElement).value);
						}
					}}>
						<input name="Button" id="searchInput" type="text" placeholder="Search for keywords or filters:"></input>
					</form>
				</label>
			</div>
		);
	}
}
/*
export class ListInvoiceData extends React.Component {
	const callInvoiceList = async () => {
		try {
			const filter = "";
			const data = invoiceList(filter);
			console.log(data);
			return data;
		} catch (err) {
			console.log(err);
			return {};
		}
	};
}

const callInvoiceList = async (filter: string) => {
	try {
		const data = invoiceList(filter);
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
		return {};
	}
};

function ListInvoiceData(props) {
	const filter = props.filter;
	let data = callInvoiceList(filter);
	const listItems = data["invoideIds"].map((id: string) =>
		<li key={id.toString()}>{id}</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}

function ListInvoices2(filter: string) {
	// const [html] = useState({ __html: "" });
	const rows: Array<object> = [];

	useEffect(() => {
		invoiceList(filter).then(result => {
			result.forEach((invoiceIds) => {
				rows.push(
					<li>
						<button onClick={() => {
							console.log("invoice");
						}}>
							{invoiceIds.invoiceId}
						</button>
					</li>
				);
			});
		});
	});

	return rows;
}
*/

export class InvoiceSubject extends React.Component {
	render() {
		// getSubject()
		return (
			<div className="invoiceSubject">
				<p>ABC Pty Ltd</p>
			</div>
		);
	}
}

export class InvoiceDetails extends React.Component {
	render() {
		// getModified()
		return (
			<div className="invoiceDetails">
				<p>Last modified: 9:45am Feb 24</p>
			</div>
		);
	}
}

export class ReceivedInvoiceMenu extends React.Component {
	render() {
		return (
			<div className="invoiceTopMenu">
				<button title="Download Invoice" onClick={() => {
					console.log("download");
				}}>
					<Image
						id="downloadImg"
						src="/images/download.png"
						alt="Download"
						width={30}
						height={30}
					/>
				</button>
				<button title="Delete Invoice" onClick={() => {
					console.log("delete");
				}}>
					<Image
						id="deleteImg"
						src="/images/delete.png"
						alt="Delete"
						width={30}
						height={30}
					/>
				</button>
			</div>
		);
	}
}

export class CreatedInvoiceMenu extends React.Component {
	render() {
		return (
			<div className="invoiceTopMenu">
				<button title="Download Invoice" onClick={() => {
					console.log("download");
				}}>
					<Image
						id="downloadImg"
						src="/images/download.png"
						alt="Download"
						width={30}
						height={30}
					/>
				</button>
				<Link href="/modify_invoice" id="modifyInvoice">
					<button title="Modify Invoice" onClick={() => {
						console.log("modify");
					}}>
						<Image
							id="modifyImg"
							src="/images/modify.png"
							alt="Modify"
							width={30}
							height={30}
						/>
					</button>
				</Link>
				<button title="Delete" onClick={() => {
					console.log("delete");
				}}>
					<Image
						id="deleteImg"
						src="/images/delete.png"
						alt="Delete"
						width={30}
						height={30}
					/>
				</button>
			</div>
		);
	}
}

export class DeletedInvoiceMenu extends React.Component {
	render() {
		return (
			<div className="invoiceTopMenu">
				<button title="Download Invoice" onClick={() => {
					console.log("download");
				}}>
					<Image
						id="downloadImg"
						src="/images/download.png"
						alt="Download"
						width={30}
						height={30}
					/>
				</button>
				<button title="Recover Invoice" onClick={() => {
					console.log("recover");
				}}>
					<Image
						id="recoverImg"
						src="/images/recover.png"
						alt="Recover"
						width={30}
						height={30}
					/>
				</button>
				<button title="Delete Invoice" onClick={() => {
					console.log("delete");
				}}>
					<Image
						id="deleteImg"
						src="/images/delete.png"
						alt="Delete"
						width={30}
						height={30}
					/>
				</button>
			</div>
		);
	}
}

export class InvoiceFullscreen extends React.Component {
	render() {
		// get renderedInvoice()
		return (
			<div className="invoiceFullscreen">
				<Link href="/view_invoice" id="viewInvoice">
					<button title="Show Fullscreen" onClick={() => {
						console.log("fullscreen");
					}}>
						<Image
							id="fullscrImg"
							src="/images/fullscreen.png"
							alt="Show Fullscreen"
							width={30}
							height={30}
						/>
					</button>
				</Link>
			</div>
		);
	}
}

export class InvoiceView extends React.Component {
	render() {
		// get renderedInvoice()
		return (
			<div className="invoiceView">
				<Image
					id="invoiceImg"
					src="/sample_invoice.png"
					alt="Invoice Contents"
					title="Invoice Contents"
					width={510}
					height={700}
				/>
			</div>
		);
		// no invoices to list
		/*
		return (
			<div class="noInvoiceContents">
				<p>Click on an invoice to view its contents</p>
			</div>
		);
		*/
	}
}

/*
async function retrieval(invoiceId: string) {
	const retrieval = "http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/invoice/retrieval?invoiceId=";
	const url = retrieval.concat(invoiceId.toString());
	const response = await fetch(url, {
		method: "GET",
		headers: {
			token: env.token
		}
	});
	const data = await response.json();
	return data;
}
*/

function AddTripButton(props: { addTrip: React.MouseEventHandler<HTMLButtonElement> }) {
	return (
		<button onClick={props.addTrip}>
			Retrieve
		</button>
	);
}

export function ReceivedRetrievalComponent() {
	const [state, setState] = useState(0);
	return (
		<div>
			{state === 0 && (
				<view className={styles.tripView}>
					<div className={styles.tripInput}>
						<input type="text" placeholder="Enter invoiceId:"></input>
					</div>
					<div className={styles.tripButton}>
						<AddTripButton addTrip={() => setState(1)} />
					</div>
				</view>
			)}
			{state === 1 && (
				<div>
					<view className={styles.tripView}>
						<div className={styles.tripInput}>
							<input type="text" placeholder="Enter invoiceId:"></input>
						</div>
						<div className={styles.tripButton}>
							<AddTripButton addTrip={() => setState(1)} />
						</div>
					</view>
					<div className={styles.invoiceSubject}>
						<InvoiceSubject />
					</div>
					<div className={styles.invoiceDetails}>
						<InvoiceDetails />
					</div>
					<div className={styles.invoiceTopMenu}>
						<ReceivedInvoiceMenu />
					</div>
					<div className={styles.invoiceView}>
						<InvoiceView />
					</div>
				</div>
			)}
		</div>
	);
}

export function CreatedRetrievalComponent() {
	const [state, setState] = useState(0);
	return (
		<div>
			{state === 0 && (
				<view className={styles.tripView}>
					<div className={styles.tripInput}>
						<input type="text" placeholder="Enter invoiceId:"></input>
					</div>
					<div className={styles.tripButton}>
						<AddTripButton addTrip={() => setState(1)} />
					</div>
				</view>
			)}
			{state === 1 && (
				<div>
					<view className={styles.tripView}>
						<div className={styles.tripInput}>
							<input type="text" placeholder="Enter invoiceId:"></input>
						</div>
						<div className={styles.tripButton}>
							<AddTripButton addTrip={() => setState(1)} />
						</div>
					</view>
					<div className={styles.invoiceSubject}>
						<InvoiceSubject />
					</div>
					<div className={styles.invoiceDetails}>
						<InvoiceDetails />
					</div>
					<div className={styles.invoiceTopMenu}>
						<CreatedInvoiceMenu />
					</div>
					<div className={styles.invoiceView}>
						<InvoiceView />
					</div>
				</div>
			)}
		</div>
	);
}

export function DeletedRetrievalComponent() {
	const [state, setState] = useState(0);
	return (
		<div>
			{state === 0 && (
				<view className={styles.tripView}>
					<div className={styles.tripInput}>
						<input type="text" placeholder="Enter invoiceId:"></input>
					</div>
					<div className={styles.tripButton}>
						<AddTripButton addTrip={() => setState(1)} />
					</div>
				</view>
			)}
			{state === 1 && (
				<div>
					<view className={styles.tripView}>
						<div className={styles.tripInput}>
							<input type="text" placeholder="Enter invoiceId:"></input>
						</div>
						<div className={styles.tripButton}>
							<AddTripButton addTrip={() => setState(1)} />
						</div>
					</view>
					<div className={styles.invoiceSubject}>
						<InvoiceSubject />
					</div>
					<div className={styles.invoiceDetails}>
						<InvoiceDetails />
					</div>
					<div className={styles.invoiceTopMenu}>
						<DeletedInvoiceMenu />
					</div>
					<div className={styles.invoiceView}>
						<InvoiceView />
					</div>
				</div>
			)}
		</div>
	);
}

function invoiceList(filter: string) {
	/*
	const invoiceIdsList = "http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/invoice/list?filter=";
	const url = invoiceIdsList.concat(filter.toString());
	fetch(url, {
		method: "GET",
		headers: {
			token: env.token
		}
	}).then((result) => {
		result.json().then((data) => {
			const rows = [];
			data.forEach((invoiceIds) => {
				rows.push(
					<li>
						<button onClick={() => {
							console.log("invoice");
						}}>
							{invoiceIds.invoiceId}
						</button>
					</li>
				);
			});
		});
	});
	const data = await response.json();
	*/
	const data = [{
		invoiceId: "1"
	}, {
		invoiceId: "2"
	}, {
		invoiceId: "3"
	}, {
		invoiceId: "4"
	}, {
		invoiceId: "5"
	}, {
		invoiceId: "6"
	}, {
		invoiceId: "7"
	}, {
		invoiceId: "8"
	}, {
		invoiceId: "9"
	}, {
		invoiceId: "10"
	}];
	const rows = [];
	for (let p = 0; p < data.length; p++) {
		// data[p].invoiceId
		rows.push(
			<li>
				<button>
					<strong>InvoiceId: {data[p].invoiceId}</strong>
				</button>
			</li>
		);
	}

	if (!rows) {
		return (
			<li>You have not received any invoices yet.</li>
		);
	}
	return rows;
}

export class InvoiceListComponent extends React.Component {
	render() {
		return (
			<div className="listInvoices">
				<ul>
					{invoiceList("")}
				</ul>
			</div>
		);
	}
}

/*
function ListInvoices2(filter: string) {
	// const [html] = useState({ __html: "" });
	let row;
	row = [];
	row = invoiceList(filter);

	for (const p of invoiceList(filter)) {
		const button = (
			<button>
				p.name
			</button>
		);
		row.push(button);
	}

	useEffect(() => {
		invoiceList(filter).then(result => {
			result.forEach((invoiceIds) => {
				rows.push(
					<li>
						<button onClick={() => {
							console.log("invoice");
						}}>
							{invoiceIds.invoiceId}
						</button>
					</li>
				);
			});
		});
	});

	return rows;
}

export function ListInvoicesComponent() {
	return (
		<div className="listInvoices">
			<ListInvoices2 />
		</div>
	);
}

/*
function ListInvoicesData(filter: string) {
	const [showTerm, setShowTerm] = useState(false);

	return (
		<div>
			{showTerm && <h1>{term.definition}</h1>}
			<button
				className="buttons-container-button"
				onClick={() => {
					setShowTerm(!showTerm);
				}}
			>
				{term.name}
			</button>
		</div>
	);
}
*/

export class ListInvoices extends React.Component {
	render() {
		/*
		function displayList() {
			const ids = this.props.data;
			const listItems = ids.map((id) =>
				<li>{id}</li>
			);
		}
		*/
		// get listInvoices()
		return (
			<div className="listInvoices">
				<ul>
					<li>
						<button onClick={() => {
							console.log("invoice1");
						}}>
							<strong>1</strong>
						</button>
					</li>
					<li>
						<button onClick={() => {
							console.log("invoice2");
						}}>
							<strong>2</strong>
						</button>
					</li>
					<li>
						<button onClick={() => {
							console.log("invoice3");
						}}>
							<strong>3</strong>
						</button>
					</li>
					<li>
						<button onClick={() => {
							console.log("invoice4");
						}}>
							<strong>4</strong>
						</button>
					</li>
					<li>
						<button onClick={() => {
							console.log("invoice5");
						}}>
							<strong>5</strong>
						</button>
					</li>
					<li>
						<button onClick={() => {
							console.log("invoice6");
						}}>
							<strong>6</strong>
						</button>
					</li>
					<li>
						<button onClick={() => {
							console.log("invoice7");
						}}>
							<strong>7</strong>
						</button>
					</li>
				</ul>
			</div>
		);
		// no invoices to list
		/*
		return (
			<div class="noListInvoices">
				<p>You have not received|created|deleted any invoices yet</p>
			</div>
		);
		*/
	}
}