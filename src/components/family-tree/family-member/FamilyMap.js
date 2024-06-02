import FamilyFactory from "./FamilyFactory";
import loadDefault from "./defaultFamilyMembers";

export default function FamilyMap() {
	let famFac = new FamilyFactory();
	let { members, relationships } = loadDefault(famFac);

	// helper
	const displayMember = (member) => {
		console.log("--displayMember-- member: ", member.abbr);
		return (
			<ul>
				<li>
					{/* Name */}
					{member.abbr}
				</li>
			</ul>
		);
	};

	// render
	return <>{members.map((member) => displayMember(member))}</>;
}
