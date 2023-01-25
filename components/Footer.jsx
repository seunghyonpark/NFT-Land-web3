import React from "react";

function Footer({projectCodeName,}) {
	return (
		<footer className="mt-8 mb-15 text-amber-400 drop-shadow-lg">
			Made by{" "}
			<a
				className=" font-semibold text-amber-400"
				href="https://ggdgame.saltmarble.io/"
				target="_blank"
				rel="noreferrer"
			>
				
				

				© 2023 SML. All rights reserved.
			</a>
		</footer>
	);
}

export default Footer;
