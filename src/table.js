const table = document.getElementById("exportMe");

const toCsv = function (table) {
	const rows = table.querySelectorAll("tr");

	return [...rows]
		.map((row) => {
			const cells = row.querySelectorAll("th,td");
			return [...cells]
				.map((cell) => {
					return cell.textContent;
				})
				.join(",");
		})
		.join("\n");
};

const download = function (text, fileName) {
	const link = document.createElement("a");
	link.setAttribute(
		"href",
		`data:text/csv;charset=utf-8,${encodeURIComponent(text)}`
	);
	link.setAttribute("download", fileName);

	link.style.display = "none";
	document.body.appendChild(link);

	link.click();

	document.body.removeChild(link);
};

const button = document.getElementById("export");
button.addEventListener("click", () => {
	const csv = toCsv(table);
	download(csv, "tableData.csv");
});
