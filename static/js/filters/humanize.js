app.filter('humanize', function(){
	return function(date){
		date = new Date(date)
		// CONSTANTS
		var DAY = 60*60*24,
			HOUR = 60*60,
			MIN = 60;
	
		// Get difference between dates in seconds
		var now_ms = new Date().getTime(),
			date_ms = date.getTime(),
			diff_sec = Math.floor((date_ms - now_ms)/1000);
		
		var left; // Temp var 
		
		var days = Math.floor(diff_sec / DAY);
		left = diff_sec % DAY;
		var hours = Math.floor(left / HOUR);
		left = left % HOUR;
		var minutes = Math.floor(left / MIN);
		left = left % MIN;
		var seconds = left % MIN;
		
		// if (days > 0){
		// 	if (days === 1){
		// 		return "1 day and " + hours + " hours";
		// 	}
		// 	else {
		// 		return days + " days and " + hours + " hours";
		// 	}
		// }
		// else if (hours > 0){
		// 	if (hours === 1){
		// 		return "1 hour and " + minutes + " min";
		// 	}
		// 	else {
		// 		return hours + " hours " + minutes + " min";
		// 	}
		// }
		// else if (minutes > 0){
		// 	if (minutes === 1){
		// 		return "1 min";
		// 	}
		// 	else {
		// 		return minutes + " min";
		// 	}
		// }
		// else if (minutes === 0){
		// 	return "Less than a minute";
		// }
		// else {
		// 	return "Past";
		// }

		if (days > 0){
			if (days === 1){
				return "1d " + hours + "h";
			}
			else {
				return days + "d " + hours + "h";
			}
		}
		else if (hours > 0){
			if (hours === 1){
				return "1h " + minutes + "m";
			}
			else {
				return hours + "h " + minutes + "m";
			}
		}
		else if (minutes > 0){
			if (minutes === 1){
				return "1m";
			}
			else {
				return minutes + "m";
			}
		}
		else if (minutes === 0){
			return "< 1m";
		}
		else {
			return "Past";
		}
	};
});
