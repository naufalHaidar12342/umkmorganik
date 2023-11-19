import { DateTime } from "luxon";

export default function ISOTimeToHumanReadable(ISOtime) {
	const formattedDate = DateTime.fromISO(ISOtime)
		.setZone("Asia/Jakarta")
		.toFormat("dd MMMM yyyy HH:mm 'WIB'");
	return formattedDate;
}
