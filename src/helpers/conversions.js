/**
 *
 * Adapted from:
 * source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 *
 *
 */

exports.hexToRGB = (hex) => {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
};
exports.rgbToHex = ({ r, g, b }) => {
	return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

/**
 *
 * Adapted from Source:
 * https://gist.github.com/mjackson/5311256
 *
 *
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 */

exports.rgbToHSL = ({ r, g, b }) => {
	r /= 255;
	g /= 255;
	b /= 255;

	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			default:
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}
	h = Math.round(h * 255);
	s = Math.round(s * 255);
	l = Math.round(l * 255);

	return { h, s, l };
};

exports.hslToRGB = ({ h, s, l }) => {
	var r, g, b;

	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;

		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	r *= 255;
	g *= 255;
	b *= 255;

	return { r, g, b };
};

exports.rgbToHSV = ({ r, g, b }) => {
	// r /= 255;
	// g /= 255;
	// b /= 255;

	var max = Math.max(r, g, b),
		min = Math.min(r, g, b),
		d = max - min,
		h,
		s = max === 0 ? 0 : d / max,
		v = max / 255;

	switch (max) {
		default:
		case min:
			h = 0;
			break;
		case r:
			h = g - b + d * (g < b ? 6 : 0);
			h /= 6 * d;
			break;
		case g:
			h = b - r + d * 2;
			h /= 6 * d;
			break;
		case b:
			h = r - g + d * 4;
			h /= 6 * d;
			break;
	}

	// h /= 6;

	h = Math.round(h * 255);
	s = Math.round(s * 255);
	v = Math.round(v * 255);

	return { h, s, v };
};

exports.hsvToRGB = ({ h, s, v }) => {
	var r, g, b;

	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		default:
		case 5:
			r = v;
			g = p;
			b = q;
			break;
	}
	r *= 255;
	g *= 255;
	b *= 255;

	return { r, g, b };
};
