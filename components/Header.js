import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
//----------------------------------------------------------add project directory and routes
const Header = () => {
	return (
		<Menu style={{ marginTop: "15px", backgroundColor: "#00A170" }}>
			<Link route="/">
				<a
					className="item"
					style={{ fontFamily: "Vazir", textColor: "white" }}
				>
					CorwdCoin
				</a>
			</Link>

			<Menu.Menu position="right">
				<Link route="/">
					<a className="item" style={{ fontFamily: "Vazir" }}>
						لیست پروژه ها
					</a>
				</Link>

				<Link route="/projects/new">
					<a className="item">+</a>
				</Link>
			</Menu.Menu>
		</Menu>
	);
};

export default Header;
