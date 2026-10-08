// import Image from "next/image";
import { BorderHandler } from "@/utils/borderHandler";
import Link from "next/link";
import { useRouter } from "next/router";
import { GearWideConnected, BoxArrowRight } from "react-bootstrap-icons";

function Logout() {
	BorderHandler.autoSetBorders(BorderHandler.getBorderState());
	const router = useRouter();

	const handleLogout = () => {
		let token = "";
		if (typeof window !== "undefined") {
			token = localStorage.getItem("token") || "";
		}
		const url = "http://h10a-brownie-dev.ap-southeast-2.elasticbeanstalk.com/auth/logout";
		fetch(url, {
			method: "POST",
			headers: {
				token: token
			}
		}).then(res => {
			if (res.status !== 200) {
				console.log("Logout failed");
				return;
			}
			if (typeof window !== "undefined") {
				localStorage.setItem("token", "");
				router.push("/");
			}
		});
	};

	return <>
		<button name="Button" title="Logout" onClick={handleLogout}>
			<BoxArrowRight size={40} />
		</button>
	</>;
}

export default function HomeTopMenu() {
	return <div className="homeTopMenu">
		<header>
			<Link href="/accounts">
				<button name="Button" title="Settings" onClick={() => {
					console.log("Settings");
				}}>
					<GearWideConnected size={40} />
				</button>
			</Link>
			<Logout />
		</header>
	</div>;
}