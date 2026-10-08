import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import styles from "@/styles/home-page.module.css";
import {
	FileEarmarkPlusFill, InboxFill, SendCheck, Trash,
	ArrowLeftCircle, PersonCircle, Palette, UniversalAccessCircle
} from "react-bootstrap-icons";
import { BorderHandler } from "@/utils/borderHandler";

function HomeSideMenu(id: string) {
	BorderHandler.autoSetBorders(BorderHandler.getBorderState());
	return (
		<div className="homeSideMenu" id={id}>
			<Link href="/create_invoice">
				<Button name="Button"
					className={styles.createButton}
					title="Create a New Invoice"
					variant="primary"
					onClick={() => {
						console.log("create new");
					}}
				>
					<FileEarmarkPlusFill size={25} />
					<p>Create New</p>
				</Button>
			</Link>

			<h2>Navigation</h2>

			<Link href="/received">
				<Button name="Button"
					className={styles.navButton}
					title="Invoices Received"
					variant="primary"
				>
					<InboxFill size={20} />
					<p>Received</p>
				</Button>
			</Link>
			<Link href="/myinvoices">
				<Button name="Button"
					className={styles.navButton}
					title="Invoices Sent"
					variant="primary"
				>
					<SendCheck size={20} />
					<p>Sent</p>
				</Button>
			</Link>
			<Link href="/deleted">
				<Button name="Button"
					className={styles.navButton}
					title="Invoices Deleted"
					variant="primary"
				>
					<Trash size={20} />
					<p>Deleted</p>
				</Button>
			</Link>

			<Image
				className={styles.logo}
				src="/images/logo.png"
				title="eiei Logo"
				alt="eiei logo"
				width={70}
				height={70}
			/>
		</div>
	);
}

export function ReceivedSideMenu() {
	return HomeSideMenu(styles.receivedSideMenu);
}

export function CreatedSideMenu() {
	return HomeSideMenu(styles.createdSideMenu);
}

export function DeletedSideMenu() {
	return HomeSideMenu(styles.deletedSideMenu);
}

export function SettingsSideMenu() {
	return (
		<div className="homeSideMenu" id={styles.settingsSideMenu}>
			<Link href="/received">
				<Button name="Button"
					className={styles.createButton}
					title="Return"
					variant="primary"
					onClick={() => {
						console.log("back home");
					}}
				>
					<ArrowLeftCircle size={25} />
					<p>Back Home</p>
				</Button>
			</Link>

			<h2>Navigation</h2>

			<Link href="/accounts">
				<Button name="Button"
					className={styles.navButton}
					title="Account Settings"
					variant="primary"
					onClick={() => {
						console.log("accounts");
					}}
				>
					<PersonCircle size={20} />
					<p>Accounts</p>
				</Button>
			</Link>
			<Link href="/theme">
				<Button name="Button"
					className={styles.navButton}
					title="Theme Settings"
					variant="primary"
					onClick={() => {
						console.log("theme");
					}}
				>
					<Palette size={20} />
					<p>Theme</p>
				</Button>
			</Link>
			<Link href="/accessibility">
				<Button name="Button"
					className={styles.navButton}
					title="Accessibility Settings"
					variant="primary"
					onClick={() => {
						console.log("accessibility");
					}}
				>
					<UniversalAccessCircle size={20} />
					<p>Accessibility</p>
				</Button>
			</Link>

		</div>
	);
}

/*
export class SettingsSideMenu extends React.Component {
	render() {
		return (
			<div className="homeSideMenu settingsSideMenu">
				<button title="Back Home" onClick={() => {
					console.log("back home");
				}}>Back Home</button>

				<h2><strong>Navigation</strong></h2>

				<a href="" id="received">Accounts</a>
				<a href="" id="notifications">Notifications</a>
				<a href="" id="localtheme">Theme & Localisation</a>

			</div>
		);
	}
}
*/