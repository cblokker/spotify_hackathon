// receive input within range from -300..300
// return value from 200 - 1500


// example ins + outs --> 

// convertToRange(50, [0, 100], [0,10])
// 5
// convertToRange(50, [0, 100], [0,1200])
// 600



function convertToRange(val, in_range, out_range) {
	// ranges are 2 value arrays, in min + max, out min + max
	var in_min = in_range[0], in_max = in_range[1]
	var out_min = out_range[0], out_max = out_range[1];
	return (val - in_min) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}
