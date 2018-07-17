var spinner = {
	interval: 80,
	frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
};

let i = 0;

$(document).ready(() => {
	$('.gridBlock .blockElement .blockImage')
		.eq(0)
		.html('<div class="spinner">' + spinner.frames[0] + '</div>');
});

setInterval(() => {
	$('.spinner').html(
		'<span class="command">$ npx make-space</span><br/>You can save up to <span class="spinner-color">' +
			spinner.frames[i++ % spinner.frames.length] +
			' ' +
			(i * 0.1).toFixed(1) +
			'  GB</span>.'
	);
}, 160);
