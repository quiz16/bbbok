const numberFormat = ( num ) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const dateFormat = ( newDate ) => {
	return new Date( newDate || Date.now() ).toLocaleString();
};

export {
	numberFormat,
	dateFormat
};
