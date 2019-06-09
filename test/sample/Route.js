const imageTests = [
	{ name: "PNG", url: "https://www.gstatic.com/webp/gallery3/1.png" },
	{ name: "JPG", url: "https://www.gstatic.com/webp/gallery/1.jpg" },
	{ name: "SVG", url: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg" },
	{ name: "GIF", url: "https://www.w3schools.com/images/html5.gif" },
	{ name: "WEBP", url: "https://www.gstatic.com/webp/gallery/1.webp" }
];

const imageTestsWithExtensionsInCaps = [
	{ name: "PNG", url: "https://www.gstatic.com/webp/gallery3/1.PNG" },
	{ name: "JPG", url: "https://www.gstatic.com/webp/gallery/1.JPG" },
	{ name: "SVG", url: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.SVG" },
	{ name: "GIF", url: "https://www.w3schools.com/images/html5.GIF" },
	{ name: "WEBP", url: "https://www.gstatic.com/webp/gallery/1.WEBP" }
];

const imageTestsWithQueryStrings = [
	{ name: "PNG", url: "https://www.gstatic.com/webp/gallery3/1.png?width=800&height=600" },
	{ name: "JPG", url: "https://www.gstatic.com/webp/gallery/1.jpg?width=800&height=600" },
	{ name: "SVG", url: "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/410.svg?width=800&height=600" },
	{ name: "GIF", url: "https://www.w3schools.com/images/html5.gif?width=800&height=600" },
	{ name: "WEBP", url: "https://www.gstatic.com/webp/gallery/1.webp?width=800&height=600" }
];

const videoTests = [
	{ name: "MP4", url: "http://techslides.com/demos/sample-videos/small.mp4" },
	{ name: "OGV", url: "http://techslides.com/demos/sample-videos/small.ogv" },
	{ name: "OGG", url: "https://file-examples.com/wp-content/uploads/2018/04/file_example_OGG_480_1_7mg.ogg" },
	{ name: "WEBM", url: "http://techslides.com/demos/sample-videos/small.webm" },
	{ name: "FLV", url: "http://techslides.com/demos/sample-videos/small.flv" },
	{ name: "MKV", url: "https://sample-videos.com/video123/mkv/720/big_buck_bunny_720p_1mb.mkv" },
	{ name: "3GP", url: "https://sample-videos.com/video123/3gp/144/big_buck_bunny_144p_1mb.3gp" }
];

const videoTestsWithExtensionsInCaps = [
	{ name: "MP4", url: "http://techslides.com/demos/sample-videos/small.MP4" },
	{ name: "OGV", url: "http://techslides.com/demos/sample-videos/small.OGV" },
	{ name: "OGG", url: "https://file-examples.com/wp-content/uploads/2018/04/file_example_OGG_480_1_7mg.OGG" },
	{ name: "WEBM", url: "http://techslides.com/demos/sample-videos/small.WEBM" },
	{ name: "FLV", url: "http://techslides.com/demos/sample-videos/small.FLV" },
	{ name: "MKV", url: "https://sample-videos.com/video123/mkv/720/big_buck_bunny_720p_1mb.MKV" },
	{ name: "3GP", url: "https://sample-videos.com/video123/3gp/144/big_buck_bunny_144p_1mb.3GP" }
];

const videoTestsWithQueryStrings = [
	{ name: "MP4", url: "http://techslides.com/demos/sample-videos/small.mp4?width=800&height=600" },
	{ name: "OGV", url: "http://techslides.com/demos/sample-videos/small.ogv?width=800&height=600" },
	{
		name: "OGG",
		url: "https://file-examples.com/wp-content/uploads/2018/04/file_example_OGG_480_1_7mg.ogg?width=800&height=600"
	},
	{ name: "WEBM", url: "http://techslides.com/demos/sample-videos/small.webm?width=800&height=600" },
	{ name: "FLV", url: "http://techslides.com/demos/sample-videos/small.flv?width=800&height=600" },
	{ name: "MKV", url: "https://sample-videos.com/video123/mkv/720/big_buck_bunny_720p_1mb.mkv?width=800&height=600" },
	{ name: "3GP", url: "https://sample-videos.com/video123/3gp/144/big_buck_bunny_144p_1mb.3gp?width=800&height=600" }
];

const audioTests = [
	{ name: "WAVE", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.wav" },
	{ name: "MP3", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3" },
	{ name: "OGG", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_OOG_1MG.ogg" }
];

const audioTestsWithExtensionsInCaps = [
	{ name: "WAVE", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.WAV" },
	{ name: "MP3", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.MP3" },
	{ name: "OGG", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_OOG_1MG.OGG" }
];

const audioTestsWithQueryStrings = [
	{
		name: "WAVE",
		url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.wav?start=10.0&stop=68.00"
	},
	{
		name: "MP3",
		url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3?start=10.0&stop=68.00"
	},
	{
		name: "OGG",
		url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_OOG_1MG.ogg?start=10.0&stop=68.00"
	}
];

const assetTests = [
	{ name: "HTM", url: "http://help.websiteos.com/websiteos/example_of_a_simple_html_page.htm" },
	{ name: "HTML", url: "https://www.w3.org/Style/Examples/011/firstcss.en.html" },
	{ name: "JAVASCRIPT", url: "https://static.npmjs.com/package/package.109c8649065b8c37a2f1.js" },
	{ name: "CSS", url: "https://static.npmjs.com/styles.a34b113ba89c0a069aa9.css" }
];

const assetTestsWithExtensionsInCaps = [
	{ name: "HTM", url: "http://help.websiteos.com/websiteos/example_of_a_simple_html_page.HTM" },
	{ name: "HTML", url: "https://www.w3.org/Style/Examples/011/firstcss.en.HTML" },
	{ name: "JAVASCRIPT", url: "https://static.npmjs.com/package/package.109c8649065b8c37a2f1.JS" },
	{ name: "CSS", url: "https://static.npmjs.com/styles.a34b113ba89c0a069aa9.CSS" }
];

const assetTestsWithQueryStrings = [
	{ name: "HTM", url: "http://help.websiteos.com/websiteos/example_of_a_simple_html_page.htm?page=1&sort=asc" },
	{ name: "HTML", url: "https://www.w3.org/Style/Examples/011/firstcss.en.html?page=1&sort=asc" },
	{ name: "JAVASCRIPT", url: "https://static.npmjs.com/package/package.109c8649065b8c37a2f1.js?v=38" },
	{ name: "CSS", url: "https://static.npmjs.com/styles.a34b113ba89c0a069aa9.css?v=42" }
];

const fontTests = [
	{ name: "WOFF", url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.woff" },
	{
		name: "WOFF2",
		url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.woff2"
	},
	{ name: "EOT", url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.eot" },
	{ name: "TTF", url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.ttf" }
];

const fontTestsWithExtensionInCaps = [
	{ name: "WOFF", url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.WOFF" },
	{
		name: "WOFF2",
		url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.WOFF2"
	},
	{ name: "EOT", url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.EOT" },
	{ name: "TTF", url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.TTF" }
];

const fontTestsWithQueryStrings = [
	{
		name: "WOFF",
		url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.woff?v=42"
	},
	{
		name: "WOFF2",
		url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.woff2?v=42"
	},
	{
		name: "EOT",
		url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.eot?v=42"
	},
	{
		name: "TTF",
		url: "https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/fonts/Simple-Line-Icons.ttf?v=42"
	}
];

export {
	imageTests,
	imageTestsWithExtensionsInCaps,
	imageTestsWithQueryStrings,
	videoTests,
	videoTestsWithExtensionsInCaps,
	videoTestsWithQueryStrings,
	audioTests,
	audioTestsWithExtensionsInCaps,
	audioTestsWithQueryStrings,
	assetTests,
	assetTestsWithExtensionsInCaps,
	assetTestsWithQueryStrings,
	fontTests,
	fontTestsWithExtensionInCaps,
	fontTestsWithQueryStrings
};
