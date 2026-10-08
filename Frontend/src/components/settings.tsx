import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import styles from "@/styles/settings-page.module.css";
import { BorderHandler } from "@/utils/borderHandler";

function getUserName() {
	return "John Citizen";
}

function getEmail() {
	return "jcitizen@gmail.com";
}

export function AccountSettings() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// requires retrieval of user name and email
	return (
		<div className={styles.accountSettings}>
			<Table borderless>
				<tbody>
					<tr>
						<td>User/Company Name:</td>
						<td>{getUserName()}</td>
						<td></td>
					</tr>
					<tr>
						<td>Email:</td>
						<td>{getEmail()}</td>
						<td></td>
					</tr>
				</tbody>
			</Table>
			<Button name="Button"
				className={styles.passwordButton}
				title="Password Reset"
				variant="secondary"
				onClick={handleShow}
			>Change Password</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body>You will be logged out and redirected to the password reset page.</Modal.Body>
				<Modal.Footer>
					<Button className={styles.modalSecondButton} variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button className={styles.modalPrimaryButton} variant="primary" onClick={handleClose}>
						Continue
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export function ThemeSettings() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const [changedTheme, setChangedTheme] = useState(theme || "light");

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const saveChanges = () => {
		setTheme(changedTheme);
	};

	return (
		<div>
			<Form className={styles.settingsForm}>
				<h5>Colour Theme</h5>
				<Form.Check
					className={styles.themeCheck}
					title="Default Colour Scheme"
					id={styles.themeCheck1}
					name="group1"
					type="radio"
					label="Default"
				/>
				{/* <Form.Check
					className={styles.themeCheck}
					title="Warm Tone Colour Scheme"
					id={styles.themeCheck2}
					name="group1"
					type="radio"
					label="Warm"
				/>
				<Form.Check
					className={styles.themeCheck}
					title="Cold Tone Colour Scheme"
					id={styles.themeCheck3}
					name="group1"
					type="radio"
					label="Cool"
				/> */}
				<Form.Check
					className={styles.themeCheck}
					title="Grayscale Colour Scheme"
					id={styles.themeCheck4}
					name="group1"
					type="radio"
					label="Grayscale"
				/>
				<h5>Appearance</h5>
				<Form.Check
					className={styles.themeCheck}
					title="Minimalistic Light Theme"
					id={styles.themeCheck5}
					name="group2"
					type="radio"
					label="Light"
					inline
					defaultChecked={theme === "light"}
					onChange={() => { setChangedTheme("light"); return undefined; }}
				/>
				<Form.Check
					className={styles.themeCheck}
					title="Minimalistic Dark Theme"
					id={styles.themeCheck6}
					name="group2"
					type="radio"
					label="Dark"
					inline
					defaultChecked={theme === "dark"}
					onChange={() => { setChangedTheme("dark"); return undefined; }}
				/>
				<div className={styles.space}> </div>

				<Button name="Button"
					className={styles.resetButton}
					title="Reset All Settings"
					variant="secondary"
				>Clear</Button>

				<Button name="Button"
					className={styles.saveButton}
					title="Save Changes"
					variant="primary"
					onClick={() => {
						console.log("save");
						saveChanges();
					}}
				>Save Changes</Button>
			</Form>
		</div>
	);
}

/*
export function ThemeSettings() {
	const [showAlert, setShowAlert] = useState(false);
	if (showAlert) {
		return (
			<div>
				<Alert className={styles.saveAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
					<p>Your changes to Theme Settings have been saved.</p>
				</Alert>
				{ThemeSettingsForm(setShowAlert)}
			</div>
		);
	}
	// remove collapsable sidebar option if necessary
	return (
		<div>
			{ThemeSettingsForm(setShowAlert)}
		</div>
	);
}
*/

function AccessSettingsForm(setShowAlert: any) {
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);
	let borderState = BorderHandler.getBorderState();
	// document.documentElement.style.setProperty("border", "4px solid #000000");
	if (typeof window !== "undefined") {
		document.getElementsByName("Button").forEach((element) => {
			BorderHandler.enableBorder(element);
			console.log(element);
		});
	}
	return (
		<div id="Button">
			<Form className={styles.settingsForm} onSubmit={(event) => {
				event.preventDefault();
				BorderHandler.setBorderState(borderState);
			}}>
				<Form.Switch
					className={styles.accessCheck}
					id={styles.borderSwitch}
					label="Border Elements"
					defaultChecked={BorderHandler.getBorderState()}
					onChange={() => {
						borderState = !BorderHandler.getBorderState();
					}}
				/>
				<p>Place a border around all elements for high contrast</p>
				<Form.Switch
					className={styles.accessCheck}
					id={styles.textureSwitch}
					label="Texture Elements"
				/>
				<p>Add small textures in translucent elements</p>
				<Form.Switch
					className={styles.accessCheck}
					id={styles.altTextSwitch}
					label="Collapsable Sidebar"
				/>
				<p>Allow the ability to collapse the sidebar and expand content</p>
				<div className={styles.space}> </div>

				<Button name="Button"
					className={styles.resetButton}
					title="Reset All Settings"
					variant="secondary"
					onClick={handleShow}
				>Clear</Button>
				<Modal show={showModal} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want to reset all accessibility settings to the default settings?</Modal.Body>
					<Modal.Footer>
						<Button className={styles.modalSecondButton} variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button className={styles.modalPrimaryButton} variant="primary" onClick={handleClose}>
							Continue
						</Button>
					</Modal.Footer>
				</Modal>

				<Button name="Button"
					className={styles.saveButton}
					id="Button"
					title="Save Changes"
					variant="primary"
					onClick={() => {
						setShowAlert(true);
						BorderHandler.setBorderState(borderState);
						// location.reload();
					}}
				>Save Changes</Button>
			</Form>
		</div>
	);
}

export function AccessSettings() {
	const [showAlert, setShowAlert] = useState(false);
	if (showAlert) {
		return (
			<div>
				<Alert className={styles.saveAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
					<p>Your changes to Accessibility Settings have been saved.</p>
				</Alert>
				{AccessSettingsForm(setShowAlert)}
			</div>
		);
	}
	// remove collapsable sidebar option if necessary
	return (
		<div>
			{AccessSettingsForm(setShowAlert)}
		</div>
	);
}